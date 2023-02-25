import {
    Upload,
    Form,
    Input,
    Select,
    Switch,
    message,
    Button,
    Steps
} from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined, EyeOutlined, InboxOutlined, SendOutlined } from '@ant-design/icons';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import Layout from "../components/Layout/Index"
import { useGetDepartmentsQuery } from '@/redux/apiSlicers/Department';
import { useState } from 'react';
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const Idea = () => {
    const { data: departments } = useGetDepartmentsQuery()
    const [form] = Form.useForm()

    return (
        <Layout>
            <div style={{ maxWidth: 1080, margin: "30px auto", padding: "0 10px" }}>
                <h1 style={{ textAlign: "center", marginBottom: 20 }}>
                    IDEA SUBMISSION
                </h1>
                <Form
                    form={form}
                    labelCol={{
                        span: 3,
                    }}
                    wrapperCol={{
                        span: 21,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: 'large',
                    }}
                    size={'Large'}
                    style={{
                        maxWidth: "100%",
                    }}
                >
                    <Form.Item label="Department">
                        <Select
                            options={departments?.map(item => {
                                return {
                                    value: item.id,
                                    label: item.name
                                }
                            })}
                        />
                        {/* <Select.Option value="A">Department A</Select.Option>
                            <Select.Option value="B">Department B</Select.Option>
                            <Select.Option value="C">Department C</Select.Option>
                        </Select> */}
                    </Form.Item>
                    <Form.Item label="Topic">
                        <Select disabled={form.getFieldValue("Department") ? false : true}>
                            <Select.Option value="A">Topic A</Select.Option>
                            <Select.Option value="B">Topic B</Select.Option>
                            <Select.Option value="C">Topic C</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Anomyous" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Idea">
                        <Input.TextArea rows={7} showCount maxLength={1000} />
                    </Form.Item>
                    <Form.Item label="Files">
                        <Upload.Dragger {...props}>
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
                        <Button type='primary' htmlType='submit'>Submit</Button>
                    </div>
                </Form>
                {/* <div>
                    <Steps
                        items={[
                            {
                                title: 'Sent',
                                status: 'finish',
                                icon: <SendOutlined />,
                            },
                            {
                                title: 'Viewed',
                                status: 'finish',
                                icon: <EyeOutlined />,
                            },
                            {
                                title: 'Verified',
                                status: 'finish',
                                icon: <SolutionOutlined />,
                            },
                            // {
                            //     title: 'Voting',
                            //     status: 'process',
                            //     icon: <CheckSquareOutlined />,
                            // },
                            {
                                title: 'Close',
                                status: 'wait',
                                icon: <CloseSquareOutlined />,
                            },
                        ]} />
                </div> */}
            </div>
        </Layout>

    );
};
export default Idea;