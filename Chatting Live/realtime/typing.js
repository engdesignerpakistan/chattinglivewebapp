// ======================================
// Chatting Live - Realtime Typing
// ======================================

import supabase from "../supabase/config.js";

/* ===========================
   CREATE TYPING CHANNEL
=========================== */

export function createTypingChannel(chatId) {

    return supabase.channel(`typing-${chatId}`);

}

/* ===========================
   SUBSCRIBE TYPING
=========================== */

export function subscribeTyping(channel, callback) {

    channel
        .on(
            "broadcast",
            {
                event: "typing"
            },
            ({ payload }) => {

                callback(payload);

            }
        )
        .subscribe();

    return channel;

}

/* ===========================
   START TYPING
=========================== */

export async function startTyping(channel, userId) {

    await channel.send({

        type: "broadcast",

        event: "typing",

        payload: {

            user_id: userId,
            typing: true

        }

    });

}

/* ===========================
   STOP TYPING
=========================== */

export async function stopTyping(channel, userId) {

    await channel.send({

        type: "broadcast",

        event: "typing",

        payload: {

            user_id: userId,
            typing: false

        }

    });

}

/* ===========================
   AUTO STOP TYPING
=========================== */

export function autoStopTyping(channel, userId, delay = 2000) {

    return setTimeout(() => {

        stopTyping(channel, userId);

    }, delay);

}

/* ===========================
   UNSUBSCRIBE TYPING
=========================== */

export async function unsubscribeTyping(channel) {

    if (channel) {

        await supabase.removeChannel(channel);

    }

}