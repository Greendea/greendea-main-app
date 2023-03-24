import prisma from "../../lib/prisma"

export default async function handler(req, res) {
    try {
        if (req.query.type === '1') {
            return res.status(200).json({
                reacts: await prisma.react.findMany({
                    select: {
                        status: true
                    }
                }),
                commentData: await prisma.comment.findMany({
                    select: {
                        id: true
                    }
                })
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Server error!' });
    }

}
