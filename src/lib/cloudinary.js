// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    secure: false,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Log the configuration
console.log(cloudinary.config());

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
        // throw new Error("Failed")
    }
};

// Gets details of an uploaded image
/////////////////////////////////////
// const getAssetInfo = async (publicId) => {
//     // Return colors in the response
//     const options = {
//         colors: true,
//     };

//     try {
//         // Get details about the asset
//         const result = await cloudinary.api.resource(publicId, options);
//         console.log(result);
//         return result.colors;
//     } catch (error) {
//         console.error(error);
//     }
// };


// // Main function
// (async () => {

//     // Set the image to upload
//     const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

//     // Upload the image
//     const publicId = await uploadImage(imagePath);

//     // Get the colors in the image
//     // const colors = await getAssetInfo(publicId);
//     // console.log(colors);
// })();