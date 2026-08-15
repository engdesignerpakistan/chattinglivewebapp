// ======================================
// Chatting Live - Realtime
// ======================================

import supabase from "./config.js";

/* ===========================
   LISTEN FOR NEW MESSAGES
=========================== */

export function listenMessages(callback) {

    const channel = supabase
        .channel("messages-channel")

        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "messages"
            },
            (payload) => {

                console.log("New Message:", payload.new);

                callback(payload.new);

            }
        )

        .subscribe();

    return channel;

}

/* ===========================
   STOP LISTENING
=========================== */

export function stopListening(channel) {

    supabase.removeChannel(channel);

}

/* ===========================
   ONLINE STATUS
=========================== */

export async function setOnlineStatus(userId, status) {

    const { error } = await supabase

        .from("profiles")

        .update({

            online: status

        })

        .eq("id", userId);

    if (error) {

        console.error(error.message);

    }

}

/* ===========================
   TYPING STATUS
=========================== */

export async function setTyping(userId, typing) {

    const { error } = await supabase

        .from("profiles")

        .update({

            typing: typing

        })

        .eq("id", userId);

    if (error) {

        console.error(error.message);

    }

}

/* ===========================
   MESSAGE READ
=========================== */

export async function markMessageRead(messageId) {

    const { error } = await supabase

        .from("messages")

        .update({

            is_read: true

        })

        .eq("id", messageId);

    if (error) {

        console.error(error.message);

    }

}