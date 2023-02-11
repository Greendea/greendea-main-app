import Head from 'next/head'
import { Inter } from '@next/font/google'
import Layout from "../components/Layout/Index"
import SearchForm from '@/components/GenericUsage/SearchForm'
import ListIdea from '@/components/Home/ListIdea'
import ListTopic from '@/components/Home/ListTopic'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      <Layout>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SearchForm />
          <ListTopic />
        </div>
      </Layout>
    </>
  )
}
