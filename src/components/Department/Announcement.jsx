import AnnouncementForm from '../../components/Department/AnnouncementForm'
import AnnouncementTable from '../../components/Department/AnnouncementTable'
import React from 'react'

export default function Announcement({ department, role }) {
    return (
        <div>
            {
                role !== "staff" &&
                <AnnouncementForm department={department} />
            }
            <AnnouncementTable department={department} editable={role !== "staff"} deletable={["admin", "head", "manager"].includes(role)} />
        </div>
    )
}