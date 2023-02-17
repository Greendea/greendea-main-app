/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useGetDepartmentsQuery } from '@/redux/apiSlicers/Department'
import { Button, Divider, Form, Input, Modal, Select, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

const ModalEdit = ({ isModalOpen, setIsModalOpen, dataView, setDataView }) => {
    console.log(dataView)
    const [form] = Form.useForm()
    const handleOk = () => {
        setIsModalOpen(false);
        setDataView(null)
    };
    useEffect(() => {
        form.setFieldsValue({
            ...dataView,
        })
    }, [dataView])

    return <Modal title="EDIT DEPARTMENT / FACULTY" open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={400}
        footer={[
            <Button key="Close" onClick={() => setIsModalOpen(false)}>Close</Button>,
            <Button key="Save" type='primary' onClick={() => handleOk()}>Save Changes</Button>,
        ]}
    >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form}>
            <Form.Item label="Name" name="name" colon={false}>
                <Input type="text" />
            </Form.Item>

            <Form.Item label="Status" name="status" colon={false}>
                {/* <Input type="text" /> */}
                <Select>
                    <Select.Option value={false}>
                        DISABLED
                    </Select.Option>
                    <Select.Option value={true}>
                        ENABLED
                    </Select.Option>
                </Select>
            </Form.Item>
        </Form>
    </Modal>
}

export default function FacultyDepartment() {
    const { data, isloading } = useGetDepartmentsQuery()
    console.log(data)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataView, setDataView] = useState(null)


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "40%"
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'created_at',
            width: "20%"
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updated_at',
            width: "20%",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "10%",
            render: (value, record) => {
                return <>
                    {
                        value ? <Tag color="blue" style={{ cursor: "pointer", padding: "5px 10px" }}>ENABLED</Tag> :
                            <Tag color="blue" style={{ cursor: "pointer", padding: "5px 10px" }}>DISABLED</Tag>}
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
            <Table loading={isloading} dataSource={data || []} columns={columns} bordered
                pagination={{ pageSize: 5 }}
                title={() => <Divider><h2 style={{ textAlign: "center" }}>TABLE OF FACULTIES AND DEPARTMENTS</h2></Divider>} />

            <ModalEdit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataView={dataView} setDataView={setDataView} />
        </div>
    )
}
