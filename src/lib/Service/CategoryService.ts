import prisma from "../prisma"

export const AddCategory = async (req, res, userSession) => {
    if (userSession.Role.name !== "admin") {
        return res.status(401).json({
            message: "You are not authorized"
        })
    }
    return res.status(200).json(await addCategory(req.body))
}

export const EditCategory = async (req, res, userSession) => {
    if (userSession.Role.name !== "admin") {
        return res.status(401).json({
            message: "You are not authorized"
        })
    }
    return res.status(200).json(await editCategory(req.body))
}

export const GetAllCategories = async (req, res, userSession) => {
    return res.status(200).json(await getAllCategories())
}


export const DeleteCategory = async (req, res, userSession) => {
    if (userSession.Role.name !== "admin") {
        return res.status(401).json({
            message: "You are not authorized"
        })
    }
    return res.status(200).json(await deleteCategory(req.body.id))
}


export const addCategory = async ({ name }) => {
    return await prisma.category.create({
        data: {
            name
        }
    })
}

export const editCategory = async ({ id, name }) => {
    return await prisma.category.update({
        where: {
            id: id
        },
        data: {
            name
        }
    })
}

export const getAllCategories = async () => {
    return await prisma.category.findMany({
        orderBy: [
            {
                updatedAt: 'desc',
            },
            {
                createdAt: 'desc',
            },
        ],
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        }
    })
}

export const deleteCategory = async (id) => {
    return await prisma.category.delete({
        where: {
            id: id
        }
    })
}