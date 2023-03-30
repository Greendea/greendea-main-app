/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useGetUserByEmailQuery, useUpdateAvatarMutation } from '../../../redux/apiSlicers/User';
import { Avatar, Button, Divider, Drawer, Form, Input, List, Space, Modal, Tooltip, message, Tag } from 'antd'
import { signOut, useSession } from 'next-auth/react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useGetIdeasQuery, useGetPersonalIdeasQuery } from '../../../redux/apiSlicers/Idea';
import { ModalIdea } from '../../Idea/IdeaModal';
import { useGetTopicsQuery } from '../../../redux/apiSlicers/Topic';

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
            <Drawer placement="right" onClose={onClose} open={open} width={380}
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
                <Activities />
            </Drawer>



        </>
    )
}

function Activities() {
    const anomyousAvatar = "https://api-private.atlassian.com/users/3ed7bde5a8c78e8d0d38eca297f62495/avatar"
    const { data: session } = useSession()
    const [loadMore, setLoadMore] = useState(0)
    const { data: activities, isLoading: isLoadingGetPersonal } = useGetPersonalIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                data: data?.map(({ id, Topic, reacts, comments }) => {
                    let temp = []
                    reacts.forEach(({ User, status, createdAt, updatedAt }) => {
                        temp.push({
                            user: User,
                            isAnomyous: false,
                            type: status,
                            createdAt,
                            updatedAt,
                            ideaId: id,
                            topicId: Topic.id
                        })
                    })

                    comments.forEach(({ User, isAnomyous, createdAt, updatedAt }) => {
                        temp.push({
                            user: User,
                            isAnomyous,
                            type: "comment",
                            createdAt,
                            updatedAt,
                            ideaId: id,
                            topicId: Topic.id
                        })
                    })

                    return temp
                }).flat().filter(({ user }) => user.email !== session.user.email),
                isLoading
            }
        },
        skip: session?.user?.email ? false : true
    })

    const action = {
        1: "liked",
        "-1": "disliked",
        "comment": "commented on"
    }
    return <>
        <List
            dataSource={activities?.slice(0, 5 + loadMore * 5)}
            renderItem={atv => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={atv.isAnomyous ? anomyousAvatar : atv.user.image} />}
                        description={<>
                            {
                                <div style={{ fontSize: 12 }}>
                                    <b>
                                        {atv.isAnomyous ? "Someone " : `${atv.user.name} `}
                                    </b>
                                    <span>
                                        {`${action[atv.type]} your `}
                                    </span>
                                    <ShowIdea ideaId={atv.ideaId} topicId={atv.topicId} />
                                </div>
                            }
                        </>}
                    />
                </List.Item>
            )}
        />
        {
            activities.length > (5 + loadMore * 5) &&
            <div style={{ textAlign: "center", cursor: "pointer" }}>
                <Tag style={{ padding: "5px 15px" }} onClick={() => setLoadMore(prev => prev + 1)}>More</Tag>
            </div>
        }
    </>
}

function ShowIdea({ ideaId, topicId }) {
    const { data: ideas, isLoading } = useGetIdeasQuery()
    const { data: topics } = useGetTopicsQuery()

    const [isShowIdea, setIsShowIdea] = useState(false)
    const [dataIdea, setDataIdea] = useState(null)
    return <>
        <b style={{ cursor: "pointer" }} onClick={() => { setDataIdea(ideaId); setIsShowIdea(true) }}>idea</b>
        {
            dataIdea &&
            <ModalIdea isShowIdea={isShowIdea} setIsShowIdea={setIsShowIdea} dataIdea={ideas.find(i => i.id === dataIdea)} setDataIdea={setDataIdea}
                topic={topics.find(i => i.id === topicId)} loading={isLoading} />
        }
    </>
}
