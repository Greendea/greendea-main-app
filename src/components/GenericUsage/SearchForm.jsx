import { Input } from 'antd';
import React from 'react'

const onSearch = (value) => console.log(value);

export default function SearchForm() {
    return (
        <div style={{
            textAlign: "center",
            margin: 20
        }}>
            <Input.Search
                style={{
                    maxWidth: 500,
                }}
                placeholder="Search For Topic"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
        </div>
    )
}
