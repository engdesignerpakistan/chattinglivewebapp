// ======================================
// Chatting Live - Group Members Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   ADD MEMBER
=========================== */

export async function addMember(memberData) {

    const { data, error } = await supabase
        .from("group_members")
        .insert([memberData])
        .select();

    return { data, error };

}

/* ===========================
   GET GROUP MEMBERS
=========================== */

export async function getGroupMembers(groupId) {

    const { data, error } = await supabase
        .from("group_members")
        .select("*")
        .eq("group_id", groupId);

    return { data, error };

}

/* ===========================
   GET MEMBER
=========================== */

export async function getMember(groupId, userId) {

    const { data, error } = await supabase
        .from("group_members")
        .select("*")
        .eq("group_id", groupId)
        .eq("user_id", userId)
        .single();

    return { data, error };

}

/* ===========================
   UPDATE MEMBER ROLE
=========================== */

export async function updateMemberRole(id, role) {

    const { data, error } = await supabase
        .from("group_members")
        .update({
            role: role
        })
        .eq("id", id)
        .select();

    return { data, error };

}

/* ===========================
   REMOVE MEMBER
=========================== */

export async function removeMember(id) {

    const { error } = await supabase
        .from("group_members")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   LEAVE GROUP
=========================== */

export async function leaveGroup(groupId, userId) {

    const { error } = await supabase
        .from("group_members")
        .delete()
        .eq("group_id", groupId)
        .eq("user_id", userId);

    return { error };

}