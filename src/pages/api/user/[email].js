import { findUserByEmail, GetUserByEmail } from "../../../lib/Service/UserService";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
const allowedMethods = ['GET'];

export default async function handler(req, res) {
    try {
        if (!allowedMethods.includes(req.method)) {
            return res.status(405).send({ message: 'Method not allowed.' });
        }

        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(401).json({
                message: "You are not authenticated"
            })
        }

        const userSession = await findUserByEmail(session.user.email)
        return await GetUserByEmail(req, res, userSession)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server error!', error: error });
    }
}