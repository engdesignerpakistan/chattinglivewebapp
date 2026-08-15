// controllers/groupController.js

const supabase = require("../config/supabase");

const storage = require("../storage");



// ===============================
// Create Group
// ===============================

async function createGroup(req,res){

    try {


        const {
            name,
            description,
            adminId,
            members
        } = req.body;



        const {data:group,error}=

        await supabase
        .from("groups")
        .insert({

            name,

            description,

            admin_id:adminId

        })
        .select()
        .single();





        if(error)
            throw error;





        // Add Members

        const groupMembers = members.map(userId=>({

            group_id:group.id,

            user_id:userId,

            role:
            userId === adminId
            ? "admin"
            : "member"

        }));





        await supabase
        .from("group_members")
        .insert(groupMembers);





        res.json({

            success:true,

            group

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Get User Groups
// ===============================

async function getUserGroups(req,res){


    try {


        const userId =
        req.params.userId;




        const {data,error}=

        await supabase
        .from("group_members")
        .select(`

            groups(*)

        `)
        .eq(
            "user_id",
            userId
        );





        if(error)
            throw error;




        res.json({

            success:true,

            groups:data

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Add Group Member
// ===============================

async function addMember(req,res){


    try {


        const {

            groupId,

            userId

        } = req.body;





        const {data,error}=

        await supabase
        .from("group_members")
        .insert({

            group_id:groupId,

            user_id:userId,

            role:"member"

        });





        if(error)
            throw error;





        res.json({

            success:true,

            member:data

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Remove Member
// ===============================

async function removeMember(req,res){


    try {


        const {

            groupId,

            userId

        } = req.body;





        const {error}=

        await supabase
        .from("group_members")
        .delete()
        .match({

            group_id:groupId,

            user_id:userId

        });





        if(error)
            throw error;




        res.json({

            success:true,

            message:
            "Member removed"

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Update Group
// ===============================

async function updateGroup(req,res){


    try {


        const groupId =
        req.params.groupId;



        const {
            name,
            description
        } = req.body;





        const {data,error}=

        await supabase
        .from("groups")
        .update({

            name,

            description

        })
        .eq(
            "id",
            groupId
        )
        .select()
        .single();





        if(error)
            throw error;





        res.json({

            success:true,

            group:data

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Upload Group Avatar
// ===============================

async function uploadGroupAvatar(req,res){


    try {


        const groupId =
        req.params.groupId;



        const file =
        req.file;



        const avatar =

        await storage.avatars.uploadAvatar(

            `group-${groupId}`,

            file

        );





        await supabase
        .from("groups")
        .update({

            avatar_url:
            avatar.url

        })
        .eq(
            "id",
            groupId
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
// Export
// ===============================

module.exports = {


    createGroup,

    getUserGroups,

    addMember,

    removeMember,

    updateGroup,

    uploadGroupAvatar


};