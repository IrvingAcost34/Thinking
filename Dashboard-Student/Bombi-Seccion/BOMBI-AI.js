/* ======================================================
                    THINKING
        BOMBI AI SCREEN — v2 (conectado a Botpress Chat API)
====================================================== */

/* ======================================================
                    BOTPRESS CONFIG
====================================================== */

const BOTPRESS_CLIENT_ID = "99bf3db2-306e-448f-a7e4-9c4cec21efbe";
const BOTPRESS_API = "https://chat.botpress.cloud";

let bpUserId = null;
let bpUserKey = null;
let bpConversationId = null;

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
                    IDIOMA (EN / ES)
====================================================== */

let currentLang = "en";

const I18N = {

    en:{

        sidebarSubtitle:"Teacher Dashboard",
        navHome:"Home",
        navTest:"Test",
        navStudents:"Students",
        navAssigments:"Assigments",
        navResources:"Resources",
        navSchedule:"Schedule",
        navBombi:"Bombi AI",
        roleTeacher:"Teacher",
        footerSettings:"Settings",
        footerLogout:"Logout",
        bombiPageTitle:"Bombi AI",
        bombiPageSubtitle:"Your instant teaching assistant",
        chatPlaceholder:"Type your message...",
        notifTitle:"Notifications",
        notif1Title:"Anatomy Quiz tomorrow",
        notif1Sub:"Don't forget to prepare Biology 102's quiz",
        notif2Title:"3 new submissions",
        notif2Sub:"Biology 101 just got new homework submissions",
        notif3Title:"Faculty meeting moved",
        notif3Sub:"Today's meeting is now at 11:00 AM",
        profileSettings:"Account settings",
        profileHelp:"Help & support",
        profileLogout:"Log out",
        welcomeMessage:"Hi Irving! I'm Bombi, your teaching assistant. I can help you plan lessons, create materials or answer quick questions. What are we working on today?",
        suggestion1:"Suggest a lesson idea",
        suggestion2:"Help me plan a quiz",
        suggestion3:"Tips for visual learners",
        connectingError:"Couldn't reach Bombi's AI right now.",
        slowReply:"Bombi is taking a bit long to respond — try again in a moment.",
        connectionTrouble:"I'm having trouble connecting right now — please try again in a bit."

    },

    es:{

        sidebarSubtitle:"Panel del Maestro",
        navHome:"Inicio",
        navTest:"Examen",
        navStudents:"Estudiantes",
        navAssigments:"Tareas",
        navResources:"Recursos",
        navSchedule:"Horario",
        navBombi:"Bombi IA",
        roleTeacher:"Maestro",
        footerSettings:"Ajustes",
        footerLogout:"Cerrar sesión",
        bombiPageTitle:"Bombi IA",
        bombiPageSubtitle:"Tu asistente docente al instante",
        chatPlaceholder:"Escribe tu mensaje...",
        notifTitle:"Notificaciones",
        notif1Title:"Examen de Anatomía mañana",
        notif1Sub:"No olvides preparar el examen de Biología 102",
        notif2Title:"3 entregas nuevas",
        notif2Sub:"Biología 101 recibió nuevas tareas entregadas",
        notif3Title:"Reunión de facultad movida",
        notif3Sub:"La reunión de hoy ahora es a las 11:00 AM",
        profileSettings:"Configuración de cuenta",
        profileHelp:"Ayuda y soporte",
        profileLogout:"Cerrar sesión",
        welcomeMessage:"¡Hola Irving! Soy Bombi, tu asistente docente. Puedo ayudarte a planear lecciones, crear materiales o resolver dudas rápidas. ¿En qué trabajamos hoy?",
        suggestion1:"Sugiere una idea de lección",
        suggestion2:"Ayúdame a planear un examen",
        suggestion3:"Tips para estudiantes visuales",
        connectingError:"No se pudo conectar con la IA de Bombi.",
        slowReply:"Bombi está tardando en responder — intenta de nuevo en un momento.",
        connectionTrouble:"Estoy teniendo problemas de conexión — intenta de nuevo en un momento."

    }

};

function t(key){

    return I18N[currentLang][key];

}

function applyStaticTranslations(){

    document.querySelectorAll("[data-i18n]").forEach((el) => {

        const key = el.getAttribute("data-i18n");

        if(I18N[currentLang][key] !== undefined){

            el.textContent = I18N[currentLang][key];

        }

    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {

        const key = el.getAttribute("data-i18n-placeholder");

        if(I18N[currentLang][key] !== undefined){

            el.setAttribute("placeholder", I18N[currentLang][key]);

        }

    });

}

/* ======================================================
                    THEME
====================================================== */

const body = document.body;

body.classList.add("dark-theme");

const themeToggle = document.getElementById("themeToggle");

const toggleCircle = themeToggle.querySelector(".toggle-circle");

function enableDarkMode(){

    body.classList.remove("light-theme");

    body.classList.add("dark-theme");

    toggleCircle.style.left = "11px";

    localStorage.setItem("thinkingTheme", "dark");

}

function enableLightMode(){

    body.classList.remove("dark-theme");

    body.classList.add("light-theme");

    toggleCircle.style.left = "49px";

    localStorage.setItem("thinkingTheme", "light");

}

themeToggle.addEventListener("click", () => {

    body.classList.contains("dark-theme") ? enableLightMode() : enableDarkMode();

});

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

    sidebarEl.classList.contains("open") ? closeSidebar() : openSidebar();

});

sidebarOverlay.addEventListener("click", closeSidebar);

/* ======================================================
                DROPDOWNS (notificaciones / perfil)
====================================================== */

const notificationBtn = document.getElementById("notificationBtn");

const notificationPanel = document.getElementById("notificationPanel");

const profileBtn = document.getElementById("profileBtn");

const profilePanel = document.getElementById("profilePanel");

function closeAllDropdowns(){

    [notificationPanel, profilePanel].forEach((p) => p.classList.remove("open"));

}

function toggleDropdown(panel){

    const wasOpen = panel.classList.contains("open");

    closeAllDropdowns();

    if(!wasOpen){

        panel.classList.add("open");

    }

}

function renderNotificationPanel(){

    notificationPanel.innerHTML = `
        <div class="dropdown-panel-title">${t("notifTitle")}</div>
        <button class="dropdown-item">
            <i data-lucide="calendar-clock"></i>
            <span>
                ${t("notif1Title")}
                <div class="item-sub">${t("notif1Sub")}</div>
            </span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="clipboard-check"></i>
            <span>
                ${t("notif2Title")}
                <div class="item-sub">${t("notif2Sub")}</div>
            </span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="users"></i>
            <span>
                ${t("notif3Title")}
                <div class="item-sub">${t("notif3Sub")}</div>
            </span>
        </button>
    `;

    refreshIcons();

}

function renderProfilePanel(){

    profilePanel.innerHTML = `
        <button class="dropdown-item">
            <i data-lucide="settings"></i>
            <span>${t("profileSettings")}</span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="circle-help"></i>
            <span>${t("profileHelp")}</span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="log-out"></i>
            <span>${t("profileLogout")}</span>
        </button>
    `;

    refreshIcons();

}

notificationBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    renderNotificationPanel();

    toggleDropdown(notificationPanel);

});

profileBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    renderProfilePanel();

    toggleDropdown(profilePanel);

});

document.addEventListener("click", () => {

    closeAllDropdowns();

});

/* ======================================================
                TOASTS (avisos de error, no intrusivos)
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
            appendMessage(t("slowReply"), "bot");
        }

    }
    catch(err){

        removeTypingIndicator();

        console.error("Error de Botpress:", err);

        showToast(t("connectingError"), "alert-triangle");

        appendMessage(t("connectionTrouble"), "bot");

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

/* ------------------------------------------------------
        Crea una burbuja de mensaje (usuario o bot)
------------------------------------------------------ */

function appendMessage(text, sender){

    const wrap = document.createElement("div");

    wrap.classList.add("chat-message", sender);

    const avatarHtml = sender === "bot"
        ? `<img src="../Images/bombi-mascot.png" alt="Bombi">`
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
        <div class="chat-avatar"><img src="../Images/bombi-mascot.png" alt="Bombi"></div>
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

    appendMessage(t("welcomeMessage"), "bot");

    const suggestions = document.createElement("div");

    suggestions.classList.add("chat-suggestions");

    suggestions.id = "chatSuggestions";

    ["suggestion1", "suggestion2", "suggestion3"].forEach((key) => {

        const chip = document.createElement("button");

        chip.classList.add("suggestion-chip");

        chip.textContent = t(key);

        chip.addEventListener("click", () => {

            chatInput.value = t(key);

            chatSendBtn.disabled = false;

            handleSend();

            suggestions.remove();

        });

        suggestions.appendChild(chip);

    });

    chatMessages.appendChild(suggestions);

}

/* ======================================================
                LANGUAGE TOGGLE (si se agrega botón)
====================================================== */

function setLanguage(lang){

    currentLang = lang;

    applyStaticTranslations();

    renderWelcome();

}

/* ======================================================
                INITIALIZE
====================================================== */

function init(){

    if(localStorage.getItem("thinkingTheme") === "light"){
        enableLightMode();
    } else {
        enableDarkMode();
    }

    applyStaticTranslations();

    renderWelcome();

    console.log("Thinking Bombi AI Screen Loaded 🤖 (conectado a Botpress Chat API)");

}

init();
