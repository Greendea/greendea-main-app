import { Avatar, Descriptions, List, Space, Tooltip, Modal, Table, Tag } from 'antd';
import { LikeOutlined, DislikeOutlined, MessageOutlined } from '@ant-design/icons';
import { FcIdea } from "react-icons/fc"
import { GrView } from "react-icons/gr"
import { HiPencilAlt } from "react-icons/hi"
import { MdList } from "react-icons/md";
import { FcInfo } from "react-icons/fc"
import React from 'react';
import moment from 'moment';
import { ParseDate } from '../../utils/dataParser';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useGetIdeasQuery } from '../../redux/apiSlicers/Idea';
import { ModalIdea } from '../Idea/IdeaModal';
import { searchColumn } from '../../utils/tableFilters';
import { exposeFilters } from '../../utils/exposeFilter';

function IdeasTopic({ topic }) {
    const [open, setOpen] = useState(false)
    const [dataIdea, setDataIdea] = useState(null)
    const [isShowIdea, setIsShowIdea] = useState(false)
    const { data: ideas, isLoading } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                isLoading,
                data: data?.filter(i => i?.Topic.id === topic.id && i.status === 1)
            }
        },
        skip: !topic.id
    })
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
                return val.length > 150 ? val.slice(0, 150) + " ..." : val
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
            },
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
        <Tooltip placement="leftTop" title="View Ideas Of Topic">
            <MdList size={22} style={{ cursor: "pointer" }} onClick={() => setOpen(true)} />
        </Tooltip>
        <Modal footer={null} open={open} onCancel={() => setOpen(false)} width={1420}>
            <Table columns={columns} dataSource={ideas} pagination={{ pageSize: 5 }} loading={isLoading} />
        </Modal>
        {
            dataIdea &&
            <ModalIdea isShowIdea={isShowIdea} setIsShowIdea={setIsShowIdea} dataIdea={ideas.find(i => i.id === dataIdea)} setDataIdea={setDataIdea} topic={topic} loading={isLoading} />
        }
    </>
}


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
                                <IdeasTopic topic={item} />

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
