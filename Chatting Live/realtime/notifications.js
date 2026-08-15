// ======================================
// Chatting Live - Realtime Notifications
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SUBSCRIBE NOTIFICATIONS
=========================== */

export function subscribeToNotifications(userId, callback) {

    const channel = supabase
        .channel(`notifications-${userId}`)
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "notifications",
                filter: `user_id=eq.${userId}`
            },
            (payload) => {

                callback(payload.new);

            }
        )
        .subscribe();

    return channel;

}

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
   MARK AS READ
=========================== */

export async function markNotificationRead(notificationId) {

    const { data, error } = await supabase
        .from("notifications")
        .update({
            is_read: true
        })
        .eq("id", notificationId)
        .select();

    return { data, error };

}

/* ===========================
   DELETE NOTIFICATION
=========================== */

export async function deleteNotification(notificationId) {

    const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId);

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

/* ===========================
   SUBSCRIBE UNREAD COUNT
=========================== */

export function subscribeUnreadCount(userId, callback) {

    const channel = supabase
        .channel(`notification-count-${userId}`)
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "notifications",
                filter: `user_id=eq.${userId}`
            },
            async () => {

                const { count } = await getUnreadNotificationCount(userId);

                callback(count);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   UNSUBSCRIBE
=========================== */

export async function unsubscribeNotifications(channel) {

    if (channel) {

        await supabase.removeChannel(channel);

    }

}