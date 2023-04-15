import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import dynamic from "next/dynamic";
import prisma from "../../../lib/prisma"
import { AiOutlineComment } from "react-icons/ai";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi";
import { MdOutlineCategory, MdOutlineTopic } from "react-icons/md"
import { useState, useEffect } from "react"
import { useGetUsersQuery } from "../../../redux/apiSlicers/User";
import { useGetCategoriesQuery } from "../../../redux/apiSlicers/Category";
import { useGetTopicsQuery } from "../../../redux/apiSlicers/Topic";
import { useGetIdeasQuery } from "../../../redux/apiSlicers/Idea";
import { useGetDepartmentsQuery } from "../../../redux/apiSlicers/Department";
import { useGetOnlineUsersQuery } from "../../../redux/apiSlicers/_index";


function AggGroupCount() {
    const { users } = useGetUsersQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                users: data?.length
            }
        }
    })
    const { categories } = useGetCategoriesQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                categories: data?.length
            }
        }
    })
    const { topics } = useGetTopicsQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                topics: data?.length
            }
        }
    })

    const { ideas } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                ideas: data?.length
            }
        }
    })

    const { departments } = useGetDepartmentsQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                departments: data?.length
            }
        }
    })
    function ColWrapper({ children }) {
        return <Col xs={{ span: 12 }} sm={{ span: 6 }} xxl={{ span: 3 }}>
            <Card bordered={false}>
                {children}
            </Card>
        </Col>
    }
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [comments, setComments] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            fetch(`${process.env.BE_URL}api/dashboard?type=1`).then(res => res.json()).then(({ reacts, commentData }) => {
                setLikes(reacts?.filter(i => i.status === 1).length)
                setDislikes(reacts?.filter(i => i.status === -1).length)
                setComments(commentData?.length)
            })
        }
        fetchData()
    }, [])

    return <Row gutter={[16, 16]}>
        <ColWrapper>
            <Statistic title="USERS" value={users} prefix={<HiOutlineUsers />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="TOPICS" value={topics} prefix={<MdOutlineTopic />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="CATEGORY" value={categories} prefix={<MdOutlineCategory />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="IDEAS" value={ideas} prefix={<MdOutlineTopic />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="DEPARTMENTS" value={departments} prefix={<HiOutlineUserGroup />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="LIKES" value={likes} prefix={<LikeOutlined />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="DISLIKES" value={dislikes} prefix={<DislikeOutlined />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="COMMENTS" value={comments} prefix={<AiOutlineComment />} />

        </ColWrapper>
    </Row >
}

function LeftChart({ Bar }) {
    const { data: departments, isSuccess } = useGetDepartmentsQuery(undefined, {
        selectFromResult: ({ data, isSuccess }) => {
            return {
                data: data?.map(dpm => {
                    return {
                        item: dpm.name,
                        ideas: dpm.topics.map(tp => tp.ideas.length).reduce((a, b) => a + b, 0)
                    }
                }),
                isSuccess
            }
        },
    })
    const [conf, setConf] = useState({})
    useEffect(() => {
        if (isSuccess) {
            console.log(isSuccess)
            setConf({
                data: departments,
                xField: 'ideas',
                yField: 'item',
                seriesField: 'item',
                legend: {
                    position: 'top-left',
                },
                xAxis: {
                    nice: true,
                    title: {
                        text: 'Ideas',
                        style: {
                            fontSize: 16,
                        },
                    },
                }
            })
        }
    }, [isSuccess, departments])
    return <Bar {...conf} />

}

function RightChart({ Gauge }) {
    const { online_users, all_users } = useGetOnlineUsersQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                online_users: data?.online_users,
                all_users: data?.all_users
            }
        },
        pollingInterval: 2000
    })

    const config = {
        percent: online_users ? (online_users / all_users).toFixed(2) : 0,
        range: {
            color: '#30BF78',
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        axis: {
            label: {
                formatter(v) {
                    return Number(v) * 100;
                },
            },
            subTickLine: {
                count: 3,
            },
        },
        statistic: {
            content: {
                formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
                style: {
                    color: 'rgba(0,0,0,0.65)',
                    fontSize: 48,
                },
            },
        },
    };
    return <div style={{ position: "relative" }}>
        <h2 style={{ position: "absolute" }}>
            {online_users || 0} users is online
        </h2>
        <Gauge {...config} />
    </div>
}
function DepartmentStats() {
    const Bar = dynamic(() => import('@ant-design/plots').then(({ Bar }) => Bar), { ssr: false, })
    const Gauge = dynamic(() => import('@ant-design/plots').then(({ Gauge }) => Gauge), { ssr: false, });

    return <Row gutter="16">
        <Col span={24} lg={{ span: 12 }}>
            <Card bordered={false}>
                <LeftChart Bar={Bar} />
            </Card>
        </Col>
        <Col span={24} lg={{ span: 12 }}>
            <Card bordered={false}>
                <RightChart Gauge={Gauge} />
            </Card>
        </Col>
    </Row>
}
export default function StatisticPage() {

    return (
        <div style={{ marginTop: 40 }}>
            <AggGroupCount />
            <br />
            <br />
            <DepartmentStats />

        </div>
    )
}
