import prisma from "../prisma"

export const UpsertReact = async (req, res, userSession) => {
    return res.status(200).json(await upsertReact(req.body.idea, userSession.id, req.body.status))
}

export const upsertReact = async (idea, user, status) => {
    if (status === 0) {
        return await prisma.react.delete({
            where: {
                ideaId_userId: {
                    ideaId: idea,
                    userId: user
                }
            }
        })
    }
    return await prisma.react.upsert({
        where: {
            ideaId_userId: {
                ideaId: idea,
                userId: user
            }
        },
        update: {
            status: status
        },
        create: {
            ideaId: idea,
            userId: user,
            status: status
        }
    })
}