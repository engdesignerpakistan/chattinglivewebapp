// ======================================
// Chatting Live - Realtime Messages
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SUBSCRIBE TO PRIVATE CHAT
=========================== */

export function subscribeToMessages(callback) {

    const channel = supabase
        .channel("private-messages")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "messages"
            },
            (payload) => {

                callback(payload);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   UNSUBSCRIBE
=========================== */

export async function unsubscribeMessages(channel) {

    if (channel) {
        await supabase.removeChannel(channel);
    }

}

/* ===========================
   SEND REALTIME MESSAGE
=========================== */

export async function sendRealtimeMessage(messageData) {

    const { data, error } = await supabase
        .from("messages")
        .insert([messageData])
        .select();

    return { data, error };

}

/* ===========================
   UPDATE MESSAGE
=========================== */

export async function updateRealtimeMessage(id, messageData) {

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

export async function deleteRealtimeMessage(id) {

    const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   LISTEN TO NEW MESSAGES ONLY
=========================== */

export function onNewMessage(callback) {

    const channel = supabase
        .channel("new-messages")
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "messages"
            },
            (payload) => {

                callback(payload.new);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   LISTEN TO MESSAGE UPDATES
=========================== */

export function onMessageUpdated(callback) {

    const channel = supabase
        .channel("updated-messages")
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "messages"
            },
            (payload) => {

                callback(payload.new);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   LISTEN TO MESSAGE DELETES
=========================== */

export function onMessageDeleted(callback) {

    const channel = supabase
        .channel("deleted-messages")
        .on(
            "postgres_changes",
            {
                event: "DELETE",
                schema: "public",
                table: "messages"
            },
            (payload) => {

                callback(payload.old);

            }
        )
        .subscribe();

    return channel;

}