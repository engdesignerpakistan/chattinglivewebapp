// ======================================
// Chatting Live - Helper Functions
// ======================================

/* ===========================
   GENERATE UNIQUE ID
=========================== */

export function generateID() {

    return crypto.randomUUID();

}

/* ===========================
   CURRENT DATE & TIME
=========================== */

export function getCurrentDateTime() {

    return new Date().toISOString();

}

/* ===========================
   FORMAT DATE
=========================== */

export function formatDate(date) {

    return new Date(date).toLocaleDateString();

}

/* ===========================
   FORMAT TIME
=========================== */

export function formatTime(date) {

    return new Date(date).toLocaleTimeString();

}

/* ===========================
   EMAIL VALIDATION
=========================== */

export function isValidEmail(email) {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

/* ===========================
   PASSWORD VALIDATION
=========================== */

export function isValidPassword(password) {

    return password.length >= 8;

}

/* ===========================
   SHOW MESSAGE
=========================== */

export function showMessage(message) {

    alert(message);

}

/* ===========================
   CONFIRM ACTION
=========================== */

export function confirmAction(message) {

    return confirm(message);

}

/* ===========================
   COPY TEXT
=========================== */

export async function copyText(text) {

    await navigator.clipboard.writeText(text);

}

/* ===========================
   RANDOM STRING
=========================== */

export function randomString(length = 10) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {

        result += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );

    }

    return result;

}