import { Divider, Space, Table, Tag } from 'antd';
const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: "60%",
        render: (value) => {
            return <span style={{ fontSize: 18 }}>
                {value}
            </span>
        }
    },
    {
        title: 'Create Date',
        dataIndex: 'date',
        key: 'date',
        width: "15%"
    },
    {
        title: 'Creator',
        dataIndex: 'creator',
        key: 'creator',
        width: "15%"
    },
    {
        title: 'Action',
        key: 'action',
        width: "10%",
        render: (_, record) => (
            <Space size="middle">
                <a>View Detail</a>
            </Space>
        ),
    },
];
const data = [
];
for (let i = 0; i < 15; ++i) {
    data.push({
        key: i.toString(),
        title: "ANNOUNCEMENT OF COLLECTING STUDENTS’ OPINION ON SUBJECTS 2ND SEMESTER / 2017-2018",
        date: '2014-12-24 23:12:00',
        creator: 'pcs@gmail.com',
    });
}

export default function AnnouncementTable() {
    return (
        <>
            <Divider>
                <span style={{ fontSize: 24 }}>
                    Annoucements
                </span>
            </Divider>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 3 }} />
        </>
    )
}
