// storage/documents.js

const supabase = require("../config/supabase");


// Storage Bucket Name
const BUCKET = "documents";



// ===============================
// Document Validation
// ===============================

function validateDocument(file){


    const allowedTypes = [

        "application/pdf",

        "application/msword",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

        "application/vnd.ms-excel",

        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        "text/plain"

    ];



    const maxSize = 50 * 1024 * 1024; // 50MB




    if(!allowedTypes.includes(file.mimetype)){

        throw new Error(
            "Invalid document format"
        );

    }




    if(file.size > maxSize){

        throw new Error(
            "Document size must be less than 50MB"
        );

    }



    return true;

}



// ===============================
// Upload Document
// ===============================

async function uploadDocument(
    userId,
    file
){


    validateDocument(file);



    const fileName =

    `${userId}/${Date.now()}-${file.originalname}`;





    const {data,error}=

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


        url:getDocumentURL(
            data.path
        )


    };



}



// ===============================
// Generate Document URL
// ===============================

function getDocumentURL(path){


    const {data}=

    supabase
    .storage
    .from(BUCKET)
    .getPublicUrl(path);



    return data.publicUrl;


}



// ===============================
// Download Document
// ===============================

async function downloadDocument(path){


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
// Delete Document
// ===============================

async function deleteDocument(path){



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
// Get User Documents
// ===============================

async function getUserDocuments(userId){



    const {data,error}=

    await supabase
    .storage
    .from(BUCKET)
    .list(userId);




    if(error)
        throw error;





    return data.map(document=>({


        name:document.name,


        path:
        `${userId}/${document.name}`,



        url:
        getDocumentURL(

            `${userId}/${document.name}`

        )


    }));



}





// ===============================
// Export
// ===============================

module.exports = {


    uploadDocument,

    downloadDocument,

    deleteDocument,

    getDocumentURL,

    getUserDocuments,

    validateDocument


};