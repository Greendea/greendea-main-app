import { Tabs } from 'antd';
import Announcement from '../../Department/Announcement';
import Staff from '../../Staff/Staff';
import TopicIdea from '../../Department/TopicIdeaPannel';
const onChange = (key) => {
    console.log(key);
};



export default function Index({ department, role }) {
    console.log(department, role)
    const items = [
        {
            key: '1',
            label: `STAFF`,
            children: <Staff isAdmin={false} department={department} />,
        },
        {
            key: '2',
            label: `TOPICS & IDEAS`,
            children: <TopicIdea department={department} role={role} />,
        },
        {
            key: '3',
            label: `ANNOUNCEMENTS`,
            children: <Announcement department={department} role={role} />,
        },
    ];
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: 34, margin: "20px 0 10px 0" }}>
                Staff Panel - {department?.name}
            </h1>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
        </div>
    )
}
