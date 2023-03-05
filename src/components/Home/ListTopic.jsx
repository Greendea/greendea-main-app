import { Avatar, Descriptions, List, Space, Tooltip } from 'antd';
import { LikeOutlined, DislikeOutlined, MessageOutlined, } from '@ant-design/icons';
import { FcIdea } from "react-icons/fc"
import { GrView } from "react-icons/gr"
import { HiPencilAlt } from "react-icons/hi"
import { MdList } from "react-icons/md";
import { FcInfo } from "react-icons/fc"
import React from 'react';
import moment from 'moment';
import { ParseDate } from '@/utils/dataParser';


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
export default function ListTopic({ topics }) {
    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={topics}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <IconText icon={FcIdea} text={item.noideas + " ideas available"} key="list-vertical-like-o" />,
                            <IconText icon={GrView} text={item.ideas.views + " total views"} key="list-vertical-view-o" />,
                            <IconText icon={LikeOutlined} text={item.ideas.likes + " total likes"} key="list-vertical-like-o" />,
                            <IconText icon={DislikeOutlined} text={item.ideas.dislikes + " total dislikes"} key="list-vertical-dislike-o" />,
                            <IconText icon={MessageOutlined} text={item.ideas.comments + " total comments"} key="list-vertical-message" />,
                        ]}
                        extra={
                            <div style={{ width: 50, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <Tooltip placement="leftTop" title={"Submit Idea To Topic"}>
                                    <HiPencilAlt size={36} style={{ cursor: "pointer" }} />
                                </Tooltip>
                                <Tooltip placement="leftTop" title="View Ideas Of Topic">
                                    <MdList size={36} style={{ cursor: "pointer" }} />
                                </Tooltip>
                                <Tooltip placement="leftTop" color={"cyan"}
                                    title={<>
                                        <div>Date Created: {ParseDate(item.createdAt)}</div>
                                        <div>Date Close Idea: {ParseDate(item.closureDateIdea)}</div>
                                        <div>Date Close Topic: {ParseDate(item.closureDateTopic)}</div>
                                        <div>Creator: {item.User.name}</div>
                                    </>}>
                                    <FcInfo size={36} style={{ cursor: "pointer" }} />
                                </Tooltip>

                            </div>
                        }
                    >
                        <List.Item.Meta
                            title={
                                <>
                                    <span>{item.Department.name}</span>
                                    <span style={{
                                        marginLeft: 10,
                                        fontWeight: "lighter",
                                        fontSize: 12
                                    }}>
                                        {moment(item.createdAt).fromNow()}
                                    </span>
                                </>
                            }
                            description={
                                <span>
                                    {item.name}
                                </span>
                            }
                        />
                    </List.Item>
                )
                }
            />
        </div >
    )
}
