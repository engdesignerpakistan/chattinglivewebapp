// ======================================
// Chatting Live - Reports Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CREATE REPORT
=========================== */

export async function createReport(reportData) {

    const { data, error } = await supabase
        .from("reports")
        .insert([reportData])
        .select();

    return { data, error };

}

/* ===========================
   GET ALL REPORTS
=========================== */

export async function getReports() {

    const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET REPORT BY ID
=========================== */

export async function getReportById(id) {

    const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   GET USER REPORTS
=========================== */

export async function getUserReports(userId) {

    const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("reported_user_id", userId)
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   UPDATE REPORT STATUS
=========================== */

export async function updateReportStatus(id, status) {

    const { data, error } = await supabase
        .from("reports")
        .update({
            status: status
        })
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   DELETE REPORT
=========================== */

export async function deleteReport(id) {

    const { error } = await supabase
        .from("reports")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   GET PENDING REPORTS
=========================== */

export async function getPendingReports() {

    const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

    return { data, error };

}