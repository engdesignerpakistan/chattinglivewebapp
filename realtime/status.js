// ======================================
// Chatting Live - Realtime Status
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SUBSCRIBE TO STATUS
=========================== */

export function subscribeToStatus(callback) {

    const channel = supabase
        .channel("status-updates")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "status"
            },
            (payload) => {

                callback(payload);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   CREATE STATUS
=========================== */

export async function createStatus(statusData) {

    const { data, error } = await supabase
        .from("status")
        .insert([statusData])
        .select();

    return { data, error };

}

/* ===========================
   UPDATE STATUS
=========================== */

export async function updateStatus(id, statusData) {

    const { data, error } = await supabase
        .from("status")
        .update(statusData)
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE STATUS
=========================== */

export async function deleteStatus(id) {

    const { error } = await supabase
        .from("status")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   LISTEN TO NEW STATUS
=========================== */

export function onNewStatus(callback) {

    const channel = supabase
        .channel("new-status")
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "status"
            },
            (payload) => {

                callback(payload.new);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   LISTEN TO STATUS UPDATES
=========================== */

export function onStatusUpdated(callback) {

    const channel = supabase
        .channel("updated-status")
        .on(
            "postgres_changes",
            {
                event: "UPDATE",
                schema: "public",
                table: "status"
            },
            (payload) => {

                callback(payload.new);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   LISTEN TO STATUS DELETES
=========================== */

export function onStatusDeleted(callback) {

    const channel = supabase
        .channel("deleted-status")
        .on(
            "postgres_changes",
            {
                event: "DELETE",
                schema: "public",
                table: "status"
            },
            (payload) => {

                callback(payload.old);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   UNSUBSCRIBE STATUS
=========================== */

export async function unsubscribeStatus(channel) {

    if (channel) {

        await supabase.removeChannel(channel);

    }

}