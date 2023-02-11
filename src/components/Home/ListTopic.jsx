import { Avatar, Descriptions, List, Space, Tooltip } from 'antd';
import { LikeOutlined, DislikeOutlined, MessageOutlined, } from '@ant-design/icons';
import { FcIdea } from "react-icons/fc"
import { GrView } from "react-icons/gr"
import { HiPencilAlt } from "react-icons/hi"
import { MdList } from "react-icons/md";
import { FcInfo } from "react-icons/fc"
import React from 'react';

const data = Array.from({
    length: 10,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `Department ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Idea for event arrangement in 2024. Deadline: 20/12/2023',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    createdAd: "a few seconds ago",
    submitDate: "02/02/2022",
    contributor: "samsam@gmail.com"
}));

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
export default function ListTopic() {
    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={FcIdea} text="20 ideas available" key="list-vertical-like-o" />,
                            <IconText icon={GrView} text="1000 total views" key="list-vertical-view-o" />,
                            <IconText icon={LikeOutlined} text="150 total likes" key="list-vertical-like-o" />,
                            <IconText icon={DislikeOutlined} text="30 total dislikes" key="list-vertical-dislike-o" />,
                            <IconText icon={MessageOutlined} text="500 total comments" key="list-vertical-message" />,
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
                                        <div>Date Created: 20/10/2022</div>
                                        <div>Date Close Idea: 10/05/2023</div>
                                        <div>Date Close Topic: 15/05/2023</div>
                                        <div>Creator: Anderson Marley</div>
                                    </>}>
                                    <FcInfo size={36} style={{ cursor: "pointer" }} />
                                </Tooltip>

                            </div>
                        }
                    >
                        <List.Item.Meta

                            avatar={<Avatar src={item.avatar} />}
                            title={
                                <>
                                    <a href={item.href}
                                    >{item.title}</a>
                                    <span style={{
                                        marginLeft: 10,
                                        fontWeight: "lighter",
                                        fontSize: 12
                                    }}>
                                        {item.createdAd}
                                    </span>
                                </>
                            }
                            description={
                                <span>
                                    {item.description}
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}
