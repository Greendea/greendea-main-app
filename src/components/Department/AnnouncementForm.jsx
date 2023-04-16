import { useAddAnnouncementMutation } from "../../redux/apiSlicers/Announcement";
import { validateMessages } from "../../utils/validateMessage";
import { Button, Divider, Form, Input, message } from "antd";
import dynamic from "next/dynamic";
import { useRef } from "react";


export default function AnnouncementForm({ department }) {
    const Editor = dynamic(() => import("../../utils/editor"), { ssr: false });
    const [addAnnoucement, { isLoading }] = useAddAnnouncementMutation()
    const [form] = Form.useForm()
    const handleFinish = (values) => {
        addAnnoucement({
            ...values,
            department: department.id
        }).unwrap().then(res => {
            message.success("New Announcement Added")
            form.resetFields()
        }).catch(err => {
            console.log(err)
            message.error("Failed To Added")
        })
    }
    return <>
        <Divider>
            <span style={{ fontSize: 24 }}>
                Create New Announcement
            </span>
        </Divider>
        <div style={{ maxWidth: 1580, margin: "0px auto 50px auto" }}>
            <Form
                form={form}
                validateMessages={validateMessages}
                onFinish={handleFinish}
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
                <Form.Item label="Title" name="title" rules={[{ required: true }]} wrapperCol={{ span: 9 }}>
                    <Input />
                </Form.Item>
                <Form.Item label="Content" name="content" rules={[{ required: true }]}>
                    <Editor
                        value={null}
                        onChange={(v) => { }}
                    />
                </Form.Item>
                <div style={{ textAlign: "right" }}>
                    <Button type='primary' htmlType='submit' loading={isLoading}>Submit</Button>
                </div>
            </Form>
        </div>
    </>
}
