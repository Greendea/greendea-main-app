import { Input } from 'antd';
import React from 'react'


export default function SearchForm({ setFilterSearch }) {
    const onSearch = (value) => setFilterSearch(value);

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
