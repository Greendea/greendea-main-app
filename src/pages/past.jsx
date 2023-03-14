import { useGetPersonalIdeasQuery } from "@/redux/apiSlicers/Idea";
import { ParseDate } from "@/utils/dataParser";
import { Divider, Table, Tag } from "antd";
import Head from "next/head";
import Layout from "../components/Layout/Index"


export default function Past() {
    const { data, isLoading } = useGetPersonalIdeasQuery()
    const columns = [
        {
            title: 'Department',
            dataIndex: 'Topic',
            key: 'Topic',
            width: "10%",
            render: (val) => {
                return val?.Department.name
            }
        },
        {
            title: 'Topic',
            dataIndex: 'Topic',
            key: 'Topic',
            width: "15%",
            render: (val) => {
                return val?.name
            }
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: 'Category',
            width: "10%",
            render: (val) => {
                return val?.name
            }
        },
        {
            title: 'Idea',
            dataIndex: 'content',
            key: 'content',
            width: "45%",
        },
        {
            title: 'Anomyous',
            dataIndex: 'User',
            key: 'User',
            width: "5%",
            render: (value, record) => {
                return record.isAnomyous ? "YES" : "NO"
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "10%",
            render: (val) => {
                return ParseDate(val)
            }
        },
        {
            title: 'Status',
            dataIndex: 'operation',
            key: 'operation',
            width: "5%",
            render: (value, record) => (
                <>
                    {/* <Tag color="cyan" style={{ cursor: "pointer" }} onClick={() => {
                    }}>VIEW</Tag> */}
                    {record.status === 1 && <Tag color="blue" style={{ cursor: "pointer" }}>ACCEPTED</Tag>}
                    {record.status === -1 && <Tag color="red" style={{ cursor: "pointer" }}>REJECTED</Tag>}
                    {record.status === 0 && <Tag style={{ cursor: "pointer" }}>PENDING</Tag>}

                </>
            ),
        },
    ];
    console.log(data)
    return (
        <Layout>
            <Head>
                <title>GreenDea - Your Ideas</title>
            </Head>
            <div className="past">
                <Divider>
                    <span style={{ fontSize: 24 }}>
                        YOUR IDEAS
                    </span>
                </Divider>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 10 }}
                    loading={isLoading}
                />
            </div>
        </Layout>
    );
};
