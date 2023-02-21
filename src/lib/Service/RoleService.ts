import prisma from "../prisma"

export const GetAllRoles = async (req, res, userSession) => {
    return res.status(200).json(await getAllRoles())
}


export const getAllRoles = async () => {
    return await prisma.role.findMany({})
}
