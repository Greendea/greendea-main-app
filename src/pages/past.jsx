import { useGetPersonalIdeasQuery } from "@/redux/apiSlicers/Idea";
import { ParseDate } from "@/utils/dataParser";
import { Divider, Table, Tag } from "antd";
import Layout from "../components/Layout/Index"


const Past = () => {
    const { data, isLoading } = useGetPersonalIdeasQuery()
    const columns = [
        {
            title: 'Department',
            dataIndex: 'Topic',
            key: 'Topic',
            width: "15%",
            render: (val) => {
                return val?.Department.name
            }
        },
        {
            title: 'Topic',
            dataIndex: 'Topic',
            key: 'Topic',
            width: "25%",
            render: (val) => {
                return val?.name
            }
        },
        {
            title: 'Idea',
            dataIndex: 'content',
            key: 'content',
            width: "25%",
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
            width: "15%",
            render: (val) => {
                return ParseDate(val)
            }
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            width: "20%",
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
            <div style={{ maxWidth: 1580, margin: "50px auto" }}>
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
export default Past;