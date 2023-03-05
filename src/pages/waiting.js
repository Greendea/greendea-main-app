import Head from 'next/head'
import React from 'react'

function Waiting() {
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
                        <h1>Please wait for the admin to set your role and department!</h1>
                    </div>
                    <div class="dot-typing"></div>
                </form>
            </div>
        </div>
    )
}

export default Waiting