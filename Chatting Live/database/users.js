// ======================================
// Chatting Live - Users Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CREATE USER
=========================== */

export async function createUser(userData) {

    const { data, error } = await supabase
        .from("users")
        .insert([userData])
        .select();

    return { data, error };

}

/* ===========================
   GET ALL USERS
=========================== */

export async function getUsers() {

    const { data, error } = await supabase
        .from("users")
        .select("*");

    return { data, error };

}

/* ===========================
   GET USER BY ID
=========================== */

export async function getUserById(id) {

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   GET USER BY EMAIL
=========================== */

export async function getUserByEmail(email) {

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE USER
=========================== */

export async function updateUser(id, userData) {

    const { data, error } = await supabase
        .from("users")
        .update(userData)
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE USER
=========================== */

export async function deleteUser(id) {

    const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   SEARCH USERS
=========================== */

export async function searchUsers(keyword) {

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .ilike("email", `%${keyword}%`);

    return { data, error };

}