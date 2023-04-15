import { useGetTermAndConditionQuery, useUpdateTermAndConditionMutation } from "../../../redux/apiSlicers/Term";
import { Button, message, Spin } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

export default function TermConditon() {
    const Editor = dynamic(() => import("../../../utils/editor"), { ssr: false });
    const { data, isSuccess, isLoading: isLoadingGet, isFetching: isFetchingGet } = useGetTermAndConditionQuery()
    const [updateTerm, { isLoading }] = useUpdateTermAndConditionMutation()
    const valueRef = useRef()
    const handleSumit = () => {
        updateTerm({
            description: valueRef.current
        }).unwrap().then(res => message.success("Terms and Conditions updated")).catch(err => {
            console.log(err)
            message.error("Failed to update")
        })
    }
    useEffect(() => {
        if (isSuccess) {
            valueRef.current = data?.description
        }
    }, [isSuccess, data?.description])
    return (
        <div>
            <div style={{ textAlign: "right", padding: "10px 5px", marginBottom: 10 }}>
                <Button type="primary" loading={isLoading} onClick={handleSumit}>SAVE CHANGES</Button>
            </div>
            <div style={{ textAlign: "center", marginTop: (isLoadingGet || isFetchingGet) ? 100 : 0 }}>
                <Spin spinning={isLoadingGet || isFetchingGet}>
                    {data && <Editor
                        value={data.description}
                        onChange={(v) => {
                            console.log(v)
                            valueRef.current = v
                        }}
                    />}
                </Spin>
            </div>

        </div>
    )
}
