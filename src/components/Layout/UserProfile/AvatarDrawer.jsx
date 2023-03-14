import { useGetUserByEmailQuery } from '../../../redux/apiSlicers/User';
import { Avatar, Button, Divider, Drawer, Form, Input, List, Space, Typography, Upload } from 'antd'
import { signOut, useSession } from 'next-auth/react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function AvatarDrawer() {
    const { data: session, status } = useSession()
    const { data: User, isSuccess } = useGetUserByEmailQuery(session.user.email, {
        skip: session.user.email ? false : true
    })//.unwrap().then(res => console.log(res)).catch(err => console.log(err))
    const [form] = Form.useForm()
    const router = useRouter()


    useEffect(() => {
        if (isSuccess) {
            if (!User.Role) {
                router.push("waiting")
            }
            console.log(User)
            form.setFieldsValue({
                email: User?.email,
                username: User?.name,
                department: User?.Department?.name,
                role: User?.Role?.name,
            })

        }
    }, [isSuccess])

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
        'You disliked the comment lorem is pul...',
        'You commented on idea "dsaddsasddd"',
        'Man commented on comment "dsa gdgfd as"',
        'Los Angeles battles huge wildfires.',
    ];

    return (
        <>
            <Avatar src={session?.user.image}
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
                        <Button onClick={() => {
                            signOut().then(res => {
                                console.log(res)
                                onClose()
                                localStorage.clear()
                            }).catch(err => {
                                console.log(err)
                            })

                        }} danger>Logout</Button>
                        {/* <Button onClick={onClose} type="primary">
                            Save Changes
                        </Button> */}
                    </Space>
                }
            >
                <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
                    <Form.Item label="Email" name="email" colon={false}>
                        <Input type="text" disabled />
                    </Form.Item>
                    <Form.Item label="Department" name="department" colon={false}>
                        <Input type="text" disabled />
                    </Form.Item>
                    <Form.Item label="Role" name="role" colon={false}>
                        <Input type="text" disabled />
                    </Form.Item>
                    <Form.Item label="Username" name="username" colon={false}>
                        <Input type="text" disabled />
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
