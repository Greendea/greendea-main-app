import { Button } from "antd";
import dynamic from "next/dynamic";

export default function TermConditon() {
    const Editor = dynamic(() => import("../../../utils/editor"), { ssr: false });
    return (
        <div>
            <div style={{ textAlign: "right", padding: "10px 5px", marginBottom: 10 }}>
                <Button type="primary">SAVE CHANGES</Button>
            </div>
            <Editor
                value={"Foo"}
                onChange={(v) => console.log(v)}
            />
        </div>
    )
}
