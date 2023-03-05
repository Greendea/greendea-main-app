import prisma from "../../lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { findUserByEmail } from "@/lib/Service/UserService"
import { UpsertReact } from "@/lib/Service/ReactService"


export default async function handler(req, res) {
    if (req.method != "POST") {
        res.status(400).json({
            message: "Method Not Found"
        })
    }

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

    if (req.method === "POST") {
        return UpsertReact(req, res, userSession)
    }
}