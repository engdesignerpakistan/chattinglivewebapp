// ======================================
// Chatting Live - Realtime Groups
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SUBSCRIBE TO GROUP
=========================== */

export function subscribeToGroup(groupId, callback) {

    const channel = supabase
        .channel(`group-${groupId}`)
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "group_messages",
                filter: `group_id=eq.${groupId}`
            },
            (payload) => {

                callback(payload);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   UNSUBSCRIBE GROUP
=========================== */

export async function unsubscribeGroup(channel) {

    if (channel) {
        await supabase.removeChannel(channel);
    }

}

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
   LISTEN NEW GROUP MESSAGES
=========================== */

export function onNewGroupMessage(groupId, callback) {

    const channel = supabase
        .channel(`group-new-${groupId}`)
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "group_messages",
                filter: `group_id=eq.${groupId}`
            },
            (payload) => {

                callback(payload.new);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   LISTEN GROUP UPDATES
=========================== */

export function onGroupMessageUpdated(groupId, callback) {

    const channel = supabase
        .channel(`group-update-${groupId}`)
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "group_messages",
                filter: `group_id=eq.${groupId}`
            },
            (payload) => {

                callback(payload.new);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   LISTEN GROUP DELETES
=========================== */

export function onGroupMessageDeleted(groupId, callback) {

    const channel = supabase
        .channel(`group-delete-${groupId}`)
        .on(
            "postgres_changes",
            {
                event: "DELETE",
                schema: "public",
                table: "group_messages",
                filter: `group_id=eq.${groupId}`
            },
            (payload) => {

                callback(payload.old);

            }
        )
        .subscribe();

    return channel;

}