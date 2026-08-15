// ======================================
// Chatting Live - Group Messages Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SEND GROUP MESSAGE
=========================== */

export async function sendGroupMessage(messageData) {

    const { data, error } = await supabase
        .from("group_messages")
        .insert([messageData])
        .select();

    return { data, error };

}

/* ===========================
   GET GROUP MESSAGES
=========================== */

export async function getGroupMessages(groupId) {

    const { data, error } = await supabase
        .from("group_messages")
        .select("*")
        .eq("group_id", groupId)
        .order("created_at", { ascending: true });

    return { data, error };

}

/* ===========================
   GET MESSAGE BY ID
=========================== */

export async function getGroupMessageById(id) {

    const { data, error } = await supabase
        .from("group_messages")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE GROUP MESSAGE
=========================== */

export async function updateGroupMessage(id, messageData) {

    const { data, error } = await supabase
        .from("group_messages")
        .update(messageData)
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE GROUP MESSAGE
=========================== */

export async function deleteGroupMessage(id) {

    const { error } = await supabase
        .from("group_messages")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   MARK AS DELETED
=========================== */

export async function markGroupMessageDeleted(id) {

    const { data, error } = await supabase
        .from("group_messages")
        .update({
            is_deleted: true
        })
        .eq("id", id)
        .select();

    return { data, error };

}