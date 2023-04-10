import React, { useEffect, useState } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space, Statistic, Table, Tag, Tooltip } from 'antd';
import { useGetIdeasQuery } from "../../../redux/apiSlicers/Idea"
import moment from 'moment';
import { useGetTopicsQuery } from '../../../redux/apiSlicers/Topic';
import { IconText } from '../../Idea/ExpandedIdeaTopic';
import { ModalIdea } from '../../Idea/IdeaModal';
import { ParseDate } from '../../../utils/dataParser';
import { GrView } from "react-icons/gr";
import { DislikeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';


function ColWrapper({ children }) {
    return <Col xs={{ span: 12 }} sm={{ span: 8 }} xxl={{ span: 4 }}>
        {children}
    </Col>
}

export default function StatisticDepartment({ department }) {
    const { data: ideas } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                data: data?.filter(({ Topic }) => Topic.Department.id === department.id).map(idea => {
                    return {
                        ...idea,
                        isClosed: moment(idea.Topic.closureDateTopic).diff(moment(), "hours") < 0
                    }
                })
            }
        }
    })
    const { data: topics } = useGetTopicsQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                data: data?.map(topic => {
                    return {
                        ...topic,
                        isClosed: moment(topic.closureDateTopic).diff(moment(), "hours") < 0
                    }
                })
            }
        }
    })
    return (
        <div>
            <Row gutter={16}>
                <ColWrapper>
                    <Card bordered={false}>
                        <Statistic
                            title="Total ideas"
                            value={ideas?.filter(({ status }) => status === 1).length}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </ColWrapper>
                <ColWrapper>
                    <Card bordered={false}>
                        <Statistic
                            title="Available ideas"
                            value={ideas?.filter(({ isClosed, status }) => !isClosed && status === 1).length}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </ColWrapper>
                <ColWrapper>
                    <Card bordered={false}>
                        <Statistic
                            title="Waiting ideas"
                            value={ideas?.filter(({ status }) => status === 0).length}
                            valueStyle={{ color: '#000' }}
                        />
                    </Card>
                </ColWrapper>
                <ColWrapper>
                    <Card bordered={false}>
                        <Statistic
                            title="topics"
                            value={topics?.length}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </ColWrapper>
                <ColWrapper>
                    <Card bordered={false}>
                        <Statistic
                            title="Available topics"
                            value={topics?.filter(({ isClosed }) => !isClosed).length}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </ColWrapper>
                <ColWrapper>
                    <Tooltip placement='bottom' title={<>
                        {
                            ideas?.map(({ User }) => User.name).filter((v, i, a) => a.indexOf(v) == i).map(user => <div key={user}>{user}</div>)
                        }

                    </>}>
                        <Card bordered={false}>
                            <Statistic
                                title="Contributors"
                                value={ideas?.map(({ User }) => User.name).filter((v, i, a) => a.indexOf(v) == i).length}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Tooltip>
                </ColWrapper>
            </Row>
            <br />
            <hr />
            <p style={{ fontSize: 24, fontWeight: 500 }}>
                Exception Report
            </p>
            {
                department &&
                <Row gutter={16}>
                    <Col span={24}>
                        <IdeaWithoutComment department={department} />
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }} >
                        <AnomyousComment department={department} />
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 12 }} >
                        <AnomyousIdea />
                    </Col>
                </Row>
            }

        </div>
    )
}


function AnomyousComment({ department }) {
    const [comments, setComments] = useState([])
    const [dataIdea, setDataIdea] = useState(null)
    const [isShowIdea, setIsShowIdea] = useState(false)
    const { data: ideas, isLoading } = useGetIdeasQuery()
    useEffect(() => {
        fetch(`${process.env.BE_URL}api/dashboard?type=2&department=${department.id}`).then(res => res.json()).then(res => {
            setComments(res.data)
        })
    }, [])


    const columns = [
        {
            title: 'Comment',
            dataIndex: 'content',
            key: 'content',
            width: "50%",
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "25%",
            render: (val) => {
                return <Tooltip title={ParseDate(val)}>
                    {moment(val).fromNow()}
                </Tooltip>
            },
        },
        {
            title: 'Action',
            dataIdea: 'View Idea',
            key: 'idea',
            width: "25%",
            render: (value, record) => (
                <Space size="middle">
                    <Tag color="blue" style={{ cursor: "pointer" }} onClick={() => {
                        setDataIdea(record.Idea)
                        setIsShowIdea(true)
                    }}>View Detail</Tag>
                </Space>
            ),
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={comments} pagination={{ pageSize: 3 }}
                title={() => <div >
                    <Divider><span style={{ textAlign: "center", fontSize: 20, fontWeight: 500 }}>Anomyous Comments</span></Divider>
                </div>}
            />

            {
                (dataIdea) &&
                <ModalIdea isShowIdea={isShowIdea} setIsShowIdea={setIsShowIdea} dataIdea={ideas?.find(({ id }) => id === dataIdea.id)} setDataIdea={setDataIdea} topic={dataIdea?.Topic} loading={isLoading} />
            }
        </>
    )
}

function AnomyousIdea() {
    const [dataIdea, setDataIdea] = useState(null)
    const [isShowIdea, setIsShowIdea] = useState(false)
    const { data: ideas, isLoading } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                isLoading,
                data: data?.filter(({ isAnomyous }) => isAnomyous).map(idea => {
                    return {
                        ...idea,
                        fromNow: moment(idea.createdAt).diff(moment(), "hours"),
                        isClosed: moment(idea.Topic.closureDateTopic).diff(moment(), "hours") < 0
                    }
                }).sort((a, b) => b.fromNow - a.fromNow).sort((a, b) => a.isClosed - b.isClosed)
            }
        }
    })

    const columns = [
        {
            title: 'Idea',
            dataIndex: 'content',
            key: 'content',
            width: "50%",
            render: (val) => {
                return val.length > 50 ? val.slice(0, 50) + " ..." : val
            },

        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "25%",
            render: (val) => {
                return <Tooltip title={ParseDate(val)}>
                    {moment(val).fromNow()}
                </Tooltip>
            },
        },
        {
            title: 'Action',
            dataIdea: 'View Idea',
            key: 'idea',
            width: "25%",
            render: (value, record) => (
                <Space size="middle">
                    <Tag color="blue" style={{ cursor: "pointer" }} onClick={() => {
                        setDataIdea(record)
                        setIsShowIdea(true)
                    }}>View Detail</Tag>
                </Space>
            ),
        },
    ]
    return (
        <>
            <Table columns={columns} dataSource={ideas} pagination={{ pageSize: 3 }}
                rowClassName={(record) => record.isClosed ? "bg-black border-item" : ""}
                title={() => <div >
                    <Divider><span style={{ textAlign: "center", fontSize: 20, fontWeight: 500 }}>Anomyous Ideas</span></Divider>
                </div>}
            />

            {
                (dataIdea) &&
                <ModalIdea isShowIdea={isShowIdea} setIsShowIdea={setIsShowIdea} dataIdea={ideas?.find(({ id }) => id === dataIdea.id)} setDataIdea={setDataIdea} topic={dataIdea?.Topic} loading={isLoading} />
            }
        </>
    )
}

function IdeaWithoutComment({ department }) {
    const { data: ideas, isLoading } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                data: data.filter(({ comments }) => comments.length === 0).filter(({ Topic, status }) => Topic.Department.id === department.id && status === 1),
                isLoading
            }
        }
    })
    const [isShowIdea, setIsShowIdea] = useState(false)
    const [dataIdea, setDataIdea] = useState(null)
    const columns = [
        {
            title: 'Idea',
            dataIndex: 'content',
            key: 'content',
            width: "25%",
            render: (val) => {
                return <div style={{ width: 400, overflowWrap: "break-word", whiteSpace: "normal" }}>
                    {val.length > 200 ? val.slice(0, 200) + " ..." : val}
                </div>
            },
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: 'Category',
            width: "15%",
            render: (val) => {
                return val?.name
            },
        },
        {
            title: 'Submittor',
            dataIndex: 'User',
            key: 'User',
            width: "10%",
            render: (value, record) => {
                return record.isAnomyous ? "ANOMYOUS" : value?.name
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "20%",
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

    return (
        <>
            <Divider>
                <span style={{ fontSize: 24 }}>
                    Ideas without a comment
                </span>
            </Divider>
            <Table columns={columns} dataSource={ideas} loading={isLoading} bordered
                size='large'
                pagination={{ pageSize: 3 }}
                scroll={{ x: 1500 }}
                rowClassName={(record) => record.isClosed ? "bg-black border-item" : ""}
            />
            {
                dataIdea &&
                <ModalIdea isShowIdea={isShowIdea} setIsShowIdea={setIsShowIdea} dataIdea={ideas.find(i => i.id === dataIdea)} setDataIdea={setDataIdea} topic={ideas.find(({ id }) => id === dataIdea).Topic} loading={isLoading} />
            }
        </>
    )
}
