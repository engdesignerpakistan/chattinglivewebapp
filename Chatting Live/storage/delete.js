// ======================================
// Chatting Live - Storage Delete
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   DELETE FILE
=========================== */

export async function deleteFile(bucket, path) {

    const { data, error } = await supabase.storage
        .from(bucket)
        .remove([path]);

    return { data, error };

}

/* ===========================
   DELETE MULTIPLE FILES
=========================== */

export async function deleteFiles(bucket, paths) {

    const { data, error } = await supabase.storage
        .from(bucket)
        .remove(paths);

    return { data, error };

}

/* ===========================
   DELETE USER IMAGE
=========================== */

export async function deleteUserImage(userId, fileName) {

    const path = `images/${userId}/${fileName}`;

    return await deleteFile("chatting-live", path);

}

/* ===========================
   DELETE USER VIDEO
=========================== */

export async function deleteUserVideo(userId, fileName) {

    const path = `videos/${userId}/${fileName}`;

    return await deleteFile("chatting-live", path);

}

/* ===========================
   DELETE USER AUDIO
=========================== */

export async function deleteUserAudio(userId, fileName) {

    const path = `audio/${userId}/${fileName}`;

    return await deleteFile("chatting-live", path);

}

/* ===========================
   DELETE USER DOCUMENT
=========================== */

export async function deleteUserDocument(userId, fileName) {

    const path = `documents/${userId}/${fileName}`;

    return await deleteFile("chatting-live", path);

}

/* ===========================
   DELETE USER AVATAR
=========================== */

export async function deleteUserAvatar(userId, extension) {

    const path = `avatars/${userId}.${extension}`;

    return await deleteFile("chatting-live", path);

}

/* ===========================
   DELETE ALL FILES IN FOLDER
=========================== */

export async function deleteFolder(bucket, folder) {

    const { data: files, error } = await supabase.storage
        .from(bucket)
        .list(folder);

    if (error) {

        return {
            success: false,
            error
        };

    }

    if (!files.length) {

        return {
            success: true,
            message: "Folder is already empty."
        };

    }

    const paths = files.map(file => `${folder}/${file.name}`);

    return await deleteFiles(bucket, paths);

}