import prisma from "../prisma"

export const GetAllDepartment = async (req, res, userSession) => {
    return res.status(200).json(await getAllDepartment())
}

export const GetDepartmentByID = async (req, res, userSession) => {
    return res.status(200).json(await getDepartmentByID(req.query.id))
}

export const AddDepartment = async (req, res, userSession) => {
    return res.status(200).json(await addDepartment(req.body))
}

export const UpdateDepartmentByID = async (req, res, userSession) => {
    return res.status(200).json(await updateDepartmentByID(req.query.id, req.body))
}

export const DeleteDepartmentByID = async (req, res, userSession) => {
    return res.status(200).json(await deleteDepartmentByID(req.query.id))
}






export const getAllDepartment = async () => {
    return await prisma.department.findMany({})
}


export const getDepartmentByID = async (id) => {
    console.log(id)
    console.log(await prisma.department.findUnique({
        where: {
            id: id
        }
    }))
    return await prisma.department.findFirst({
        where: {
            id: id
        }
    })
}

export const addDepartment = async ({ name, status }) => {
    return await prisma.department.create({
        data: {
            name, status
        }
    })
}

export const updateDepartmentByID = async (id, { name, status }) => {
    return await prisma.department.update({
        where: {
            id: id
        },
        data: {
            name, status
        }
    })
}

export const deleteDepartmentByID = async (id) => {
    return await prisma.department.delete({
        where: {
            id: id
        }
    })
}
