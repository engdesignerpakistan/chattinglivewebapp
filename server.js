// server.js


require("dotenv").config();


const express = require("express");

const cors = require("cors");

const app = express();




// ===============================
// Middleware
// ===============================


app.use(
    cors()
);


app.use(
    express.json()
);


app.use(
    express.urlencoded({
        extended:true
    })
);




// ===============================
// Routes
// ===============================


const userRoutes =
require("./routes/userRoutes");


const messageRoutes =
require("./routes/messageRoutes");


const groupRoutes =
require("./routes/groupRoutes");


const profileRoutes =
require("./routes/profileRoutes");





app.use(
    "/api/users",
    userRoutes
);


app.use(
    "/api/messages",
    messageRoutes
);


app.use(
    "/api/groups",
    groupRoutes
);


app.use(
    "/api/profile",
    profileRoutes
);





// ===============================
// Health Check
// ===============================


app.get(
    "/",
    (req,res)=>{

        res.json({

            status:"API Running",

            message:
            "Chat Backend Server is active"

        });

    }
);





// ===============================
// Error Handler
// ===============================


app.use(
    (err,req,res,next)=>{


        console.error(err);



        res.status(500).json({

            success:false,

            message:
            err.message || "Server Error"

        });


    }
);





// ===============================
// Start Server
// ===============================


const PORT =
process.env.PORT || 3000;



app.listen(
    PORT,
    ()=>{

        console.log(
            `Server running on port ${PORT}`
        );

    }
);