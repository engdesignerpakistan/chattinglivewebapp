```javascript
/* ==========================================
   Chatting Live - Main JavaScript
   ========================================== */


/* ==========================================
   1. Supabase Configuration
   ========================================== */

const SUPABASE_URL =
    "https://jfbhkuczihyvsprgezlq.supabase.co";

const SUPABASE_ANON_KEY =
    "YOUR_PUBLISHABLE_KEY";

const supabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


/* ==========================================
   2. App Start
   ========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Chatting Live Loaded Successfully"
        );

        setupForms();
        setupTheme();
        setupChat();
        checkUserSession();

    }
);


/* ==========================================
   3. Login / Sign Up
   ========================================== */

function setupForms() {

    const loginForm =
        document.getElementById("loginForm");

    const signupForm =
        document.getElementById("signupForm");

    const profileForm =
        document.getElementById("profileForm");


    /* ======================================
       LOGIN
       ====================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();

                const email =
                    document
                    .getElementById("email")
                    ?.value
                    .trim();

                const password =
                    document
                    .getElementById("password")
                    ?.value;


                if (!email || !password) {

                    alert(
                        "براہ کرم ای میل اور پاس ورڈ درج کریں۔"
                    );

                    return;
                }


                const {
                    data,
                    error
                } =
                    await supabase.auth
                    .signInWithPassword({

                        email: email,

                        password: password

                    });


                if (error) {

                    alert(
                        "لاگ اِن نہیں ہوا: "
                        + error.message
                    );

                    console.error(error);

                    return;
                }


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                alert(
                    "لاگ اِن کامیاب ہو گیا۔"
                );


                window.location.href =
                    "home.html";

            }
        );

    }


    /* ======================================
       SIGN UP
       ====================================== */

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();


                const fullName =
                    document
                    .getElementById("fullname")
                    ?.value
                    .trim();


                const username =
                    document
                    .getElementById("username")
                    ?.value
                    .trim();


                const email =
                    document
                    .getElementById("email")
                    ?.value
                    .trim();


                const password =
                    document
                    .getElementById("password")
                    ?.value;


                const confirmPassword =
                    document
                    .getElementById("confirmPassword")
                    ?.value;


                /* Check fields */

                if (
                    !fullName ||
                    !username ||
                    !email ||
                    !password ||
                    !confirmPassword
                ) {

                    alert(
                        "براہ کرم تمام خانے مکمل کریں۔"
                    );

                    return;
                }


                /* Check passwords */

                if (
                    password !==
                    confirmPassword
                ) {

                    alert(
                        "دونوں پاس ورڈ ایک جیسے نہیں ہیں۔"
                    );

                    return;
                }


                /* Minimum password */

                if (password.length < 6) {

                    alert(
                        "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے۔"
                    );

                    return;
                }


                /* =================================
                   Create Supabase Auth Account
                   ================================= */

                const {
                    data,
                    error
                } =
                    await supabase.auth
                    .signUp({

                        email: email,

                        password: password,

                        options: {

                            data: {

                                full_name:
                                    fullName,

                                username:
                                    username

                            }

                        }

                    });


                if (error) {

                    alert(
                        "سائن اَپ نہیں ہوا: "
                        + error.message
                    );

                    console.error(error);

                    return;
                }


                /* =================================
                   Save User Information
                   ================================= */

                if (data.user) {

                    const {
                        error:
                        profileError
                    } =
                        await supabase
                        .from("Sign Up")
                        .insert({

                            fullname:
                                fullName,

                            username:
                                username,

                            email:
                                email

                        });


                    if (profileError) {

                        console.error(
                            "Profile Save Error:",
                            profileError
                        );

                        alert(
                            "اکاؤنٹ بن گیا، لیکن پروفائل کی معلومات محفوظ نہیں ہو سکیں۔"
                        );

                        return;
                    }

                }


                /* =================================
                   Success
                   ================================= */

                alert(
                    "آپ کا اکاؤنٹ کامیابی سے بن گیا۔"
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    /* ======================================
       PROFILE
       ====================================== */

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();


                const fullName =
                    document
                    .getElementById("fullName")
                    ?.value
                    .trim();


                if (!fullName) {

                    alert(
                        "براہ کرم اپنا نام درج کریں۔"
                    );

                    return;
                }


                const {
                    data,
                    error
                } =
                    await supabase.auth
                    .updateUser({

                        data: {

                            full_name:
                                fullName

                        }

                    });


                if (error) {

                    alert(
                        "پروفائل اپڈیٹ نہیں ہوا: "
                        + error.message
                    );

                    return;
                }


                alert(
                    "پروفائل کامیابی سے اپڈیٹ ہو گیا۔"
                );

                console.log(data);

            }
        );

    }

}


/* ==========================================
   4. Check User Session
   ========================================== */

async function checkUserSession() {

    const {
        data
    } =
        await supabase.auth
        .getSession();


    if (data.session) {

        localStorage.setItem(
            "user",
            JSON.stringify(
                data.session.user
            )
        );

    }

}


/* ==========================================
   5. Logout
   ========================================== */

async function logoutUser() {

    const {
        error
    } =
        await supabase.auth
        .signOut();


    if (error) {

        alert(
            "لاگ آؤٹ نہیں ہوا: "
            + error.message
        );

        return;
    }


    localStorage.removeItem(
        "user"
    );


    localStorage.removeItem(
        "token"
    );


    window.location.href =
        "index.html";

}


/* ==========================================
   6. Theme
   ========================================== */

function setupTheme() {

    console.log(
        "Theme Ready"
    );

}


/* ==========================================
   7. Chat
   ========================================== */

function setupChat() {

    const sendBtn =
        document.getElementById(
            "sendBtn"
        );


    if (sendBtn) {

        sendBtn.addEventListener(
            "click",
            sendMessage
        );

    }

}


/* ==========================================
   8. Send Message
   ========================================== */

function sendMessage() {

    const input =
        document.getElementById(
            "message"
        );


    const messages =
        document.getElementById(
            "messages"
        );


    if (!input || !messages) {

        return;
    }


    const text =
        input.value.trim();


    if (!text) {

        return;
    }


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "message";


    div.textContent =
        text;


    messages.appendChild(
        div
    );


    input.value =
        "";


    messages.scrollTop =
        messages.scrollHeight;

}


/* ==========================================
   9. Notifications
   ========================================== */

function showNotification(
    text
) {

    alert(text);

}


/* ==========================================
   10. Loader
   ========================================== */

function showLoader() {

    console.log(
        "Loading..."
    );

}


function hideLoader() {

    console.log(
        "Finished"
    );

}
```
