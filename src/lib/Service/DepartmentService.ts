import prisma from "../prisma"

export const GetAllDepartment = async (req, res, userSession) => {
    return res.status(200).json(await getAllDepartment())
}

export const GetDepartmentByID = async (req, res, userSession) => {
    return res.status(200).json(await getDepartmentByID(req.query.id))
}

export const AddDepartment = async (req, res, userSession) => {
    if (await getDepartmentByName(req.body.name)) {
        return res.status(400).json({
            message: "Department Name Existed"
        })
    }
    return res.status(200).json(await addDepartment(req.body))
}

export const UpdateDepartmentByID = async (req, res, userSession) => {
    return res.status(200).json(await updateDepartmentByID(req.query.id, req.body))
}

export const DeleteDepartmentByID = async (req, res, userSession) => {
    return res.status(200).json(await deleteDepartmentByID(req.query.id))
}






export const getAllDepartment = async () => {
    return await prisma.department.findMany({
        select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            status: true,
            topics: {
                select: {
                    id: true,
                    ideas: {
                        select: {
                            id: true
                        },
                        where: {
                            NOT: {
                                status: {
                                    equals: -1
                                }
                            }
                        }
                    }
                }
            },
            users: {
                select: {
                    id: true
                }
            }
        },
        orderBy: [
            {
                updated_at: 'desc',
            },
            {
                created_at: 'desc',
            },
        ],
    })
}


export const getDepartmentByID = async (id) => {
    return await prisma.department.findFirst({
        where: {
            id: id
        }
    })
}

export const getDepartmentByName = async (name) => {
    return await prisma.department.findFirst({
        where: {
            name: name
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
