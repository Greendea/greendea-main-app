import { Tabs } from 'antd';
import Announcement from '../../Department/Announcement';
import FacultyDepartment from './FacultyDepartment';
import Staff from '../../Staff/Staff';
import Statistic from './Statistic';
import TermConditon from './TermConditon';
import TopicIdea from '../../Department/TopicIdeaPannel';
const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: `STAFF`,
        children: <Staff isAdmin={true} department={true} />,
    },
    {
        key: '2',
        label: `FACULTIES & DEPARTMENTS`,
        children: <FacultyDepartment />,
    },
    {
        key: '3',
        label: `TOPICS`,
        children: <TopicIdea department={true} />,
    },
    {
        key: '4',
        label: `TERMS AND CONDITIONS`,
        children: <TermConditon />,
    },
    {
        key: '5',
        label: `STATISTICS`,
        children: <Statistic />,
    },
];

export default function Index() {
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: 36, margin: "20px 0 0 0" }}>
                Admin Panel
            </h1>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
        </div>
    )
}
