// routes/profileRoutes.js


const express = require("express");

const router = express.Router();


const profileController =
require("../controllers/profileController");


// Upload Middleware

const upload =
require("../middleware/upload");





// ===============================
// Get User Profile
// ===============================

router.get(

    "/:userId",

    profileController.getProfile

);





// ===============================
// Update Profile
// ===============================

router.put(

    "/:userId",

    profileController.updateProfile

);





// ===============================
// Privacy Settings
// ===============================

router.put(

    "/:userId/privacy",

    profileController.updatePrivacy

);





// ===============================
// Online Status
// ===============================

router.put(

    "/:userId/status",

    profileController.updateOnlineStatus

);





// ===============================
// Upload Profile Avatar
// ===============================

router.post(

    "/:userId/avatar",

    upload.single("avatar"),

    profileController.uploadProfileAvatar

);





// ===============================
// Delete Profile
// ===============================

router.delete(

    "/:userId",

    profileController.deleteProfile

);





module.exports = router;