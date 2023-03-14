import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react';



export default function Waiting() {
    const router = useRouter()
    const { data: session } = useSession()
    console.log(session)
    useEffect(() => {
        if (session === null) {
            router.push("/")
        }
    }, [])
    return (
        <div className='waiting-wrapper'>
            <Head>
                <title>
                    GreenDea - WAITING
                </title>
            </Head>
            <div class="waiting">
                <form>
                    <div class="title">
                        <img src="/logowaiting.png" />
                        <h1>Please wait for the admin to set your role and department.</h1>
                        <h1>Come back later!</h1>
                        <button type='button'
                            onClick={() => {
                                signOut().then(res => {
                                    console.log(res)
                                    localStorage.clear()
                                }).catch(err => {
                                    console.log(err)
                                })

                            }}>Logout current account</button>
                    </div>
                    <div class="dot-typing"></div>
                </form>
            </div>
        </div>
    )
}