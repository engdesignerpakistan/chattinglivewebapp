/* ==========================================
   Chatting Live - Socials JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Socials Page Loaded");

    initializeSocials();

});

/* ==========================================
   Initialize Socials
========================================== */

function initializeSocials() {

    const buttons = document.querySelectorAll(".social-card button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const socialName = button.parentElement.querySelector("h3").textContent;

            connectSocial(socialName);

        });

    });

}

/* ==========================================
   Connect Social Account
========================================== */

function connectSocial(platform) {

    alert(platform + " connection will be available soon.");

    console.log("Connect:", platform);

}