// ======================================
// Chatting Live - Messages Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SEND MESSAGE
=========================== */

export async function sendMessage(messageData) {

    const { data, error } = await supabase
        .from("messages")
        .insert([messageData])
        .select();

    return { data, error };

}

/* ===========================
   GET ALL MESSAGES
=========================== */

export async function getMessages() {

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

    return { data, error };

}

/* ===========================
   GET CHAT MESSAGES
=========================== */

export async function getChatMessages(senderId, receiverId) {

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
            `and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`
        )
        .order("created_at", { ascending: true });

    return { data, error };

}

/* ===========================
   GET MESSAGE BY ID
=========================== */

export async function getMessageById(id) {

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE MESSAGE
=========================== */

export async function updateMessage(id, messageData) {

    const { data, error } = await supabase
        .from("messages")
        .update(messageData)
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE MESSAGE
=========================== */

export async function deleteMessage(id) {

    const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   MARK AS READ
=========================== */

export async function markAsRead(id) {

    const { data, error } = await supabase
        .from("messages")
        .update({
            is_read: true
        })
        .eq("id", id)
        .select();

    return { data, error };

}