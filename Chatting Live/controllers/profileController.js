// controllers/profileController.js

const supabase = require("../config/supabase");

const storage = require("../storage");




// ===============================
// Get Profile
// ===============================

async function getProfile(req,res){

    try {


        const userId =
        req.params.userId;



        const {data,error}=

        await supabase
        .from("users")
        .select(`

            id,
            username,
            name,
            bio,
            avatar_url,
            last_seen,
            online_status,
            privacy_settings,
            created_at

        `)
        .eq(
            "id",
            userId
        )
        .single();





        if(error)
            throw error;




        res.json({

            success:true,

            profile:data

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Update Profile
// ===============================

async function updateProfile(req,res){


    try {


        const userId =
        req.params.userId;



        const {

            name,

            username,

            bio

        } = req.body;





        const {data,error}=

        await supabase
        .from("users")
        .update({

            name,

            username,

            bio

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

            profile:data

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Update Privacy Settings
// ===============================

async function updatePrivacy(req,res){


    try {


        const userId =
        req.params.userId;



        const settings =
        req.body;





        const {data,error}=

        await supabase
        .from("users")
        .update({

            privacy_settings:
            settings

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

            privacy:
            data.privacy_settings

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Update Online Status
// ===============================

async function updateOnlineStatus(req,res){


    try {


        const userId =
        req.params.userId;



        const {

            status

        } = req.body;




        const {data,error}=

        await supabase
        .from("users")
        .update({

            online_status:
            status,


            last_seen:
            new Date()

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

            status:
            data.online_status

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Upload Profile Avatar
// ===============================

async function uploadProfileAvatar(req,res){


    try {


        const userId =
        req.params.userId;



        const file =
        req.file;




        const avatar =

        await storage.avatars.updateAvatar(

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



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Delete Profile
// ===============================

async function deleteProfile(req,res){


    try {


        const userId =
        req.params.userId;




        await storage.avatars
        .deleteUserAvatar(userId);




        const {error}=

        await supabase
        .from("users")
        .delete()
        .eq(
            "id",
            userId
        );





        if(error)
            throw error;





        res.json({

            success:true,

            message:
            "Profile deleted"

        });



    }catch(error){


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


    getProfile,

    updateProfile,

    updatePrivacy,

    updateOnlineStatus,

    uploadProfileAvatar,

    deleteProfile


};