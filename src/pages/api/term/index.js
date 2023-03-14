import prisma from "../../../lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { findUserByEmail } from "../../../lib/Service/UserService"


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(401).json({
            message: "You are not authenticated"
        })
    }
    const userSession = await findUserByEmail(session.user.email)
    if (!userSession.Role) {
        return res.status(401).json({
            message: "You are not authorized"
        })
    }

    if (req.method === "POST" || req.method === "DELETE") {
        res.status(400).json({
            message: "Method Not Found"
        })
    }

    if (req.method === "PUT") {
        res.status(200).json({
            data: await prisma.termAndCondition.update({
                where: {
                    id: 0
                },
                data: {
                    description: req.body.description
                }
            })
        })
    }

    if (req.method === "GET") {
        res.status(200).json(
            await prisma.termAndCondition.findUnique({
                where: {
                    id: 0
                },
            })
        )
    }
}
