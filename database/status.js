// ======================================
// Chatting Live - Status Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CREATE STATUS
=========================== */

export async function createStatus(statusData) {

    const { data, error } = await supabase
        .from("status")
        .insert([statusData])
        .select();

    return { data, error };

}

/* ===========================
   GET ALL STATUS
=========================== */

export async function getAllStatus() {

    const { data, error } = await supabase
        .from("status")
        .select("*")
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET USER STATUS
=========================== */

export async function getUserStatus(userId) {

    const { data, error } = await supabase
        .from("status")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET STATUS BY ID
=========================== */

export async function getStatusById(id) {

    const { data, error } = await supabase
        .from("status")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE STATUS
=========================== */

export async function updateStatus(id, statusData) {

    const { data, error } = await supabase
        .from("status")
        .update(statusData)
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE STATUS
=========================== */

export async function deleteStatus(id) {

    const { error } = await supabase
        .from("status")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   GET ACTIVE STATUS
=========================== */

export async function getActiveStatus() {

    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from("status")
        .select("*")
        .gt("expires_at", now)
        .order("created_at", { ascending: false });

    return { data, error };

}