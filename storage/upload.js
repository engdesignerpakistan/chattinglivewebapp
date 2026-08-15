// ======================================
// Chatting Live - Storage Upload
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   UPLOAD FILE
=========================== */

export async function uploadFile(bucket, path, file) {

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            upsert: true
        });

    return { data, error };

}

/* ===========================
   UPLOAD IMAGE
=========================== */

export async function uploadImage(file, userId) {

    const extension = file.name.split(".").pop();
    const path = `images/${userId}/${Date.now()}.${extension}`;

    return await uploadFile("chatting-live", path, file);

}

/* ===========================
   UPLOAD VIDEO
=========================== */

export async function uploadVideo(file, userId) {

    const extension = file.name.split(".").pop();
    const path = `videos/${userId}/${Date.now()}.${extension}`;

    return await uploadFile("chatting-live", path, file);

}

/* ===========================
   UPLOAD AUDIO
=========================== */

export async function uploadAudio(file, userId) {

    const extension = file.name.split(".").pop();
    const path = `audio/${userId}/${Date.now()}.${extension}`;

    return await uploadFile("chatting-live", path, file);

}

/* ===========================
   UPLOAD DOCUMENT
=========================== */

export async function uploadDocument(file, userId) {

    const extension = file.name.split(".").pop();
    const path = `documents/${userId}/${Date.now()}.${extension}`;

    return await uploadFile("chatting-live", path, file);

}

/* ===========================
   UPLOAD AVATAR
=========================== */

export async function uploadAvatar(file, userId) {

    const extension = file.name.split(".").pop();
    const path = `avatars/${userId}.${extension}`;

    return await uploadFile("chatting-live", path, file);

}

/* ===========================
   GET PUBLIC URL
=========================== */

export function getPublicUrl(bucket, path) {

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

    return data.publicUrl;

}