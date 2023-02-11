import AnnouncementTable from "@/components/Department/AnnouncementTable";
import DepartmentTable from "@/components/Department/DepartmentTable";
import React from "react"
import Layout from "../components/Layout/Index"


export default function department() {

    return (
        <Layout>
            <div className="departmentWrapper">
                <h1 style={{
                    textAlign: "center",
                    fontSize: 32,
                    margin: "15px 0"
                }}>
                    Department Of Human Resource
                </h1>

                <AnnouncementTable />
                <DepartmentTable />
            </div>
        </Layout>
    );
}
