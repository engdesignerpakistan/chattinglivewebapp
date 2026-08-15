// routes/userRoutes.js


const express = require("express");

const router = express.Router();


const userController = require("../controllers/userController");


// Multer Upload Middleware
const upload = require("../middleware/upload");




// ===============================
// User Profile Routes
// ===============================


// Get User Profile

router.get(

    "/:userId",

    userController.getUserProfile

);





// Update User Profile

router.put(

    "/:userId",

    userController.updateUserProfile

);





// ===============================
// Avatar Routes
// ===============================


// Upload Avatar

router.post(

    "/:userId/avatar",

    upload.single("avatar"),

    userController.uploadAvatar

);





// Delete Avatar

router.delete(

    "/:userId/avatar",

    userController.deleteAvatar

);





module.exports = router;