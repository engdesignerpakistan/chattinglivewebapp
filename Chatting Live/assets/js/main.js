/* ==========================================
   Chatting Live - Main JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Chatting Live Loaded Successfully");

    initializeApp();

});

/* ==========================================
   Initialize
========================================== */

function initializeApp(){

    setupNavigation();
    setupForms();
    setupTheme();
    setupChat();

}

/* ==========================================
   Navigation
========================================== */

function setupNavigation(){

    console.log("Navigation Ready");

}

/* ==========================================
   Forms
========================================== */

function setupForms(){

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const profileForm = document.getElementById("profileForm");

    if(loginForm){

        loginForm.addEventListener("submit", function(e){

            e.preventDefault();

            alert("Login Function Coming Soon");

        });

    }

    if(signupForm){

        signupForm.addEventListener("submit", function(e){

            e.preventDefault();

            alert("Signup Function Coming Soon");

        });

    }

    if(profileForm){

        profileForm.addEventListener("submit", function(e){

            e.preventDefault();

            alert("Profile Saved");

        });

    }

}

/* ==========================================
   Theme
========================================== */

function setupTheme(){

    console.log("Theme Ready");

}

/* ==========================================
   Chat
========================================== */

function setupChat(){

    const sendBtn = document.getElementById("sendBtn");

    if(sendBtn){

        sendBtn.addEventListener("click", sendMessage);

    }

}

function sendMessage(){

    const input = document.getElementById("message");

    const messages = document.getElementById("messages");

    if(!input || !messages) return;

    if(input.value.trim() === "") return;

    const div = document.createElement("div");

    div.className = "message";

    div.innerHTML = input.value;

    messages.appendChild(div);

    input.value = "";

    messages.scrollTop = messages.scrollHeight;

}

/* ==========================================
   Utilities
========================================== */

function showNotification(text){

    alert(text);

}

function showLoader(){

    console.log("Loading...");

}

function hideLoader(){

    console.log("Finished");

}