// ======================================
// Chatting Live - Friends Database
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   ADD FRIEND
=========================== */

export async function addFriend(friendData) {

    const { data, error } = await supabase
        .from("friends")
        .insert([friendData])
        .select();

    return { data, error };

}

/* ===========================
   GET ALL FRIENDS
=========================== */

export async function getFriends(userId) {

    const { data, error } = await supabase
        .from("friends")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    return { data, error };

}

/* ===========================
   GET FRIEND BY ID
=========================== */

export async function getFriendById(id) {

    const { data, error } = await supabase
        .from("friends")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };

}

/* ===========================
   CHECK FRIENDSHIP
=========================== */

export async function isFriend(userId, friendId) {

    const { data, error } = await supabase
        .from("friends")
        .select("*")
        .eq("user_id", userId)
        .eq("friend_id", friendId)
        .maybeSingle();

    return {
        isFriend: !!data,
        data,
        error
    };

}

/* ===========================
   REMOVE FRIEND
=========================== */

export async function removeFriend(id) {

    const { error } = await supabase
        .from("friends")
        .delete()
        .eq("id", id);

    return { error };

}

/* ===========================
   GET FRIEND COUNT
=========================== */

export async function getFriendCount(userId) {

    const { count, error } = await supabase
        .from("friends")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq("user_id", userId);

    return { count, error };

}