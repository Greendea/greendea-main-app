import Layout from "../components/Layout/Index"
import SearchForm from '../components/Home/SearchForm'
import ListTopic from '../components/Home/ListTopic'
import Head from 'next/head'
import { useState } from "react"



export default function Home({ topics }) {
  const [filterSearch, setFilterSearch] = useState(null)
  console.log(topics.map(i => i.name))
  console.log(filterSearch)
  // console.log(topics.filter(tp => tp.name.includes(filterSearch?.toLowerCase())))

  return (
    <>
      <Layout>
        <Head>
          <title>GreenDea - Home</title>
        </Head>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SearchForm setFilterSearch={setFilterSearch} />
          {
            topics &&
            <ListTopic topics={!filterSearch ? topics : topics.filter(tp => tp.name.toLowerCase().includes(filterSearch?.toLowerCase()))} />
          }
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const res = () => fetch(`${process.env.BE_URL}api/home`).then(res => res.json())

  return {
    props: { topics: await res() },
    revalidate: 5,
  };
};
