import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import dynamic from "next/dynamic";
import { AiOutlineComment } from "react-icons/ai";
import { HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi";
import { MdOutlineCategory, MdOutlineTopic } from "react-icons/md"
import { useState, useEffect } from "react"


function AggGroupCount() {
    function ColWrapper({ children }) {
        return <Col xs={{ span: 12 }} sm={{ span: 6 }} xxl={{ span: 3 }}>
            <Card bordered={false}>
                {children}
            </Card>
        </Col>
    }
    return <Row gutter={[16, 16]}>
        <ColWrapper>
            <Statistic title="USERS" value={100} prefix={<HiOutlineUsers />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="TOPICS" value={20} prefix={<MdOutlineTopic />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="CATEGORY" value={10} prefix={<MdOutlineCategory />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="TOPICS" value={20} prefix={<MdOutlineTopic />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="DEPARTMENTS" value={3} prefix={<HiOutlineUserGroup />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="LIKES" value={1128} prefix={<LikeOutlined />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="DISLIKES" value={1128} prefix={<DislikeOutlined />} />
        </ColWrapper>
        <ColWrapper>
            <Statistic title="COMMENTS" value={1128} prefix={<AiOutlineComment />} />

        </ColWrapper>
    </Row >
}

function DepartmentStats() {
    function LeftChart() {

        const Radar = dynamic(() => import('@ant-design/plots').then(({ Radar }) => Radar), { ssr: false, });
        const [data, setData] = useState([]);


        useEffect(() => {
            asyncFetch();
        }, []);

        const asyncFetch = () => {
            fetch('https://gw.alipayobjects.com/os/antfincdn/svFjSfJkYy/radar.json')
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch((error) => {
                    console.log('fetch data failed', error);
                });
        };
        const config = {
            data,
            xField: 'item',
            yField: 'score',
            seriesField: 'user',
            meta: {
                score: {
                    alias: '分数',
                    min: 0,
                    max: 80,
                },
            },
            xAxis: {
                line: null,
                tickLine: null,
                grid: {
                    line: {
                        style: {
                            lineDash: null,
                        },
                    },
                },
            },
            point: {
                size: 2,
            },
        };

        return <Radar {...config} />

    }

    function RightChart() {
        const Gauge = dynamic(() => import('@ant-design/plots').then(({ Gauge }) => Gauge), { ssr: false, });

        const config = {
            percent: 0.75,
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
        return <Gauge {...config} />;
    }
    return <Row gutter="16">
        <Col span={24} lg={{ span: 12 }}>
            <Card bordered={false}>
                <LeftChart />
            </Card>
        </Col>
        <Col span={24} lg={{ span: 12 }}>
            <Card bordered={false}>
                <RightChart />
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
