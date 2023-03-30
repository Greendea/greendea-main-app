import { Space, Table, Tag } from "antd";
import { DislikeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { ModalIdea } from "./IdeaModal";
import { useGetIdeasQuery } from "../../redux/apiSlicers/Idea";
import React, { useState } from "react";
import { ParseDate } from "../../utils/dataParser";
import { GrView } from "react-icons/gr";
import { searchColumn } from "../../utils/tableFilters";
import { exposeFilters } from "../../utils/exposeFilter";

export const IconText = ({ icon, text }) => (
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
                data: data?.filter(i => i?.Topic.id === topic.id && i.status === 1)
            }
        },
        skip: !topic.id
    })
    const [isShowIdea, setIsShowIdea] = useState(false)
    const [dataIdea, setDataIdea] = useState(null)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const searchFeature = (dataIndex) => {
        return searchColumn({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
    }
    const columns = [
        {
            title: 'Idea',
            dataIndex: 'content',
            key: 'content',
            width: "35%",
            render: (val) => {
                return val.length > 200 ? val.slice(0, 200) + " ..." : val
            },
            ...searchFeature("content")
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: 'Category',
            width: "11%",
            render: (val) => {
                return val?.name
            },
            filters: ideas && exposeFilters(ideas.map(item => item.Category ? item.Category.name : "")),
            onFilter: (value, record) => {
                if (value !== '') {
                    return record.Category?.name.includes(value.toString())
                } else {
                    return !record.Category
                }
            }

        },
        {
            title: 'Submittor',
            dataIndex: 'User',
            key: 'User',
            width: "12%",
            render: (value, record) => {
                return record.isAnomyous ? "ANOMYOUS" : value?.name
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "12%",
            render: (val) => {
                return ParseDate(val)
            }
        },
        {
            title: "Reaction",
            dataIndex: 'reaction',
            key: 'reaction',
            width: "20%",
            render: (value, record) => (
                <Space size="middle">
                    <IconText icon={GrView} text={record.views.length} key="list-vertical-view-o" />
                    <IconText icon={LikeOutlined} text={record?.reacts.filter(i => i?.status === 1).length} key="list-vertical-like-o" />
                    <IconText icon={DislikeOutlined} text={record?.reacts.filter(i => i?.status === -1).length} key="list-vertical-dislike-o" />
                    <IconText icon={MessageOutlined} text={record?.comments.length} key="list-vertical-message" />
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
                        setDataIdea(record.id)
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
            <ModalIdea isShowIdea={isShowIdea} setIsShowIdea={setIsShowIdea} dataIdea={ideas.find(i => i.id === dataIdea)} setDataIdea={setDataIdea} topic={topic} loading={isLoading} />
        }
    </>
};