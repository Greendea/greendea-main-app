import prisma from "../prisma"

export const AddView = async (req, res, userSession) => {
    return res.status(200).json(await addView(req.body.idea, userSession.id))
}

export const addView = async (idea, user) => {
    return await prisma.view.create({
        data: {
            ideaId: idea,
            userId: user
        }
    })
}