/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { ParseDate } from '../../../utils/dataParser'
import { validateMessages } from '../../../utils/validateMessage'
import { Button, Divider, Form, Input, Modal, Select, Table, Tag, message, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { searchColumn } from '../../../utils/tableFilters'
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../../../redux/apiSlicers/Category'

const ModalEdit = ({ isModalOpen, setIsModalOpen, dataView, setDataView, categories }) => {
    const [updateCategory, { isLoading }] = useUpdateCategoryMutation()
    const [form] = Form.useForm()
    const handleSubmit = (values) => {
        if (categories?.map(i => i.name).includes(values.name)) {
            return message.error("Category Existed")
        }
        updateCategory({ ...values, id: dataView.id }).unwrap().then(res => {
            form.resetFields()
            setIsModalOpen(false)
            setDataView(null)
            message.success("Category Updated")
        }).catch(res => {
            console.log(res.data)
            message.error(res.data.message)
        })
    }
    useEffect(() => {
        form.setFieldsValue({
            ...dataView,
        })
    }, [dataView, form])

    return <Modal title="EDIT CATEGORY" open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={600}
        footer={[
            <Button key="Close" onClick={() => setIsModalOpen(false)}>Close</Button>,
            <Button key="Save" type='primary' onClick={() => form.submit()} loading={isLoading}>Save Changes</Button>,
        ]}
    >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} onFinish={handleSubmit} validateMessages={validateMessages}>
            <Form.Item label="Name" name="name" colon={false} rules={[{ required: true }]}>
                <Input type="text" onChange={(e) => form.setFieldValue("name", e.target.value.toUpperCase())} />
            </Form.Item>
        </Form>
    </Modal >
}

const AddModal = ({ categories }) => {
    const [addCategory, { isLoading }] = useAddCategoryMutation()
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSubmit = (values) => {
        if (categories?.map(i => i.name).includes(values.name)) {
            return message.error("Category Existed")
        }
        addCategory(values).unwrap().then(res => {
            console.log(res)
            form.resetFields()
            setIsModalOpen(false)
            message.success("Category Added")
        }).catch(res => {
            console.log(res.data)
            message.error(res.data.message)
        })
    }
    return <div style={{ textAlign: "right", margin: "20px 0 10px 0" }}>
        <Button type='primary' size='large' onClick={() => setIsModalOpen(true)}>ADD NEW</Button>
        <Modal title="ADD CATEGORY" open={isModalOpen} onCancel={() => { form.resetFields(); setIsModalOpen(false) }} width={600}
            footer={[
                <Button key="Close" onClick={() => { form.resetFields(); setIsModalOpen(false) }}>Close</Button>,
                <Button key="Save" type='primary' onClick={() => form.submit()} loading={isLoading}>Add New</Button>,
            ]}
        >
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} validateMessages={validateMessages} onFinish={handleSubmit}>
                <Form.Item label="Name" name="name" colon={false} rules={[{ required: true }]}>
                    <Input type="text" onChange={(e) => form.setFieldValue("name", e.target.value.toUpperCase())} />
                </Form.Item>
            </Form>
        </Modal >
    </div >
}
const ConfirmDelete = ({ id, name }, deleteCategory) => {
    console.log(id)
    Modal.confirm({
        title: 'Do you Want to delete this item ?',
        icon: <ExclamationCircleFilled />,
        content: <>
            <Descriptions column={1}>
                <Descriptions.Item label="name">{name}</Descriptions.Item>
            </Descriptions>
        </>,
        onOk() {
            deleteCategory({ id }).unwrap().then(res => message.success("Category Deleted")).catch(err => {
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
    const [deleteCategory] = useDeleteCategoryMutation()
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
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "20%",
            render: (value) => {
                return <>{ParseDate(value)}</>
            }
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: "20%",
            render: (value) => {
                return <>{ParseDate(value)}</>
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
                    <Tag color="red" style={{ cursor: "pointer", padding: "5px 10px" }} onClick={() => ConfirmDelete(record, deleteCategory)}>Delete</Tag>
                </div>
            }
        }
    ];
}
export const Categories = () => {
    const { data, isloading } = useGetCategoriesQuery()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataView, setDataView] = useState(null)

    return (
        <div>
            <AddModal categories={data} />
            <Table loading={isloading} dataSource={data || []} columns={Columns(setDataView, setIsModalOpen)} bordered
                scroll={{ x: 1300 }}
                pagination={{ pageSize: 5 }}
                title={() => <Divider><h2 style={{ textAlign: "center" }}>TABLE OF CATEGORIES</h2></Divider>} />

            <ModalEdit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataView={dataView} setDataView={setDataView} categories={data?.filter(i => i.id !== dataView?.id)} />
        </div>
    )
}
