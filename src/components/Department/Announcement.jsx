import AnnouncementForm from '../../components/Department/AnnouncementForm'
import AnnouncementTable from '../../components/Department/AnnouncementTable'
import React from 'react'

export default function Announcement({ department }) {
    return (
        <div>
            <AnnouncementForm department={department} />
            <AnnouncementTable department={department} editable={true} />
        </div>
    )
}
