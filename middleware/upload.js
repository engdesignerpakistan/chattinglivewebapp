// middleware/upload.js


const multer = require("multer");




// ===============================
// Storage Configuration
// ===============================

const storage = multer.memoryStorage();




// ===============================
// File Validation
// ===============================

const fileFilter = (req, file, cb) => {


    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/webp",

        "video/mp4",
        "video/webm",

        "audio/mpeg",
        "audio/wav",

        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    ];




    if(
        allowedTypes.includes(file.mimetype)
    ){

        cb(null, true);

    }

    else{

        cb(
            new Error(
                "Invalid file type"
            ),
            false
        );

    }


};





// ===============================
// Multer Upload Setup
// ===============================


const upload = multer({


    storage,


    fileFilter,


    limits:{

        fileSize:
        50 * 1024 * 1024
        // 50MB Maximum

    }


});





module.exports = upload;