// storage/videos.js

const supabase = require("../config/supabase");


// Storage Bucket Name
const BUCKET = "videos";


// ===============================
// Video Validation
// ===============================

function validateVideo(file) {

    const allowedTypes = [
        "video/mp4",
        "video/webm",
        "video/quicktime",
        "video/x-msvideo"
    ];


    const maxSize = 100 * 1024 * 1024; // 100MB


    if (!allowedTypes.includes(file.mimetype)) {
        throw new Error("Invalid video format");
    }


    if (file.size > maxSize) {
        throw new Error(
            "Video size must be less than 100MB"
        );
    }


    return true;

}



// ===============================
// Upload Video
// ===============================

async function uploadVideo(userId, file) {


    validateVideo(file);



    const fileName =
        `${userId}/${Date.now()}-${file.originalname}`;



    const {data,error} =
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

        url:getVideoURL(
            data.path
        )

    };

}




// ===============================
// Generate Video URL
// ===============================

function getVideoURL(path){


    const {data} =
    supabase
    .storage
    .from(BUCKET)
    .getPublicUrl(path);



    return data.publicUrl;

}





// ===============================
// Download Video
// ===============================

async function downloadVideo(path){


    const {data,error} =
    await supabase
    .storage
    .from(BUCKET)
    .download(path);



    if(error)
        throw error;



    return data;

}




// ===============================
// Delete Video
// ===============================

async function deleteVideo(path){


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
// Get User Videos
// ===============================

async function getUserVideos(userId){


    const {data,error} =
    await supabase
    .storage
    .from(BUCKET)
    .list(userId);



    if(error)
        throw error;



    return data.map(video=>({

        name:video.name,


        path:
        `${userId}/${video.name}`,


        url:
        getVideoURL(
            `${userId}/${video.name}`
        )

    }));

}




// ===============================
// Export
// ===============================

module.exports = {


    uploadVideo,

    downloadVideo,

    deleteVideo,

    getVideoURL,

    getUserVideos,

    validateVideo

};