// ======================================
// Chatting Live - Database
// ======================================

import supabase from "./config.js";

/* ===========================
   INSERT DATA
=========================== */

export async function insertData(table, values) {

    const { data, error } = await supabase
        .from(table)
        .insert(values)
        .select();

    if (error) {

        console.error(error.message);

        return null;

    }

    return data;

}

/* ===========================
   GET ALL DATA
=========================== */

export async function getData(table) {

    const { data, error } = await supabase
        .from(table)
        .select("*");

    if (error) {

        console.error(error.message);

        return [];

    }

    return data;

}

/* ===========================
   GET SINGLE ROW
=========================== */

export async function getById(table, id) {

    const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single();

    if (error) {

        console.error(error.message);

        return null;

    }

    return data;

}

/* ===========================
   UPDATE DATA
=========================== */

export async function updateData(table, id, values) {

    const { data, error } = await supabase
        .from(table)
        .update(values)
        .eq("id", id)
        .select();

    if (error) {

        console.error(error.message);

        return null;

    }

    return data;

}

/* ===========================
   DELETE DATA
=========================== */

export async function deleteData(table, id) {

    const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", id);

    if (error) {

        console.error(error.message);

        return false;

    }

    return true;

}

/* ===========================
   SEARCH USERS
=========================== */

export async function searchUsers(name) {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .ilike("full_name", `%${name}%`);

    if (error) {

        console.error(error.message);

        return [];

    }

    return data;

}