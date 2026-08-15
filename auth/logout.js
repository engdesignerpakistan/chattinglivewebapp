// ======================================
// Chatting Live - Logout
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   LOGOUT USER
=========================== */

export async function logout() {

    // Get Current User
    const {
        data: { user }
    } = await supabase.auth.getUser();

    // Update User Status
    if (user) {

        await supabase
            .from("users")
            .update({
                status: "offline"
            })
            .eq("id", user.id);

    }

    // Sign Out
    const { error } = await supabase.auth.signOut();

    if (error) {

        return {
            success: false,
            error: error.message
        };

    }

    return {
        success: true,
        message: "Logout successful."
    };

}

/* ===========================
   LOGOUT FROM ALL DEVICES
=========================== */

export async function logoutAllDevices() {

    const { error } = await supabase.auth.signOut({

        scope: "global"

    });

    if (error) {

        return {
            success: false,
            error: error.message
        };

    }

    return {
        success: true,
        message: "Logged out from all devices."
    };

}