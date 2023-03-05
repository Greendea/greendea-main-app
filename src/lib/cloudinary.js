import cloudinary from "cloudinary";

// Return "https" URLs by setting secure: true
cloudinary.v2.config({
    secure: false,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export default cloudinary;

export const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
};
// Uploads an image file
/////////////////////////
export const uploadImage = async (imagePath, cfg) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        // Upload the media
        const result = await cloudinary.uploader.upload(imagePath, { ...options, ...cfg });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error)
    }
};