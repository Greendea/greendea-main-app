/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Avatar, Breadcrumb, Layout, Menu, message, Spin, theme } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineDown, AiOutlinePlusSquare, AiOutlineHistory } from "react-icons/ai"
import { MdAdminPanelSettings } from "react-icons/md"
import { ImTree } from "react-icons/im"
import { FcIdea, FcStatistics } from "react-icons/fc"
import Link from 'next/link';
import AvatarDrawer from './UserProfile/AvatarDrawer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useGetDepartmentsQuery } from '../../redux/apiSlicers/Department';

const { Header } = Layout;

const menu = (departments) => {
    return [
        {
            key: "Cat1",
            label: <Link href="/" >Home</Link>,
            icon: <HomeOutlined />
        },
        {
            key: "Sub2",
            label: <><span>Top and Latest Ideas</span></>,
            icon: <FcStatistics />,
            children: [
                {
                    key: "Sub2-111",
                    label: <Link href="/ideas/popular">Popular Ideas</Link>,
                },
                {
                    key: "Sub2-222",
                    label: <Link href="/ideas/views">Most Viewed Ideas</Link>,
                },
                {
                    key: "Sub2-333",
                    label: <Link href="/ideas/latest">Latest Ideas</Link>,
                },
            ]
        },
        {
            key: "Sub1",
            label: <><span>Departments</span></>,
            icon: <HiOutlineUserGroup />,
            children: departments?.map(department => {
                return {
                    key: `Sub-${department.id}`,
                    label: <Link href={`/department/${department.id}`} replace={true}>{department.name}</Link>,
                }
            })
        },
        {
            key: "Sub3",
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
        },
        {
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
            {/* <VoiceControl> */}
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
            {/* </VoiceControl> */}
        </Spin>
    )
}


// function VoiceControl({ children }) {
//     const [recognition, setRecognition] = useState(null)
//     const [transcript, setTranscript] = useState('');
//     const [recording, setRecording] = useState(false)

//     useEffect(() => {
//         const reg = new webkitSpeechRecognition();
//         reg.continuous = true;
//         reg.interimResults = true;
//         reg.onstart = function () {
//             setRecording(true)
//             console.log('Speech recognition has started');
//         }
//         reg.onerror = function (event) {
//             setRecording(false)
//             setTranscript(null)
//             console.log('Speech recognition error: ' + event.error);
//             message.warning("Micro not allowed, please enable micro")
//         }

//         reg.onend = function () {
//             setRecording(false)
//             setTranscript(null)
//             console.log('Speech recognition has ended');
//         }

//         reg.onresult = (event) => {
//             let interimTranscript = '';
//             let finalTranscript = '';
//             for (let i = event.resultIndex; i < event.results.length; i++) {
//                 if (event.results[i].isFinal) {
//                     finalTranscript += event.results[i][0].transcript;
//                     console.log(finalTranscript)
//                     setTranscript(finalTranscript)
//                 } else {
//                     interimTranscript += event.results[i][0].transcript;
//                     console.log(interimTranscript)
//                     setTranscript(interimTranscript)
//                 }
//             }
//         };
//         setRecognition(reg)
//     }, []);
//     return (
//         <>
//             {children}
//             <div style={{ position: "fixed", right: 5, bottom: 10, zIndex: 100, width: "fit-content", cursor: "pointer" }} >
//                 <div style={{ overflow: "visible", width: 50 }}>
//                     {
//                         recognition &&
//                         (

//                             recording ?
//                                 <img src={"sound_gif.gif"} alt="micro" style={{ widtth: 50, height: 50 }} onClick={() => recognition.stop()} />
//                                 :
//                                 <img src={'/voice_icon.svg'} alt="micro" style={{ widtth: 50, height: 50 }} onClick={() => recognition.start()} />
//                         )
//                     }
//                     <div style={{ position: "relative" }}>
//                         {transcript}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
