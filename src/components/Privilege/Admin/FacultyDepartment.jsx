/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useAddDepartmentMutation, useDeleteDepartmentByIdMutation, useGetDepartmentsQuery, useUpdateDepartmentByIdMutation } from '../../../redux/apiSlicers/Department'
import { ParseDate } from '../../../utils/dataParser'
import { loading } from '../../../utils/orgchart'
import { validateMessages } from '../../../utils/validateMessage'
import { Button, Divider, Form, Input, Modal, Select, Table, Tag, message, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { searchColumn } from '../../../utils/tableFilters'

const ModalEdit = ({ isModalOpen, setIsModalOpen, dataView, setDataView }) => {
    const [updateDeparment, { isLoading }] = useUpdateDepartmentByIdMutation()
    const [form] = Form.useForm()
    const handleSubmit = (values) => {
        updateDeparment({ ...values, id: dataView.id }).unwrap().then(res => {
            form.resetFields()
            setIsModalOpen(false)
            setDataView(null)
            message.success("Departmend Updated")
        }).catch(res => {
            console.log(res.data)
            message.error(res.data.message)
        })
    }
    useEffect(() => {
        form.setFieldsValue({
            ...dataView,
        })
    }, [dataView])

    return <Modal title="EDIT DEPARTMENT / FACULTY" open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={600}
        footer={[
            <Button key="Close" onClick={() => setIsModalOpen(false)}>Close</Button>,
            <Button key="Save" type='primary' onClick={() => form.submit()} loading={isLoading}>Save Changes</Button>,
        ]}
    >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} onFinish={handleSubmit} validateMessages={validateMessages}>
            <Form.Item label="Name" name="name" colon={false} rules={[{ required: true }]}>
                <Input type="text" />
            </Form.Item>

            <Form.Item label="Status" name="status" colon={false} rules={[{ required: true }]}>
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
    </Modal >
}

const AddModal = () => {
    const [addDepartment, { isLoading }] = useAddDepartmentMutation()
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmit = (values) => {
        console.log(values)
        // addDepartment
        addDepartment(values).unwrap().then(res => {
            console.log(res)
            form.resetFields()
            setIsModalOpen(false)
            message.success("Departmend Added")
        }).catch(res => {
            console.log(res.data)
            message.error(res.data.message)
        })
    }
    return <div style={{ textAlign: "right", margin: "20px 0 10px 0" }}>
        <Button type='primary' size='large' onClick={() => setIsModalOpen(true)}>ADD NEW</Button>
        <Modal title="ADD DEPARTMENT / FACULTY" open={isModalOpen} onCancel={() => { form.resetFields(); setIsModalOpen(false) }} width={600}
            footer={[
                <Button key="Close" onClick={() => { form.resetFields(); setIsModalOpen(false) }}>Close</Button>,
                <Button key="Save" type='primary' onClick={() => form.submit()} loading={isLoading}>Add New</Button>,
            ]}
        >
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} validateMessages={validateMessages} onFinish={handleSubmit}>
                <Form.Item label="Name" name="name" colon={false} rules={[{ required: true }]}>
                    <Input type="text" />
                </Form.Item>

                <Form.Item label="Status" name="status" colon={false} rules={[{ required: true }]}>
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
    </div>
}
const ConfirmDelete = ({ id, name, status }, deleteDepartment) => {
    console.log(id)
    Modal.confirm({
        title: 'Do you Want to delete this item ?',
        icon: <ExclamationCircleFilled />,
        content: <>
            <Descriptions column={1}>
                <Descriptions.Item label="name">{name}</Descriptions.Item>
                <Descriptions.Item label="status">{status ? "ENABLED" : "DISABLED"}</Descriptions.Item>
            </Descriptions>
        </>,
        onOk() {
            console.log(id)
            deleteDepartment(id).unwrap().then(res => message.success("Department Deleted")).catch(err => {
                console.log(err)
                message.error("Failed To Delete This!")
            })
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

const Columns = (setDataView, setIsModalOpen) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [deleteDepartment] = useDeleteDepartmentByIdMutation()
    const searchFeature = (dataIndex) => {
        return searchColumn({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
    }

    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "40%",
            ...searchFeature("name")
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            width: "20%",
            render: (value) => {
                return <>{ParseDate(value)}</>
            }
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: "20%",
            render: (value) => {
                return <>{ParseDate(value)}</>
            }
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
                            <Tag color="red" style={{ cursor: "pointer", padding: "5px 10px" }}>DISABLED</Tag>}
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
                    <Tag color="red" style={{ cursor: "pointer", padding: "5px 10px" }} onClick={() => ConfirmDelete(record, deleteDepartment)}>Delete</Tag>
                </div>
            }
        }
    ];
}
export default function FacultyDepartment() {
    const { data, isloading } = useGetDepartmentsQuery()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataView, setDataView] = useState(null)

    return (
        <div>
            <AddModal />
            <Table loading={isloading} dataSource={data || []} columns={Columns(setDataView, setIsModalOpen)} bordered
                pagination={{ pageSize: 5 }}
                title={() => <Divider><h2 style={{ textAlign: "center" }}>TABLE OF FACULTIES AND DEPARTMENTS</h2></Divider>} />

            <ModalEdit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataView={dataView} setDataView={setDataView} />
        </div>
    )
}
