import prisma from "../prisma"

export const AddComment = async (req, res, userSession) => {
    return res.status(200).json(await addComment(req.body.idea, userSession.id, req.body.content, req.body.isAnomyous))
}
export const GetCommentsByIdea = async (req, res, userSession) => {
    const comments = await getCommentsByIdea(req.query.ideaId)
    return res.status(200).json(comments.map(cm => {
        return {
            ...cm,
            User: cm.isAnomyous ? null : cm.User
        }
    }))
}

export const addComment = async (idea, user, content, isAnomyous) => {
    return await prisma.comment.create({
        data: {
            ideaId: idea,
            userId: user,
            content,
            isAnomyous
        }
    })
}

export const getCommentsByIdea = async (idea) => {
    return await prisma.comment.findMany({
        where: {
            ideaId: idea
        },
        select: {
            id: true,
            User: {
                select: {
                    id: true,
                    name: true,
                    image: true
                }
            },
            isAnomyous: true,
            content: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],

    })
}