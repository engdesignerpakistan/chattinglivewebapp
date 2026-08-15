// ======================================
// Chatting Live - Realtime Read Receipts
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   MARK MESSAGE AS DELIVERED
=========================== */

export async function markMessageDelivered(messageId) {

    const { data, error } = await supabase
        .from("messages")
        .update({
            is_delivered: true,
            delivered_at: new Date().toISOString()
        })
        .eq("id", messageId)
        .select();

    return { data, error };

}

/* ===========================
   MARK MESSAGE AS READ
=========================== */

export async function markMessageRead(messageId) {

    const { data, error } = await supabase
        .from("messages")
        .update({
            is_read: true,
            read_at: new Date().toISOString()
        })
        .eq("id", messageId)
        .select();

    return { data, error };

}

/* ===========================
   SUBSCRIBE READ RECEIPTS
=========================== */

export function subscribeReadReceipts(callback) {

    const channel = supabase
        .channel("read-receipts")
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
   GET MESSAGE STATUS
=========================== */

export async function getMessageStatus(messageId) {

    const { data, error } = await supabase
        .from("messages")
        .select("is_delivered, delivered_at, is_read, read_at")
        .eq("id", messageId)
        .single();

    return { data, error };

}

/* ===========================
   UNSUBSCRIBE
=========================== */

export async function unsubscribeReadReceipts(channel) {

    if (channel) {

        await supabase.removeChannel(channel);

    }

}

/* ===========================
   LISTEN READ EVENTS ONLY
=========================== */

export function onMessageRead(callback) {

    const channel = supabase
        .channel("message-read")
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "messages"
            },
            (payload) => {

                if (payload.new.is_read) {
                    callback(payload.new);
                }

            }
        )
        .subscribe();

    return channel;

}