import prisma from "../../lib/prisma"

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            let data = await prisma.topic.findMany({
                select: {
                    id: true,
                    name: true,
                    openDate: true,
                    closureDateIdea: true,
                    closureDateTopic: true,
                    Department: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    ideas: {
                        select: {
                            id: true,
                            views: {
                                select: {
                                    id: true
                                }
                            },
                            reacts: {
                                select: {
                                    id: true,
                                    status: true
                                }
                            },
                            comments: {
                                select: {
                                    id: true
                                }
                            }
                        },
                        where: {
                            status: {
                                equals: 1
                            }
                        }
                    },
                    User: {
                        select: {
                            name: true
                        }
                    },
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
            data = data.map(item => {
                return {
                    ...item,
                    noideas: item.ideas.length,
                    ideas: item.ideas.map(idea => {
                        return {
                            views: idea.views.length,
                            likes: idea.reacts.filter(i => i.status === 1).length,
                            dislikes: idea.reacts.filter(i => i.status === -1).length,
                            comments: idea.comments.length
                        }
                    }).reduce((x, y) => {
                        return {
                            views: x.views + y.views,
                            likes: x.likes + y.likes,
                            dislikes: x.dislikes + y.dislikes,
                            comments: x.comments + y.comments
                        }

                    }, {
                        views: 0, likes: 0, dislikes: 0, comments: 0
                    })
                }
            })
            return res.status(200).json(data)
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Server error!' });
    }

}
