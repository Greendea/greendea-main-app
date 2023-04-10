import React, { useState } from 'react'
import Layout from "../../components/Layout/Index"
import Head from "next/head";
import { Button, Divider, Space, Table, Tag } from 'antd';
import { IconText } from '../../components/Idea/ExpandedIdeaTopic';
import { ModalIdea } from '../../components/Idea/IdeaModal';
import { ParseDate } from '../../utils/dataParser';
import { DislikeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { GrView } from "react-icons/gr";


export default function Ideas({ ideas, isLoading, title, header }) {
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


    const [pageNumber, setPageNumber] = useState(1);
    const productsPerPage = 7;

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div style={{ maxWidth: 1480, margin: "0 auto" }}>
                <Divider>
                    <span style={{ fontSize: 24 }}>
                        {header}
                    </span>
                </Divider>
                <Table columns={columns} dataSource={ideas?.slice(0, pageNumber * productsPerPage)} pagination={false} loading={isLoading} bordered
                    size='large'
                    scroll={{ x: 1300 }}
                    rowClassName={(record) => record.isClosed ? "bg-black border-item" : ""}
                    footer={() => <>
                        {
                            ideas?.length > pageNumber * productsPerPage &&
                            < div style={{ textAlign: "center" }}>
                                <Button type='primary' onClick={() => setPageNumber(prev => prev + 1)}>Load More</Button>
                            </div>
                        }
                    </>}

                />
                {
                    dataIdea &&
                    <ModalIdea isShowIdea={isShowIdea} setIsShowIdea={setIsShowIdea} dataIdea={ideas.find(i => i.id === dataIdea)} setDataIdea={setDataIdea} topic={ideas.find(({ id }) => id === dataIdea).Topic} loading={isLoading} />
                }
            </div>
        </Layout>
    )
}