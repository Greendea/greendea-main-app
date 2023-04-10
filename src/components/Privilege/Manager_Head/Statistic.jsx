import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Tooltip } from 'antd';
import { useGetIdeasQuery } from "../../../redux/apiSlicers/Idea"
import moment from 'moment';
import { useGetTopicsQuery } from '../../../redux/apiSlicers/Topic';

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
            <p>
                Most available popular ideas
            </p>
        </div>
    )
}
