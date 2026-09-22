/* ======================================================
                    THINKING
    BOMBI AI SCREEN (STUDENT) — v2 (conectado a Botpress
    Chat API) — vive en Dashboard-Student/Bombi-Seccion/
====================================================== */

/* ======================================================
                    BOTPRESS CONFIG
====================================================== */

const BOTPRESS_CLIENT_ID = "99bf3db2-306e-448f-a7e4-9c4cec21efbe";
const BOTPRESS_API = "https://chat.botpress.cloud";

let bpUserId = null;
let bpUserKey = null;
let bpConversationId = null;

// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";

const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC";

let db = null;
try {
  db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );
} catch (e) {
  console.warn('No se pudo conectar a Supabase (revisa tu conexión a internet):', e);
}

/* ======================================================
                    LUCIDE ICONS
====================================================== */

function refreshIcons(){

    if(window.lucide){

        lucide.createIcons();

    }

}

refreshIcons();

/* ======================================================
                    THEME (igual a Student Dashboard)
====================================================== */

const body = document.body;

const themeToggle = document.querySelector(".theme-toggle");

const toggleCircle = document.querySelector(".toggle-circle");

function enableDarkMode(){

    body.classList.remove("light-theme");

    body.classList.add("dark-theme");

    toggleCircle.style.left = "11px";

}

function enableLightMode(){

    body.classList.remove("dark-theme");

    body.classList.add("light-theme");

    toggleCircle.style.left = "49px";

}

themeToggle.addEventListener("click", () => {

    if(body.classList.contains("dark-theme")){
        enableLightMode();
    } else {
        enableDarkMode();
    }

    saveTheme();

});

function saveTheme(){

    if(body.classList.contains("dark-theme")){
        localStorage.setItem("thinking-theme", "dark");
    } else {
        localStorage.setItem("thinking-theme", "light");
    }

}

function loadTheme(){

    const savedTheme = localStorage.getItem("thinking-theme");

    if(savedTheme === "light"){
        enableLightMode();
    } else {
        enableDarkMode();
    }

}

loadTheme();

/* ======================================================
                MOBILE SIDEBAR TOGGLE
====================================================== */

const sidebarEl = document.querySelector(".sidebar");

const menuToggle = document.getElementById("menuToggle");

const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar(){

    sidebarEl.classList.add("open");

    sidebarOverlay.classList.add("open");

}

function closeSidebar(){

    sidebarEl.classList.remove("open");

    sidebarOverlay.classList.remove("open");

}

menuToggle.addEventListener("click", () => {

    if(sidebarEl.classList.contains("open")){
        closeSidebar();
    } else {
        openSidebar();
    }

});

sidebarOverlay.addEventListener("click", closeSidebar);

document.querySelectorAll(".sidebar-menu a, .sidebar-footer a").forEach(link => {
    link.addEventListener("click", closeSidebar);
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
        closeSidebar();
    }
});

/* ======================================================
                DROPDOWNS (notificaciones / perfil)
====================================================== */

const notificationBtn = document.getElementById("notificationBtn");

const notificationsPanel = document.getElementById("notificationsPanel");

const profileBtn = document.getElementById("profileBtn");

const profilePanel = document.getElementById("profilePanel");

function closeAllDropdowns(){

    [notificationsPanel, profilePanel].forEach((p) => p && p.classList.remove("open"));

}

notificationBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    const wasOpen = notificationsPanel.classList.contains("open");

    closeAllDropdowns();

    if(!wasOpen){
        notificationsPanel.classList.add("open");
    }

});

profileBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    const wasOpen = profilePanel.classList.contains("open");

    closeAllDropdowns();

    if(!wasOpen){
        profilePanel.classList.add("open");
    }

});

document.addEventListener("click", () => {

    closeAllDropdowns();

});

/* ======================================================
                TOASTS
====================================================== */

const toastContainer = document.getElementById("toastContainer");

function showToast(message, icon){

    if(!toastContainer){
        return;
    }

    const toast = document.createElement("div");

    toast.classList.add("toast");

    toast.innerHTML = `
        <div class="toast-icon"><i data-lucide="${icon}"></i></div>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    refreshIcons();

    setTimeout(() => {

        toast.classList.add("leaving");

        setTimeout(() => toast.remove(), 250);

    }, 3200);

}

function wireComingSoon(id, message){

    const el = document.getElementById(id);

    if(!el){
        return;
    }

    el.addEventListener("click", (e) => {

        e.preventDefault();

        showToast(message, "sparkles");

    });

}

wireComingSoon("navLearningStyles", "Learning Styles is coming soon.");
wireComingSoon("navCourses", "Courses is coming soon.");
wireComingSoon("navProgress", "Progress is coming soon.");
wireComingSoon("navDailyMission", "Daily Mission is coming soon.");
wireComingSoon("navAchievements", "This full page is coming soon.");
wireComingSoon("sidebarSettingsBtn", "Settings is coming soon.");
wireComingSoon("profileMyProfileBtn", "My Profile is coming soon.");
wireComingSoon("profileSettingsBtn", "Settings is coming soon.");

/* ======================================================
                LOGOUT REAL

    AVISO: no vi tu carpeta de login de Student en la
    captura, así que asumí "LOGIN-Student" (con guion),
    igual que ya tenía tu Student Dashboard.js, solo con
    un "../" extra por estar un nivel más profundo. Si tu
    carpeta real se llama distinto (ej. "LOGIN Student"
    con espacio, como "LOGIN Teacher"), dime el nombre
    exacto y lo ajusto.
====================================================== */

async function handleLogout(e){

    e.preventDefault();

    if(typeof db !== "undefined" && db.auth){

        await db.auth.signOut();

    }

    window.location.href = "../../LOGIN-Student/STUDENT LOGIN.html";

}

document.getElementById("logoutBtn").addEventListener("click", handleLogout);

document.getElementById("logoutBtnSidebar").addEventListener("click", handleLogout);

/* ======================================================
                LOAD USER DATA (solo nombre/avatar,
                esta pantalla no muestra stats)
====================================================== */

async function loadUserData(){

    if(!db || !db.auth){

        return;

    }

    const { data: { session }, error: sessionError } = await db.auth.getSession();

    if(sessionError){
        console.error(sessionError);
    }

    if(!session){
        window.location.href = "../../LOGIN-Student/STUDENT LOGIN.html";
        return;
    }

    const user = session.user;

    const { data, error } = await db
        .from("THINKING")
        .select("Nombre_Usuario")
        .eq("id", user.id)
        .single();

    if(error){
        console.error(error);
        return;
    }

    const nombre = data.Nombre_Usuario;

    document.getElementById("userName").textContent = nombre;
    document.getElementById("profileName").textContent = nombre;

    const iniciales = nombre
        .split(" ")
        .map(p => p[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    document.getElementById("userAvatar").textContent = iniciales;

}

/* ######################################################
#
#         BOTPRESS CHAT API — integración real
#
#   AVISO: código construido a partir de cómo funcionaba
#   la Chat API de Botpress hasta enero 2026. No se probó
#   en vivo. Si algo falla, debería salir un toast de error
#   aquí mismo indicándolo — repórtalo para ajustar el
#   endpoint/campo que haya cambiado.
#
###################################################### */

async function bpInitChat(){

    // 1. Crear usuario anónimo
    const userRes = await fetch(`${BOTPRESS_API}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-webhook-id": BOTPRESS_CLIENT_ID
        },
        body: JSON.stringify({})
    });

    if(!userRes.ok){
        throw new Error(`No se pudo crear el usuario de Botpress (status ${userRes.status})`);
    }

    const userData = await userRes.json();

    console.log("Botpress /users respuesta completa:", userData);

    bpUserId = userData.user?.id ?? null;
    bpUserKey = userData.key ?? null;

    if(!bpUserKey){
        throw new Error("Botpress no devolvió una 'key' de usuario válida.");
    }

    // 2. Crear conversación
    const convRes = await fetch(`${BOTPRESS_API}/conversations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-webhook-id": BOTPRESS_CLIENT_ID,
            "x-user-key": bpUserKey
        },
        body: JSON.stringify({})
    });

    if(!convRes.ok){
        throw new Error(`No se pudo crear la conversación de Botpress (status ${convRes.status})`);
    }

    const convData = await convRes.json();

    bpConversationId = convData.conversation?.id ?? null;

    if(!bpConversationId){
        throw new Error("Botpress no devolvió un ID de conversación válido.");
    }

}

async function bpSendMessage(text){

    const res = await fetch(`${BOTPRESS_API}/conversations/${bpConversationId}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-webhook-id": BOTPRESS_CLIENT_ID,
            "x-user-key": bpUserKey
        },
        body: JSON.stringify({
            payload: { type: "text", text: text }
        })
    });

    if(!res.ok){
        throw new Error(`No se pudo enviar el mensaje a Botpress (status ${res.status})`);
    }

}

async function bpPollForReply(){

    // Pregunta cada 1.5s, hasta 15s en total, esperando
    // un mensaje nuevo que NO sea del propio usuario.

    for(let i = 0; i < 10; i++){

        await new Promise((resolve) => setTimeout(resolve, 1500));

        const res = await fetch(`${BOTPRESS_API}/conversations/${bpConversationId}/messages`, {
            headers: {
                "x-webhook-id": BOTPRESS_CLIENT_ID,
                "x-user-key": bpUserKey
            }
        });

        if(!res.ok){
            continue;
        }

        const data = await res.json();

        const messages = Array.isArray(data) ? data : (data.messages ?? []);

        const botMessage = messages.find((msg) => msg.userId !== bpUserId && msg.payload?.text);

        if(botMessage){
            return botMessage.payload.text;
        }

    }

    return null;

}

async function sendBombiRealReply(userText){

    showTypingIndicator();

    try{

        if(!bpConversationId){
            await bpInitChat();
        }

        await bpSendMessage(userText);

        const reply = await bpPollForReply();

        removeTypingIndicator();

        if(reply){
            appendMessage(reply, "bot");
        } else {
            appendMessage("Bombi is taking a bit long to respond — try again in a moment.", "bot");
        }

    }
    catch(err){

        removeTypingIndicator();

        console.error("Error de Botpress:", err);

        showToast("Couldn't reach Bombi's AI right now.", "alert-triangle");

        appendMessage("I'm having trouble connecting right now — please try again in a bit.", "bot");

    }

}

/* ######################################################
#
#                    CHAT — BOMBI AI (UI)
#
###################################################### */

const chatMessages = document.getElementById("chatMessages");

const chatInput = document.getElementById("chatInput");

const chatSendBtn = document.getElementById("chatSendBtn");

const chatMicBtn = document.getElementById("chatMicBtn");

const welcomeMessage = "Hey! I'm Bombi, your study buddy. I can help you review a topic, prep for a quiz or give you tips for how you learn best. What are we working on today?";

const suggestions = [
    "Explain a topic simply",
    "Quiz me on today's lesson",
    "Give me a study tip"
];

/* ------------------------------------------------------
        Crea una burbuja de mensaje (usuario o bot)
------------------------------------------------------ */

function appendMessage(text, sender){

    const wrap = document.createElement("div");

    wrap.classList.add("chat-message", sender);

    const avatarHtml = sender === "bot"
        ? `<img src="../../Images/Bombi_EMOTIONweb.webp" alt="Bombi">`
        : `<i data-lucide="user"></i>`;

    wrap.innerHTML = `
        <div class="chat-avatar">${avatarHtml}</div>
        <div class="chat-bubble">${text}</div>
    `;

    chatMessages.appendChild(wrap);

    refreshIcons();

    chatMessages.scrollTop = chatMessages.scrollHeight;

    return wrap;

}

/* ------------------------------------------------------
        Muestra los "..." mientras Bombi responde
------------------------------------------------------ */

function showTypingIndicator(){

    const wrap = document.createElement("div");

    wrap.classList.add("chat-message", "bot");

    wrap.id = "typingIndicator";

    wrap.innerHTML = `
        <div class="chat-avatar"><img src="../../Images/Bombi_EMOTIONweb.webp" alt="Bombi"></div>
        <div class="chat-bubble chat-typing">
            <span></span><span></span><span></span>
        </div>
    `;

    chatMessages.appendChild(wrap);

    refreshIcons();

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

function removeTypingIndicator(){

    const el = document.getElementById("typingIndicator");

    if(el){

        el.remove();

    }

}

/* ------------------------------------------------------
        Enviar mensaje del usuario
------------------------------------------------------ */

function handleSend(){

    const text = chatInput.value.trim();

    if(text === ""){

        return;

    }

    appendMessage(text, "user");

    chatInput.value = "";

    chatSendBtn.disabled = true;

    sendBombiRealReply(text);

}

chatSendBtn.addEventListener("click", handleSend);

chatInput.addEventListener("keydown", (e) => {

    if(e.key === "Enter"){

        handleSend();

    }

});

chatInput.addEventListener("input", () => {

    chatSendBtn.disabled = chatInput.value.trim() === "";

});

chatMicBtn.addEventListener("click", () => {

    // TODO: conectar grabación de voz real más adelante.

    chatInput.focus();

});

/* ------------------------------------------------------
        Mensaje de bienvenida + sugerencias iniciales
------------------------------------------------------ */

function renderWelcome(){

    chatMessages.innerHTML = "";

    appendMessage(welcomeMessage, "bot");

    const suggestionsWrap = document.createElement("div");

    suggestionsWrap.classList.add("chat-suggestions");

    suggestionsWrap.id = "chatSuggestions";

    suggestions.forEach((text) => {

        const chip = document.createElement("button");

        chip.classList.add("suggestion-chip");

        chip.textContent = text;

        chip.addEventListener("click", () => {

            chatInput.value = text;

            chatSendBtn.disabled = false;

            handleSend();

            suggestionsWrap.remove();

        });

        suggestionsWrap.appendChild(chip);

    });

    chatMessages.appendChild(suggestionsWrap);

}

/* ======================================================
                INITIALIZE
====================================================== */

async function init(){

    renderWelcome();

    await loadUserData();

    console.log("Thinking Bombi AI Screen (Student) Loaded 🤖 (conectado a Botpress Chat API)");

}

init();
