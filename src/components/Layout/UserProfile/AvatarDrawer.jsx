/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useGetUserByEmailQuery, useUpdateAvatarMutation } from '../../../redux/apiSlicers/User';
import { Avatar, Button, Divider, Drawer, Form, Input, List, Space, Modal, Tooltip, message } from 'antd'
import { signOut, useSession } from 'next-auth/react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const imageURL = (id) => {
    return `https://api.multiavatar.com/${id}.png?apikey=iAvlWIY5UqsyrP`
}

function AvatarModal() {
    const [updateAvatar, { isLoading }] = useUpdateAvatarMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatar, setAvatar] = useState(null)
    const [avatarNumbers, setAvatarNumbers] = useState(
        Array.from({ length: 15 }, () => Math.floor(Math.random() * 1000))
    )
    const changeList = () => {
        setAvatar(null)
        setAvatarNumbers(Array.from({ length: 15 }, () => Math.floor(Math.random() * 1000)))
    }
    const handleSave = () => {
        updateAvatar(imageURL(avatar)).unwrap().then(res => {
            message.success("Avatar changed")
            setAvatar(null);
            setIsModalOpen(false)
        }).catch(err => {
            console.log(err)
            message.error("Failed to update")
        })
    }
    return <>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Change Avatar</Button>
        <Modal open={isModalOpen} closable={false} footer={
            <>
                <Button onClick={() => { setAvatar(null); setIsModalOpen(false) }}>Close</Button>
                <Button type='primary' disabled={!avatar} loading={isLoading} onClick={handleSave}>Save</Button>
            </>
        }>
            <div className='avatars'>
                {avatarNumbers.map((i, index) =>
                    <img className={i === avatar ? 'select' : 'img'}
                        key={index}
                        onClick={() => setAvatar(i)}
                        loading={"lazy"}
                        src={imageURL(i)} />
                )
                }
                <Tooltip title={"Change images"} placement="left">
                    <img className='change rotating'
                        title="Change list"
                        onClick={changeList}
                        src="https://th.bing.com/th/id/R.3954555bd65ac4e137b079ac5fbfdb30?rik=RXomAFlBTnVm8A&pid=ImgRaw&r=0" alt="" />
                </Tooltip>
            </div>
        </Modal>
    </>
}

export default function ProfileDrawer() {
    const { data: session, status } = useSession()
    const { data: User, isSuccess } = useGetUserByEmailQuery(session.user.email, {
        skip: session.user.email ? false : true
    })//.unwrap().then(res => console.log(res)).catch(err => console.log(err))
    const [form] = Form.useForm()
    const router = useRouter()
    const { image } = useSelector(state => state.user)
    console.log(image, "*****************")


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
            {
                image &&
                <Avatar src={image}
                    onClick={showDrawer}
                    className="avatar"
                    style={{
                        position: "absolute",
                        right: 50,
                        top: 15,
                        cursor: "pointer"
                    }} />
            }
            <Drawer placement="right" onClose={onClose} open={open} width={360}
                extra={
                    <Space>
                        <Button onClick={onClose} type="default">Cancel</Button>
                        <AvatarModal />

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
