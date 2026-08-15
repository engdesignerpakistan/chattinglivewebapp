// ======================================
// Chatting Live - Reset Password
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   UPDATE PASSWORD
=========================== */

export async function resetPassword(newPassword) {

    if (!newPassword || newPassword.length < 6) {

        return {
            success: false,
            error: "Password must be at least 6 characters."
        };

    }

    const { data, error } = await supabase.auth.updateUser({

        password: newPassword

    });

    if (error) {

        return {
            success: false,
            error: error.message
        };

    }

    return {

        success: true,
        message: "Password updated successfully.",
        data

    };

}

/* ===========================
   CHECK RECOVERY SESSION
=========================== */

export async function hasRecoverySession() {

    const { data, error } = await supabase.auth.getSession();

    if (error) {

        return {
            success: false,
            error: error.message
        };

    }

    return {

        success: true,
        session: data.session

    };

}