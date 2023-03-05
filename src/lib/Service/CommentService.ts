import prisma from "../prisma"

export const AddComment = async (req, res, userSession) => {
    return res.status(200).json(await addComment(req.body.idea, userSession.id, req.body.content))
}
export const GetCommentsByIdea = async (req, res, userSession) => {
    return res.status(200).json(await getCommentsByIdea(req.query.ideaId))
}

export const addComment = async (idea, user, content) => {
    return await prisma.comment.create({
        data: {
            ideaId: idea,
            userId: user,
            content: content
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