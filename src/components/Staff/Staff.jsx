/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useGetDepartmentsQuery } from '@/redux/apiSlicers/Department';
import { useGetRolesQuery } from '@/redux/apiSlicers/Role';
import { useGetUsersQuery, useUpdateUserMutation } from '@/redux/apiSlicers/User';
import { exposeFilters } from '@/utils/exposeFilter';
import { SelectStatus } from '@/utils/selectEnable';
import { searchColumn } from '@/utils/tableFilters';
import { validateMessages } from '@/utils/validateMessage';
import { Button, Divider, Form, Input, message, Modal, Select, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'

const ModalEditUser = ({ isModalOpen, setIsModalOpen, dataView, setDataView }) => {
    const { data: departments } = useGetDepartmentsQuery()
    const { data: roles } = useGetRolesQuery()
    const [updateUser, { isLoading }] = useUpdateUserMutation()
    const [form] = Form.useForm()
    const handleSubmit = (values) => {
        console.log(values)
        updateUser({
            ...values,
            id: dataView.id
        }).unwrap().then(res => {
            message.success("User updated")
            setIsModalOpen(false);
            setDataView(null)
        }).catch(err => {
            console.log(err)
            message.error("Failed to update user")
        })
    };
    useEffect(() => {
        console.log(dataView)
        form.setFieldsValue({
            ...dataView,
            department: dataView?.Department?.id,
            role: dataView?.Role?.id,
            status: dataView?.status
        })
    }, [dataView?.id])

    return <Modal closable={false} title="EDIT STAFF" open={isModalOpen} width={400}
        footer={[
            <Button key="Close" onClick={() => {
                form.resetFields()
                setIsModalOpen(false)
            }}>Close</Button>,
            <Button key="Save" type='primary' onClick={() => form.submit()} loading={isLoading}>Save Changes</Button>,
        ]}
    >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form} validateMessages={validateMessages} onFinish={handleSubmit}>
            <Form.Item label="Username" name="name" colon={false}>
                <Input type="text" disabled />
            </Form.Item>
            <Form.Item label="Email" name="email" colon={false}>
                <Input type="text" disabled />
            </Form.Item>

            <Form.Item label="Department" name="department" colon={false}>
                <Select allowClear defaultValue="Select deparment" options={departments?.map(i => {
                    return {
                        value: i.id,
                        label: i.name
                    }
                })} />
            </Form.Item>
            <Form.Item label="Role" name="role" colon={false}>
                <Select allowClear defaultValue="Select deparment" options={roles?.map(i => {
                    return {
                        value: i.id,
                        label: i.name
                    }
                })} />
            </Form.Item>
            <Form.Item label="Status" name="status" colon={false} rules={[{ required: true }]}>
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

const Columns = (setDataView, setIsModalOpen, data, isAdmin) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const searchFeature = (dataIndex) => {
        return searchColumn({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
    }
    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "20%",
            ...searchFeature("name")
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "20%",
            ...searchFeature("email")
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
            },
            filters: data && exposeFilters(data.map(item => item.Department?.name)),
            onFilter: (value, record) => record.Department?.name.includes(value.toString())
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
            },
            filters: data && exposeFilters(data.map(item => item.Role?.name)),
            onFilter: (value, record) => record.Role?.name.includes(value.toString())
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
                    {
                        value ? <Tag color="blue" style={{ cursor: "pointer", padding: "5px 10px" }}>ENABLED</Tag> :
                            <Tag color="red" style={{ cursor: "pointer", padding: "5px 10px" }}>DISABLED</Tag>
                    }
                </>
            },
            filters: data && exposeFilters(data.map(item => item.status ? "ENABLED" : "DISABLED")),
            onFilter: (value, record) => (record.status ? "ENABLED" : "DISABLED") === value
        },
        isAdmin ?
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
            } : {}
    ];

}

export default function Staff({ isAdmin, department }) {
    const { data, isLoading } = useGetUsersQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            isLoading,
            data: department === true ? data : data?.filter(i => i.Department?.id === department.id)
        })
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataView, setDataView] = useState(null)


    return (
        <div>
            <Table loading={isLoading} dataSource={data?.filter(i => i.Department !== null && i.Role !== null || i.Role?.name === "admin")}
                columns={Columns(setDataView, setIsModalOpen, data, isAdmin)} bordered
                pagination={{ pageSize: 5 }}
                title={() => <Divider><h2 style={{ textAlign: "center" }}>TABLE OF ASSIGNED STAFF</h2></Divider>} />
            <br />
            <br />
            <br />
            {
                isAdmin &&
                <>
                    <Table loading={isLoading} dataSource={data?.filter(i => i.Department === null || i.Role === null).filter(i => i.Role?.name !== "admin")}
                        columns={Columns(setDataView, setIsModalOpen, data, isAdmin)} bordered
                        pagination={{ pageSize: 5 }}
                        title={() => <Divider><h2 style={{ textAlign: "center" }}>TABLE OF UNASSIGNED STAFF</h2></Divider>} />
                    <ModalEditUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataView={dataView} setDataView={setDataView} />
                </>
            }

        </div>
    )
}
