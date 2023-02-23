import { useGetTermAndConditionQuery, useUpdateTermAndConditionMutation } from "@/redux/apiSlicers/Term";
import { Button, message } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

export default function TermConditon() {
    const Editor = dynamic(() => import("../../../utils/editor"), { ssr: false });
    const { data, isSuccess } = useGetTermAndConditionQuery()
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
        console.log("tet")
        if (isSuccess) {
            valueRef.current = data
        }
    }, [isSuccess])
    return (
        <div>
            <div style={{ textAlign: "right", padding: "10px 5px", marginBottom: 10 }}>
                <Button type="primary" loading={isLoading} onClick={handleSumit}>SAVE CHANGES</Button>
            </div>
            {data && <Editor
                value={data.description}
                onChange={(v) => {
                    console.log(v)
                    valueRef.current = v
                }}
            />}

        </div>
    )
}
