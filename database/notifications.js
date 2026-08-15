// ======================================
// Chatting Live - Notifications Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SEND NOTIFICATION
=========================== */

export async function sendNotification(notificationData) {

    const { data, error } = await supabase
        .from("notifications")
        .insert([notificationData])
        .select();

    return { data, error };

}

/* ===========================
   GET USER NOTIFICATIONS
=========================== */

export async function getNotifications(userId) {

    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET NOTIFICATION BY ID
=========================== */

export async function getNotificationById(id) {

    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   MARK AS READ
=========================== */

export async function markNotificationRead(id) {

    const { data, error } = await supabase
        .from("notifications")
        .update({
            is_read: true
        })
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE NOTIFICATION
=========================== */

export async function deleteNotification(id) {

    const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   GET UNREAD COUNT
=========================== */

export async function getUnreadNotificationCount(userId) {

    const { count, error } = await supabase
        .from("notifications")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq("user_id", userId)
        .eq("is_read", false);

    return { count, error };

}