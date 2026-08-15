// routes/messageRoutes.js


const express = require("express");

const router = express.Router();


const messageController =
require("../controllers/messageController");


// Multer Upload Middleware

const upload =
require("../middleware/upload");





// ===============================
// Send Text Message
// ===============================

router.post(

    "/send",

    messageController.sendMessage

);





// ===============================
// Send Media Message
// ===============================

router.post(

    "/send-media",

    upload.single("file"),

    messageController.sendMediaMessage

);





// ===============================
// Get Conversation Messages
// ===============================

router.get(

    "/:user1/:user2",

    messageController.getMessages

);





// ===============================
// Delete Message
// ===============================

router.delete(

    "/:id",

    messageController.deleteMessage

);





module.exports = router;