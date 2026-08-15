// storage/avatars.js

const supabase = require("../config/supabase");


// Storage Bucket Name
const BUCKET = "avatars";


// Default Avatar
const DEFAULT_AVATAR =
"https://your-domain.com/default-avatar.png";




// ===============================
// Avatar Validation
// ===============================

function validateAvatar(file){


    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/webp"

    ];


    const maxSize = 5 * 1024 * 1024; // 5MB



    if(!allowedTypes.includes(file.mimetype)){

        throw new Error(
            "Only JPG, PNG and WEBP images allowed"
        );

    }



    if(file.size > maxSize){

        throw new Error(
            "Avatar size must be less than 5MB"
        );

    }



    return true;

}




// ===============================
// Upload Avatar
// ===============================

async function uploadAvatar(
    userId,
    file
){


    validateAvatar(file);



    const fileName =

    `${userId}/avatar-${Date.now()}-${file.originalname}`;





    const {data,error}=

    await supabase
    .storage
    .from(BUCKET)
    .upload(

        fileName,

        file.buffer,

        {

            contentType:file.mimetype,

            upsert:true

        }

    );





    if(error)
        throw error;





    return {

        path:data.path,

        url:getAvatarURL(
            data.path
        )

    };


}





// ===============================
// Update Avatar
// ===============================

async function updateAvatar(
    userId,
    file
){


    // Delete Old Avatar First

    await deleteUserAvatar(userId);



    return await uploadAvatar(
        userId,
        file
    );


}




// ===============================
// Generate Avatar URL
// ===============================

function getAvatarURL(path){


    const {data}=

    supabase
    .storage
    .from(BUCKET)
    .getPublicUrl(path);



    return data.publicUrl;


}





// ===============================
// Get User Avatar
// ===============================

async function getUserAvatar(
    userId
){


    const {data,error}=

    await supabase
    .storage
    .from(BUCKET)
    .list(userId);




    if(error)
        throw error;




    if(!data || data.length===0){

        return DEFAULT_AVATAR;

    }




    const avatar = data[0];



    return getAvatarURL(

        `${userId}/${avatar.name}`

    );


}





// ===============================
// Delete User Avatar
// ===============================

async function deleteUserAvatar(
    userId
){


    const {data,error}=

    await supabase
    .storage
    .from(BUCKET)
    .list(userId);




    if(error)
        throw error;





    if(!data || data.length===0){

        return true;

    }





    const files = data.map(file=>

        `${userId}/${file.name}`

    );





    const result =

    await supabase
    .storage
    .from(BUCKET)
    .remove(files);




    if(result.error)
        throw result.error;




    return true;


}





// ===============================
// Export
// ===============================

module.exports = {


    uploadAvatar,

    updateAvatar,

    deleteUserAvatar,

    getAvatarURL,

    getUserAvatar,

    validateAvatar


};