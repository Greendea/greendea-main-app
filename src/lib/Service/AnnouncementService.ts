import prisma from "../prisma"

export const GetAllAnnouncement = async (req, res, userSession) => {
    return res.status(200).json(await getAllAnnouncement())
}

export const AddAnnouncement = async (req, res, userSession) => {
    return res.status(200).json(await addAnnouncement(req.body))
}

export const UpdateAnnouncementByID = async (req, res, userSession) => {
    return res.status(200).json(await updateAnnouncementByID(req.query.id, req.body))
}

export const DeleteAnnouncementByID = async (req, res, userSession) => {
    return res.status(200).json(await deleteAnnouncementByID(req.query.id))
}




export const getAllAnnouncement = async () => {
    return await prisma.announcement.findMany({
        orderBy: [
            {
                updatedAt: 'desc',
            },
            {
                createdAt: 'desc',
            },
        ],
        select: {
            id: true, title: true, content: true, createdAt: true, updatedAt: true,
            Department: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
}


export const addAnnouncement = async ({ title, content, department }) => {
    return await prisma.announcement.create({
        data: {
            title, content,
            Department: {
                connect: {
                    id: department
                }
            }
        }
    })
}

export const updateAnnouncementByID = async (id, { title, content }) => {
    console.log("req.query.id", id)
    return await prisma.announcement.update({
        where: {
            id: id
        },
        data: {
            title, content
        }
    })
}

export const deleteAnnouncementByID = async (id) => {
    return await prisma.announcement.delete({
        where: {
            id: id
        }
    })
}
