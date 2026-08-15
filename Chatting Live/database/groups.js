// ======================================
// Chatting Live - Groups Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CREATE GROUP
=========================== */

export async function createGroup(groupData) {

    const { data, error } = await supabase
        .from("groups")
        .insert([groupData])
        .select();

    return { data, error };

}

/* ===========================
   GET ALL GROUPS
=========================== */

export async function getGroups() {

    const { data, error } = await supabase
        .from("groups")
        .select("*")
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET GROUP BY ID
=========================== */

export async function getGroupById(id) {

    const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE GROUP
=========================== */

export async function updateGroup(id, groupData) {

    const { data, error } = await supabase
        .from("groups")
        .update(groupData)
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE GROUP
=========================== */

export async function deleteGroup(id) {

    const { error } = await supabase
        .from("groups")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   SEARCH GROUPS
=========================== */

export async function searchGroups(keyword) {

    const { data, error } = await supabase
        .from("groups")
        .select("*")
        .ilike("group_name", `%${keyword}%`);

    return { data, error };

}