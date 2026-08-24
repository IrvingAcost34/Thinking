/* ======================================================
                    THINKING
        TEACHER HOME SCREEN — v1 (i18n + botones)
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
else{

    console.warn("supabase-js no se cargó. Agrégalo en Settings > JS > Add External Scripts:\nhttps://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");

}

let currentUserId = null;

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
        pageTitle:"Home",
        pageSubtitle:"Welcome back, here's what's happening today",
        searchHome:"Search...",
        heroGreeting:"Good Morning",
        heroTitle:"Everything you need to teach in one place.",
        heroSub:"Organize your classes, assignments, schedules and student progress with Thinking.",
        btnMyClasses:"My classes",
        btnAnalytics:"Analytics",
        bombiTitle:"Bombi AI",
        bombiSub:"Get instant teaching support with Bombi.",
        askBombi:"Ask Bombi",
        scheduleTitle:"Today's Schedule",
        scheduleDay:"Monday",
        myClassesTitle:"My Classes",
        viewAllClasses:"View All",
        studentsWord:"Students",
        statusOpen:"Open",
        quickActionsTitle:"Quick Actions",
        createMaterialTitle:"Create Material",
        createMaterialSub:"Generate personalized study materials instantly with AI.",
        createMaterialBtn:"Create Material",
        newBadge:"New",
        qaAssignment:"Create an Assignment",
        qaLesson:"New Lesson",
        qaResource:"Upload Resource",
        deadlinesTitle:"Upcoming Deadlines",
        viewMoreDeadlines:"View More",
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
        comingSoonGeneric:"This isn't connected yet — coming soon.",
        viewAllToast:"Full classes list is coming soon."

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
        pageTitle:"Inicio",
        pageSubtitle:"Bienvenido de nuevo, esto es lo que pasa hoy",
        searchHome:"Buscar...",
        heroGreeting:"Buenos Días",
        heroTitle:"Todo lo que necesitas para enseñar en un solo lugar.",
        heroSub:"Organiza tus clases, tareas, horarios y el progreso de tus estudiantes con Thinking.",
        btnMyClasses:"Mis clases",
        btnAnalytics:"Analítica",
        bombiTitle:"Bombi IA",
        bombiSub:"Obtén ayuda docente al instante con Bombi.",
        askBombi:"Preguntar a Bombi",
        scheduleTitle:"Horario de Hoy",
        scheduleDay:"Lunes",
        myClassesTitle:"Mis Clases",
        viewAllClasses:"Ver Todo",
        studentsWord:"Estudiantes",
        statusOpen:"Abierto",
        quickActionsTitle:"Acciones Rápidas",
        createMaterialTitle:"Crear Material",
        createMaterialSub:"Genera material de estudio personalizado al instante con IA.",
        createMaterialBtn:"Crear Material",
        newBadge:"Nuevo",
        qaAssignment:"Crear una Tarea",
        qaLesson:"Nueva Lección",
        qaResource:"Subir Recurso",
        deadlinesTitle:"Próximas Entregas",
        viewMoreDeadlines:"Ver Más",
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
        comingSoonGeneric:"Esto aún no está conectado — próximamente.",
        viewAllToast:"La lista completa de clases estará disponible pronto."

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

    const langLabel = document.getElementById("langLabel");

    langLabel.textContent = currentLang.toUpperCase();

}

document.getElementById("langToggle").addEventListener("click", () => {

    currentLang = currentLang === "en" ? "es" : "en";

    applyStaticTranslations();

    renderAll();

    closeAllDropdowns();

});

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

/* ======================================================
                TOASTS
====================================================== */

const toastContainer = document.getElementById("toastContainer");

function showToast(message, icon){

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

/* ======================================================
                DATOS DE EJEMPLO
====================================================== */

let scheduleEvents = [

    { time:"09:00 AM", title:"Biology 101", room:"Room A-203" },
    { time:"11:00 AM", title:"Faculty Meeting", room:"Coference Room" },
    { time:"2:00 PM", title:"Anatomy Lab", room:"Lab 4" }

];

let myClasses = [

    { id:1, name:"Biology 101", studentsCount:32, color:"#7C5CFF" },
    { id:2, name:"Biology 102", studentsCount:19, color:"#00D4FF" },
    { id:3, name:"Biology 102", studentsCount:24, color:"#22C55E" }

];

let deadlines = [

    { icon:"clipboard-list", title:"Biology Homework #5", due:"Due Today - 11:59" },
    { icon:"help-circle", title:"Anatomy Quiz", due:"Tomorrow" },
    { icon:"graduation-cap", title:"Submit Final Grades", due:"Friday" }

];

let quickActions = [

    { key:"qaAssignment", icon:"plus" },
    { key:"qaLesson", icon:"plus" },
    { key:"qaResource", icon:"plus" }

];

/* ======================================================
        PERFIL REAL DEL PROFESOR (tabla "teachers")
    IMPORTANTE: la tabla "teachers" tiene su propio "id"
    (primary key de la tabla), pero el usuario logueado en
    Supabase Auth se identifica con "auth_id". Por eso la
    consulta de abajo filtra por auth_id, no por id.
====================================================== */

async function loadTeacherProfile(){

    if(!db || !currentUserId){

        showToast("DEBUG: no hay db o no hay currentUserId (sin sesión)", "alert-triangle");

        return;

    }

    showToast("DEBUG: buscando auth_id = " + currentUserId, "search");

    const { data, error } = await db
        .from("teachers")
        .select("Nombre_Usuario, subject, Escuela")
        .eq("auth_id", currentUserId)
        .single();

    if(error){

        showToast("DEBUG ERROR: " + error.message, "alert-triangle");

        console.error("Error cargando datos del profesor:", error);

        return;

    }

    showToast("DEBUG: encontrado -> " + data.Nombre_Usuario, "check");

    const nombre = data.Nombre_Usuario;

    const userNameEl = document.getElementById("userName");

    if(userNameEl){

        userNameEl.textContent = nombre;

    }

    const profileNameEl = document.getElementById("profileName");

    if(profileNameEl){

        profileNameEl.textContent = nombre;

    }

}

/* ======================================================
        FUTURO: CARGA REAL DESDE SUPABASE
====================================================== */

async function loadScheduleEvents(){

    // TODO: reemplazar por consulta real a la tabla "events", ej:
    // const { data, error } = await db
    //     .from("events")
    //     .select("time, title, room")
    //     .eq("teacher_id", currentUserId)
    //     .eq("event_date", new Date().toISOString().slice(0,10))
    //     .order("time", { ascending:true });
    //
    // if(error){ console.error("Error cargando el horario:", error); return; }
    // scheduleEvents = data;

    return scheduleEvents;

}

async function loadClasses(){

    // TODO: reemplazar por consulta real a la tabla "classrooms", ej:
    // const { data, error } = await db
    //     .from("classrooms")
    //     .select("id, name, students_count, color")
    //     .eq("teacher_id", currentUserId);
    //
    // if(error){ console.error("Error cargando clases:", error); return; }
    // myClasses = data;

    return myClasses;

}

async function loadDeadlines(){

    // TODO: reemplazar por consulta real a una tabla "assignments" o "deadlines", ej:
    // const { data, error } = await db
    //     .from("assignments")
    //     .select("icon, title, due")
    //     .eq("teacher_id", currentUserId)
    //     .order("due_date", { ascending:true });
    //
    // if(error){ console.error("Error cargando entregas:", error); return; }
    // deadlines = data;

    return deadlines;

}

/* ======================================================
                RENDER: SCHEDULE
====================================================== */

const scheduleList = document.getElementById("scheduleList");

function renderSchedule(){

    if(scheduleEvents.length === 0){

        scheduleList.innerHTML = `<div class="grid-empty">—</div>`;

        return;

    }

    scheduleList.innerHTML = scheduleEvents.map((ev) => `
        <div class="schedule-item">
            <span class="schedule-dot"></span>
            <div class="schedule-time">${ev.time}</div>
            <div class="schedule-title">${ev.title}</div>
            <div class="schedule-room">${ev.room}</div>
        </div>
    `).join("");

}

/* ======================================================
                RENDER: MY CLASSES
====================================================== */

const classList = document.getElementById("classList");

function renderClasses(){

    classList.innerHTML = myClasses.map((c) => `
        <div class="class-item" style="--class-color:${c.color};" data-id="${c.id}">
            <h3>${c.name}</h3>
            <div class="class-students">${c.studentsCount} ${t("studentsWord")}</div>
            <span class="class-status">${t("statusOpen")}</span>
        </div>
    `).join("");

    classList.querySelectorAll(".class-item").forEach((item) => {

        item.addEventListener("click", () => {

            // TODO: cuando conectes navegación real, redirige a
            // Students-Teacher.html?classroom=<id> usando item.dataset.id.

            window.location.href = "Students-Teacher.html";

        });

    });

}

/* ======================================================
                RENDER: QUICK ACTIONS
====================================================== */

const quickActionsList = document.getElementById("quickActionsList");

function renderQuickActions(){

    quickActionsList.innerHTML = quickActions.map((qa) => `
        <button class="qa-btn" data-key="${qa.key}">
            <span>${t(qa.key)}</span>
            <i data-lucide="${qa.icon}"></i>
        </button>
    `).join("");

    quickActionsList.querySelectorAll(".qa-btn").forEach((btn) => {

        btn.addEventListener("click", () => {

            // TODO: conectar cada acción a su propio flujo real
            // (crear tarea, nueva lección, subir recurso).

            showToast(t("comingSoonGeneric"), "info");

        });

    });

    refreshIcons();

}

/* ======================================================
                RENDER: DEADLINES
====================================================== */

const deadlineList = document.getElementById("deadlineList");

const viewMoreDeadlinesBtn = document.getElementById("viewMoreDeadlinesBtn");

function renderDeadlines(){

    if(deadlines.length === 0){

        deadlineList.innerHTML = `<div class="grid-empty">—</div>`;

        return;

    }

    deadlineList.innerHTML = deadlines.map((d) => `
        <div class="deadline-item">
            <div class="d-icon"><i data-lucide="${d.icon}"></i></div>
            <div>
                <div class="d-title">${d.title}</div>
                <div class="d-time">${d.due}</div>
            </div>
        </div>
    `).join("");

    refreshIcons();

}

viewMoreDeadlinesBtn.addEventListener("click", () => {

    // TODO: cuando haya más de 3 entregas reales, pagina aquí.

    showToast(t("comingSoonGeneric"), "info");

});

/* ======================================================
                HERO + BOMBI BUTTONS
====================================================== */

document.getElementById("heroMyClassesBtn").addEventListener("click", () => {

    window.location.href = "Students-Teacher.html";

});

document.getElementById("heroAnalyticsBtn").addEventListener("click", () => {

    // TODO: enlazar a la futura pantalla de Analytics.

    showToast(t("comingSoonGeneric"), "info");

});

document.getElementById("askBombiBtn").addEventListener("click", () => {

    // TODO: enlazar a la pantalla real de Bombi AI.

    showToast(t("comingSoonGeneric"), "bot");

});

document.getElementById("viewAllClassesBtn").addEventListener("click", () => {

    window.location.href = "Students-Teacher.html";

});

/* ======================================================
                RENDER ALL (helper central)
====================================================== */

function renderAll(){

    renderSchedule();

    renderClasses();

    renderQuickActions();

    renderDeadlines();

}

/* ======================================================
                INITIALIZE
====================================================== */

async function init(){

    if(db){

        try{

            const { data:{ session } } = await db.auth.getSession();

            if(session){

                currentUserId = session.user.id;

                await loadTeacherProfile();

            }
            else{

                showToast("DEBUG: no se detectó ninguna sesión activa", "alert-triangle");

            }

        }
        catch(err){

            showToast("DEBUG: Supabase no disponible - " + err.message, "alert-triangle");

            console.warn("Supabase no disponible en este entorno, usando datos de ejemplo.", err);

        }

    }
    else{

        showToast("DEBUG: la variable db es null (no cargó supabase-js)", "alert-triangle");

    }

    await loadScheduleEvents();

    await loadClasses();

    await loadDeadlines();

    applyStaticTranslations();

    renderAll();

    console.log("Thinking Teacher Home Screen Loaded 🚀");

}

init();
