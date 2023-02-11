import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import { GrView } from "react-icons/gr"
import { LikeOutlined, DislikeOutlined, MessageOutlined, } from '@ant-design/icons';
import { Badge, Divider, Dropdown, Space, Table } from 'antd';
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export default function DepartmentTable() {
    const expandedRowRender = () => {
        const columns = [
            {
                title: 'Idea',
                dataIndex: 'idea',
                key: 'idea',
                width: "40%",
            },
            {
                title: 'Submittor',
                dataIndex: 'creator',
                key: 'creator',
                width: "15%"
            },
            {
                title: 'Submit Date',
                dataIndex: 'date',
                key: 'date',
                width: "15%"
            },
            {
                title: "Reaction",
                dataIndex: 'reaction',
                key: 'reaction',
                width: "20%",
                render: () => (
                    <Space size="middle">
                        <IconText icon={GrView} text="1000" key="list-vertical-view-o" />
                        <IconText icon={LikeOutlined} text="150" key="list-vertical-like-o" />
                        <IconText icon={DislikeOutlined} text="30" key="list-vertical-dislike-o" />
                        <IconText icon={MessageOutlined} text="500" key="list-vertical-message" />
                    </Space>
                ),
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                width: "10%",
                render: () => (
                    <Space size="middle">
                        <a>View Detail</a>

                        {/* <a>Stop</a> */}
                        {/* <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a>
                                More <DownOutlined />
                            </a>
                        </Dropdown> */}
                    </Space>
                ),
            },
        ];
        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                idea: "This is idea description for topic, i want to go to Thailand trip since the variety of food",
                date: '2014-12-24 23:12:00',
                creator: 'pcs@gmail.com',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };
    const columns = [
        {
            title: 'Topic',
            dataIndex: 'name',
            key: 'name',
            width: "40%"
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            width: "15%"
        },
        {
            title: 'Create Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "15%"
        },
        {
            title: 'Close Idea Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "15%"
        },
        {
            title: 'Close Topic Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "15%"
        },
    ];
    const data = [];
    for (let i = 0; i < 20; ++i) {
        data.push({
            key: i.toString(),
            name: 'Topic name description for aggregating vaction locations for summer 2022',
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00',
        });
    }
    return (
        <>
            <Divider>
                <span style={{ fontSize: 24 }}>
                    Table Of Topics And Ideas
                </span>
            </Divider>
            <Table
                style={{
                    width: "100%"
                }}
                columns={columns}
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0'],
                }}
                dataSource={data}
            /></>
    )
}
