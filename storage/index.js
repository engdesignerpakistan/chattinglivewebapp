// storage/index.js


// Image Management
const images = require("./images");


// Video Management
const videos = require("./videos");


// Audio Management
const audio = require("./audio");


// Document Management
const documents = require("./documents");


// Avatar Management
const avatars = require("./avatars");


// Basic Storage Operations
const upload = require("./upload");

const download = require("./download");

const remove = require("./delete");




// Export All Storage Services

module.exports = {

    // Basic Operations
    upload,
    download,
    delete: remove,


    // Images
    images,


    // Videos
    videos,


    // Audio
    audio,


    // Documents
    documents,


    // Avatars
    avatars

};