import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Waiting() {
    const router = useRouter()
    const { id } = useSelector(state => state.user)
    useEffect(() => {
        id && router.push("/")
    }, [id])
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
                    </div>
                    <div class="dot-typing"></div>
                </form>
            </div>
        </div>
    )
}

export default Waiting