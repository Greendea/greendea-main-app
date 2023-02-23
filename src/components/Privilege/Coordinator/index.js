import { Tabs } from 'antd';
import Announcement from '../Admin/Announcement';
import Staff from '../Admin/Staff';
import TopicIdea from '../Admin/TopicIdea';
const onChange = (key) => {
    console.log(key);
};



export default function Index({ department }) {
    const items = [
        {
            key: '1',
            label: `STAFF`,
            children: <Staff isAdmin={false} department={department} />,
        },
        {
            key: '2',
            label: `TOPICS & IDEAS`,
            children: <TopicIdea department={department} />,
        },
        {
            key: '3',
            label: `ANNOUNCEMENTS`,
            children: <Announcement department={department} />,
        },
    ];
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: 34, margin: "20px 0 10px 0" }}>
                Coordinator Panel - {department?.name}
            </h1>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
        </div>
    )
}
