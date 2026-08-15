// ======================================
// Chatting Live - Media Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   UPLOAD MEDIA RECORD
=========================== */

export async function uploadMedia(mediaData) {

    const { data, error } = await supabase
        .from("media")
        .insert([mediaData])
        .select();

    return { data, error };

}

/* ===========================
   GET ALL MEDIA
=========================== */

export async function getAllMedia() {

    const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET USER MEDIA
=========================== */

export async function getUserMedia(userId) {

    const { data, error } = await supabase
        .from("media")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET MEDIA BY ID
=========================== */

export async function getMediaById(id) {

    const { data, error } = await supabase
        .from("media")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE MEDIA
=========================== */

export async function updateMedia(id, mediaData) {

    const { data, error } = await supabase
        .from("media")
        .update(mediaData)
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE MEDIA
=========================== */

export async function deleteMedia(id) {

    const { error } = await supabase
        .from("media")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   GET MEDIA BY TYPE
=========================== */

export async function getMediaByType(fileType) {

    const { data, error } = await supabase
        .from("media")
        .select("*")
        .eq("file_type", fileType)
        .order("created_at", { ascending: false });

    return { data, error };

}