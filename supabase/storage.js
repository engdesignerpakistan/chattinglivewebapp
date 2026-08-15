// ======================================
// Chatting Live - Storage
// ======================================

import supabase from "./config.js";

/* ===========================
   UPLOAD FILE
=========================== */

export async function uploadFile(bucket, filePath, file) {

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
            upsert: true
        });

    if (error) {

        console.error(error.message);
        return null;

    }

    return data;

}

/* ===========================
   GET PUBLIC URL
=========================== */

export function getPublicUrl(bucket, filePath) {

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return data.publicUrl;

}

/* ===========================
   DELETE FILE
=========================== */

export async function deleteFile(bucket, filePath) {

    const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

    if (error) {

        console.error(error.message);
        return false;

    }

    return true;

}

/* ===========================
   LIST FILES
=========================== */

export async function listFiles(bucket, folder = "") {

    const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder);

    if (error) {

        console.error(error.message);
        return [];

    }

    return data;

}

/* ===========================
   DOWNLOAD FILE
=========================== */

export async function downloadFile(bucket, filePath) {

    const { data, error } = await supabase.storage
        .from(bucket)
        .download(filePath);

    if (error) {

        console.error(error.message);
        return null;

    }

    return data;

}