import { validateMessages } from "../../utils/validateMessage";
import { Button, DatePicker, Divider, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useAddTopicMutation } from "../../redux/apiSlicers/Topic";
import locale from "antd/lib/date-picker/locale/vi_VN";
import "dayjs/locale/vi"

export default function TopicForm({ department }) {
    const [form] = Form.useForm()
    const [addTopic, { isLoading }] = useAddTopicMutation()
    const handleFinish = (values) => {
        const submitData = {
            department: department.id,
            name: values.name,
            openDate: values.date[0].$d,
            closureDateIdea: values.date[1].$d,
            closureDateTopic: values.closureDateTopic.$d
        }
        console.log(submitData)
        addTopic(submitData).unwrap().then(res => {
            form.resetFields()
            form.setFieldValue("department", department?.name)
            message.success("Topic created")
        }).catch(err => {
            console.log(err)
            message.error("Failed to create topic")
        })
    }
    useEffect(() => {
        form.setFieldValue("department", department.name)
    }, [])
    return <>
        <Divider>
            <span style={{ fontSize: 24 }}>
                Create New Topic
            </span>
        </Divider>
        <div style={{ maxWidth: 620, margin: "0px auto 50px auto" }}>
            <Form
                form={form}
                validateMessages={validateMessages}
                onFinish={handleFinish}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
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
                <Form.Item label="Department" name="department" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Topic Name" name="name" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item label="Idea Dates" name="date" rules={[{ required: true }]}>
                    <DatePicker.RangePicker locale={locale} format={'DD MMM, YYYY'} />
                </Form.Item>
                <Form.Item label="Close Date Topic" name="closureDateTopic" rules={[{ required: true }]}>
                    <DatePicker locale={locale} format={'DD MMM, YYYY'} />
                </Form.Item>
                <div style={{ textAlign: "right" }}>
                    <Button type='primary' htmlType='submit' loading={isLoading}>Submit</Button>
                </div>
            </Form>
        </div>
    </>
}