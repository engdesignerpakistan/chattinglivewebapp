// ======================================
// Chatting Live - Realtime Presence
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CREATE PRESENCE CHANNEL
=========================== */

export async function createPresenceChannel(roomId, user) {

    const channel = supabase.channel(`presence-${roomId}`, {
        config: {
            presence: {
                key: user.id
            }
        }
    });

    await channel.subscribe(async (status) => {

        if (status === "SUBSCRIBED") {

            await channel.track({
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                online_at: new Date().toISOString()
            });

        }

    });

    return channel;

}

/* ===========================
   LISTEN PRESENCE CHANGES
=========================== */

export function onPresenceChange(channel, callback) {

    channel
        .on("presence", { event: "sync" }, () => {

            callback(channel.presenceState());

        })
        .on("presence", { event: "join" }, ({ key, newPresences }) => {

            callback({
                type: "join",
                key,
                presences: newPresences
            });

        })
        .on("presence", { event: "leave" }, ({ key, leftPresences }) => {

            callback({
                type: "leave",
                key,
                presences: leftPresences
            });

        });

}

/* ===========================
   GET ONLINE USERS
=========================== */

export function getOnlineUsers(channel) {

    return channel.presenceState();

}

/* ===========================
   UPDATE PRESENCE
=========================== */

export async function updatePresence(channel, data) {

    await channel.track({
        ...data,
        updated_at: new Date().toISOString()
    });

}

/* ===========================
   GO OFFLINE
=========================== */

export async function goOffline(channel) {

    if (channel) {

        await channel.untrack();
        await supabase.removeChannel(channel);

    }

}

/* ===========================
   IS USER ONLINE
=========================== */

export function isUserOnline(channel, userId) {

    const state = channel.presenceState();

    return !!state[userId];

}