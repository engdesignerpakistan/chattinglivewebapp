// ======================================
// Chatting Live - Storage Download
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   DOWNLOAD FILE
=========================== */

export async function downloadFile(bucket, path) {

    const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);

    return { data, error };

}

/* ===========================
   GET PUBLIC URL
=========================== */

export function getPublicFileUrl(bucket, path) {

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

    return data.publicUrl;

}

/* ===========================
   CREATE SIGNED URL
=========================== */

export async function createSignedUrl(
    bucket,
    path,
    expiresIn = 3600
) {

    const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);

    return { data, error };

}

/* ===========================
   CREATE SIGNED URLS
=========================== */

export async function createSignedUrls(
    bucket,
    paths,
    expiresIn = 3600
) {

    const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrls(paths, expiresIn);

    return { data, error };

}

/* ===========================
   LIST FILES
=========================== */

export async function listFiles(bucket, folder = "") {

    const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder);

    return { data, error };

}

/* ===========================
   GET FILE INFO
=========================== */

export async function getFileInfo(bucket, path) {

    const folder = path.substring(0, path.lastIndexOf("/"));
    const fileName = path.substring(path.lastIndexOf("/") + 1);

    const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder);

    if (error) {
        return { data: null, error };
    }

    const file = data.find(item => item.name === fileName);

    return {
        data: file || null,
        error: null
    };

}