import { Tabs } from 'antd';
const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: `STAFF`,
        children: `Content of Tab Pane 1`,
    },
    {
        key: '2',
        label: `TOPICS`,
        children: `Content of Tab Pane 3`,
    },
    {
        key: '3',
        label: `IDEAS`,
        children: `Content of Tab Pane 3`,
    },
    {
        key: '4',
        label: `Announcements`,
        children: `Content of Tab Pane 3`,
    },
    {
        key: '5',
        label: `TAGS`,
        children: `Content of Tab Pane 3`,
    },

];


export default function Index({ role }) {
    return (
        <div>
            <h1 style={{ textAlign: "center", fontSize: 36, margin: "20px 0 0 0" }}>
                {role.toUppercase()} Panel
            </h1>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
        </div>
    )
}
