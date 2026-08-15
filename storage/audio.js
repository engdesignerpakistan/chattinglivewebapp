// storage/audio.js

const supabase = require("../config/supabase");


// Storage Bucket Name
const BUCKET = "audio";



// ===============================
// Audio Validation
// ===============================

function validateAudio(file) {


    const allowedTypes = [

        "audio/mpeg",
        "audio/mp3",
        "audio/wav",
        "audio/ogg",
        "audio/webm",
        "audio/mp4"

    ];


    const maxSize = 25 * 1024 * 1024; // 25MB



    if(!allowedTypes.includes(file.mimetype)) {

        throw new Error(
            "Invalid audio format"
        );

    }



    if(file.size > maxSize) {

        throw new Error(
            "Audio size must be less than 25MB"
        );

    }



    return true;

}



// ===============================
// Upload Audio
// ===============================

async function uploadAudio(userId,file){


    validateAudio(file);



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

        url:getAudioURL(
            data.path
        )

    };


}



// ===============================
// Generate Audio URL
// ===============================

function getAudioURL(path){


    const {data}=

    supabase
    .storage
    .from(BUCKET)
    .getPublicUrl(path);



    return data.publicUrl;


}




// ===============================
// Download Audio
// ===============================

async function downloadAudio(path){


    const {data,error}=

    await supabase
    .storage
    .from(BUCKET)
    .download(path);



    if(error)
        throw error;



    return data;

}





// ===============================
// Delete Audio
// ===============================

async function deleteAudio(path){


    const {data,error}=

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
// Get User Audio Files
// ===============================

async function getUserAudio(userId){



    const {data,error}=

    await supabase
    .storage
    .from(BUCKET)
    .list(userId);




    if(error)
        throw error;





    return data.map(audio=>({


        name:audio.name,


        path:
        `${userId}/${audio.name}`,


        url:
        getAudioURL(
            `${userId}/${audio.name}`
        )


    }));



}




// ===============================
// Voice Message Upload
// ===============================

async function uploadVoiceMessage(
    userId,
    file
){


    return await uploadAudio(
        userId,
        file
    );


}



// ===============================
// Export
// ===============================

module.exports = {


    uploadAudio,

    uploadVoiceMessage,

    downloadAudio,

    deleteAudio,

    getAudioURL,

    getUserAudio,

    validateAudio


};