import { GetAllRoles } from "../../../lib/Service/RoleService";
import { GetAllUser, findUserByEmail } from "../../../lib/Service/UserService";
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

        return GetAllRoles(req, res, authOptions)

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server error!' });
    }
    return res.status(200).json({ name: 'John Doe' })
}


