import { useAddCommentMutation, useGetCommentByIdeaQuery } from '@/redux/apiSlicers/Comment';
import { useUpsertReactMutation } from '@/redux/apiSlicers/Reaction';
import { useAddViewMutation } from '@/redux/apiSlicers/View';
import { ParseDate } from '@/utils/dataParser';
import { validateMessages } from '@/utils/validateMessage';
import { Comment } from '@ant-design/compatible';
import { DislikeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Descriptions, Divider, Modal, Skeleton, Space, Tooltip, message, Spin, Form, Input, Empty } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { GrView } from 'react-icons/gr';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

export const ModalIdea = ({ isShowIdea, setIsShowIdea, dataIdea, setDataIdea, topic, loading }) => {
    const [upsertReact, { isLoading: loadingHandleReaction }] = useUpsertReactMutation()
    const [addView] = useAddViewMutation()
    const { id: userId } = useSelector(state => state.user)
    const handleLike = (state) => {
        upsertReact({
            idea: dataIdea.id,
            status: state ? 0 : 1
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
            status: state ? 0 : -1
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
    }, [])

    const [form] = Form.useForm()
    const [addComment, { isLoading: loadingAddComment }] = useAddCommentMutation()



    return (
        <Modal
            style={{ top: 10 }}
            width={1080}
            open={isShowIdea}
            closable={false}
            onCancel={() => { setDataIdea(null); setIsShowIdea(false) }}
            footer={[
                <Button key="comment" type='primary' loading={loadingAddComment}
                    onClick={() => {
                        form.submit()
                    }}>Send Comment</Button>,
                <Button key="close" onClick={() => { setDataIdea(null); setIsShowIdea(false) }}>Close</Button>
            ]}
        >
            <Spin spinning={loading || loadingHandleReaction}>
                <Descriptions title="IDEA DESCRIPTION" bordered column={3}
                    // contentStyle={{ width: "80%" }}
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
                {dataIdea.id && <CommentList idea={dataIdea.id} />}
                {dataIdea.id && <CommentForm form={form} idea={dataIdea.id} addComment={addComment} />}

            </Spin>
        </Modal >
    )
}

function CommentList({ idea }) {
    const { data, isLoading } = useGetCommentByIdeaQuery(idea)
    console.log("DDDDDDDDDDDDdd", data)
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
                        content={item.content}
                        avatar={item.User.image}
                        author={item.User.name}
                        dateCreated={item.createdAt}
                        isAnomyous={item.isAnomyous}
                    />
                })}
            </InfiniteScroll>
        </Spin>
    </div >
}



function CommentForm({ form, idea, addComment }) {
    const handleFinish = (values) => {
        addComment({
            ...values,
            idea
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
            avatar={<Avatar src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />}
            content={
                <>
                    <Form form={form} onFinish={handleFinish} validateMessages={validateMessages} style={{ marginBottom: -30 }}>
                        <Form.Item name="content" rules={[{ required: true, min: 10 }]}>
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Form>
                </>
            } />
    </div >
}



const CommentIdeas = (
    {
        author = "Anomyous",
        avatar = "https://api-private.atlassian.com/users/3ed7bde5a8c78e8d0d38eca297f62495/avatar",
        content = "",
        dateCreated,
        isAnomyous,
        children
    }) => {
    return <Comment
        // actions={[
        //     <Tooltip key="comment-basic-like" title="Like">
        //         <span>
        //             <LikeOutlined />
        //             <span className="comment-action" style={{ marginLeft: 6 }}>{11}</span>
        //         </span>
        //     </Tooltip>,
        //     <Tooltip key="comment-basic-dislike" title="Dislike">
        //         <span>
        //             <DislikeOutlined />
        //             <span className="comment-action" style={{ marginLeft: 6 }}>{1}</span>
        //         </span>
        //     </Tooltip>,
        //     <span key="comment-nested-reply-to">Reply to</span>]}
        // ac
        author={<a>{isAnomyous ? "ANOMYOUS" : author}</a>}
        avatar={<Avatar src={isAnomyous ? "/avatar.png" : avatar} alt="Avatar" />}
        content={
            <p>
                {content}
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