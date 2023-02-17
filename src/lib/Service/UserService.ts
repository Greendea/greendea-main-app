import prisma from "../prisma"
export const GetAllUser = async (req, res, userSession) => {
    if (!userSession.Role) {
        return res.status(404).json({
            message: "You are not authorized"
        })
    } else {
        if (userSession.Role.name !== "admin") {
            return res.status(404).json({
                message: "You are not authorized"
            })
        }
    }
    const users = await getAllUsers()
    return res.status(200).json(users)
}

export const GetUserByEmail = async (req, res, userSession) => {
    console.log("userSession", userSession)
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
    return res.status(200).json({ name: 'John Doe' })
}




export const updateUserById = async (req, res, userSession) => {
    return res.status(200).json({ name: 'John Doe' })
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
                    name: true
                }
            },
            Department: {
                select: {
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
                    name: true
                }
            },
            Department: {
                select: {
                    name: true
                }
            }

        }
    })
}