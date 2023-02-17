import { Inter } from '@next/font/google'
import Layout from "../components/Layout/Index"
import SearchForm from '@/components/GenericUsage/SearchForm'
import ListTopic from '@/components/Home/ListTopic'

import primas from "../lib/prisma"
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useGetUsersQuery } from '@/redux/apiSlicers/User'



export default function Home() {

  // const { data, isLoading } = useGetUsersQuery()
  // console.log(data, isLoading)

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
