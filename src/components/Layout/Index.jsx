/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import { Avatar, Breadcrumb, Layout, Menu, Spin, theme } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineDown, AiOutlinePlusSquare, AiOutlineHistory } from "react-icons/ai"
import { MdAdminPanelSettings } from "react-icons/md"
import { ImTree } from "react-icons/im"
import { FcIdea } from "react-icons/fc"
import Link from 'next/link';
import AvatarDrawer from './UserProfile/AvatarDrawer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useGetDepartmentsQuery } from '@/redux/apiSlicers/Department';

const { Header } = Layout;

const menu = (departments) => {
    return [
        {
            key: "Cat1",
            label: <Link href="/">Home</Link>,
            icon: <HomeOutlined />
        },
        {
            key: "Sub1",
            label: <><span>Departments</span></>,
            icon: <HiOutlineUserGroup />,
            children: departments?.map(department => {
                return {
                    key: `Sub-${department.id}`,
                    label: <Link href={`/department/${department.id}`}>{department.name}</Link>,
                }
            })

        }, {
            key: "Sub2",
            label: <><span>Your Idea</span></>,
            icon: <FcIdea />,
            children: [
                {
                    key: "Sub2-1",
                    label: <Link href="/idea">Submit A New Idea</Link>,
                    icon: <AiOutlinePlusSquare />
                },
                {
                    key: "Sub2-2",
                    label: "Your Past Ideas",
                    icon: <Link href="/past"><AiOutlineHistory /></Link>
                },
            ]
        }, {
            key: "Cat2",
            label: <Link href="/system">System</Link>,
            icon: < ImTree />
        },
        {
            key: "Cat3",
            label: <Link href="/privilege">Privilege</Link>,
            icon: <MdAdminPanelSettings />

        }
    ]
}

export default function Index({ children }) {
    const router = useRouter();
    const { status } = useSession();

    const { data: departments } = useGetDepartmentsQuery()

    if (status === "unauthenticated") {
        router.push("/api/auth/signin")
    }

    return (
        <Spin size='large' spinning={status !== "authenticated"} style={{ marginTop: 300 }}>
            {
                status === "authenticated" &&
                <Layout style={{
                    backgroundColor: "#fff"
                }}>
                    <Header style={{ position: 'sticky', top: 0, zIndex: 1, maxWidth: '1580px', position: "relative" }}>
                        <div
                            style={{
                                float: 'left',
                                width: 120,
                                height: "100%",
                            }}
                        >
                            <img src="https://www.gre.ac.uk/__data/assets/image/0035/265688/logo_final_on_white.png" alt=""
                                style={{
                                    width: "100%"
                                    // height: "100%"
                                }}
                            />
                        </div>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            items={menu(departments)}
                            style={{ marginRight: 50 }}
                        />
                        <AvatarDrawer />
                    </Header>
                    {children}
                </Layout>
            }
        </Spin>
    )
}
