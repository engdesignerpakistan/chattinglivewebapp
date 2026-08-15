// controllers/messageController.js

const supabase = require("../config/supabase");

const storage = require("../storage");



// ===============================
// Send Text Message
// ===============================

async function sendMessage(req,res){

    try {

        const {
            senderId,
            receiverId,
            text
        } = req.body;



        const {data,error}=

        await supabase
        .from("messages")
        .insert({

            sender_id:senderId,

            receiver_id:receiverId,

            type:"text",

            content:text

        })
        .select()
        .single();



        if(error)
            throw error;



        res.json({

            success:true,

            message:data

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

}




// ===============================
// Send Media Message
// ===============================

async function sendMediaMessage(req,res){


    try {


        const {
            senderId,
            receiverId,
            type
        } = req.body;



        const file =
        req.file;




        let uploaded;



        switch(type){


            case "image":

                uploaded =
                await storage.images.uploadImage(
                    senderId,
                    file
                );

            break;



            case "video":

                uploaded =
                await storage.videos.uploadVideo(
                    senderId,
                    file
                );

            break;



            case "audio":

                uploaded =
                await storage.audio.uploadAudio(
                    senderId,
                    file
                );

            break;



            case "document":

                uploaded =
                await storage.documents.uploadDocument(
                    senderId,
                    file
                );

            break;



            default:

                throw new Error(
                    "Invalid message type"
                );

        }





        const {data,error}=

        await supabase
        .from("messages")
        .insert({

            sender_id:senderId,

            receiver_id:receiverId,

            type:type,

            content:uploaded.url,

            file_path:uploaded.path

        })
        .select()
        .single();





        if(error)
            throw error;




        res.json({

            success:true,

            message:data

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}




// ===============================
// Get Conversation
// ===============================

async function getMessages(req,res){


    try {


        const {
            user1,
            user2
        } = req.params;



        const {data,error}=

        await supabase
        .from("messages")
        .select("*")
        .or(

            `and(sender_id.eq.${user1},receiver_id.eq.${user2}),and(sender_id.eq.${user2},receiver_id.eq.${user1})`

        )
        .order(
            "created_at",
            {
                ascending:true
            }
        );





        if(error)
            throw error;




        res.json({

            success:true,

            messages:data

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

}





// ===============================
// Delete Message
// ===============================

async function deleteMessage(req,res){


    try {


        const id =
        req.params.id;



        const {
            filePath
        } = req.body;




        // Delete Storage File

        if(filePath){

            await storage.delete.deleteFile(
                filePath
            );

        }





        const {error}=

        await supabase
        .from("messages")
        .delete()
        .eq(
            "id",
            id
        );





        if(error)
            throw error;




        res.json({

            success:true,

            message:
            "Message deleted"

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


    sendMessage,

    sendMediaMessage,

    getMessages,

    deleteMessage


};