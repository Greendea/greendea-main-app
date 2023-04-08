import Staff from '../../../components/Staff/Staff';
import { Tabs } from 'antd';
import Announcement from '../../Department/Announcement';
import TopicIdea from '../../Department/TopicIdeaPannel';
import Statistic from './Statistic';
const onChange = (key) => {
    console.log(key);
};


export default function Index({ role, department }) {
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
        {
            key: '4',
            label: `STATISTICS`,
            children: <Statistic department={department} />,
        },
    ];
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: 36, margin: "20px 0 0 0" }}>
                {role && role.toUpperCase()} Panel  - {department?.name}
            </h1>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
        </div>
    )
}
