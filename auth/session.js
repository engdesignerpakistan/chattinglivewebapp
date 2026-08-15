// ======================================
// Chatting Live - Session Management
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   GET CURRENT SESSION
=========================== */

export async function getSession() {

    const { data, error } = await supabase.auth.getSession();

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
   CHECK LOGIN STATUS
=========================== */

export async function isLoggedIn() {

    const { data } = await supabase.auth.getSession();

    return !!data.session;

}

/* ===========================
   REFRESH SESSION
=========================== */

export async function refreshSession() {

    const { data, error } = await supabase.auth.refreshSession();

    return {
        data,
        error
    };

}

/* ===========================
   LISTEN AUTH CHANGES
=========================== */

export function onAuthStateChange(callback) {

    const {
        data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {

        callback(event, session);

    });

    return subscription;

}

/* ===========================
   REMOVE AUTH LISTENER
=========================== */

export function removeAuthListener(subscription) {

    if (subscription) {
        subscription.unsubscribe();
    }

}