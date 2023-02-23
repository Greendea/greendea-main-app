import {
    Form,
    Input,
    message,
    Button,
    DatePicker,
} from 'antd';


const Topic = () => {
    const onFormLayoutChange = () => {
    };

    return (
        <div style={{ maxWidth: 1080, margin: "50px auto" }}>
            <h1 style={{ textAlign: "center", marginBottom: 20 }}>
                TOPIC CREATE
            </h1>
            <Form
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
                onValuesChange={onFormLayoutChange}
                size={'Large'}
                style={{
                    maxWidth: "100%",
                }}
            >
                <Form.Item label="Department">
                    <Input disabled value="Department ABC" />
                </Form.Item>
                <Form.Item label="Topic Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Idea Accept">
                    <DatePicker.RangePicker />
                </Form.Item>
                <Form.Item label="Close Date">
                    <DatePicker />
                </Form.Item>
                <div style={{ textAlign: "right" }}>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </div>
            </Form>


        </div>

    );
};
export default Topic;