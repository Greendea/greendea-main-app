import { useGetIdeasQuery, useUpdateIdeaStatusMutation } from '../../redux/apiSlicers/Idea';
import { ParseDate } from '../../utils/dataParser';
import { Button, Descriptions, Divider, message, Modal, Popconfirm, Space, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';


export const ModalIdeaWaiting = ({ isShowIdea, setIsShowIdea, dataIdea, setDataIdea }) => {
    return <Modal
        style={{ top: 10 }}
        width={960}
        open={isShowIdea}
        closable={false}
        footer={[
            <Button key="close" onClick={() => { setDataIdea(null); setIsShowIdea(false) }}>Close</Button>,
        ]}
    >
        <Descriptions title="IDEA DESCRIPTION" bordered column={1} contentStyle={{ width: "80%" }}>
            <Descriptions.Item label="Topic">{dataIdea?.Topic.name}</Descriptions.Item>
            <Descriptions.Item label="Content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, temporibus consequatur accusamus, exercitationem atque a fuga ab corrupti expedita similique, sit numquam dolorem harum! Ipsum culpa dolores exercitationem sunt cum?</Descriptions.Item>
            <Descriptions.Item label="Submitor">{dataIdea?.isAnomyous ? "ANOMYOUS" : dataIdea?.User.name}</Descriptions.Item>
            <Descriptions.Item label="Date Submit">{ParseDate(dataIdea?.createdAt)}</Descriptions.Item>
        </Descriptions>
    </Modal >
}


function AcceptIdea({ idea, handleIdea }) {
    const confirm = () => {
        handleIdea(idea.id, 1)
    };
    return <>
        <Popconfirm
            placement="topLeft"
            title={"Confirm Accept"}
            description={"Are you sure to accept this idea."}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
            <Tag color="blue" style={{ cursor: "pointer" }} icon={<AiOutlineCheck />} >ACCEPT</Tag>
        </Popconfirm>
    </>
}

function RejectIdea({ idea, handleIdea }) {
    const confirm = () => {
        handleIdea(idea.id, -1)
    };
    return <>
        <Popconfirm
            placement="topLeft"
            title={"Confirm Reject"}
            description={"Are you sure to reject this idea."}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
            <Tag color="red" style={{ cursor: "pointer" }} icon={<AiOutlineClose />} >REJECT</Tag>

        </Popconfirm>
    </>
}

export default function WaitingIdea({ department }) {
    const [updateIdeaStatus, { isLoading: loadingMutation }] = useUpdateIdeaStatusMutation()
    const [isShowIdea, setIsShowIdea] = useState(false)
    const [dataIdea, setDataIdea] = useState(null)
    const handleIdea = (id, status) => {
        updateIdeaStatus({
            id: id,
            status: status
        }).unwrap().then(res => {
            message.success(`Idea ${status === -1 ? "rejected" : "accepted"}`);
        }).catch(err => {
            console.log(err)
            message.success(`Failed to ${status === -1 ? "reject" : "accept"} Idea `);
        })
    }

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
            width: "15%",
            render: (val) => {
                return val?.name
            }
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: 'category',
            width: "10%",
            render: (val) => {
                return val?.name
            }
        },
        {
            title: 'Idea',
            dataIndex: 'content',
            key: 'content',
            width: "35%",
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
                    <Tag color="cyan" style={{ cursor: "pointer" }} onClick={() => { setDataIdea(record); setIsShowIdea(true) }}>VIEW</Tag>
                    <AcceptIdea idea={record} handleIdea={handleIdea} />
                    <RejectIdea idea={record} handleIdea={handleIdea} />
                </Space >
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
                scroll={{ x: 1300 }}
                pagination={{ pageSize: 5 }}
                loading={isLoading}
                style={{
                    width: "100%"
                }}
                columns={columns}
                dataSource={data?.filter(i => i.status === 0)}
                rowKey={(record) => record.id}
            />
            <ModalIdeaWaiting isShowIdea={isShowIdea} setIsShowIdea={setIsShowIdea} dataIdea={dataIdea} setDataIdea={setDataIdea} />
        </>
    )
}
