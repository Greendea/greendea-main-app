import prisma from "../prisma"
export const GetAllUser = async (req, res, userSession) => {
    if (!userSession.Role) {
        return res.status(404).json({
            message: "You are not authorized"
        })
    } else {
        // if (userSession.Role.name) {
        //     return res.status(404).json({
        //         message: "You are not authorized"
        //     })
        // }
    }
    const users = await getAllUsers()
    return res.status(200).json(users)
}

export const GetUserByEmail = async (req, res, userSession) => {
    if (userSession.email === req.query.email) {
        return res.status(200).json(await findUserByEmail(req.query.email))
    } else {
        if (userSession.Role) {
            if (userSession.Role.name === "admin") {
                return res.status(200).json(await findUserByEmail(req.query.email))
            }
        }
    }
    return res.status(404).json({
        message: "You are not authorized"
    })

}


export const UpdateUser = async (req, res, userSession) => {
    if (!userSession.Role) {
        return res.status(404).json({
            message: "You are not authorized"
        })
    }
    if (userSession.Role.name !== "admin") {
        return res.status(404).json({
            message: "You are not authorized"
        })
    }
    const user = await updateUserById(req.body.id, req.body)

    return res.status(200).json({ user })
}




export const updateUserById = async (id, { department, role, status }) => {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            Department: department ? { connect: { id: department } } : { disconnect: true },
            Role: role ? { connect: { id: role } } : { disconnect: true },
            status: status
        }
    })
}

export const findUserByEmail = async (email) => {
    return await prisma.user.findFirst({
        where: {
            email: email
        },
        select: {
            id: true,
            name: true,
            image: true,
            email: true,
            status: true,
            Role: {
                select: {
                    id: true,
                    name: true
                }
            },
            Department: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
}

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            email: true,
            status: true,
            Role: {
                select: {
                    id: true,
                    name: true
                }
            },
            Department: {
                select: {
                    id: true,
                    name: true
                }
            }

        }
    })
}