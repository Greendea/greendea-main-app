import AnnouncementTable from "@/components/Department/AnnouncementTable";
import DepartmentTableIdeaTopic from "@/components/Department/DepartmentTableIdeaTopic";
import { useGetDepartmentByIdQuery } from "@/redux/apiSlicers/Department";
import { useRouter } from "next/router";
import React from "react"
import Layout from "../../components/Layout/Index"

export default function Department() {
    const router = useRouter()
    const { id } = router.query
    const { data, isLoading, isSuccess } = useGetDepartmentByIdQuery(id, {
        skip: !id
    })
    console.log(data)

    return (
        <Layout>
            <div className="departmentWrapper">
                <h1 style={{
                    textAlign: "center",
                    fontSize: 32,
                    margin: "15px 0"
                }}>
                    {data?.name}
                </h1>
                {
                    isSuccess &&
                    <>
                        <AnnouncementTable department={{ id: data.id, name: data.name }} />
                        <DepartmentTableIdeaTopic department={{ id: data.id, name: data.name }} editable={false} />
                    </>

                }

            </div>
        </Layout>
    );
}
