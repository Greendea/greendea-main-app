import prisma from "../prisma"

export const GetAllIdeas = async (req, res, userSession) => {
    return res.status(200).json(await getAllIdeas())
}

export const AddIdea = async (req, res, userSession) => {
    return res.status(200).json(await addIdea(req.body, req.files, userSession.id))
}

export const UpdateIdeaStatusById = async (req, res, userSession) => {
    return res.status(200).json(await updateIdeaStatusById(req.query.id, req.body.status))
}

export const GetPersonalIdea = async (req, res, userSession) => {
    return res.status(200).json(await getPersonalIdea(userSession.id))
}


export const getPersonalIdea = async (id) => {
    console.log(id)
    return await prisma.idea.findMany({
        where: {
            userId: id
        },
        select: {
            id: true,
            content: true,
            isAnomyous: true,
            status: true,
            Topic: {
                select: {
                    id: true,
                    name: true,
                    Department: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            files: {
                select: {
                    id: true,
                    url: true
                }
            },
            createdAt: true,
            updatedAt: true
        },
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
    })
}

export const addIdea = async ({ id, content, topic, isAnomyous }, files, userId) => {
    return await prisma.idea.create({
        data: {
            id: id.toString(), content, isAnomyous,
            Topic: {
                connect: {
                    id: topic
                }
            },
            files: files.length > 0 ? {
                create: files.map(item => {
                    return {
                        url: item
                    }
                })
            } : {},
            User: {
                connect: {
                    id: userId
                }
            }
        }
    })
}
export const getAllIdeas = async () => {
    return await prisma.idea.findMany({
        select: {
            id: true,
            content: true,
            isAnomyous: true,
            status: true,
            User: {
                select: {
                    id: true,
                    name: true
                }
            },
            Topic: {
                select: {
                    id: true,
                    name: true,
                    Department: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            files: {
                select: {
                    id: true,
                    url: true
                }
            },
            createdAt: true,
            updatedAt: true
        },
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
    })
}

export const updateIdeaStatusById = async (id, status) => {
    return await prisma.idea.update({
        where: {
            id: id
        },
        data: {
            status: status
        }
    })
}