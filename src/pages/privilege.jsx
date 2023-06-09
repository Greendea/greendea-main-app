import { useGetUserByEmailQuery } from '../redux/apiSlicers/User'
import { Empty, Skeleton, Spin } from 'antd'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Layout from "../components/Layout/Index"
import Admin from "../components/Privilege/Admin"
import Coordinatior from "../components/Privilege/Coordinator"
import Manager_Head from "../components/Privilege/Manager_Head"
import Staff from "../components/Privilege/Staff/index"


export default function Privilege() {
    const [role, setRole] = useState(null)
    const [department, setDepartment] = useState(null)
    const { data: session, status } = useSession()
    const { data: User, isLoading, isSuccess } = useGetUserByEmailQuery(session?.user.email, {
        skip: !status === "authenticated"
    })
    console.log(role)
    useEffect(() => {
        if (isSuccess) {
            setRole(User?.Role?.name)
            setDepartment(User?.Department)
        }
    }, [isSuccess, User?.Department, User?.Role.name])

    return (
        <Layout>
            <Head>
                <title>GreenDea - Privilege - {role}</title>
            </Head>
            <div className='privilegeWrapper'>
                {!role && <div style={{ textAlign: "center" }}><Spin tip="Loading" size="large" style={{ margin: "300px auto 0 auto" }} /></div>}
                {role === "admin" && <Admin role={role} />}
                {role === "coordinator" && <Coordinatior department={department} role={role} />}
                {role === "staff" && <Staff department={department} role={role} />}

                {["manager", "head"].includes(role) && <Manager_Head role={role} department={department} />}
            </div>
        </Layout>
    )
}
