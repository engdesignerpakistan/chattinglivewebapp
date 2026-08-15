// ======================================
// Chatting Live - Sign Up
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SIGN UP USER
=========================== */

export async function signUp({
    email,
    password,
    fullName,
    username
}) {

    // Create Authentication Account
    const { data, error } = await supabase.auth.signUp({

        email,
        password,

        options: {

            data: {
                full_name: fullName,
                username: username
            }

        }

    });

    if (error) {
        return {
            success: false,
            error: error.message
        };
    }

    // Save User Record
    if (data.user) {

        await supabase
            .from("users")
            .insert([{

                id: data.user.id,
                email: email,
                status: "offline"

            }]);

        // Create Profile
        await supabase
            .from("profiles")
            .insert([{

                user_id: data.user.id,
                full_name: fullName,
                username: username

            }]);

        // Create Default Settings
        await supabase
            .from("settings")
            .insert([{

                user_id: data.user.id,
                theme: "light",
                language: "en",
                notification: true,
                privacy: "public"

            }]);

    }

    return {
        success: true,
        data
    };

}