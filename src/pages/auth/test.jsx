/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Spin } from "antd"



export default function Test() {
  const router = useRouter()
  const { data } = useSession()
  const [loading, setLoading] = useState(false)
  console.log(data)
  useEffect(() => {
    data && router.push("/")
  }, [data, router])

  const handleClick = (email) => {
    setLoading(true)
    signIn("credentials", { redirect: false, email }).then(res => {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }).catch(err => setLoading(false))
  }
  return (
    <div>
      <Head>
        <title>GreenDea - SIGNIN</title>
      </Head>
      <div className="wrapperLogin">
        <div className="login">
          <Spin spinning={loading}>
            <form>
              <img src="/logo.png" alt="logo" />
              <div className="button_wrapper" >
                <div onClick={() => handleClick("phamcaosang135@gmail.com")}>Admin</div>
              </div>
              <div className="button_wrapper" >
                <div onClick={() => handleClick("phamcaosang235@gmail.com")}>Manager / Head</div>
              </div>
              <div className="button_wrapper" >
                <div onClick={() => handleClick("sangpcgcs200809@fpt.edu.vn")}>Staff</div>
              </div>
            </form>
          </Spin>
        </div>
      </div>
    </div>
  )
}
