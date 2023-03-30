import { Avatar, Descriptions, List, Space, Tooltip } from 'antd';
import { LikeOutlined, DislikeOutlined, MessageOutlined, } from '@ant-design/icons';
import { FcIdea } from "react-icons/fc"
import { GrView } from "react-icons/gr"
import { HiPencilAlt } from "react-icons/hi"
import { MdList } from "react-icons/md";
import { FcInfo } from "react-icons/fc"
import React from 'react';
import moment from 'moment';
import { ParseDate } from '../../utils/dataParser';
import { useRouter } from 'next/router';


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
export default function ListTopic({ topics }) {
    const router = useRouter()
    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={topics}
                renderItem={(item) => (
                    <List.Item
                        className={(moment(item.closureDateTopic).diff(moment(), "hours") < 0 && 'bg-black') + " border-item"}
                        key={item.id}
                        actions={[
                            <IconText icon={FcIdea} text={item.noideas + " ideas available"} key="list-vertical-like-o" />,
                            <IconText icon={GrView} text={item.ideas.views + " total views"} key="list-vertical-view-o" />,
                            <IconText icon={LikeOutlined} text={item.ideas.likes + " total likes"} key="list-vertical-like-o" />,
                            <IconText icon={DislikeOutlined} text={item.ideas.dislikes + " total dislikes"} key="list-vertical-dislike-o" />,
                            <IconText icon={MessageOutlined} text={item.ideas.comments + " total comments"} key="list-vertical-message" />,
                        ]}
                        extra={
                            <div style={{ width: 25, display: "flex", justifyContent: "center", flexDirection: "column", gap: 3 }}>
                                {moment(item.closureDateTopic).diff(moment(), "hours") > 0 &&
                                    <Tooltip placement="leftTop" title={"Submit Idea To Topic"} >
                                        <HiPencilAlt size={22} style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                if (moment(item.closureDateTopic).diff(moment(), "hours") > 0) {
                                                    router.push(`/idea?departmentId=${item.Department.id}&topicId=${item.id}`)
                                                }
                                            }}
                                        />
                                    </Tooltip>
                                }
                                {/* <Tooltip placement="leftTop" title="View Ideas Of Topic">
                                    <MdList size={36} style={{ cursor: "pointer" }} />
                                </Tooltip> */}
                                <Tooltip placement="leftTop" color={"cyan"}
                                    title={<>
                                        <div>Date Created: {moment(item.createdAt).format("DD/MM/YY")}</div>
                                        <div>Date Close Idea: {moment(item.closureDateIdea).format("DD/MM/YY")}</div>
                                        <div>Date Close Topic: {moment(item.closureDateTopic).format("DD/MM/YY")}</div>
                                        <div>Creator: {item.User.name}</div>
                                    </>}>
                                    <FcInfo size={22} style={{ cursor: "pointer" }} />
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
