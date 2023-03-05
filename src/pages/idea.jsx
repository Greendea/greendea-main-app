import {
    Upload,
    Form,
    Input,
    Select,
    Switch,
    message,
    Button,
    Steps,
    Spin,
    Checkbox,
    Modal
} from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined, EyeOutlined, InboxOutlined, SendOutlined } from '@ant-design/icons';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import Layout from "../components/Layout/Index"
import { useGetDepartmentsQuery } from '@/redux/apiSlicers/Department';
import { useEffect, useState } from 'react';
import { useGetTopicsQuery } from '@/redux/apiSlicers/Topic';
import { validateMessages } from '@/utils/validateMessage';
import { allowFiles, allowFilesShow } from '@/utils/formatFiles';
import { useAddIdeaMutation } from '@/redux/apiSlicers/Idea';
import { useGetTermAndConditionQuery } from '@/redux/apiSlicers/Term';
import parse from 'html-react-parser';
import Head from 'next/head';
import { useGetCategoriesQuery } from '@/redux/apiSlicers/Category';
import { useRouter } from 'next/router';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const Idea = () => {
    const router = useRouter()
    const { departmentId, topicId } = router.query
    const { data: departments } = useGetDepartmentsQuery()
    const [addIdea, { isLoading }] = useAddIdeaMutation()
    const { data: terms, isLoading: isLoadingTerm } = useGetTermAndConditionQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                isLoading,
                data: data?.description
            }
        }
    })
    const [form] = Form.useForm()
    const [department, setDepartment] = useState(null)
    const [files, setFiles] = useState([])
    const [agree, setAgree] = useState(false)
    const [modalTerm, setModalTerm] = useState(false)
    const { data: topics } = useGetTopicsQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                data: data?.filter(i => i.Department?.id === department)
            }
        },
        skip: !!!department
    })
    const { data: categories } = useGetCategoriesQuery()

    const props = {
        name: 'file',
        multiple: true,
        action: 'api/hello',
        beforeUpload: (file) => {
            const { type, size } = file
            if (!allowFiles.includes(type)) {
                message.error("File must be in appropriate format")
                return Upload.LIST_IGNORE;
            }
            if (size / 1024 / 1024 > 2) {
                message.error("Each file must be under 2MB")
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        onChange(info) {
            const baseFiles = []
            for (let item of info.fileList) {
                getBase64(item.originFileObj, (url) => {
                    baseFiles.push({
                        url,
                        name: item.name
                    })
                });
            }
            setFiles(baseFiles)
        },
    };
    const handleSubmit = (vals) => {
        if (files.length > 5) {
            return message.error("Exceed maximum quantity of files allow!, less than 6 files")
        }
        const dateNow = Date.now()
        const uploadfiles = files.map(({ url, name }) => {
            return {
                url,
                name: `${vals.department}/${vals.topic}/${dateNow}/${name}`,
            }
        })
        addIdea({
            id: dateNow,
            ...vals,
            "isAnomyous": !!vals.isAnomyous,
            files: uploadfiles
        }).unwrap().then(res => {
            message.success("Idea Submitted")
            setAgree(false)
            form.resetFields()
            setFiles([])
        }).catch(err => {
            console.log(err)
            message.error("Something went wrong. Try later!")
        })
    }


    useEffect(() => {
        if (departmentId) {
            form.setFieldValue("department", departmentId)
            setDepartment(departmentId)
        }
        if (topicId) {
            form.setFieldValue("topic", topicId)
        }

    }, [departmentId, topicId])
    return (
        <Layout>
            <Head>
                <title>GreenDea - Idea Submission</title>
            </Head>
            <div style={{ maxWidth: 1080, margin: "30px auto", padding: "0 10px" }}>
                <h1 style={{ textAlign: "center", marginBottom: 20 }}>
                    IDEA SUBMISSION
                </h1>
                <Spin spinning={isLoading} size="large">
                    <Form
                        form={form}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        layout="horizontal"
                        initialValues={{
                            size: 'large',
                        }}
                        size={'Large'}
                        style={{
                            maxWidth: "100%",
                        }}
                        validateMessages={validateMessages}
                        onFinish={handleSubmit}
                    >
                        <Form.Item label="Department" rules={[{ required: true }]} name="department">
                            <Select
                                onChange={val => {
                                    setDepartment(val)
                                    form.setFieldValue("topic", undefined)
                                }}
                                options={departments?.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item label="Topic" rules={[{ required: true }]} name="topic">
                            <Select disabled={!!!department}
                                options={topics?.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item label="Category" rules={[{ required: true }]} name="category">
                            <Select
                                options={categories?.map(item => {
                                    return {
                                        value: item.id,
                                        label: item.name
                                    }
                                })}
                            />
                        </Form.Item>
                        <Form.Item label="Anomyous" valuePropName="checked" name="isAnomyous" >
                            <Switch />
                        </Form.Item>
                        <Form.Item label="Idea" tooltip="From 10 to 1000 letters" rules={[{ min: 10 }, { required: true }]} name="content">
                            <Input.TextArea rows={7} showCount maxLength={1000} />
                        </Form.Item>
                        <Form.Item label="Files" tooltip={`Allow files: ${allowFilesShow.join(", ")}`} name="files">
                            <Upload.Dragger {...props} maxCount={5}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                    band files
                                </p>
                            </Upload.Dragger>
                        </Form.Item>
                        <div style={{ textAlign: "right", marginBottom: 20 }}>
                            <Checkbox checked={agree} name="term" onChange={(e) => {
                                setAgree(e.target.checked)
                                setModalTerm(e.target.checked)
                            }}>
                                I accept the <a>Terms & Conditions</a>
                            </Checkbox>
                            <Modal
                                width={1580} style={{ top: 20 }}
                                closable={false} open={modalTerm} footer={<Button type="primary" onClick={() => setModalTerm(false)}>Accept</Button>}>
                                {!terms ? <Spin spinning={!terms} /> : parse(terms)}
                            </Modal>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <Button type='primary' htmlType='submit' loading={isLoading} disabled={!agree}>Submit</Button>
                        </div>
                    </Form>
                </Spin >
            </div >
        </Layout >

    );
};
export default Idea;