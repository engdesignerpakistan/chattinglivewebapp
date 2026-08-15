// index.js


// ===============================
// API Configuration
// ===============================

const API_URL = "http://localhost:3000/api";




// ===============================
// Check Server Status
// ===============================

async function checkServer(){


    try {


        const response =
        await fetch("http://localhost:3000/");


        const data =
        await response.json();



        console.log(
            data.message
        );


    }
    catch(error){


        console.log(
            "Server Not Connected"
        );


    }


}




// ===============================
// User Session
// ===============================

function getUser(){


    const user =
    localStorage.getItem("user");


    if(user){

        return JSON.parse(user);

    }


    return null;

}





// ===============================
// Logout
// ===============================

function logout(){


    localStorage.removeItem("user");


    localStorage.removeItem("token");


    window.location.href =
    "login.html";


}





// ===============================
// API Request Helper
// ===============================

async function apiRequest(
    endpoint,
    options={}
){


    const response =

    await fetch(

        API_URL + endpoint,

        {

            headers:{

                "Content-Type":
                "application/json"

            },

            ...options

        }

    );



    return await response.json();

}





// Start

checkServer();