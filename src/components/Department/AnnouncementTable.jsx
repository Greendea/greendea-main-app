import { useGetAnnouncementsQuery, useUpdateAnnouncementByIdMutation } from '../../redux/apiSlicers/Announcement';
import { ParseDate } from '../..//utils/dataParser';
import { Button, DatePicker, Divider, Form, Input, message, Modal, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import locale from "antd/lib/date-picker/locale/vi_VN";
import "dayjs/locale/vi"
import dayjs from 'dayjs';
const dateFormat = 'DD MMM, YYYY'
import parse from 'html-react-parser';
import dynamic from "next/dynamic";
import { validateMessages } from '../../utils/validateMessage';


const ModalView = ({ isModalOpen, setIsModalOpen, dataView, setDataView }) => {
    const [form] = Form.useForm()
    const [content, setContent] = useState()
    useEffect(() => {
        if (dataView) {
            form.setFieldsValue({
                title: dataView?.title,
                createdAt: dayjs(dataView?.createdAt, 'YYYY-MM-DD'),
                updatedAt: dayjs(dataView?.updatedAt, 'YYYY-MM-DD'),
            })
            setContent(dataView?.content)
        }
    }, [dataView?.id])

    return <Modal title="VIEW ANNOUCEMENT" open={isModalOpen} width={1080} closable={false}
        footer={[
            <Button key="Close" onClick={() => {
                form.resetFields()
                console.log(dataView)
                setContent(null)
                setIsModalOpen(false)
                setDataView(null)

            }}>Close</Button>,
        ]}
    >
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} form={form} >
            <Form.Item label="Title" name="title">
                <Input disabled />
            </Form.Item>
            <Form.Item label="Created At" name="createdAt">
                <DatePicker locale={locale} format={dateFormat} disabled />
            </Form.Item>
            <Form.Item label="Updated At" name="updatedAt">
                <DatePicker locale={locale} format={dateFormat} disabled />
            </Form.Item>
            <Form.Item label="Content" name="content">
                {content && parse(content)}
            </Form.Item>
        </Form>
    </Modal >
}

const ModalEdit = ({ isModalOpen, setIsModalOpen, dataView, setDataView }) => {
    const [form] = Form.useForm()
    const Editor = dynamic(() => import("../../utils/editor"), { ssr: false });
    const [updateAnnouncement, { isLoading }] = useUpdateAnnouncementByIdMutation()
    useEffect(() => {
        if (dataView) {
            form.setFieldsValue({
                title: dataView?.title,
                content: dataView?.content
            })
        }
    }, [dataView])
    const handleFinish = (values) => {

        updateAnnouncement({
            ...values,
            id: dataView?.id
        }).unwrap().then(res => {
            message.success("Announcement updated")
            form.resetFields()
            setIsModalOpen(false)
            setDataView(null)
        }).catch(err => {
            console.log(err)
            message.error("Failed to updated annoucement")
        })
    }

    return <Modal title="VIEW ANNOUCEMENT" open={isModalOpen} width={1580} closable={false}
        footer={[
            <Button key="Close" onClick={() => {
                form.resetFields()
                setIsModalOpen(false)
                setDataView(null)
            }}>Close</Button>,
            <Button key="Open" type='primary' loading={isLoading} onClick={() => form.submit()}>Save Changes</Button>,
        ]}
    >
        <Form labelCol={{ span: 3 }} onFinish={handleFinish} wrapperCol={{ span: 21 }} form={form} rules={[{ required: true }]} validateMessages={validateMessages} >
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Content" name="content" rules={[{ required: true }]}>
                <Editor
                    value={null}
                    onChange={(v) => { }}
                />
            </Form.Item>
        </Form>
    </Modal >
}

export default function AnnouncementTable({ department, editable = false }) {
    const [isModalOpenView, setIsModalOpenView] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [dataView, setDataView] = useState(null)
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    const { data, isLoading, refetch } = useGetAnnouncementsQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            isLoading,
            data: data?.filter(i => i.Department?.id === department.id)
        }),
        skip: !department
    })
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: "50%",
        },
        {
            title: 'Create Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: "15%",
            render: (value, record) => {
                return <>{ParseDate(value)}</>
            }
        },
        {
            title: 'Update Date',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: "15%",
            render: (value, record) => {
                return <>{ParseDate(value)}</>
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: "10%",
            render: (_, record) => (
                <Space size="middle">
                    <Tag color="blue" style={{ cursor: "pointer" }} onClick={() => {
                        console.log(record)
                        setDataView(record)
                        setIsModalOpenView(true)
                    }}>View Detail</Tag>
                    {editable &&
                        <Tag color="cyan" style={{ cursor: "pointer" }} onClick={() => {
                            setDataView(record)
                            setIsModalOpenEdit(true)
                        }}>Edit</Tag>
                    }
                </Space>
            ),
        },
    ];
    return (
        <>
            <Divider>
                <span style={{ fontSize: 24 }}>
                    Annoucements
                </span>
            </Divider>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 3 }} loading={isLoading} />
            <ModalView isModalOpen={isModalOpenView} setIsModalOpen={setIsModalOpenView} dataView={dataView} setDataView={setDataView} />
            <ModalEdit isModalOpen={isModalOpenEdit} setIsModalOpen={setIsModalOpenEdit} dataView={dataView} setDataView={setDataView} />
        </>
    )
}
