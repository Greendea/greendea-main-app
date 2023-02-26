import {
    Upload,
    Form,
    Input,
    Select,
    Switch,
    message,
    Button,
    Steps,
    Spin
} from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined, EyeOutlined, InboxOutlined, SendOutlined } from '@ant-design/icons';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import Layout from "../components/Layout/Index"
import { useGetDepartmentsQuery } from '@/redux/apiSlicers/Department';
import { useState } from 'react';
import { useGetTopicsQuery } from '@/redux/apiSlicers/Topic';
import { validateMessages } from '@/utils/validateMessage';
import { allowFiles, allowFilesShow } from '@/utils/formatFiles';
import { useAddIdeaMutation } from '@/redux/apiSlicers/Idea';

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const Idea = () => {
    const { data: departments } = useGetDepartmentsQuery()
    const [addIdea, { isLoading }] = useAddIdeaMutation()
    const [form] = Form.useForm()
    const [department, setDepartment] = useState(null)
    const [files, setFiles] = useState([])
    const { data: topics } = useGetTopicsQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                data: data?.filter(i => i.Department?.id === department)
            }
        },
        skip: !!!department
    })

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
            if (size / 1024 / 1024 > 3) {
                message.error("Each file must be under 3MB")
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
            files: uploadfiles
        }).unwrap().then(res => {
            message.success("Idea Submitted")
            form.resetFields()
            setFiles([])
        }).catch(err => {
            console.log(err)
            message.error("Something went wrong. Try later!")
        })
    }
    return (
        <Layout>
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
                                onChange={val => setDepartment(val)}
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
                        <Form.Item label="Anomyous" valuePropName="checked" name="isAnomyous">
                            <Switch />
                        </Form.Item>
                        <Form.Item label="Idea" tooltip="From 10 to 1000 letters" rules={[{ min: 10 }, { required: true }]} name="content">
                            <Input.TextArea rows={7} showCount maxLength={1000} />
                        </Form.Item>
                        <Form.Item label="Files" tooltip={`Allow files: ${allowFilesShow.join(", ")}`}>
                            <Upload.Dragger {...props} >
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
                        <div style={{ textAlign: "right" }}>
                            <Button type='primary' htmlType='submit' loading={isLoading}>Submit</Button>
                        </div>
                    </Form>
                </Spin>
            </div>
        </Layout>

    );
};
export default Idea;