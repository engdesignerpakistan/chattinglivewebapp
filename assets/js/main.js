/* ==========================================
   Chatting Live - Main JavaScript
========================================== */

// 1. Supabase Initialization
const SUPABASE_URL = 'https://jfbhkuczihyvsprgezlq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_o-HXxVkYJ37i-KQHLVlA9w_ju2l9sCt';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
  console.log("Chatting Live Loaded Successfully");
  initializeApp();
});

/* ==========================================
   Initialize
========================================== */
function initializeApp() {
  setupNavigation();
  setupForms();
  setupTheme();
  setupChat();
}

/* ==========================================
   Navigation
========================================== */
function setupNavigation() {
  console.log("Navigation Ready");
}

/* ==========================================
   Forms
========================================== */
function setupForms() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const profileForm = document.getElementById("profileForm");

  // 1. Supabase Log In Logic
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email")?.value;
      const password = document.getElementById("password")?.value;

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert("Login failed: " + error.message);
      } else {
        alert("Login successful!");
        console.log("User logged in:", data);
        window.location.href = "home.html";
      }
    });
  }

  // 2. Supabase Sign Up Logic
  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullname")?.value;
      const email = document.getElementById("email")?.value;
      const password = document.getElementById("password")?.value;

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        alert("Signup failed: " + error.message);
      } else {
        alert("Signup successful!");
        console.log("User data:", data);
        window.location.href = "login.html";
      }
    });
  }

  // 3. Supabase Profile Update Logic
  if (profileForm) {
    profileForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const fullName = document.getElementById("fullName")?.value;

      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (error) {
        alert("Error updating profile: " + error.message);
      } else {
        alert("Profile updated successfully!");
        console.log("Updated user data:", data);
      }
    });
  }
}

/* ==========================================
   4. Logout Functionality
========================================== */
async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("Error logging out: " + error.message);
  } else {
    alert("Logged out successfully!");
    window.location.href = "login.html";
  }
}

/* ==========================================
   Theme
========================================== */
function setupTheme() {
  console.log("Theme Ready");
}

/* ==========================================
   Chat
========================================== */
function setupChat() {
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }
}

function sendMessage() {
  const input = document.getElementById("message");
  const messages = document.getElementById("messages");
  if (!input || !messages) return;
  if (input.value.trim() === "") return;

  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = input.value;
  messages.appendChild(div);
  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}

/* ==========================================
   Utilities
========================================== */
function showNotification(text) {
  alert(text);
}

function showLoader() {
  console.log("Loading...");
}

function hideLoader() {
  console.log("Finished");
}
