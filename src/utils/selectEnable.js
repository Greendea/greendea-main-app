import { Select } from "antd"

export const SelectStatus = () => {
    return <Select>
        <Select.Option value={false}>
            DISABLED
        </Select.Option>
        <Select.Option value={true}>
            ENABLED
        </Select.Option>
    </Select>
}