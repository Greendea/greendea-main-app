import { AddComment, DeleteComment, GetCommentsByIdea } from "../../../lib/Service/CommentService";
import { findUserByEmail } from "../../../lib/Service/UserService";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
const allowedMethods = ['POST', 'DELETE'];

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
        switch (req.method) {
            case 'POST':
                return AddComment(req, res, userSession)
            case 'DELETE':
                return DeleteComment(req, res, userSession)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server error!' });
    }
    return res.status(200).json({ name: 'John Doe' })
}


