// ======================================
// Chatting Live - Realtime Channels
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CREATE CHANNEL
=========================== */

export function createChannel(channelName) {

    return supabase.channel(channelName);

}

/* ===========================
   SUBSCRIBE CHANNEL
=========================== */

export async function subscribeChannel(channel) {

    return new Promise((resolve) => {

        channel.subscribe((status) => {

            resolve(status);

        });

    });

}

/* ===========================
   REMOVE CHANNEL
=========================== */

export async function removeChannel(channel) {

    if (!channel) return;

    await supabase.removeChannel(channel);

}

/* ===========================
   REMOVE ALL CHANNELS
=========================== */

export async function removeAllChannels() {

    const channels = supabase.getChannels();

    for (const channel of channels) {

        await supabase.removeChannel(channel);

    }

}

/* ===========================
   GET ACTIVE CHANNELS
=========================== */

export function getActiveChannels() {

    return supabase.getChannels();

}

/* ===========================
   FIND CHANNEL
=========================== */

export function findChannel(channelName) {

    const channels = supabase.getChannels();

    return channels.find(
        (channel) => channel.topic === channelName
    );

}

/* ===========================
   CHANNEL EXISTS
=========================== */

export function channelExists(channelName) {

    return !!findChannel(channelName);

}

/* ===========================
   LEAVE CHANNEL
=========================== */

export async function leaveChannel(channel) {

    if (!channel) return;

    await supabase.removeChannel(channel);

}