import { useAddCommentMutation, useDeleteCommentMutation, useGetCommentByIdeaQuery } from '../../redux/apiSlicers/Comment';
import { useUpsertReactMutation } from '../../redux/apiSlicers/Idea';
import { useAddViewMutation } from '../../redux/apiSlicers/View';
import { ParseDate } from '../../utils/dataParser';
import { MdDeleteForever } from "react-icons/md"
import { validateMessages } from '../../utils/validateMessage';
import { Comment } from '@ant-design/compatible';
import { DislikeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Descriptions, Divider, Modal, Skeleton, Space, Tooltip, message, Spin, Form, Input, Empty, Checkbox, Popconfirm } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GrView } from 'react-icons/gr';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

export const ModalIdea = ({ isShowIdea, setIsShowIdea, dataIdea, setDataIdea, topic, loading }) => {
    const [upsertReact, { isLoading: loadingHandleReaction }] = useUpsertReactMutation()
    const [addView] = useAddViewMutation()
    const [commentAnomyous, setCommentAnomyous] = useState(false)
    const { id: userId } = useSelector(state => state.user)
    const handleLike = (state) => {
        upsertReact({
            idea: dataIdea.id,
            status: state ? 0 : 1,
            userId: userId
        }).then(res => {
            !state && message.open({
                content: <>You liked the Idea</>,
                icon: <LikeOutlined style={{ color: "blue" }} />
            })
        }).catch(err => {
            console.log(err)
            message.error("Something went wrong, try later!")
        })
    }
    const handleDislike = (state) => {
        upsertReact({
            idea: dataIdea.id,
            status: state ? 0 : -1,
            userId: userId
        }).then(res => {
            !state && message.open({
                content: "You disliked the Idea",
                icon: <DislikeOutlined style={{ color: "red" }} />
            })
        }).catch(err => {
            console.log(err)
            message.error("Something went wrong, try later!")
        })
    }

    useEffect(() => {
        if (!dataIdea.views.map(i => i.userId).includes(userId)) {
            addView({
                idea: dataIdea.id
            })
        }
    }, [addView, dataIdea?.id, dataIdea?.views, userId])

    const [form] = Form.useForm()
    const [addComment, { isLoading: loadingAddComment }] = useAddCommentMutation()



    return (
        <Modal
            style={{ top: 10 }}
            width={1080}
            open={isShowIdea}
            closable={false}
            onCancel={() => { setDataIdea(null); setIsShowIdea(false) }}
            footer={
                <>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Checkbox onChange={({ target }) => { setCommentAnomyous(target.checked) }} checked={commentAnomyous}>Anomyously</Checkbox>
                        <div>
                            <Button key="comment" type='primary' loading={loadingAddComment}
                                disabled={moment(topic.closureDateTopic).diff(moment(), "hours") < 0}
                                onClick={() => {
                                    form.submit()
                                }}>Send Comment</Button>
                            <Button key="close" onClick={() => { setDataIdea(null); setIsShowIdea(false) }}>Close</Button>
                        </div>
                    </div>
                </>
            }
        >
            <Spin spinning={loading || loadingHandleReaction}>
                <Descriptions title="IDEA DESCRIPTION" bordered column={{ xs: 1, sm: 1, xl: 3 }}
                    layout={window?.innerWidth < 700 ? "vertical" : "horizontal"}
                    extra={
                        <Space size="large">
                            <Space key="view">
                                <GrView title='view' />{dataIdea.views.length}
                            </Space>
                            <Space key="like">
                                <LikeOutlined title='like'
                                    style={{
                                        cursor: "pointer",
                                        color: dataIdea.reacts.find(i => i.userId === userId && i.status === 1) ? "blue" : "gray"
                                    }}
                                    onClick={() => handleLike(!!dataIdea.reacts.find(i => i.userId === userId && i.status === 1))} />
                                {dataIdea.reacts.filter(i => i.status === 1).length}
                            </Space>
                            <Space key="dislike">
                                <DislikeOutlined title='dislike' style={{
                                    cursor: "pointer",
                                    color: dataIdea.reacts.find(i => i.userId === userId && i.status === -1) ? "red" : "gray"
                                }} onClick={() => handleDislike(!!dataIdea.reacts.find(i => i.userId === userId && i.status === -1))} />
                                {dataIdea.reacts.filter(i => i.status === -1).length}
                            </Space>
                            <Space key="message">
                                <MessageOutlined title='comment' />{dataIdea.comments.length}
                            </Space>
                        </Space>
                    }
                >
                    <Descriptions.Item label="Topic" span={3}>{topic.name}</Descriptions.Item>
                    <Descriptions.Item label="Category">{dataIdea.Category.name}</Descriptions.Item>
                    <Descriptions.Item label="Submitor">{dataIdea.isAnomyous ? "ANOMYOUS" : dataIdea.User.name}</Descriptions.Item>
                    <Descriptions.Item label="Date Submit">{ParseDate(dataIdea.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label="Content" span={3}>{dataIdea.content}</Descriptions.Item>
                </Descriptions>
                {(dataIdea.id && topic) && <CommentList idea={dataIdea.id} department={topic.Department} />}
                {dataIdea.id && <CommentForm
                    ideaCreator={dataIdea.User}
                    disableComment={moment(topic.closureDateTopic).diff(moment(), "hours") < 0}
                    form={form} idea={dataIdea} addComment={addComment} commentAnomyous={commentAnomyous} />}

            </Spin>
        </Modal >
    )
}

function CommentList({ idea, department }) {
    const { data, isLoading } = useGetCommentByIdeaQuery(idea)
    return <div
        id="scrollableDiv"
        style={{
            height: `calc(100vh - 480px)`,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
            borderRadius: "10px 0 0 10px",
            marginTop: 20
        }}
    >
        <Spin spinning={isLoading}>
            <InfiniteScroll
                // dataLength={data.length}
                dataLength={3}
                // next={loadMoreData}
                // hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                {data?.length === 0 && <div style={{ marginTop: 100 }}><Empty description={"No comment found"} /></div>}
                {data?.map(item => {
                    return <CommentIdeas key={item.id}
                        department={department}
                        id={item.id}
                        content={item.content}
                        avatar={item.User?.image}
                        author={item.User?.name}
                        dateCreated={item.createdAt}
                        isAnomyous={item.isAnomyous}
                    />
                })}
            </InfiniteScroll>
        </Spin>
    </div >
}



function CommentForm({ form, idea, addComment, commentAnomyous, disableComment, ideaCreator }) {
    const { image, name, email } = useSelector(state => state.user)
    const handleFinish = (values) => {
        addComment({
            ...values,
            isAnomyous: commentAnomyous,
            idea: idea.id,
            email_service: {
                comment: values.content,
                commenter: name,
                isAnomyous: commentAnomyous,
                recipients: ideaCreator.email === email ? [] : [ideaCreator.email],
                idea: idea.content
            }
        }).unwrap().then(res => {
            message.success("Message sent!")
            form.resetFields()
        }).catch(err => {
            console.log(err)
            message.error("something went wrong, try later!")
        })
    }
    return < div >
        <Comment
            avatar={<Avatar src={image} alt="Avatar" />}
            content={
                <>
                    <Form form={form} onFinish={handleFinish} validateMessages={validateMessages} style={{ marginBottom: -30 }}>
                        <Form.Item name="content" rules={[{ required: true, min: 10 }]}>
                            <Input.TextArea rows={3} disabled={disableComment} />
                        </Form.Item>
                    </Form>
                </>
            } />
    </div >
}


function DeleteComment({ comment, department }) {
    const [deleteComment] = useDeleteCommentMutation()
    const confirm = () => {
        deleteComment({
            id: comment,
            department: department
        }).unwrap().then(_ => {
            message.success("Comment deleted")
        }).catch(_ => message.error("Failed to delete comment"))
    };
    return <>
        <Popconfirm
            placement="topLeft"
            title={"Confirm Delete"}
            description={"Are you sure to delete this comment"}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
            <MdDeleteForever style={{ position: "absolute", right: 0, top: "50%", fontSize: 24, cursor: "pointer" }} />

        </Popconfirm>
    </>
}

const CommentIdeas = (
    {
        id,
        department,
        author = "Anomyous",
        avatar = "https://api-private.atlassian.com/users/3ed7bde5a8c78e8d0d38eca297f62495/avatar",
        content = "",
        dateCreated,
        isAnomyous,
        children
    }) => {
    const { role, department: userDepartment } = useSelector(state => state.user)
    return <Comment
        author={<a>{isAnomyous ? "ANOMYOUS" : author}</a>}
        avatar={<Avatar src={isAnomyous ? "/avatar.png" : avatar} alt="Avatar" />}
        content={
            <p style={{ position: "relative" }}>
                {content}
                {
                    role?.name === "admin" &&
                    <DeleteComment comment={id} department={department.id} />
                }

                {
                    (["manager", "head"].includes(role?.name) && department?.id === userDepartment?.id) &&
                    <DeleteComment comment={id} department={department.id} />
                }
            </p>
        }
        datetime={
            <Tooltip title={ParseDate(dateCreated)}>
                <span>{moment(dateCreated).fromNow()}</span>
            </Tooltip>
        }
    >
        {children}
    </Comment>
}