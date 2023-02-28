import { useGetUsersQuery } from '@/redux/apiSlicers/User';
import OrgChart from '@balkangraph/orgchart.js';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from "../components/Layout/Index"

const nodeBinding = {
    img_0: "img",
    field_0: "name",
    field_1: "title",
}

const data = [
    { id: "departA", pid: 1, name: "Department A", tags: ["departA-group", "group"] },
    { id: "departB", pid: 1, name: "Department B", tags: ["departB-group", "group"] },
    { id: "facC", pid: 1, name: "Faculty of C", tags: ["facC-group", "group"] },
    { id: 1, name: 'University' },
    { id: 10000, name: 'John Bracker', title: 'Administrator', img: 'https://cdn.balkan.app/shared/1.jpg' },
    { id: 2, stpid: "departA", name: 'Ashley Barnett', title: 'Department Manager', img: 'https://cdn.balkan.app/shared/3.jpg' },
    { id: 3, stpid: "departA", name: 'Elliot Patel', title: 'Department Coordinator', img: 'https://cdn.balkan.app/shared/5.jpg' },
    { id: 4, stpid: "departA", name: 'Lynn Hussain', title: 'Department Coordinator', img: 'https://cdn.balkan.app/shared/6.jpg' },
    { id: 5, stpid: "departB", name: 'Caden Ellison', title: 'Department Manager', img: 'https://cdn.balkan.app/shared/4.jpg' },
    { id: 6, stpid: "departB", name: 'Tanner May', title: 'Department Coordinator', img: 'https://cdn.balkan.app/shared/7.jpg' },
    { id: 7, stpid: "departB", name: 'Fran Parsons', title: 'Department Coordinator', img: 'https://cdn.balkan.app/shared/8.jpg' },
    { id: 8, stpid: "facC", name: 'Caden Ellison 2', title: 'Head Of Faculty C', img: 'https://cdn.balkan.app/shared/9.jpg' },
    { id: 9, stpid: "facC", name: 'Tanner May 2', title: 'Faculty Coordinator', img: 'https://cdn.balkan.app/shared/10.jpg' },
    { id: 10, stpid: "facC", name: 'Fran Parsons 2', title: 'Lecturer', img: 'https://cdn.balkan.app/shared/11.jpg' },
]

function SystemChart() {
    const [rootItem, setRootItem] = useState(null)
    function Orgchart({ nodes, nodeBinding }) {
        if (typeof window === 'object') {
            const chart = new OrgChart(rootItem, {
                nodeBinding: nodeBinding,
                nodes: nodes,
                tags: {
                    "group": {
                        template: "group",
                    },
                    "departA-group": {
                        subTreeConfig: {
                            columns: 2
                        }
                    },
                    "departB-group": {
                        subTreeConfig: {
                            columns: 2
                        }
                    },
                    "facC-group": {
                        // min: true,
                        subTreeConfig: {
                            columns: 2
                        }
                    },
                }

            });
        }
        return (null)
    }
    useEffect(() => {
        if (document.getElementById("tree")) {
            setRootItem(document.getElementById("tree"))
        }
    }, [])
    return <div style={{ height: '100%' }}>
        <div id="tree"></div>
        {
            rootItem && <Orgchart nodes={data}
                nodeBinding={nodeBinding} />
        }
    </div>
}

export default function System() {
    const { data, isLoading } = useGetUsersQuery()

    return (
        <Layout>
            <Head>
                <title>GreenDea - System</title>
            </Head>
            <SystemChart />
        </Layout>
    )
}
