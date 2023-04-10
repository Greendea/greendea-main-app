import prisma from "../../lib/prisma"

export default async function handler(req, res) {
    try {
        if (req.query.type === '1') {
            return res.status(200).json({
                reacts: await prisma.react.findMany({
                    select: {
                        status: true
                    }
                }),
                commentData: await prisma.comment.findMany({
                    select: {
                        id: true
                    }
                })
            })
        }
        if (req.query.type === '2') { //GET anomyous comment by department
            return res.status(200).json({
                data: await prisma.comment.findMany({
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        Idea: {
                            select: {
                                id: true,
                                content: true,
                                Topic: {
                                    select: {
                                        id: true,
                                        closureDateTopic: true
                                    }
                                }
                            }
                        }
                    },
                    where: {
                        Idea: {
                            Topic: {
                                departmentId: {
                                    equals: req.query.department
                                }
                            }
                        },
                        isAnomyous: {
                            equals: true
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
            }

            )
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Server error!' });
    }

}
