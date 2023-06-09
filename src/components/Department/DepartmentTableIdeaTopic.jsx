import React, { useState, useEffect } from 'react'
import locale from "antd/lib/date-picker/locale/vi_VN";
import "dayjs/locale/vi"
import { Button, DatePicker, Descriptions, Divider, Dropdown, Form, Input, message, Modal, Select, Space, Table, Tag, Tooltip, Popconfirm } from 'antd';
import { useDeleteTopicMutation, useGetTopicsQuery, useUpdateTopicMutation } from '../../redux/apiSlicers/Topic';
import { ParseDate } from '../../utils/dataParser';
import { validateMessages } from '../../utils/validateMessage';
import dayjs from 'dayjs';
import { ExpandedIdeaRender } from '../Idea/ExpandedIdeaTopic';
import { HiOutlineDownload } from 'react-icons/hi';
import WaitingIdea from './WaitingIdea';
import { useGetIdeasQuery } from '../../redux/apiSlicers/Idea';
import * as XLSX from "xlsx";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/router';
import { exposeFilters } from '../../utils/exposeFilter';
import moment from 'moment';



const ModalEdit = ({ isModalOpen, setIsModalOpen, dataView, setDataView }) => {
    const [updateTopic, { isLoading }] = useUpdateTopicMutation()
    const dateFormat = 'DD MMM, YYYY'
    const [form] = Form.useForm()
    const handleSubmit = (values) => {
        const submitData = {
            id: dataView.id,
            name: values.name,
            openDate: values.date[0].$d,
            closureDateIdea: values.date[1].$d,
            closureDateTopic: values.closureDateTopic.$d
        }
        updateTopic(submitData).unwrap().then(res => {
            form.resetFields()
            setIsModalOpen(false)
            setDataView(null)
            message.success("Topic Updated")
        }).catch(err => {
            console.log(err)
            message.error("Failed to update topic")
        })
    }
    useEffect(() => {
        form.setFieldsValue({
            department: dataView?.Department.name,
            name: dataView?.name,
            date: [dayjs(dataView?.openDate, 'YYYY-MM-DD'), dayjs(dataView?.closureDateIdea, 'YYYY-MM-DD')],
            closureDateTopic: dayjs(dataView?.closureDateTopic, 'YYYY-MM-DD')
        })
    }, [dataView?.id, dataView, form])

    return <Modal title="EDIT TOPIC" open={isModalOpen} onCancel={() => setIsModalOpen(false)} width={600}
        footer={[
            <Button key="Close" onClick={() => setIsModalOpen(false)}>Close</Button>,
            <Button key="Save" type='primary' onClick={() => form.submit()}
                loading={isLoading}
            >Save Changes</Button>,
        ]}
    >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form} onFinish={handleSubmit} validateMessages={validateMessages}>
            <Form.Item label="Department" name="department" rules={[{ required: true }]}>
                <Input disabled />
            </Form.Item>
            <Form.Item label="Topic Name" name="name" rules={[{ required: true }]}>
                <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label="Idea Dates" name="date" rules={[{ required: true }]}>
                <DatePicker.RangePicker locale={locale} format={'DD MMM, YYYY'} />
            </Form.Item>
            <Form.Item label="Close Date Topic" name="closureDateTopic" rules={[{ required: true }]}>
                <DatePicker locale={locale} format={dateFormat} />
            </Form.Item>
        </Form>
    </Modal >
}

function DeleteTopic({ topic }) {
    const [deleteTopic] = useDeleteTopicMutation()
    const confirm = () => {
        deleteTopic({
            id: topic.id,
            department: topic.Department.id
        }).unwrap().then(_ => message.success("Topic deleted")).catch(_ => message.error("Failed to delete topic"))
    };
    return <>
        <Popconfirm
            placement="topLeft"
            title={"Confirm Delete"}
            description={"Are you sure to delete this topic and its related ideas, comments, reactions, ands views."}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
            <Tag color="red" style={{ cursor: "pointer" }} >Delete</Tag>

        </Popconfirm>
    </>
}

export default function DepartmentTableTopic({ department, editable = false, downloadable = false, deletable = false }) {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataView, setDataView] = useState(null)
    const { data, isLoading, refetch } = useGetTopicsQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            isLoading,
            data: department === true ? data : data?.filter(i => i.Department?.id === department.id)
        }),
        skip: !department
    })
    const { data: ideas } = useGetIdeasQuery()

    const handleDownload = async (record) => {
        let zip = new JSZip();
        // //CREATE XLSX FILE
        let jsonData = ideas.filter(i => i.Topic.id === record.id).map(({ id, content, isAnomyous, User, Category, comments, files, reacts, createdAt }) => {
            return {
                id, content, isAnomyous,
                user: User.name,
                category: Category.name,
                comments: comments.length,
                files: files.length,
                reacts: reacts.length,
                createdAt: ParseDate(createdAt)
            }
        })
        let workBook = XLSX.utils.book_new();
        let workSheet = XLSX.utils.json_to_sheet(jsonData);
        XLSX.utils.book_append_sheet(workBook, workSheet, `TOPIC-${record.name}`);
        let workBookBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
        let fileDataExcel = new Blob([workBookBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        zip.file(`${record.name.split(" ").join("_")}.xlsx`, fileDataExcel);

        // //Create media folder
        let folders = ideas.filter(i => i.Topic.id === record.id).map(idea => {
            return {
                name: idea.id,
                files: idea.files.map(i => i.url)
            }
        })
        for (let folder of folders) {
            let folderZip = zip.folder(folder.name)
            for (let url of folder.files) {
                let response = await fetch(url);
                let fileBlob = await response.blob()
                folderZip.file(url.split("/")[7], fileBlob)
            }
        }

        //SAVE FILEs
        zip.generateAsync({ type: "blob" }).then(function (blob) {
            saveAs(blob, `${record.name.split(" ").join("_")}.zip`);
        });
    }

    const additionalColumns = (department === true) ? [
        {
            title: 'Department',
            dataIndex: 'Department',
            key: 'Department',
            width: "15%",
            render: (value, record) => {
                return <>
                    {value.name}
                </>
            },
            filters: data && exposeFilters(data.map(item => item.Department.name)),
            onFilter: (value, record) => record.Department.name === value
        },
    ] : []

    const editableColumns = editable ? [{
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "10%",
        render: (value, record) => {
            return <>
                <Tag color="blue" style={{ cursor: "pointer" }}
                    onClick={() => {
                        setDataView(record)
                        setIsModalOpen(true)
                    }}
                >Edit</Tag>
                {
                    deletable &&
                    <DeleteTopic topic={record} />
                }

                {downloadable &&
                    <Tag color="blue" style={{ cursor: "pointer", marginTop: 5 }} icon={<HiOutlineDownload />} onClick={() => handleDownload(record)}>DOWNLOAD</Tag>
                }
            </>
        }
    },] : [{

    }]

    const columns = [
        {
            title: 'Topic',
            dataIndex: 'name',
            key: 'name',
            width: "40%"
        },
        {
            title: 'Creator',
            dataIndex: 'User',
            key: 'User',
            width: "10%",
            render: (value, record) => {
                return <>
                    {value.name}
                </>
            }
        },
        ...additionalColumns,
        {
            title: 'Open Date',
            dataIndex: 'openDate',
            key: 'openDate',
            width: "15%",
            render: (value, record) => {
                return ParseDate(value)
            }
        },
        {
            title: 'Close Date Idea',
            dataIndex: 'closureDateIdea',
            key: 'closureDateIdea',
            width: "10%",
            render: (value, record) => {
                return <Tooltip title={moment(value).format("DD/MM/YY hh:mm:ss")}>
                    <Tag color={moment(value).diff(moment(), "seconds") > 0 ? "green" : ""}>
                        {moment(value).fromNow()}
                    </Tag>
                </Tooltip>
            }
        },
        {
            title: 'Close Date Topic',
            dataIndex: 'closureDateTopic',
            key: 'closureDateTopic',
            width: "10%",
            render: (value, record) => {
                return <Tooltip title={moment(value).format("DD/MM/YY hh:mm:ss")}>
                    <Tag color={moment(value).diff(moment(), "seconds") > 0 ? "green" : ""}>
                        {moment(value).fromNow()}
                    </Tag>
                </Tooltip>
            }
        },
        ...editableColumns
    ];

    return (
        <>
            <Divider style={{ display: "block", whiteSpace: "break-spaces" }}>
                <div style={{ fontSize: 24 }}>
                    Table Of Available Topics And Ideas
                </div>
            </Divider>
            <Table
                pagination={{ pageSize: 5 }}
                scroll={{ x: 1300 }}
                loading={isLoading}
                style={{
                    width: "100%"
                }}
                columns={columns}
                expandable={{
                    expandedRowRender: record => <ExpandedIdeaRender topic={record} />,
                    defaultExpandedRowKeys: ['0'],
                }}
                dataSource={data}
                rowKey={(record) => record.id}
            />
            <ModalEdit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataView={dataView} setDataView={setDataView} />
            {editable && <WaitingIdea department={department} />}
        </>
    )
}
