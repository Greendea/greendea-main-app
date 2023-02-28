import { Inter } from '@next/font/google'
import Layout from "../components/Layout/Index"
import SearchForm from '@/components/GenericUsage/SearchForm'
import ListTopic from '@/components/Home/ListTopic'
import Head from 'next/head'



export default function Home() {


  return (
    <>
      <Layout>
        <Head>
          <title>GreenDea - Home</title>
        </Head>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SearchForm />
          <ListTopic />
        </div>
      </Layout>
    </>
  )
}

// export const getStaticProps = async () => {
//   const feed = await prisma.post.findMany({
//     where: { published: true },
//     include: {
//       author: {
//         select: { name: true },
//       },
//     },
//   });
//   return {
//     props: { feed },
//     revalidate: 10,
//   };
// };
