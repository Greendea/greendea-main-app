import { ParseDate } from '@/utils/dataParser';
import { Comment } from '@ant-design/compatible';
import { DislikeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Descriptions, Divider, Modal, Skeleton, Space, Tooltip, message } from 'antd';
import { GrView } from 'react-icons/gr';
import InfiniteScroll from 'react-infinite-scroll-component';

export const ModalIdea = ({ isShowIdea, setIsShowIdea, dataIdea, setDataIdea, topic }) => {
    const handleLike = () => {
        message.open({
            content: "You liked the Idea",
            icon: <LikeOutlined style={{ color: "blue" }} />
        })
    }
    const handleDislike = () => {
        message.open({
            content: "You disliked the Idea",
            icon: <DislikeOutlined style={{ color: "red" }} />
        })
    }


    return <Modal
        style={{ top: 10 }}
        width={960}
        open={isShowIdea}
        closable={false}
        footer={[
            <Button key="close" onClick={() => { setDataIdea(null); setIsShowIdea(false) }}>Close</Button>,
        ]}
    >
        <Descriptions title="IDEA DESCRIPTION" bordered column={1} contentStyle={{ width: "80%" }}
            extra={
                <Space size="large">
                    <Space key="view">
                        <GrView title='view' />{1000}
                    </Space>
                    <Space key="like">
                        <LikeOutlined title='like' style={{ cursor: "pointer", color: "blue" }} onClick={handleLike} />{150}
                    </Space>
                    <Space key="dislike">
                        <DislikeOutlined title='dislike' style={{ cursor: "pointer", color: "red" }} onClick={handleDislike} />{30}
                    </Space>
                    <Space key="message">
                        <MessageOutlined title='comment' />{500}
                    </Space>
                </Space>
            }
        >
            <Descriptions.Item label="Topic">{topic.name}</Descriptions.Item>
            <Descriptions.Item label="Content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, temporibus consequatur accusamus, exercitationem atque a fuga ab corrupti expedita similique, sit numquam dolorem harum! Ipsum culpa dolores exercitationem sunt cum?</Descriptions.Item>
            <Descriptions.Item label="Submitor">{dataIdea.isAnomyous ? "ANOMYOUS" : dataIdea.User.name}</Descriptions.Item>
            <Descriptions.Item label="Date Submit">{ParseDate(dataIdea.createdAt)}</Descriptions.Item>
        </Descriptions>
        <div
            id="scrollableDiv"
            style={{
                height: `calc(100vh - 450px)`,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
                borderRadius: "10px 0 0 10px",
                marginTop: 20
            }}
        >
            <InfiniteScroll
                // dataLength={data.length}
                dataLength={3}
                // next={loadMoreData}
                // hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                {Array(10).fill(<CommentIdea content={"lLorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, temporibus consequatur accusamus,Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, temporibus consequatur accusamus,Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, temporibus consequatur accusamus,"} />)}
            </InfiniteScroll>
        </div>

    </Modal >
}

const CommentIdea = (
    {
        author = "Anomyous",
        avatar = "https://api-private.atlassian.com/users/3ed7bde5a8c78e8d0d38eca297f62495/avatar",
        content = "",
        dateCreated,
        children
    }) => {
    return <Comment
        actions={[
            <Tooltip key="comment-basic-like" title="Like">
                <span>
                    <LikeOutlined />
                    <span className="comment-action" style={{ marginLeft: 6 }}>{11}</span>
                </span>
            </Tooltip>,
            <Tooltip key="comment-basic-dislike" title="Dislike">
                <span>
                    <DislikeOutlined />
                    <span className="comment-action" style={{ marginLeft: 6 }}>{1}</span>
                </span>
            </Tooltip>,
            <span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>{author}</a>}
        avatar={<Avatar src={avatar} alt="Avatar" />}
        content={
            <p>
                {content}
            </p>
        }
        datetime={
            <Tooltip title={ParseDate(dateCreated)}>
                <span>8 hours ago</span>
            </Tooltip>
        }
    >
        {children}
    </Comment>
}