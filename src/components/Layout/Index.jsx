/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineDown, AiOutlinePlusSquare, AiOutlineHistory } from "react-icons/ai"
import { MdAdminPanelSettings } from "react-icons/md"
import { ImTree } from "react-icons/im"
import { FcIdea } from "react-icons/fc"
import Link from 'next/link';
import AvatarDrawer from './UserProfile/AvatarDrawer';

const { Header, Content, Footer } = Layout;
function ArrowDown() {
    return <AiOutlineDown style={{ position: "relative", top: 1, fontSize: 10 }} />
}

const menu = [
    {
        key: "Cat1",
        label: <Link href="/">Home</Link>,
        icon: <HomeOutlined />
    },
    {
        key: "Sub1",
        label: <><span>Departments</span></>,
        icon: <HiOutlineUserGroup />,
        children: [
            {
                key: "Sub1-1",
                label: <Link href="/department">Department A</Link>,
            },
            {
                key: "Sub1-2",
                label: <Link href="/department">Department B</Link>,
            },
            {
                key: "Sub1-3",
                label: <Link href="/department">Department C</Link>,
            }
        ]

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
                icon: <AiOutlineHistory />
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


export default function index({ children }) {
    return (
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
                    items={menu}
                    style={{ marginRight: 50 }}
                />
                <AvatarDrawer />
            </Header>
            {children}
        </Layout>
    )
}
