// routes/groupRoutes.js


const express = require("express");

const router = express.Router();


const groupController =
require("../controllers/groupController");


// Upload Middleware

const upload =
require("../middleware/upload");





// ===============================
// Create Group
// ===============================

router.post(

    "/create",

    groupController.createGroup

);





// ===============================
// Get User Groups
// ===============================

router.get(

    "/user/:userId",

    groupController.getUserGroups

);





// ===============================
// Add Member
// ===============================

router.post(

    "/member/add",

    groupController.addMember

);





// ===============================
// Remove Member
// ===============================

router.delete(

    "/member/remove",

    groupController.removeMember

);





// ===============================
// Update Group
// ===============================

router.put(

    "/:groupId",

    groupController.updateGroup

);





// ===============================
// Upload Group Avatar
// ===============================

router.post(

    "/:groupId/avatar",

    upload.single("avatar"),

    groupController.uploadGroupAvatar

);





module.exports = router;