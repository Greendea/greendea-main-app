import { DeleteDepartmentByID, GetAllDepartment, GetDepartmentByID, UpdateDepartmentByID } from "@/lib/Service/DepartmentService";
import { GetAllUser, findUserByEmail } from "@/lib/Service/UserService";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
const allowedMethods = ['GET', 'PUT', 'DELETE'];

export default async function handler(req, res) {
    try {
        if (!allowedMethods.includes(req.method)) {
            return res.status(405).send({ message: 'Method not allowed.' });
        }

        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.status(404).json({
                message: "You are not authenticated"
            })
        }
        const userSession = await findUserByEmail(session.user.email)
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

        switch (req.method) {
            case 'GET':
                return GetDepartmentByID(req, res, userSession)
            case 'PUT':
                return UpdateDepartmentByID(req, res, userSession)
            case 'DELETE':
                return DeleteDepartmentByID(req, res, userSession)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server error!' });
    }
    return res.status(200).json({ name: 'John Doe' })
}


