// ======================================
// Chatting Live - Calls Database
// ======================================

import supabase from "../supabase/config.js";

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
   GET ALL CALLS
=========================== */

export async function getCalls(userId) {

    const { data, error } = await supabase
        .from("calls")
        .select("*")
        .or(`caller_id.eq.${userId},receiver_id.eq.${userId}`)
        .order("started_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET CALL BY ID
=========================== */

export async function getCallById(id) {

    const { data, error } = await supabase
        .from("calls")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE CALL STATUS
=========================== */

export async function updateCallStatus(id, status) {

    const { data, error } = await supabase
        .from("calls")
        .update({
            call_status: status
        })
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   END CALL
=========================== */

export async function endCall(id, endedAt) {

    const { data, error } = await supabase
        .from("calls")
        .update({
            call_status: "ended",
            ended_at: endedAt
        })
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE CALL
=========================== */

export async function deleteCall(id) {

    const { error } = await supabase
        .from("calls")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   MISSED CALLS
=========================== */

export async function getMissedCalls(userId) {

    const { data, error } = await supabase
        .from("calls")
        .select("*")
        .eq("receiver_id", userId)
        .eq("call_status", "missed")
        .order("started_at", { ascending: false });

    return { data, error };

}