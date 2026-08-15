// ======================================
// Chatting Live - Email Verification
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CHECK EMAIL VERIFICATION
=========================== */

export async function checkEmailVerification() {

    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error) {

        return {
            success: false,
            error: error.message
        };

    }

    if (!user) {

        return {
            success: false,
            error: "User not found."
        };

    }

    return {

        success: true,
        verified: !!user.email_confirmed_at,
        user

    };

}

/* ===========================
   RESEND VERIFICATION EMAIL
=========================== */

export async function resendVerificationEmail(email) {

    const { data, error } = await supabase.auth.resend({

        type: "signup",
        email: email

    });

    if (error) {

        return {
            success: false,
            error: error.message
        };

    }

    return {

        success: true,
        message: "Verification email sent successfully.",
        data

    };

}

/* ===========================
   GET VERIFIED USER
=========================== */

export async function getVerifiedUser() {

    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    if (error) {

        return {
            success: false,
            error: error.message
        };

    }

    if (!user) {

        return {
            success: false,
            error: "User not found."
        };

    }

    if (!user.email_confirmed_at) {

        return {
            success: false,
            error: "Email is not verified."
        };

    }

    return {

        success: true,
        user

    };

}