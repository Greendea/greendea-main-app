import React, { useState } from 'react'
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
    console.log(ideas)
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
            <p style={{ fontSize: 20, fontWeight: 500 }}>
                Exception Report
            </p>
            <Row gutter={16}>
                <Col span={24}>
                    <IdeaWithoutComment department={department} />
                </Col>
                <Col span={12}>
                    <AnomyousComment />
                </Col>
                <Col span={12}>
                    <AnomyousIdea />
                </Col>
            </Row>

        </div>
    )
}


function AnomyousIdea() {
    return (
        <>
        </>
    )
}

function AnomyousComment() {
    return (
        <>
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
