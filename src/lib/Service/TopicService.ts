import prisma from "../prisma"

export const AddTopic = async (req, res, userSession) => {
    return res.status(200).json(await addTopic(req.body, userSession.id))
}

export const EditTopic = async (req, res, userSession) => {
    return res.status(200).json(await editTopic(req.body))
}

export const GetAllTopics = async (req, res, userSession) => {
    return res.status(200).json(await getAllTopics())
}



export const addTopic = async ({ name, openDate, closureDateIdea, closureDateTopic, department }, user) => {
    return await prisma.topic.create({
        data: {
            name,
            openDate,
            closureDateIdea,
            closureDateTopic,
            Department: {
                connect: {
                    id: department
                }
            },
            User: {
                connect: {
                    id: user
                }
            }
        }
    })
}

export const editTopic = async ({ id, name, openDate, closureDateIdea, closureDateTopic }) => {
    return await prisma.topic.update({
        where: {
            id: id
        },
        data: {
            name,
            openDate,
            closureDateIdea,
            closureDateTopic,
        }
    })
}

export const getAllTopics = async () => {
    return await prisma.topic.findMany({
        orderBy: [
            {
                closureDateTopic: 'desc',
            },
            {
                closureDateIdea: 'desc',
            },
        ],
        select: {
            id: true,
            name: true,
            closureDateIdea: true,
            openDate: true,
            closureDateTopic: true,
            createdAt: true,
            updatedAt: true,
            Department: {
                select: {
                    id: true,
                    name: true
                }
            },
            User: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
}