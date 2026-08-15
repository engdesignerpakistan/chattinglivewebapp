// ======================================
// Chatting Live - Login
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   LOGIN USER
=========================== */

export async function login(email, password) {

    const { data, error } = await supabase.auth.signInWithPassword({

        email,
        password

    });

    if (error) {

        return {
            success: false,
            error: error.message
        };

    }

    // Update User Status
    await supabase
        .from("users")
        .update({

            status: "online"

        })
        .eq("id", data.user.id);

    return {

        success: true,
        user: data.user,
        session: data.session

    };

}

/* ===========================
   LOGIN WITH GOOGLE
=========================== */

export async function loginWithGoogle() {

    const { data, error } = await supabase.auth.signInWithOAuth({

        provider: "google"

    });

    return {

        data,
        error

    };

}

/* ===========================
   LOGIN WITH GITHUB
=========================== */

export async function loginWithGitHub() {

    const { data, error } = await supabase.auth.signInWithOAuth({

        provider: "github"

    });

    return {

        data,
        error

    };

}

/* ===========================
   GET CURRENT USER
=========================== */

export async function getCurrentUser() {

    const { data, error } = await supabase.auth.getUser();

    return {

        data,
        error

    };

}

/* ===========================
   GET CURRENT SESSION
=========================== */

export async function getCurrentSession() {

    const { data, error } = await supabase.auth.getSession();

    return {

        data,
        error

    };

}