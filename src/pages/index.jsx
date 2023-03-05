import { Inter } from '@next/font/google'
import Layout from "../components/Layout/Index"
import SearchForm from '@/components/GenericUsage/SearchForm'
import ListTopic from '@/components/Home/ListTopic'
import Head from 'next/head'



export default function Home({ topics }) {

  return (
    <>
      <Layout>
        <Head>
          <title>GreenDea - Home</title>
        </Head>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SearchForm />
          {
            topics &&
            <ListTopic topics={topics} />
          }
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async () => {
  const res = () => fetch("http://localhost:3000/api/home").then(res => res.json())

  return {
    props: { topics: await res() },
    // revalidate: 15,
  };
};
