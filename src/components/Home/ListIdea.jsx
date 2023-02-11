import { Avatar, Descriptions, List, Space } from 'antd';
import { LikeOutlined, DislikeOutlined, MessageOutlined, } from '@ant-design/icons';
import React from 'react';

const data = Array.from({
    length: 5,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `Department ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Idea for event arrangement in 2024. Deadline: 20/12/2023',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    createdAd: "a few seconds ago",
    submitDate: "02/02/2022",
    contributor: "samsam@gmail.com"
}));

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
export default function ListIdea() {
    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={LikeOutlined} text="12" key="list-vertical-like-o" />,
                            <IconText icon={DislikeOutlined} text="10" key="list-vertical-dislike-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                    // extra={
                    //     // <div style={{ width: 200 }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, repellat sunt! Laborum perspiciatis nemo quaerat esse incidunt non consequuntur libero, nostrum eum! Eaque provident dolorem maxime odit in nulla voluptas!</div>
                    // }
                    >
                        <List.Item.Meta

                            avatar={<Avatar src={item.avatar} />}
                            title={
                                <>
                                    <a href={item.href}
                                    >{item.title}</a>
                                    <span style={{
                                        marginLeft: 10,
                                        fontWeight: "lighter",
                                        fontSize: 12
                                    }}>
                                        {item.createdAd}
                                    </span>
                                </>
                            }
                            description={
                                <span>
                                    {item.description}
                                </span>
                            }
                        />
                        <Descriptions layout="horizontal" column={1}>
                            {/* <Descriptions.Item label="Contributor">{item.contributor}</Descriptions.Item> */}
                            {/* <Descriptions.Item label="Submit Date">{item.submitDate}</Descriptions.Item> */}
                            {/* <Descriptions.Item label="Idea">{item.content}</Descriptions.Item> */}
                        </Descriptions>

                    </List.Item>
                )}
            />
        </div>
    )
}
