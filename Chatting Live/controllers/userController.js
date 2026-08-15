// controllers/userController.js

const storage = require("../storage");

const supabase = require("../config/supabase");


// ===============================
// Get User Profile
// ===============================

async function getUserProfile(req, res) {

    try {

        const userId = req.params.userId;


        const { data, error } =
        await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();



        if(error)
            throw error;



        // Attach Avatar URL

        data.avatar =
        await storage.avatars.getUserAvatar(userId);



        res.json({

            success:true,

            user:data

        });


    } catch(error) {


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}




// ===============================
// Update User Profile
// ===============================

async function updateUserProfile(req,res){


    try {


        const userId = req.params.userId;


        const {

            name,

            bio,

            username

        } = req.body;




        const {data,error}=

        await supabase
        .from("users")
        .update({

            name,

            bio,

            username

        })
        .eq(
            "id",
            userId
        )
        .select()
        .single();





        if(error)
            throw error;





        res.json({

            success:true,

            user:data

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Upload Avatar
// ===============================

async function uploadAvatar(req,res){


    try {


        const userId =
        req.params.userId;



        const file =
        req.file;



        const avatar =

        await storage.avatars.uploadAvatar(

            userId,

            file

        );





        await supabase
        .from("users")
        .update({

            avatar_url:
            avatar.url

        })
        .eq(
            "id",
            userId
        );





        res.json({

            success:true,

            avatar

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Delete Avatar
// ===============================

async function deleteAvatar(req,res){


    try {


        const userId =
        req.params.userId;




        await storage.avatars
        .deleteUserAvatar(
            userId
        );





        await supabase
        .from("users")
        .update({

            avatar_url:null

        })
        .eq(
            "id",
            userId
        );





        res.json({

            success:true,

            message:
            "Avatar deleted"

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Export
// ===============================

module.exports = {


    getUserProfile,

    updateUserProfile,

    uploadAvatar,

    deleteAvatar


};