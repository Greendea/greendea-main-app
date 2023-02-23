import prisma from "../../lib/prisma"


export default async function handler(req, res) {
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
    } else {
        res.status(200).json(
            await prisma.termAndCondition.findUnique({
                where: {
                    id: 0
                },
            })
        )
    }
}
