/* ======================================================
                    THINKING
            STUDENT DASHBOARD (HOME)
====================================================== */

// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";

const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC";

let db = null;

if(window.supabase){

    db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

}

let currentUserId = null;

/* ======================================================
                    UTILIDADES
====================================================== */

// Escapa texto antes de insertarlo con innerHTML (evita inyección de HTML).
function esc(value){

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

}

// Normaliza para buscar sin importar acentos ni mayúsculas ("guia" encuentra "Guía").
function norm(value){

    return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

}

function safeStorageGet(key){

    try{ return localStorage.getItem(key); }
    catch(err){ return null; }

}

function safeStorageSet(key, value){

    try{ localStorage.setItem(key, value); }
    catch(err){ /* almacenamiento no disponible */ }

}

/* ======================================================
                    LUCIDE ICONS
====================================================== */

function refreshIcons(){

    if(window.lucide){ lucide.createIcons(); }

}

refreshIcons();

/* ======================================================
                    IDIOMA (EN / ES)
====================================================== */

const savedLang = safeStorageGet("thinking-lang");

let currentLang = savedLang === "es" || savedLang === "en" ? savedLang : "en";

const I18N = {

    en:{
        pageTitle:"Home | Thinking",
        sidebarSubtitle:"Student Dashboard",
        navHome:"Home", navGroups:"Groups", navTest:"Test", navAssignments:"Assignments",
        navResources:"Resources", navSchedule:"Schedule", navBombi:"Bombi AI",
        roleStudent:"Student", footerSettings:"Settings", footerLogout:"Logout",
        searchPlaceholder:"Search assignments, classes...",
        heroTitle:"Home",
        pageSubtitle:"Here is what is happening in your classes today.",
        askBombi:"Ask Bombi AI",
        statPending:"Pending", statPendingNote:"Assignments to submit",
        statTests:"Tests", statTestsNote:"Scheduled this week",
        statStreak:"Study streak", statStreakNote:"Days in a row",
        statAverage:"Average", statAverageNote:"Current grade",
        days:"days",
        upcomingTitle:"Upcoming assignments", todayTitle:"Today's classes",
        viewAll:"View all",
        styleTitle:"Your learning style",
        styleVisual:"Visual", styleAuditory:"Auditory", styleReadWrite:"Read / Write", styleKinesthetic:"Kinesthetic",
        dueToday:"Due today", dueTomorrow:"Due tomorrow",
        dueOn:(date) => `Due ${date}`,
        noMatch:"Nothing matches your search.",
        noAssignments:"No assignments pending.",
        noClasses:"No classes today.",
        notifTitle:"Notifications",
        notif1Title:"New assignment posted", notif1Sub:"Math: Chapter 5 exercises",
        notif2Title:"Test reminder", notif2Sub:"Science test is on Thursday",
        notif3Title:"Bombi AI has a tip", notif3Sub:"Try a mind map to review History",
        toastNotifOpen:"Opening notification...",
        profileSettings:"Account settings", profileHelp:"Help & support", profileLogout:"Log out",
        toastSettings:"Account settings: coming soon.",
        toastHelp:"Help & support: coming soon.",
        toastLoggedOut:"Logged out.",
        toastLang:"Language: English"
    },

    es:{
        pageTitle:"Inicio | Thinking",
        sidebarSubtitle:"Panel del Estudiante",
        navHome:"Inicio", navGroups:"Grupos", navTest:"Examen", navAssignments:"Tareas",
        navResources:"Recursos", navSchedule:"Horario", navBombi:"Bombi IA",
        roleStudent:"Estudiante", footerSettings:"Ajustes", footerLogout:"Cerrar sesi\u00f3n",
        searchPlaceholder:"Buscar tareas, clases...",
        heroTitle:"Inicio",
        pageSubtitle:"Esto es lo que pasa hoy en tus clases.",
        askBombi:"Preguntar a Bombi IA",
        statPending:"Pendientes", statPendingNote:"Tareas por entregar",
        statTests:"Ex\u00e1menes", statTestsNote:"Programados esta semana",
        statStreak:"Racha de estudio", statStreakNote:"D\u00edas seguidos",
        statAverage:"Promedio", statAverageNote:"Nota actual",
        days:"d\u00edas",
        upcomingTitle:"Pr\u00f3ximas tareas", todayTitle:"Clases de hoy",
        viewAll:"Ver todo",
        styleTitle:"Tu estilo de aprendizaje",
        styleVisual:"Visual", styleAuditory:"Auditivo", styleReadWrite:"Lectura / Escritura", styleKinesthetic:"Kinest\u00e9sico",
        dueToday:"Vence hoy", dueTomorrow:"Vence ma\u00f1ana",
        dueOn:(date) => `Vence ${date}`,
        noMatch:"Nada coincide con tu b\u00fasqueda.",
        noAssignments:"No tienes tareas pendientes.",
        noClasses:"No hay clases hoy.",
        notifTitle:"Notificaciones",
        notif1Title:"Nueva tarea publicada", notif1Sub:"Matem\u00e1ticas: ejercicios del cap\u00edtulo 5",
        notif2Title:"Recordatorio de examen", notif2Sub:"El examen de Ciencias es el jueves",
        notif3Title:"Bombi IA tiene un consejo", notif3Sub:"Prueba un mapa mental para repasar Historia",
        toastNotifOpen:"Abriendo notificaci\u00f3n...",
        profileSettings:"Configuraci\u00f3n de cuenta", profileHelp:"Ayuda y soporte", profileLogout:"Cerrar sesi\u00f3n",
        toastSettings:"Configuraci\u00f3n de cuenta: pr\u00f3ximamente.",
        toastHelp:"Ayuda y soporte: pr\u00f3ximamente.",
        toastLoggedOut:"Sesi\u00f3n cerrada.",
        toastLang:"Idioma: Espa\u00f1ol"
    }

};

// Si falta una clave en el idioma actual, usa inglés en lugar de "undefined".
function t(key){

    return I18N[currentLang][key] ?? I18N.en[key];

}

function applyStaticTranslations(){

    document.querySelectorAll("[data-i18n]").forEach((el) => {

        const value = t(el.getAttribute("data-i18n"));

        if(typeof value === "string"){ el.textContent = value; }

    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {

        const value = t(el.getAttribute("data-i18n-placeholder"));

        if(typeof value === "string"){ el.setAttribute("placeholder", value); }

    });

    document.getElementById("langLabel").textContent = currentLang.toUpperCase();

    document.documentElement.lang = currentLang;

    document.title = t("pageTitle");

    document.getElementById("heroTitle").textContent = t("heroTitle");

}

document.getElementById("langToggle").addEventListener("click", () => {

    currentLang = currentLang === "en" ? "es" : "en";

    safeStorageSet("thinking-lang", currentLang);

    applyStaticTranslations();

    renderAll();

    closeAllDropdowns();

    showToast(t("toastLang"), "languages");

});

/* ======================================================
                    THEME
====================================================== */

const body = document.body;

const themeToggle = document.getElementById("themeToggle");

const toggleCircle = themeToggle.querySelector(".toggle-circle");

function enableDarkMode(){

    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    toggleCircle.style.left = "11px";
    safeStorageSet("thinking-theme", "dark");

}

function enableLightMode(){

    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    toggleCircle.style.left = window.innerWidth <= 768 ? "35px" : "49px";
    safeStorageSet("thinking-theme", "light");

}

themeToggle.addEventListener("click", () => {

    body.classList.contains("dark-theme") ? enableLightMode() : enableDarkMode();

});

if(safeStorageGet("thinking-theme") === "light"){ enableLightMode(); }

window.addEventListener("resize", () => {

    if(body.classList.contains("light-theme")){

        toggleCircle.style.left = window.innerWidth <= 768 ? "35px" : "49px";

    }

});

/* ======================================================
                MOBILE SIDEBAR TOGGLE
====================================================== */

const sidebarEl = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar(){ sidebarEl.classList.add("open"); sidebarOverlay.classList.add("open"); }
function closeSidebar(){ sidebarEl.classList.remove("open"); sidebarOverlay.classList.remove("open"); }

menuToggle.addEventListener("click", () => {

    sidebarEl.classList.contains("open") ? closeSidebar() : openSidebar();

});

sidebarOverlay.addEventListener("click", closeSidebar);

window.addEventListener("resize", () => {

    if(window.innerWidth > 1024){ closeSidebar(); }

});

/* ======================================================
                TOASTS
====================================================== */

const toastContainer = document.getElementById("toastContainer");

function showToast(message, icon){

    const toast = document.createElement("div");

    toast.classList.add("toast");

    toast.innerHTML = `
        <div class="toast-icon"><i data-lucide="${esc(icon)}"></i></div>
        <span>${esc(message)}</span>
    `;

    toastContainer.appendChild(toast);

    refreshIcons();

    setTimeout(() => {

        toast.classList.add("leaving");

        setTimeout(() => toast.remove(), 250);

    }, 3200);

}

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

    if(!wasOpen){ panel.classList.add("open"); }

}

function renderNotificationPanel(){

    notificationPanel.innerHTML = `
        <div class="dropdown-panel-title">${esc(t("notifTitle"))}</div>
        <button class="dropdown-item">
            <i data-lucide="clipboard-list"></i>
            <span>${esc(t("notif1Title"))}<div class="item-sub">${esc(t("notif1Sub"))}</div></span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="file-check"></i>
            <span>${esc(t("notif2Title"))}<div class="item-sub">${esc(t("notif2Sub"))}</div></span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="bot"></i>
            <span>${esc(t("notif3Title"))}<div class="item-sub">${esc(t("notif3Sub"))}</div></span>
        </button>
    `;

    notificationPanel.querySelectorAll(".dropdown-item").forEach((btn) => {

        btn.addEventListener("click", () => {

            closeAllDropdowns();

            showToast(t("toastNotifOpen"), "bell");

        });

    });

    refreshIcons();

}

async function doLogout(){

    // TODO: ajusta la ruta de redirección a tu página real de Login Student.

    if(db){

        try{ await db.auth.signOut(); }
        catch(err){ console.warn("No se pudo cerrar sesión en Supabase:", err); }

    }

    showToast(t("toastLoggedOut"), "log-out");

    setTimeout(() => {

        window.location.href = "../LOGIN Student/STUDENT LOGIN.html";

    }, 800);

}

function renderProfilePanel(){

    profilePanel.innerHTML = `
        <button class="dropdown-item" data-profile-action="settings"><i data-lucide="settings"></i><span>${esc(t("profileSettings"))}</span></button>
        <button class="dropdown-item" data-profile-action="help"><i data-lucide="circle-help"></i><span>${esc(t("profileHelp"))}</span></button>
        <button class="dropdown-item delete-item" data-profile-action="logout"><i data-lucide="log-out"></i><span>${esc(t("profileLogout"))}</span></button>
    `;

    profilePanel.querySelectorAll(".dropdown-item").forEach((btn) => {

        btn.addEventListener("click", () => {

            closeAllDropdowns();

            const action = btn.dataset.profileAction;

            if(action === "settings"){ showToast(t("toastSettings"), "settings"); }
            else if(action === "help"){ showToast(t("toastHelp"), "circle-help"); }
            else if(action === "logout"){ doLogout(); }

        });

    });

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

document.addEventListener("click", closeAllDropdowns);

document.getElementById("logoutLink").addEventListener("click", (e) => {

    e.preventDefault();
    doLogout();

});

/* ======================================================
                DATOS DE EJEMPLO
====================================================== */

// dueIn = días desde hoy. Cada texto tiene versión en inglés y español.
const assignments = [

    { id:1, icon:"calculator", cls:"purple", dueIn:0, title:{ en:"Math: Chapter 5 exercises", es:"Matem\u00e1ticas: ejercicios del cap\u00edtulo 5" }, subject:{ en:"Mathematics", es:"Matem\u00e1ticas" } },
    { id:2, icon:"flask-conical", cls:"teal", dueIn:1, title:{ en:"Science lab report", es:"Informe de laboratorio de Ciencias" }, subject:{ en:"Science", es:"Ciencias" } },
    { id:3, icon:"book-open", cls:"blue", dueIn:3, title:{ en:"Essay: My favorite book", es:"Ensayo: Mi libro favorito" }, subject:{ en:"Literature", es:"Literatura" } },
    { id:4, icon:"landmark", cls:"pink", dueIn:5, title:{ en:"History timeline project", es:"Proyecto de l\u00ednea de tiempo de Historia" }, subject:{ en:"History", es:"Historia" } },
    { id:5, icon:"code", cls:"purple", dueIn:6, title:{ en:"Intro to coding: first program", es:"Intro a programaci\u00f3n: primer programa" }, subject:{ en:"Technology", es:"Tecnolog\u00eda" } }

];

const todayClasses = [

    { id:1, icon:"calculator", cls:"purple", time:"8:00 - 8:45", title:{ en:"Mathematics", es:"Matem\u00e1ticas" }, room:{ en:"Room 204", es:"Aula 204" } },
    { id:2, icon:"flask-conical", cls:"teal", time:"9:00 - 9:45", title:{ en:"Science", es:"Ciencias" }, room:{ en:"Lab 1", es:"Laboratorio 1" } },
    { id:3, icon:"book-open", cls:"blue", time:"10:15 - 11:00", title:{ en:"Literature", es:"Literatura" }, room:{ en:"Room 108", es:"Aula 108" } },
    { id:4, icon:"code", cls:"pink", time:"11:15 - 12:00", title:{ en:"Technology", es:"Tecnolog\u00eda" }, room:{ en:"Computer lab", es:"Laboratorio de computaci\u00f3n" } }

];

const stats = { pending:5, tests:2, streak:7, average:"88%" };

const learningStyle = [
    { key:"styleVisual", value:40 },
    { key:"styleAuditory", value:20 },
    { key:"styleReadWrite", value:25 },
    { key:"styleKinesthetic", value:15 }
];

/* ======================================================
        FUTURO: CARGA REAL DESDE SUPABASE
====================================================== */

async function loadDashboardData(){

    // TODO: reemplazar por consultas reales, por ejemplo:
    // const { data, error } = await db
    //     .from("assignments")
    //     .select("id, title, subject, due_date")
    //     .eq("student_id", currentUserId);

    return true;

}

/* ======================================================
                FECHAS
====================================================== */

function dueLabel(dueIn){

    if(dueIn <= 0){ return t("dueToday"); }
    if(dueIn === 1){ return t("dueTomorrow"); }

    const date = new Date();

    date.setDate(date.getDate() + dueIn);

    const locale = currentLang === "es" ? "es" : "en-US";

    const formatted = new Intl.DateTimeFormat(locale, { weekday:"short", day:"numeric", month:"short" }).format(date);

    return t("dueOn")(formatted);

}

/* ======================================================
                BÚSQUEDA
====================================================== */

let searchTerm = "";

const searchInput = document.getElementById("globalSearch");

searchInput.addEventListener("input", (e) => {

    searchTerm = norm(e.target.value.trim());

    renderLists();

});

// Ctrl+/ (o Cmd+/ en Mac) enfoca la búsqueda.

const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

document.getElementById("searchKbd").textContent = isMac ? "\u2318 /" : "Ctrl /";

document.addEventListener("keydown", (e) => {

    if((e.ctrlKey || e.metaKey) && e.key === "/"){

        e.preventDefault();

        searchInput.focus();

    }

    if(e.key === "Escape"){

        closeAllDropdowns();
        closeSidebar();

    }

});

/* ======================================================
                RENDER
====================================================== */

function renderStats(){

    const cards = [
        { icon:"clipboard-list", cls:"purple", label:t("statPending"), value:stats.pending, note:t("statPendingNote") },
        { icon:"file-check", cls:"blue", label:t("statTests"), value:stats.tests, note:t("statTestsNote") },
        { icon:"flame", cls:"pink", label:t("statStreak"), value:`${stats.streak} ${t("days")}`, note:t("statStreakNote") },
        { icon:"trending-up", cls:"teal", label:t("statAverage"), value:stats.average, note:t("statAverageNote") }
    ];

    document.getElementById("statsRow").innerHTML = cards.map((c) => `
        <div class="quick-card">
            <div class="quick-card-icon ${c.cls}"><i data-lucide="${c.icon}"></i></div>
            <div class="quick-card-body">
                <div class="quick-card-label">${esc(c.label)}</div>
                <div class="quick-card-value">${esc(c.value)}</div>
                <div class="quick-card-note">${esc(c.note)}</div>
            </div>
        </div>
    `).join("");

}

function renderLists(){

    // Busca en título y materia, en el idioma que se está viendo.

    const filteredAssignments = assignments.filter((a) =>
        !searchTerm || norm(`${a.title[currentLang]} ${a.subject[currentLang]}`).includes(searchTerm)
    );

    const filteredClasses = todayClasses.filter((c) =>
        !searchTerm || norm(`${c.title[currentLang]} ${c.room[currentLang]}`).includes(searchTerm)
    );

    const assignmentList = document.getElementById("assignmentList");
    const scheduleList = document.getElementById("scheduleList");

    if(filteredAssignments.length === 0){

        assignmentList.innerHTML = `<div class="list-empty">${esc(searchTerm ? t("noMatch") : t("noAssignments"))}</div>`;

    }
    else{

        assignmentList.innerHTML = filteredAssignments.map((a) => `
            <div class="list-item">
                <div class="list-icon ${a.cls}"><i data-lucide="${a.icon}"></i></div>
                <div class="list-body">
                    <div class="list-title">${esc(a.title[currentLang])}</div>
                    <div class="list-meta">${esc(a.subject[currentLang])}</div>
                </div>
                <span class="list-tag ${a.dueIn <= 1 ? "urgent" : ""}">${esc(dueLabel(a.dueIn))}</span>
            </div>
        `).join("");

    }

    if(filteredClasses.length === 0){

        scheduleList.innerHTML = `<div class="list-empty">${esc(searchTerm ? t("noMatch") : t("noClasses"))}</div>`;

    }
    else{

        scheduleList.innerHTML = filteredClasses.map((c) => `
            <div class="list-item">
                <div class="list-icon ${c.cls}"><i data-lucide="${c.icon}"></i></div>
                <div class="list-body">
                    <div class="list-title">${esc(c.title[currentLang])}</div>
                    <div class="list-meta">${esc(c.time)} &bull; ${esc(c.room[currentLang])}</div>
                </div>
            </div>
        `).join("");

    }

}

function renderStyleBars(){

    document.getElementById("styleBars").innerHTML = learningStyle.map((s) => `
        <div>
            <div class="style-row-head"><span>${esc(t(s.key))}</span><span>${s.value}%</span></div>
            <div class="style-track"><div class="style-fill" style="width:${s.value}%"></div></div>
        </div>
    `).join("");

}

function renderAll(){

    renderStats();
    renderLists();
    renderStyleBars();
    refreshIcons();

}

/* ======================================================
                INITIALIZE
====================================================== */

async function init(){

    if(db){

        try{

            const { data:{ session } } = await db.auth.getSession();

            if(session){ currentUserId = session.user.id; }

        }
        catch(err){

            console.warn("Supabase no disponible en este entorno, usando datos de ejemplo.", err);

        }

    }

    await loadDashboardData();

    applyStaticTranslations();

    renderAll();

    console.log("Thinking Student Dashboard Loaded \ud83d\ude80");

}

init();
