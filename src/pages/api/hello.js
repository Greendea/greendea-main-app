// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { uploadImage } from "../../lib/cloudinary"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const uri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
    const result = await uploadImage(uri, {
      folder: "departmentA/topicB/IdeaC",
      public_id: "my_name"
    })
    console.log(result)
  }
  if (req.method === "POST") {
    res.status(200).json({ name: 'Success' })
  }
  res.status(200).json({ name: 'John Doe' })
}
