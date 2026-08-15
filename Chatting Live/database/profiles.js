// ======================================
// Chatting Live - Profiles Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CREATE PROFILE
=========================== */

export async function createProfile(profileData) {

    const { data, error } = await supabase
        .from("profiles")
        .insert([profileData])
        .select();

    return { data, error };

}

/* ===========================
   GET ALL PROFILES
=========================== */

export async function getProfiles() {

    const { data, error } = await supabase
        .from("profiles")
        .select("*");

    return { data, error };

}

/* ===========================
   GET PROFILE BY ID
=========================== */

export async function getProfileById(id) {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   GET PROFILE BY USER ID
=========================== */

export async function getProfileByUserId(userId) {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE PROFILE
=========================== */

export async function updateProfile(id, profileData) {

    const { data, error } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE PROFILE
=========================== */

export async function deleteProfile(id) {

    const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   SEARCH PROFILES
=========================== */

export async function searchProfiles(keyword) {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or(`full_name.ilike.%${keyword}%,username.ilike.%${keyword}%`);

    return { data, error };

}