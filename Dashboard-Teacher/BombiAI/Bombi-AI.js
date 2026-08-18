/* ======================================================
                    THINKING
        BOMBI AI SCREEN — v1 (interfaz visual, sin IA real)
====================================================== */

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
        cannedReplies:[
            "I'm still learning! Very soon I'll be able to answer this for real — this is just a preview of how our conversation will look.",
            "Great question! Once I'm fully connected, I'll give you a detailed answer here. For now, this is a preview screen.",
            "Noted! This chat is currently a visual preview — real answers from Bombi are coming soon."
        ]

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
        cannedReplies:[
            "¡Sigo aprendiendo! Muy pronto podré responder esto de verdad — por ahora esta es una vista previa de cómo se verá nuestra conversación.",
            "¡Buena pregunta! Cuando esté completamente conectada, te daré una respuesta detallada aquí. Por ahora esta es una pantalla de vista previa.",
            "¡Anotado! Este chat es por ahora una vista previa visual — las respuestas reales de Bombi llegarán pronto."
        ]

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

}

function enableLightMode(){

    body.classList.remove("dark-theme");

    body.classList.add("light-theme");

    toggleCircle.style.left = "49px";

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

/* ######################################################
#
#                    CHAT — BOMBI AI
#      (por ahora es solo visual, sin IA real conectada)
#
###################################################### */

const chatMessages = document.getElementById("chatMessages");

const chatInput = document.getElementById("chatInput");

const chatSendBtn = document.getElementById("chatSendBtn");

const chatMicBtn = document.getElementById("chatMicBtn");

let replyIndex = 0;

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
        Respuesta de ejemplo de Bombi (placeholder)

        TODO: cuando conectemos el backend real, reemplazar
        esta función por una llamada a tu API de Groq en
        Render, algo así:

        const res = await fetch("https://TU-BACKEND.onrender.com/api/bombi-chat", {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({ message:userText, teacherId:currentUserId })
        });
        const data = await res.json();
        appendMessage(data.reply, "bot");
------------------------------------------------------ */

function getCannedReply(){

    const replies = t("cannedReplies");

    const reply = replies[replyIndex % replies.length];

    replyIndex++;

    return reply;

}

function sendBombiPlaceholderReply(){

    showTypingIndicator();

    setTimeout(() => {

        removeTypingIndicator();

        appendMessage(getCannedReply(), "bot");

    }, 900);

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

    sendBombiPlaceholderReply();

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
    Nota: esta pantalla no tiene botón de idioma visible
    en el header (según el diseño), pero la función queda
    lista por si luego decides agregar el "lang-toggle"
    como en el resto de tus páginas.
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

    applyStaticTranslations();

    renderWelcome();

    console.log("Thinking Bombi AI Screen Loaded 🤖 (preview mode — sin IA real conectada aún)");

}

init();
