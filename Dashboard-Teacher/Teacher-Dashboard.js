/* ======================================================
                    THINKING
            TEACHER DASHBOARD (HOME)
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

const teacherName = "Irving";

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

function initials(name){

    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

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
        sidebarSubtitle:"Teacher Dashboard",
        navHome:"Home", navTest:"Test", navStudents:"Students", navAssignments:"Assignments",
        navResources:"Resources", navSchedule:"Schedule", navBombi:"Bombi AI",
        roleTeacher:"Teacher", footerSettings:"Settings", footerLogout:"Logout",
        searchPlaceholder:"Search students, assignments...",
        heroTitle:"Home",
        heroSubtitle:(name) => `Welcome back, ${name}. Here is your class summary for today.`,
        askBombi:"Ask Bombi AI",
        statStudents:"Students", statStudentsNote:"Across all groups",
        statActive:"Active assignments", statActiveNote:"Open for submission",
        statGrade:"To review", statGradeNote:"Submissions waiting",
        statAverage:"Class average", statAverageNote:"All groups",
        quickActionsTitle:"Quick actions",
        qaNewTest:"Create test", qaNewAssignment:"New assignment", qaAddResource:"Add resource", qaSchedule:"Schedule class",
        reviewTitle:"Assignments to review", todayTitle:"Today's classes",
        activityTitle:"Recent student activity",
        styleTitle:"Learning styles in your groups",
        viewAll:"View all", review:"Review",
        styleVisual:"Visual", styleAuditory:"Auditory", styleReadWrite:"Read / Write", styleKinesthetic:"Kinesthetic",
        submitted:(done, total) => `${done} of ${total} submitted`,
        noMatch:"Nothing matches your search.",
        noAssignments:"No assignments to review.",
        noClasses:"No classes today.",
        noActivity:"No recent activity.",
        notifTitle:"Notifications", markAllRead:"Mark all as read",
        notif1Title:"New submissions", notif1Sub:"6 students submitted Math: Chapter 5",
        notif2Title:"Test ready to grade", notif2Sub:"Science quiz has 12 answers waiting",
        notif3Title:"Weekly digest ready", notif3Sub:"See what your students viewed most this week",
        toastNotifOpen:"Notification marked as read.", toastAllRead:"All notifications marked as read.",
        profileSettings:"Account settings", profileHelp:"Help & support", profileLogout:"Log out",
        toastSettings:"Account settings: coming soon.",
        toastHelp:"Help & support: coming soon.",
        toastLoggedOut:"Logged out.",
        toastLang:"Language: English",
        toastTheme:"Theme changed."
    },

    es:{
        pageTitle:"Inicio | Thinking",
        sidebarSubtitle:"Panel del Maestro",
        navHome:"Inicio", navTest:"Examen", navStudents:"Estudiantes", navAssignments:"Tareas",
        navResources:"Recursos", navSchedule:"Horario", navBombi:"Bombi IA",
        roleTeacher:"Maestro", footerSettings:"Ajustes", footerLogout:"Cerrar sesi\u00f3n",
        searchPlaceholder:"Buscar estudiantes, tareas...",
        heroTitle:"Inicio",
        heroSubtitle:(name) => `Bienvenido de nuevo, ${name}. Este es el resumen de tus clases de hoy.`,
        askBombi:"Preguntar a Bombi IA",
        statStudents:"Estudiantes", statStudentsNote:"En todos los grupos",
        statActive:"Tareas activas", statActiveNote:"Abiertas para entrega",
        statGrade:"Por revisar", statGradeNote:"Entregas en espera",
        statAverage:"Promedio de clase", statAverageNote:"Todos los grupos",
        quickActionsTitle:"Acciones r\u00e1pidas",
        qaNewTest:"Crear examen", qaNewAssignment:"Nueva tarea", qaAddResource:"Agregar recurso", qaSchedule:"Programar clase",
        reviewTitle:"Tareas por revisar", todayTitle:"Clases de hoy",
        activityTitle:"Actividad reciente de estudiantes",
        styleTitle:"Estilos de aprendizaje en tus grupos",
        viewAll:"Ver todo", review:"Revisar",
        styleVisual:"Visual", styleAuditory:"Auditivo", styleReadWrite:"Lectura / Escritura", styleKinesthetic:"Kinest\u00e9sico",
        submitted:(done, total) => `${done} de ${total} entregadas`,
        noMatch:"Nada coincide con tu b\u00fasqueda.",
        noAssignments:"No hay tareas por revisar.",
        noClasses:"No hay clases hoy.",
        noActivity:"No hay actividad reciente.",
        notifTitle:"Notificaciones", markAllRead:"Marcar todo como le\u00eddo",
        notif1Title:"Nuevas entregas", notif1Sub:"6 estudiantes entregaron Matem\u00e1ticas: cap\u00edtulo 5",
        notif2Title:"Examen listo para calificar", notif2Sub:"El quiz de Ciencias tiene 12 respuestas en espera",
        notif3Title:"Resumen semanal listo", notif3Sub:"Mira qu\u00e9 vieron m\u00e1s tus estudiantes esta semana",
        toastNotifOpen:"Notificaci\u00f3n marcada como le\u00edda.", toastAllRead:"Todas las notificaciones marcadas como le\u00eddas.",
        profileSettings:"Configuraci\u00f3n de cuenta", profileHelp:"Ayuda y soporte", profileLogout:"Cerrar sesi\u00f3n",
        toastSettings:"Configuraci\u00f3n de cuenta: pr\u00f3ximamente.",
        toastHelp:"Ayuda y soporte: pr\u00f3ximamente.",
        toastLoggedOut:"Sesi\u00f3n cerrada.",
        toastLang:"Idioma: Espa\u00f1ol",
        toastTheme:"Tema cambiado."
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

    document.getElementById("heroSubtitle").textContent = t("heroSubtitle")(teacherName);

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

function circleLeft(isLight){

    if(!isLight){ return "11px"; }

    return window.innerWidth <= 768 ? "35px" : "49px";

}

function enableDarkMode(){

    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    toggleCircle.style.left = circleLeft(false);
    safeStorageSet("thinking-theme", "dark");

}

function enableLightMode(){

    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    toggleCircle.style.left = circleLeft(true);
    safeStorageSet("thinking-theme", "light");

}

themeToggle.addEventListener("click", () => {

    body.classList.contains("dark-theme") ? enableLightMode() : enableDarkMode();

    showToast(t("toastTheme"), body.classList.contains("dark-theme") ? "moon" : "sun");

});

if(safeStorageGet("thinking-theme") === "light"){ enableLightMode(); }

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

    toggleCircle.style.left = circleLeft(body.classList.contains("light-theme"));

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
const notificationCount = document.getElementById("notificationCount");
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

// Estado de notificaciones (leídas / no leídas)

const notifications = [
    { id:1, icon:"clipboard-check", titleKey:"notif1Title", subKey:"notif1Sub", read:false },
    { id:2, icon:"file-check", titleKey:"notif2Title", subKey:"notif2Sub", read:false },
    { id:3, icon:"bar-chart-3", titleKey:"notif3Title", subKey:"notif3Sub", read:false }
];

function updateNotificationBadge(){

    const unread = notifications.filter((n) => !n.read).length;

    notificationCount.textContent = unread;

    notificationCount.classList.toggle("hidden", unread === 0);

}

function renderNotificationPanel(){

    notificationPanel.innerHTML = `
        <div class="dropdown-panel-title">${esc(t("notifTitle"))}</div>
        ${notifications.map((n) => `
            <button type="button" class="dropdown-item ${n.read ? "" : "unread"}" data-notif="${n.id}">
                <i data-lucide="${n.icon}"></i>
                <span><span class="notif-title">${esc(t(n.titleKey))}</span><div class="item-sub">${esc(t(n.subKey))}</div></span>
            </button>
        `).join("")}
        <button type="button" class="dropdown-footer-btn" id="markAllReadBtn">${esc(t("markAllRead"))}</button>
    `;

    notificationPanel.querySelectorAll("[data-notif]").forEach((btn) => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            const notif = notifications.find((n) => n.id === Number(btn.dataset.notif));

            notif.read = true;

            updateNotificationBadge();

            renderNotificationPanel();

            showToast(t("toastNotifOpen"), "bell");

        });

    });

    document.getElementById("markAllReadBtn").addEventListener("click", (e) => {

        e.stopPropagation();

        notifications.forEach((n) => { n.read = true; });

        updateNotificationBadge();

        renderNotificationPanel();

        showToast(t("toastAllRead"), "check-circle");

    });

    refreshIcons();

}

async function doLogout(){

    // TODO: ajusta la ruta de redirección a tu página real de Login Teacher.

    if(db){

        try{ await db.auth.signOut(); }
        catch(err){ console.warn("No se pudo cerrar sesión en Supabase:", err); }

    }

    showToast(t("toastLoggedOut"), "log-out");

    setTimeout(() => {

        window.location.href = "LOGIN Teacher/TEACHER LOGIN.html";

    }, 800);

}

function renderProfilePanel(){

    profilePanel.innerHTML = `
        <button type="button" class="dropdown-item" data-profile-action="settings"><i data-lucide="settings"></i><span>${esc(t("profileSettings"))}</span></button>
        <button type="button" class="dropdown-item" data-profile-action="help"><i data-lucide="circle-help"></i><span>${esc(t("profileHelp"))}</span></button>
        <button type="button" class="dropdown-item delete-item" data-profile-action="logout"><i data-lucide="log-out"></i><span>${esc(t("profileLogout"))}</span></button>
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

function openProfileMenu(e){

    e.stopPropagation();
    renderProfilePanel();
    toggleDropdown(profilePanel);

}

profileBtn.addEventListener("click", openProfileMenu);

profileBtn.addEventListener("keydown", (e) => {

    if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openProfileMenu(e); }

});

document.addEventListener("click", closeAllDropdowns);

document.getElementById("logoutLink").addEventListener("click", (e) => {

    e.preventDefault();
    doLogout();

});

document.getElementById("settingsLink").addEventListener("click", (e) => {

    e.preventDefault();
    showToast(t("toastSettings"), "settings");

});

/* ======================================================
                DATOS DE EJEMPLO
====================================================== */

const stats = { students:128, active:12, toReview:7, average:"84%" };

// Cada texto tiene versión en inglés y español.

const assignments = [

    { id:1, icon:"calculator", cls:"purple", done:22, total:28, title:{ en:"Math: Chapter 5 exercises", es:"Matem\u00e1ticas: ejercicios del cap\u00edtulo 5" }, group:"10A" },
    { id:2, icon:"flask-conical", cls:"teal", done:18, total:26, title:{ en:"Science lab report", es:"Informe de laboratorio de Ciencias" }, group:"10B" },
    { id:3, icon:"book-open", cls:"blue", done:25, total:30, title:{ en:"Essay: My favorite book", es:"Ensayo: Mi libro favorito" }, group:"11A" },
    { id:4, icon:"code", cls:"pink", done:9, total:24, title:{ en:"Intro to coding: first program", es:"Intro a programaci\u00f3n: primer programa" }, group:"11B" }

];

const todayClasses = [

    { id:1, icon:"calculator", cls:"purple", time:"8:00 - 8:45", title:{ en:"Mathematics", es:"Matem\u00e1ticas" }, group:"10A", room:{ en:"Room 204", es:"Aula 204" } },
    { id:2, icon:"flask-conical", cls:"teal", time:"9:00 - 9:45", title:{ en:"Science", es:"Ciencias" }, group:"10B", room:{ en:"Lab 1", es:"Laboratorio 1" } },
    { id:3, icon:"book-open", cls:"blue", time:"10:15 - 11:00", title:{ en:"Literature", es:"Literatura" }, group:"11A", room:{ en:"Room 108", es:"Aula 108" } },
    { id:4, icon:"code", cls:"pink", time:"11:15 - 12:00", title:{ en:"Technology", es:"Tecnolog\u00eda" }, group:"11B", room:{ en:"Computer lab", es:"Laboratorio de computaci\u00f3n" } }

];

// minutesAgo = hace cuántos minutos ocurrió la actividad.

const studentActivity = [

    { id:1, name:"Ana Torres", minutesAgo:12, action:{ en:"Submitted Math: Chapter 5 exercises", es:"Entreg\u00f3 Matem\u00e1ticas: ejercicios del cap\u00edtulo 5" } },
    { id:2, name:"Luis Mendoza", minutesAgo:47, action:{ en:"Completed the Science quiz", es:"Complet\u00f3 el quiz de Ciencias" } },
    { id:3, name:"Sofia Herrera", minutesAgo:180, action:{ en:"Opened Study Techniques Guide", es:"Abri\u00f3 la Gu\u00eda de T\u00e9cnicas de Estudio" } },
    { id:4, name:"Carlos Ruiz", minutesAgo:1500, action:{ en:"Asked Bombi AI about mind maps", es:"Le pregunt\u00f3 a Bombi IA sobre mapas mentales" } }

];

const learningStyle = [
    { key:"styleVisual", value:38 },
    { key:"styleAuditory", value:18 },
    { key:"styleReadWrite", value:24 },
    { key:"styleKinesthetic", value:20 }
];

const quickActions = [
    { icon:"file-plus", cls:"purple", labelKey:"qaNewTest", href:"Test/Test-Teacher.html" },
    { icon:"clipboard-list", cls:"blue", labelKey:"qaNewAssignment", href:"Assigments/Teacher-Assigments.html" },
    { icon:"folder-plus", cls:"pink", labelKey:"qaAddResource", href:"Resources-T/Resources-Teacher.html" },
    { icon:"calendar-plus", cls:"teal", labelKey:"qaSchedule", href:"Schedule-T/Schedule-Teacher.html" }
];

/* ======================================================
        FUTURO: CARGA REAL DESDE SUPABASE
====================================================== */

async function loadDashboardData(){

    // TODO: reemplazar por consultas reales, por ejemplo:
    // const { data, error } = await db
    //     .from("assignments")
    //     .select("id, title, group, submitted, total")
    //     .eq("teacher_id", currentUserId);

    return true;

}

/* ======================================================
                FECHAS RELATIVAS
====================================================== */

function timeAgo(minutes){

    const locale = currentLang === "es" ? "es" : "en";

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric:"auto" });

    if(minutes < 60){ return rtf.format(-minutes, "minute"); }

    if(minutes < 1440){ return rtf.format(-Math.round(minutes / 60), "hour"); }

    return rtf.format(-Math.round(minutes / 1440), "day");

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
        { icon:"users", cls:"purple", label:t("statStudents"), value:stats.students, note:t("statStudentsNote") },
        { icon:"clipboard-list", cls:"blue", label:t("statActive"), value:stats.active, note:t("statActiveNote") },
        { icon:"check-square", cls:"pink", label:t("statGrade"), value:stats.toReview, note:t("statGradeNote") },
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

function renderQuickActions(){

    document.getElementById("actionsRow").innerHTML = quickActions.map((a) => `
        <a class="action-btn" href="${esc(a.href)}">
            <div class="action-btn-icon ${a.cls}"><i data-lucide="${a.icon}"></i></div>
            <span>${esc(t(a.labelKey))}</span>
        </a>
    `).join("");

}

function emptyMessage(defaultKey){

    return `<div class="list-empty">${esc(searchTerm ? t("noMatch") : t(defaultKey))}</div>`;

}

function renderLists(){

    const filteredAssignments = assignments.filter((a) =>
        !searchTerm || norm(`${a.title[currentLang]} ${a.group}`).includes(searchTerm)
    );

    const filteredClasses = todayClasses.filter((c) =>
        !searchTerm || norm(`${c.title[currentLang]} ${c.group} ${c.room[currentLang]}`).includes(searchTerm)
    );

    const filteredActivity = studentActivity.filter((s) =>
        !searchTerm || norm(`${s.name} ${s.action[currentLang]}`).includes(searchTerm)
    );

    const assignmentList = document.getElementById("assignmentList");
    const scheduleList = document.getElementById("scheduleList");
    const activityList = document.getElementById("activityList");

    assignmentList.innerHTML = filteredAssignments.length === 0 ? emptyMessage("noAssignments") :
        filteredAssignments.map((a) => `
            <div class="list-item">
                <div class="list-icon ${a.cls}"><i data-lucide="${a.icon}"></i></div>
                <div class="list-body">
                    <div class="list-title">${esc(a.title[currentLang])}</div>
                    <div class="list-meta">${esc(a.group)} &bull; ${esc(t("submitted")(a.done, a.total))}</div>
                    <div class="list-progress"><div class="list-progress-fill" style="width:${Math.round((a.done / a.total) * 100)}%"></div></div>
                </div>
                <a class="mini-btn" href="Assigments/Teacher-Assigments.html">${esc(t("review"))}</a>
            </div>
        `).join("");

    scheduleList.innerHTML = filteredClasses.length === 0 ? emptyMessage("noClasses") :
        filteredClasses.map((c) => `
            <div class="list-item">
                <div class="list-icon ${c.cls}"><i data-lucide="${c.icon}"></i></div>
                <div class="list-body">
                    <div class="list-title">${esc(c.title[currentLang])} &bull; ${esc(c.group)}</div>
                    <div class="list-meta">${esc(c.time)} &bull; ${esc(c.room[currentLang])}</div>
                </div>
            </div>
        `).join("");

    activityList.innerHTML = filteredActivity.length === 0 ? emptyMessage("noActivity") :
        filteredActivity.map((s) => `
            <div class="list-item">
                <div class="avatar-dot">${esc(initials(s.name))}</div>
                <div class="list-body">
                    <div class="list-title">${esc(s.name)}</div>
                    <div class="list-meta">${esc(s.action[currentLang])}</div>
                </div>
                <span class="list-tag">${esc(timeAgo(s.minutesAgo))}</span>
            </div>
        `).join("");

    refreshIcons();

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
    renderQuickActions();
    renderLists();
    renderStyleBars();
    updateNotificationBadge();
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

    console.log("Thinking Teacher Dashboard Loaded \ud83d\ude80");

}

init();
