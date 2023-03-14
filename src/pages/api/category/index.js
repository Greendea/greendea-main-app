import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { findUserByEmail } from "../../../lib/Service/UserService"
import { AddCategory, DeleteCategory, EditCategory, GetAllCategories } from "../../../lib/Service/CategoryService"


export default async function handler(req, res) {
    try {
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

        switch (req.method) {
            case 'GET':
                return GetAllCategories(req, res, userSession)
            case 'POST':
                return AddCategory(req, res, userSession)
            case 'PUT':
                return EditCategory(req, res, userSession)
            case 'DELETE':
                return DeleteCategory(req, res, userSession)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server error!' });
    }
}
