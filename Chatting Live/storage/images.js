// storage/images.js

const supabase = require("../config/supabase");

// Storage Bucket Name
const BUCKET = "images";


// ===============================
// Image Validation
// ===============================

function validateImage(file) {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif"
    ];

    const maxSize = 5 * 1024 * 1024; // 5MB


    if (!allowedTypes.includes(file.mimetype)) {
        throw new Error("Invalid image format");
    }


    if (file.size > maxSize) {
        throw new Error("Image size must be less than 5MB");
    }


    return true;
}



// ===============================
// Upload Image
// ===============================

async function uploadImage(userId, file) {

    validateImage(file);


    const fileName =
        `${userId}/${Date.now()}-${file.originalname}`;


    const { data, error } =
        await supabase
        .storage
        .from(BUCKET)
        .upload(
            fileName,
            file.buffer,
            {
                contentType:file.mimetype
            }
        );


    if(error)
        throw error;



    return {
        path:data.path,
        url:getImageURL(data.path)
    };
}



// ===============================
// Get Image URL
// ===============================

function getImageURL(path){

    const { data } =
    supabase
    .storage
    .from(BUCKET)
    .getPublicUrl(path);


    return data.publicUrl;

}



// ===============================
// Download Image
// ===============================

async function downloadImage(path){

    const { data,error } =
    await supabase
    .storage
    .from(BUCKET)
    .download(path);


    if(error)
        throw error;


    return data;

}



// ===============================
// Delete Image
// ===============================

async function deleteImage(path){


    const {data,error} =
    await supabase
    .storage
    .from(BUCKET)
    .remove([
        path
    ]);


    if(error)
        throw error;


    return true;

}



// ===============================
// Get User Images
// ===============================

async function getUserImages(userId){


    const {data,error} =
    await supabase
    .storage
    .from(BUCKET)
    .list(userId);



    if(error)
        throw error;



    return data.map(image=>({

        name:image.name,

        path:
        `${userId}/${image.name}`,

        url:
        getImageURL(
            `${userId}/${image.name}`
        )

    }));

}



// ===============================
// Export Functions
// ===============================

module.exports = {

    uploadImage,

    downloadImage,

    deleteImage,

    getImageURL,

    getUserImages,

    validateImage

};