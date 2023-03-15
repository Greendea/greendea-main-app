// import AnnouncementTable from "../../components/Department/AnnouncementTable";
// import DepartmentTableIdeaTopic from "../../components/Department/DepartmentTableIdeaTopic";
import Head from "next/head";
import React, { useEffect } from "react"
import Layout from "../../components/Layout/Index"
import dynamic from "next/dynamic";
export default function Department({ department }) {
    const AnnouncementTable = dynamic(() => import("../../components/Department/AnnouncementTable"), { ssr: false })
    const DepartmentTableIdeaTopic = dynamic(() => import("../../components/Department/DepartmentTableIdeaTopic"), { ssr: false })

    return (
        <Layout>
            <Head>
                <title>GreenDea - {department?.name}</title>
            </Head>
            <div className="departmentWrapper">
                <h1 style={{
                    textAlign: "center",
                    fontSize: 32,
                    margin: "15px 0"
                }}>
                    {department?.name}
                </h1>
                {
                    department &&
                    <>
                        <AnnouncementTable department={department} />
                        <DepartmentTableIdeaTopic department={department} editable={false} />
                    </>
                }

            </div>
        </Layout>
    );
}




export async function getStaticPaths() {
    const res = await fetch(`${process.env.BE_URL}api/department`)
    const deps = await res.json()
    console.log(deps)

    // Get the paths we want to pre-render based on posts
    const paths = deps.map((dep) => ({
        params: { id: dep.id },
    }))
    return {
        paths,
        fallback: 'blocking', // can also be true or 'blocking'
    }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }) {
    const res = await fetch(`${process.env.BE_URL}api/department/${params.id}`)
    const department = await res.json()

    // Pass post data to the page via props
    return {
        props: {
            department: department
        },
        revalidate: 10
    }
}