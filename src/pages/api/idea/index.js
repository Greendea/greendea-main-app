import cloudinary, { uploadImage } from "@/lib/cloudinary";
import { DeleteDepartmentByID, GetAllDepartment, GetDepartmentByID, UpdateDepartmentByID } from "@/lib/Service/DepartmentService";
import { AddIdea, GetAllIdeas, GetPersonalIdea } from "@/lib/Service/IdeaService";
import { GetAllUser, findUserByEmail } from "@/lib/Service/UserService";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
const allowedMethods = ['POST', "GET"];

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb',
        },
    },
}

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
        if (req.method === "POST") {
            const files = req.body.files
            console.log(files.length)
            const uploadedFiles = await Promise.all(files.map(async (item) => {
                let { secure_url } = await cloudinary.uploader.upload(item.url, {
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                    public_id: item.name
                })
                console.log(secure_url)
                return secure_url
            }))

            console.log(uploadedFiles)
            // if (files.length > 0) {
            //     for (let item of files) {
            //         // let { secure_url } = await uploadImage(item.url, {
            //         //     public_id: item.name
            //         // })
            //         let { secure_url } = await cloudinary.uploader.upload(item.url, {
            //             use_filename: true,
            //             unique_filename: false,
            //             overwrite: true,
            //             public_id: item.name
            //         })
            //         uploadedFiles.push(secure_url)
            //     }
            // }
            req.files = uploadedFiles
            return AddIdea(req, res, userSession)
        }

        if (req.method === "GET") {
            if (req.query.personal) {
                return GetPersonalIdea(req, res, userSession)
            }
            return GetAllIdeas(req, res, userSession)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Server error!' });
    }
    return res.status(200).json({ name: 'John Doe' })
}


