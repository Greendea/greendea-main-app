import { Space, Table, Tag } from "antd";
import { DislikeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { ModalIdea } from "./IdeaModal";
import { useGetIdeasQuery } from "@/redux/apiSlicers/Idea";
import React, { useState } from "react";
import { ParseDate } from "@/utils/dataParser";
import { GrView } from "react-icons/gr";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


export const ExpandedIdeaRender = ({ topic }) => {
    const { data: ideas, isLoading } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                isLoading,
                data: data?.filter(i => i?.Topic.id === topic.id)
            }
        },
        skip: !topic.id
    })
    const [isShowIdea, setIsShowIdea] = useState(false)
    const [dataIdea, setDataIdea] = useState(null)
    const columns = [
        {
            title: 'Idea',
            dataIndex: 'content',
            key: 'content',
            width: "40%",
        },
        {
            title: 'Submittor',
            dataIndex: 'User',
            key: 'User',
            width: "15%",
            render: (value, record) => {
                return record.isAnomyous ? "ANOMYOUS" : value?.name
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "15%",
            render: (val) => {
                return ParseDate(val)
            }
        },
        {
            title: "Reaction",
            dataIndex: 'reaction',
            key: 'reaction',
            width: "20%",
            render: () => (
                <Space size="middle">
                    <IconText icon={GrView} text="1000" key="list-vertical-view-o" />
                    <IconText icon={LikeOutlined} text="150" key="list-vertical-like-o" />
                    <IconText icon={DislikeOutlined} text="30" key="list-vertical-dislike-o" />
                    <IconText icon={MessageOutlined} text="500" key="list-vertical-message" />
                </Space>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            width: "10%",
            render: (value, record) => (
                <Space size="middle">
                    <Tag color="blue" style={{ cursor: "pointer" }} onClick={() => {
                        setDataIdea(record)
                        setIsShowIdea(true)
                    }}>View Detail</Tag>
                </Space>
            ),
        },
    ];
    return <>
        <Table columns={columns} dataSource={ideas} pagination={false} loading={isLoading} />
        {
            dataIdea &&
            <ModalIdea isShowIdea={isShowIdea} setIsShowIdea={setIsShowIdea} dataIdea={dataIdea} setDataIdea={setDataIdea} topic={topic} />
        }
    </>
};