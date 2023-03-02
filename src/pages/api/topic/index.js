import { AddTopic, EditTopic, GetAllTopics } from "@/lib/Service/TopicService";
import { findUserByEmail } from "@/lib/Service/UserService";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
const allowedMethods = ['POST', 'GET', "PUT"];

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
            case 'GET':
                return GetAllTopics(req, res, userSession)
            case 'POST':
                return AddTopic(req, res, userSession)
            case 'PUT':
                return EditTopic(req, res, userSession)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server error!' });
    }
    return res.status(200).json({ name: 'John Doe' })
}


