import prisma from "../../lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(401).json({
            message: "You are not authenticated"
        })
    }
    try {
        if (req.method === "PUT") {
            //updateavatar
            res.status(200).json(
                await prisma.user.update({
                    where: {
                        email: session.user.email
                    },
                    data: {
                        image: req.body.avatar
                    }

                })
            )

        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Server error!' });
    }

}
