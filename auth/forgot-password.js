// ======================================
// Chatting Live - Forgot Password
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SEND PASSWORD RESET EMAIL
=========================== */

export async function forgotPassword(email) {

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {

        redirectTo: `${window.location.origin}/reset-password.html`

    });

    if (error) {

        return {
            success: false,
            error: error.message
        };

    }

    return {

        success: true,
        message: "Password reset email has been sent.",
        data

    };

}

/* ===========================
   VERIFY EMAIL EXISTS
=========================== */

export async function checkEmail(email) {

    if (!email || email.trim() === "") {

        return {

            success: false,
            error: "Email is required."

        };

    }

    return {

        success: true

    };

}