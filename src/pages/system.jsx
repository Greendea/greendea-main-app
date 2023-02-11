/* eslint-disable react-hooks/rules-of-hooks */
import OrgChart from '@balkangraph/orgchart.js';
import { useEffect, useState } from 'react';
import Layout from "../components/Layout/Index"

const nodeBinding = {
    field_0: "name",
    img_0: "img"
}

const data = [
    { id: 1, name: 'Denny Curtis', title: 'CEO', img: 'https://cdn.balkan.app/shared/2.jpg' },
    { id: 2, pid: 1, name: 'Ashley Barnett', title: 'Sales Manager', img: 'https://cdn.balkan.app/shared/3.jpg' },
    { id: 3, pid: 1, name: 'Caden Ellison', title: 'Dev Manager', img: 'https://cdn.balkan.app/shared/4.jpg' },
    { id: 4, pid: 2, name: 'Elliot Patel', title: 'Sales', img: 'https://cdn.balkan.app/shared/5.jpg' },
    { id: 5, pid: 2, name: 'Lynn Hussain', title: 'Sales', img: 'https://cdn.balkan.app/shared/6.jpg' },
    { id: 6, pid: 3, name: 'Tanner May', title: 'Developer', img: 'https://cdn.balkan.app/shared/7.jpg' },
    { id: 7, pid: 3, name: 'Fran Parsons', title: 'Developer', img: 'https://cdn.balkan.app/shared/8.jpg' }
]



export default function system() {
    const [rootItem, setRootItem] = useState(null)

    function Orgchart(props) {
        // if (typeof window === 'object') {
        const chart = new OrgChart(rootItem, {
            nodeBinding: props.nodeBinding,
            nodes: props.nodes
        });
        // }
        return (null)
    }
    useEffect(() => {

        if (document.getElementById("tree")) {
            setRootItem(document.getElementById("tree"))
        }
        // Orgchart()
    }, [])

    return (
        <Layout>
            <div style={{ height: '100%' }}>
                <div id="tree"></div>
                {
                    rootItem && <Orgchart nodes={data}
                        nodeBinding={nodeBinding} />
                }
            </div>
        </Layout>
    )
}
