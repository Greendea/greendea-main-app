import { useGetIdeasQuery } from '@/redux/apiSlicers/Idea';
import { ParseDate } from '@/utils/dataParser';
import { Divider, Space, Table, Tag } from 'antd'
import React from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

export default function WaitingIdea({ department }) {
    const { data, isLoading } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                isLoading,
                data: department === true ? data : data?.filter(i => i?.Topic.Department.id === department.id)
            }
        }
    })
    const columns = [
        {
            title: 'Topic',
            dataIndex: 'Topic',
            key: 'Topic',
            width: "20%",
            render: (val) => {
                return val?.name
            }
        },
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
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            width: "10%",
            render: (value, record) => (
                <Space size="middle">
                    <Tag color="cyan" style={{ cursor: "pointer" }}>VIEW</Tag>
                    <Tag color="blue" style={{ cursor: "pointer" }} icon={<AiOutlineCheck />}>ACCEPT</Tag>
                    <Tag color="red" style={{ cursor: "pointer" }} icon={<AiOutlineClose />}>REJECT</Tag>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Divider>
                <span style={{ fontSize: 24 }}>
                    Table Of Waiting Ideas
                </span>
            </Divider>
            <Table
                pagination={{ pageSize: 5 }}
                loading={isLoading}
                style={{
                    width: "100%"
                }}
                columns={columns}
                dataSource={data?.filter(i => i.status !== 1)}
                rowKey={(record) => record.id}
            />
        </>
    )
}
