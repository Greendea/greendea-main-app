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


export const DeleteIdea = async (req, res, userSession) => {
    if (["admin", "manager", "head"].includes(userSession.Role.name)) {
        if (["manager", "head"].includes(userSession.Role.name)) {
            if (userSession.Department.id !== req.body.department) {
                return res.status(401).json({
                    message: "You are not authorized"
                })
            }
        }

        return res.status(200).json(await deleteIdea(req.query.id))

    }
    return res.status(401).json({
        message: "You are not authorized"
    })

}






export const getPersonalIdea = async (id) => {
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
            Category: {
                select: {
                    id: true,
                    name: true
                }
            },
            files: {
                select: {
                    id: true,
                    url: true
                }
            },
            views: {
                select: {
                    userId: true,
                }
            },
            reacts: {
                select: {
                    userId: true,
                    status: true,
                    User: {
                        select: {
                            email: true,
                            name: true,
                            image: true
                        }
                    },
                    createdAt: true,
                    updatedAt: true
                }
            },
            comments: {
                select: {
                    id: true,
                    isAnomyous: true,
                    User: {
                        select: {
                            email: true,
                            name: true,
                            image: true
                        }
                    },
                    createdAt: true,
                    updatedAt: true
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

export const addIdea = async ({ id, content, topic, category, isAnomyous }, files, userId) => {
    return await prisma.idea.create({
        data: {
            id: id.toString(), content, isAnomyous,
            Topic: {
                connect: {
                    id: topic
                }
            },
            Category: {
                connect: {
                    id: category
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
                    name: true,
                    email: true
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
                    },
                    closureDateTopic: true
                }
            },
            Category: {
                select: {
                    id: true,
                    name: true
                }
            },
            comments: {
                select: {
                    id: true
                }
            },
            files: {
                select: {
                    id: true,
                    url: true
                }
            },
            views: {
                select: {
                    userId: true,
                }
            },
            reacts: {
                select: {
                    userId: true,
                    status: true,
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


export const deleteIdea = async (id) => {
    return await prisma.idea.delete({
        where: {
            id
        }
    })
}


