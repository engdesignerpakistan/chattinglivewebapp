// ======================================
// Chatting Live - Auth Guard
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   REQUIRE LOGIN
=========================== */

export async function requireAuth() {

    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {

        window.location.href = "login.html";
        return false;

    }

    return true;

}

/* ===========================
   REQUIRE GUEST
=========================== */

export async function requireGuest() {

    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (session) {

        window.location.href = "home.html";
        return false;

    }

    return true;

}

/* ===========================
   REQUIRE VERIFIED EMAIL
=========================== */

export async function requireVerifiedEmail() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {

        window.location.href = "login.html";
        return false;

    }

    if (!user.email_confirmed_at) {

        window.location.href = "verify-email.html";
        return false;

    }

    return true;

}

/* ===========================
   GET AUTH USER
=========================== */

export async function getAuthUser() {

    const {
        data: { user },
        error
    } = await supabase.auth.getUser();

    return {
        user,
        error
    };

}

/* ===========================
   REQUIRE ADMIN
=========================== */

export async function requireAdmin() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {

        window.location.href = "login.html";
        return false;

    }

    const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

    if (error || data.role !== "admin") {

        window.location.href = "home.html";
        return false;

    }

    return true;

}   