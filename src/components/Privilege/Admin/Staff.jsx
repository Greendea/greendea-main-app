/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useGetUsersQuery } from '@/redux/apiSlicers/User';
import { Button, Divider, Form, Input, Modal, Select, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

const ModalEditUser = ({ isModalOpen, setIsModalOpen, dataView, setDataView }) => {
    console.log(dataView)
    const [form] = Form.useForm()
    const handleOk = () => {
        setIsModalOpen(false);
        setDataView(null)
    };
    useEffect(() => {
        form.setFieldsValue({
            ...dataView,
            deparment: dataView?.Department?.name,
            role: dataView?.Role?.name,
            status: dataView?.status ? "ENABLED" : "DISABLED"
        })
    }, [dataView])

    return <Modal title="EDIT STAFF" open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={400}
        footer={[
            <Button key="Close" onClick={() => setIsModalOpen(false)}>Close</Button>,
            <Button key="Save" type='primary' onClick={() => handleOk()}>Save Changes</Button>,
        ]}
    >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form}>
            <Form.Item label="Username" name="name" colon={false}>
                <Input type="text" disabled />
            </Form.Item>
            <Form.Item label="Email" name="email" colon={false}>
                <Input type="text" disabled />
            </Form.Item>
            <Form.Item label="Department" name="department" colon={false}>
                <Input type="text" />
            </Form.Item>
            <Form.Item label="Role" name="role" colon={false}>
                <Input type="text" />
            </Form.Item>
            <Form.Item label="Status" name="status" colon={false}>
                <Input type="text" />
            </Form.Item>
        </Form>
    </Modal>
}

export default function Staff() {
    const { data, isloading } = useGetUsersQuery()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataView, setDataView] = useState(null)


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "20%"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "20%"
        },
        {
            title: 'Department / Faculty',
            dataIndex: 'Department',
            key: 'Department',
            width: "20%",
            render: (value) => {
                return <>
                    {value?.name}
                </>
            }
        },
        {
            title: 'Role',
            dataIndex: 'Role',
            key: 'Role',
            width: "10%",
            render: (value) => {
                return <>
                    {value?.name}
                </>
            }
        },
        {
            title: "Avatar",
            dataIndex: "image",
            key: "image",
            width: "10%",
            render: (value) => {
                return <img
                    style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: "50%"
                    }}
                    src={value || "https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"} />
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "10%",
            render: (value, record) => {
                return <>
                    <Tag color="blue" style={{ cursor: "pointer", padding: "5px 10px" }}>ENABLED</Tag>
                </>
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "10%",
            render: (value, record) => {
                return <div style={{ textAlign: "center" }}>
                    <Tag color="cyan" style={{ cursor: "pointer", padding: "5px 10px" }} onClick={() => {
                        setDataView(record)
                        setIsModalOpen(true)
                    }}>EDIT</Tag>
                </div>
            }
        }
    ];

    return (
        <div>
            <Table loading={isloading} dataSource={data && Array(50).fill(data[0])} columns={columns} bordered
                pagination={{ pageSize: 5 }}
                title={() => <Divider><h2 style={{ textAlign: "center" }}>TABLE OF ASSIGNED STAFF</h2></Divider>} />
            <br />
            <br />
            <br />
            <Table loading={isloading} dataSource={data && Array(50).fill(data[0])} columns={columns} bordered
                pagination={{ pageSize: 5 }}
                title={() => <Divider><h2 style={{ textAlign: "center" }}>TABLE OF UNASSIGNED STAFF</h2></Divider>} />

            <ModalEditUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataView={dataView} setDataView={setDataView} />
        </div>
    )
}
