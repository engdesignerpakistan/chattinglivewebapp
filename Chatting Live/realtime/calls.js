// ======================================
// Chatting Live - Realtime Calls
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   SUBSCRIBE TO CALLS
=========================== */

export function subscribeToCalls(userId, callback) {

    const channel = supabase
        .channel(`calls-${userId}`)
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "calls",
                filter: `receiver_id=eq.${userId}`
            },
            (payload) => {

                callback(payload);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   START CALL
=========================== */

export async function startCall(callData) {

    const { data, error } = await supabase
        .from("calls")
        .insert([callData])
        .select();

    return { data, error };

}

/* ===========================
   ACCEPT CALL
=========================== */

export async function acceptCall(callId) {

    const { data, error } = await supabase
        .from("calls")
        .update({
            call_status: "accepted",
            accepted_at: new Date().toISOString()
        })
        .eq("id", callId)
        .select();

    return { data, error };

}

/* ===========================
   REJECT CALL
=========================== */

export async function rejectCall(callId) {

    const { data, error } = await supabase
        .from("calls")
        .update({
            call_status: "rejected",
            ended_at: new Date().toISOString()
        })
        .eq("id", callId)
        .select();

    return { data, error };

}

/* ===========================
   END CALL
=========================== */

export async function endCall(callId) {

    const { data, error } = await supabase
        .from("calls")
        .update({
            call_status: "ended",
            ended_at: new Date().toISOString()
        })
        .eq("id", callId)
        .select();

    return { data, error };

}

/* ===========================
   MISSED CALL
=========================== */

export async function markMissedCall(callId) {

    const { data, error } = await supabase
        .from("calls")
        .update({
            call_status: "missed",
            ended_at: new Date().toISOString()
        })
        .eq("id", callId)
        .select();

    return { data, error };

}

/* ===========================
   UNSUBSCRIBE CALLS
=========================== */

export async function unsubscribeCalls(channel) {

    if (channel) {

        await supabase.removeChannel(channel);

    }

}