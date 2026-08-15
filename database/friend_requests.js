// ======================================
// Chatting Live - Friend Requests Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SEND FRIEND REQUEST
=========================== */

export async function sendFriendRequest(requestData) {

    const { data, error } = await supabase
        .from("friend_requests")
        .insert([requestData])
        .select();

    return { data, error };

}

/* ===========================
   GET RECEIVED REQUESTS
=========================== */

export async function getReceivedRequests(userId) {

    const { data, error } = await supabase
        .from("friend_requests")
        .select("*")
        .eq("receiver_id", userId)
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET SENT REQUESTS
=========================== */

export async function getSentRequests(userId) {

    const { data, error } = await supabase
        .from("friend_requests")
        .select("*")
        .eq("sender_id", userId)
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   ACCEPT FRIEND REQUEST
=========================== */

export async function acceptFriendRequest(id) {

    const { data, error } = await supabase
        .from("friend_requests")
        .update({
            status: "accepted"
        })
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   REJECT FRIEND REQUEST
=========================== */

export async function rejectFriendRequest(id) {

    const { data, error } = await supabase
        .from("friend_requests")
        .update({
            status: "rejected"
        })
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   CANCEL FRIEND REQUEST
=========================== */

export async function cancelFriendRequest(id) {

    const { error } = await supabase
        .from("friend_requests")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   GET PENDING REQUESTS
=========================== */

export async function getPendingRequests(userId) {

    const { data, error } = await supabase
        .from("friend_requests")
        .select("*")
        .eq("receiver_id", userId)
        .eq("status", "pending");

    return { data, error };

}