import { Avatar, Button, Divider, Drawer, Form, Input, List, Space, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'

export default function AvatarDrawer() {
    const [form] = Form.useForm()
    // useEffect(() => {
    //     form.setFieldValue("email", "email@gmail.com")
    // }, [])

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const data = [
        'You liked the comment lorem is pul...',
        'You disliked the comment lorem is pul...',
        'You commented on idea "dsaddsasddd"',
        'Man commented on comment "dsa gdgfd"',
        'Los Angeles battles huge wildfires.',
        'You liked the comment lorem is pul...',
        'You disliked the comment lorem is pul...',
        'You commented on idea "dsaddsasddd"',
        'Man commented on comment "dsa gdgfd as"',
        'Los Angeles battles huge wildfires.',
    ];

    return (
        <>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                onClick={showDrawer}
                className="avatar"
                style={{
                    position: "absolute",
                    right: 50,
                    top: 15,
                    cursor: "pointer"
                }} />
            <Drawer placement="right" onClose={onClose} open={open} width={360}
                extra={
                    <Space>
                        <Button onClick={onClose} type="default">Cancel</Button>
                        <Button onClick={onClose} danger>Logout</Button>
                        <Button onClick={onClose} type="primary">
                            Save Changes
                        </Button>
                    </Space>
                }
            >
                <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
                    <Form.Item label="Email" name="email">
                        <Input type="text" defaultValue="phamcaosang@gmail.com" disabled />
                    </Form.Item>
                    <Form.Item label="Department" name="department">
                        <Input type="text" defaultValue="Department A" disabled />
                    </Form.Item>
                    <Form.Item label="Username" name="username">
                        <Input type="text" defaultValue="phamcaosang135" />
                    </Form.Item>
                    <Form.Item label="Avatar" name="avatar">
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        // beforeUpload={beforeUpload}
                        // onChange={handleChange}
                        >
                            + Upload
                        </Upload>
                    </Form.Item>
                </Form>
                <Divider>
                    Activities
                </Divider>
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <a>
                                {item}
                            </a>
                        </List.Item>
                    )}
                />
            </Drawer>



        </>
    )
}
