// ======================================
// Chatting Live - Authentication
// ======================================

import supabase from "./config.js";

/* ===========================
   SIGN UP
=========================== */

export async function signUp(name, email, password) {

    const { data, error } = await supabase.auth.signUp({

        email: email,

        password: password,

        options: {

            data: {

                full_name: name

            }

        }

    });

    if (error) {

        console.error(error.message);

        alert(error.message);

        return;

    }

    alert("Account created successfully.");

    return data;

}

/* ===========================
   LOGIN
=========================== */

export async function login(email, password) {

    const { data, error } =
        await supabase.auth.signInWithPassword({

            email: email,

            password: password

        });

    if (error) {

        console.error(error.message);

        alert(error.message);

        return;

    }

    alert("Login Successful");

    return data;

}

/* ===========================
   LOGOUT
=========================== */

export async function logout() {

    const { error } =
        await supabase.auth.signOut();

    if (error) {

        console.error(error.message);

        return;

    }

    window.location.href = "login.html";

}

/* ===========================
   CURRENT USER
=========================== */

export async function getCurrentUser() {

    const { data } =
        await supabase.auth.getUser();

    return data.user;

}

/* ===========================
   SESSION
=========================== */

export async function getSession() {

    const { data } =
        await supabase.auth.getSession();

    return data.session;

}

/* ===========================
   RESET PASSWORD
=========================== */

export async function resetPassword(email) {

    const { error } =
        await supabase.auth.resetPasswordForEmail(email);

    if (error) {

        alert(error.message);

        return;

    }

    alert("Password reset email sent.");

}