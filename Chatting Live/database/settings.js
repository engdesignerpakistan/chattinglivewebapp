// ======================================
// Chatting Live - Settings Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CREATE SETTINGS
=========================== */

export async function createSettings(settingsData) {

    const { data, error } = await supabase
        .from("settings")
        .insert([settingsData])
        .select();

    return { data, error };

}

/* ===========================
   GET USER SETTINGS
=========================== */

export async function getUserSettings(userId) {

    const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("user_id", userId)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE SETTINGS
=========================== */

export async function updateSettings(userId, settingsData) {

    const { data, error } = await supabase
        .from("settings")
        .update(settingsData)
        .eq("user_id", userId)
        .select();

    return { data, error };

}

/* ===========================
   UPDATE THEME
=========================== */

export async function updateTheme(userId, theme) {

    const { data, error } = await supabase
        .from("settings")
        .update({
            theme: theme
        })
        .eq("user_id", userId)
        .select();

    return { data, error };

}

/* ===========================
   UPDATE LANGUAGE
=========================== */

export async function updateLanguage(userId, language) {

    const { data, error } = await supabase
        .from("settings")
        .update({
            language: language
        })
        .eq("user_id", userId)
        .select();

    return { data, error };

}

/* ===========================
   UPDATE NOTIFICATIONS
=========================== */

export async function updateNotificationSettings(userId, notification) {

    const { data, error } = await supabase
        .from("settings")
        .update({
            notification: notification
        })
        .eq("user_id", userId)
        .select();

    return { data, error };

}

/* ===========================
   UPDATE PRIVACY
=========================== */

export async function updatePrivacy(userId, privacy) {

    const { data, error } = await supabase
        .from("settings")
        .update({
            privacy: privacy
        })
        .eq("user_id", userId)
        .select();

    return { data, error };

}

/* ===========================
   DELETE SETTINGS
=========================== */

export async function deleteSettings(userId) {

    const { error } = await supabase
        .from("settings")
        .delete()
        .eq("user_id", userId);

    return { error };

}