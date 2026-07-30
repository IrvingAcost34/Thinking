/* ======================================================
                    THINKING
        TEACHER ASSIGNMENTS SCREEN
    Corre standalone con datos de ejemplo. Las funciones
    loadAssignments()/loadClasses() ya est\u00e1n listas para
    reemplazarse por consultas reales a Supabase (ver TODO).
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
                    LUCIDE ICONS
====================================================== */

function refreshIcons(){

    if(window.lucide){ lucide.createIcons(); }

}

refreshIcons();

/* ======================================================
                    IDIOMA (EN / ES)
====================================================== */

let currentLang = "en";

const I18N = {

    en:{
        sidebarSubtitle:"Teacher Dashboard",
        navHome:"Home", navTest:"Test", navStudents:"Students", navAssignments:"Assigments",
        navResources:"Resources", navSchedule:"Schedule", navBombi:"Bombi AI",
        roleTeacher:"Teacher", footerSettings:"Settings", footerLogout:"Logout",
        pageTitle:"Assignments", pageSubtitle:"Create, assign and track student work",
        searchPlaceholder:"Search assignments...", newAssignmentBtn:"New Assignment",
        statTotal:"Total Assignments", statTotalNote:"This term",
        statDrafts:"Drafts", statDraftsNote:"Not published",
        statPublished:"Published", statPublishedNote:"Active assignments",
        statPending:"Pending Review", statPendingNote:"Submissions",
        statAvg:"Average Score", statAvgNote:"+8% vs last term",
        tabAll:"All Assignments", tabDrafts:"Drafts", tabPublished:"Published",
        tabCompleted:"Completed", tabArchived:"Archived",
        filterBtn:"Filter", filterDueSoon:"Due soon first", filterLowSub:"Lowest submission rate", filterAZ:"A \u2013 Z",
        loadMore:"Load more assignments",
        classLabel:"Class", dueDateLabel:"Due Date", submissionsLabel:"Submissions",
        studentsSuffix:"students",
        statusPublished:"Published", statusDraft:"Draft", statusCompleted:"Completed", statusArchived:"Archived",
        tagQuiz:"Quiz", tagHomework:"Homework", tagEssay:"Essay", tagLabReport:"Lab Report", tagProject:"Project",
        dueOverdue:(n) => `${n} day${n === 1 ? "" : "s"} overdue`,
        dueToday:"Due today",
        dueSoon:(n) => `${n} day${n === 1 ? "" : "s"} left`,
        dueOk:(n) => `${n} days left`,
        menuView:"View details", menuEdit:"Edit", menuDuplicate:"Duplicate", menuArchive:"Archive", menuDelete:"Delete",
        assignmentOverview:"Assignment Overview", total:"Total",
        submissionStatus:"Submission Status", submitted:"Submitted", pending:"Pending", late:"Late",
        quickActions:"Quick Actions", importAssignment:"Import Assignment",
        fromQuestionBank:"From Question Bank", assignmentAnalytics:"Assignment Analytics",
        thinkingTip:"Thinking Tip",
        tipText:"Use Bombi AI to create personalized assignments based on learning styles.",
        tryBombi:"Try with Bombi AI",
        newAssignmentModalTitle:"New Assignment", editAssignmentModalTitle:"Edit Assignment",
        fieldTitle:"Title", fieldTitlePlaceholder:"e.g. Linear Equations Practice",
        fieldDescription:"Description", fieldDescPlaceholder:"What should students do?",
        fieldType:"Type", fieldClass:"Class", fieldDueDate:"Due date", fieldStudents:"Students",
        fieldStatus:"Status", statusDraft:"Draft", statusPublished:"Published",
        modalCancel:"Cancel", modalCreate:"Create", modalSave:"Save changes",
        confirmDeleteBtn:"Delete",
        confirmDeleteTitle:"Delete assignment?",
        confirmDeleteMsg:(title) => `This will permanently remove "${title}". This can't be undone.`,
        toastCreated:(title) => `"${title}" created.`,
        toastUpdated:(title) => `"${title}" updated.`,
        toastDuplicated:(title) => `"${title}" duplicated as a draft.`,
        toastArchived:(title) => `"${title}" archived.`,
        toastDeleted:"Assignment deleted.",
        toastOpening:(title) => `Opening "${title}"...`,
        noMatch:"No assignments match this view yet.",
        notifTitle:"Notifications",
        notif1Title:"3 new submissions", notif1Sub:"Linear Equations Practice \u2014 12A",
        notif2Title:"Assignment due soon", notif2Sub:"Science Lab Report closes in 5 days",
        notif3Title:"Weekly report ready", notif3Sub:"Your assignments summary is ready",
        profileSettings:"Account settings", profileHelp:"Help & support", profileLogout:"Log out",
        toastImport:"Import Assignment: connect this to your import flow.",
        toastQuestionBank:"Question Bank: connect this to your question bank.",
        toastAnalytics:"Assignment Analytics: build this view next.",
        toastBombi:"Opening Bombi AI...",
        toastSettings:"Account settings: build this screen next.",
        toastHelp:"Help & support: build this screen next.",
        toastNotifOpen:"Opening notification...",
        toastLoggedOut:"Logged out."
    },

    es:{
        sidebarSubtitle:"Panel del Maestro",
        navHome:"Inicio", navTest:"Examen", navStudents:"Estudiantes", navAssignments:"Tareas",
        navResources:"Recursos", navSchedule:"Horario", navBombi:"Bombi IA",
        roleTeacher:"Maestro", footerSettings:"Ajustes", footerLogout:"Cerrar sesi\u00f3n",
        pageTitle:"Tareas", pageSubtitle:"Crea, asigna y da seguimiento al trabajo de tus estudiantes",
        searchPlaceholder:"Buscar tareas...", newAssignmentBtn:"Nueva Tarea",
        statTotal:"Total de Tareas", statTotalNote:"Este trimestre",
        statDrafts:"Borradores", statDraftsNote:"Sin publicar",
        statPublished:"Publicadas", statPublishedNote:"Tareas activas",
        statPending:"Pendientes de Revisi\u00f3n", statPendingNote:"Entregas",
        statAvg:"Promedio", statAvgNote:"+8% vs trimestre anterior",
        tabAll:"Todas", tabDrafts:"Borradores", tabPublished:"Publicadas",
        tabCompleted:"Completadas", tabArchived:"Archivadas",
        filterBtn:"Filtrar", filterDueSoon:"Fecha l\u00edmite m\u00e1s pr\u00f3xima", filterLowSub:"Menor tasa de entrega", filterAZ:"A \u2013 Z",
        loadMore:"Ver m\u00e1s tareas",
        classLabel:"Sal\u00f3n", dueDateLabel:"Fecha L\u00edmite", submissionsLabel:"Entregas",
        studentsSuffix:"estudiantes",
        statusPublished:"Publicada", statusDraft:"Borrador", statusCompleted:"Completada", statusArchived:"Archivada",
        tagQuiz:"Examen", tagHomework:"Tarea", tagEssay:"Ensayo", tagLabReport:"Reporte de Laboratorio", tagProject:"Proyecto",
        dueOverdue:(n) => `${n} d\u00eda${n === 1 ? "" : "s"} de retraso`,
        dueToday:"Vence hoy",
        dueSoon:(n) => `Quedan ${n} d\u00eda${n === 1 ? "" : "s"}`,
        dueOk:(n) => `Quedan ${n} d\u00edas`,
        menuView:"Ver detalles", menuEdit:"Editar", menuDuplicate:"Duplicar", menuArchive:"Archivar", menuDelete:"Eliminar",
        assignmentOverview:"Resumen de Tareas", total:"Total",
        submissionStatus:"Estado de Entregas", submitted:"Entregado", pending:"Pendiente", late:"Atrasado",
        quickActions:"Acciones R\u00e1pidas", importAssignment:"Importar Tarea",
        fromQuestionBank:"Desde Banco de Preguntas", assignmentAnalytics:"Anal\u00edtica de Tareas",
        thinkingTip:"Consejo de Thinking",
        tipText:"Usa Bombi IA para crear tareas personalizadas seg\u00fan el estilo de aprendizaje.",
        tryBombi:"Probar con Bombi IA",
        newAssignmentModalTitle:"Nueva Tarea", editAssignmentModalTitle:"Editar Tarea",
        fieldTitle:"T\u00edtulo", fieldTitlePlaceholder:"ej. Pr\u00e1ctica de Ecuaciones Lineales",
        fieldDescription:"Descripci\u00f3n", fieldDescPlaceholder:"\u00bfQu\u00e9 deben hacer los estudiantes?",
        fieldType:"Tipo", fieldClass:"Sal\u00f3n", fieldDueDate:"Fecha l\u00edmite", fieldStudents:"Estudiantes",
        fieldStatus:"Estado", statusDraft:"Borrador", statusPublished:"Publicada",
        modalCancel:"Cancelar", modalCreate:"Crear", modalSave:"Guardar cambios",
        confirmDeleteBtn:"Eliminar",
        confirmDeleteTitle:"\u00bfEliminar tarea?",
        confirmDeleteMsg:(title) => `Esto eliminar\u00e1 permanentemente "${title}". No se puede deshacer.`,
        toastCreated:(title) => `"${title}" creada.`,
        toastUpdated:(title) => `"${title}" actualizada.`,
        toastDuplicated:(title) => `"${title}" duplicada como borrador.`,
        toastArchived:(title) => `"${title}" archivada.`,
        toastDeleted:"Tarea eliminada.",
        toastOpening:(title) => `Abriendo "${title}"...`,
        noMatch:"Ninguna tarea coincide con esta vista todav\u00eda.",
        notifTitle:"Notificaciones",
        notif1Title:"3 entregas nuevas", notif1Sub:"Pr\u00e1ctica de Ecuaciones Lineales \u2014 12A",
        notif2Title:"Tarea por vencer", notif2Sub:"Reporte de Lab de Ciencias cierra en 5 d\u00edas",
        notif3Title:"Reporte semanal listo", notif3Sub:"El resumen semanal de tus tareas ya est\u00e1 listo",
        profileSettings:"Configuraci\u00f3n de cuenta", profileHelp:"Ayuda y soporte", profileLogout:"Cerrar sesi\u00f3n",
        toastImport:"Importar Tarea: conecta esto a tu flujo de importaci\u00f3n.",
        toastQuestionBank:"Banco de Preguntas: conecta esto a tu banco de preguntas real.",
        toastAnalytics:"Anal\u00edtica de Tareas: construye esta vista despu\u00e9s.",
        toastBombi:"Abriendo Bombi IA...",
        toastSettings:"Configuraci\u00f3n de cuenta: construye esta pantalla despu\u00e9s.",
        toastHelp:"Ayuda y soporte: construye esta pantalla despu\u00e9s.",
        toastNotifOpen:"Abriendo notificaci\u00f3n...",
        toastLoggedOut:"Sesi\u00f3n cerrada."
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
    closeFloatingMenu();

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

function openSidebar(){ sidebarEl.classList.add("open"); sidebarOverlay.classList.add("open"); }
function closeSidebar(){ sidebarEl.classList.remove("open"); sidebarOverlay.classList.remove("open"); }

menuToggle.addEventListener("click", () => {

    sidebarEl.classList.contains("open") ? closeSidebar() : openSidebar();

});

sidebarOverlay.addEventListener("click", closeSidebar);

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
                DROPDOWNS (notificaciones / filtro / perfil)
====================================================== */

const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const profileBtn = document.getElementById("profileBtn");
const profilePanel = document.getElementById("profilePanel");

function closeAllDropdowns(){

    [notificationPanel, filterPanel, profilePanel].forEach((p) => p.classList.remove("open"));

}

function toggleDropdown(panel){

    const wasOpen = panel.classList.contains("open");

    closeAllDropdowns();

    if(!wasOpen){ panel.classList.add("open"); }

}

function renderNotificationPanel(){

    notificationPanel.innerHTML = `
        <div class="dropdown-panel-title">${t("notifTitle")}</div>
        <button class="dropdown-item" data-notif="1">
            <i data-lucide="clipboard-check"></i>
            <span>${t("notif1Title")}<div class="item-sub">${t("notif1Sub")}</div></span>
        </button>
        <button class="dropdown-item" data-notif="2">
            <i data-lucide="triangle-alert"></i>
            <span>${t("notif2Title")}<div class="item-sub">${t("notif2Sub")}</div></span>
        </button>
        <button class="dropdown-item" data-notif="3">
            <i data-lucide="bar-chart-3"></i>
            <span>${t("notif3Title")}<div class="item-sub">${t("notif3Sub")}</div></span>
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

function renderFilterPanel(){

    const options = [
        { key:"dueSoon", label:t("filterDueSoon"), icon:"clock" },
        { key:"lowSubmission", label:t("filterLowSub"), icon:"trending-down" },
        { key:"az", label:t("filterAZ"), icon:"arrow-down-a-z" }
    ];

    filterPanel.innerHTML = options.map((opt) => `
        <button class="dropdown-item ${sortMode === opt.key ? "active-filter" : ""}" data-sort="${opt.key}">
            <i data-lucide="${opt.icon}"></i>
            <span>${opt.label}</span>
        </button>
    `).join("");

    filterPanel.querySelectorAll(".dropdown-item").forEach((btn) => {

        btn.addEventListener("click", () => {

            sortMode = sortMode === btn.dataset.sort ? "default" : btn.dataset.sort;

            renderFilterPanel();

            renderAssignList();

            closeAllDropdowns();

        });

    });

    refreshIcons();

}

function renderProfilePanel(){

    profilePanel.innerHTML = `
        <button class="dropdown-item" data-profile-action="settings"><i data-lucide="settings"></i><span>${t("profileSettings")}</span></button>
        <button class="dropdown-item" data-profile-action="help"><i data-lucide="circle-help"></i><span>${t("profileHelp")}</span></button>
        <button class="dropdown-item delete-item" data-profile-action="logout"><i data-lucide="log-out"></i><span>${t("profileLogout")}</span></button>
    `;

    profilePanel.querySelectorAll(".dropdown-item").forEach((btn) => {

        btn.addEventListener("click", async () => {

            closeAllDropdowns();

            const action = btn.dataset.profileAction;

            if(action === "settings"){

                showToast(t("toastSettings"), "settings");

            }
            else if(action === "help"){

                showToast(t("toastHelp"), "circle-help");

            }
            else if(action === "logout"){

                // TODO: ajusta la ruta de redirecci\u00f3n a tu p\u00e1gina real de Login Teacher.

                if(db){

                    try{

                        await db.auth.signOut();

                    }
                    catch(err){

                        console.warn("No se pudo cerrar sesi\u00f3n en Supabase:", err);

                    }

                }

                showToast(t("toastLoggedOut"), "log-out");

                setTimeout(() => {

                    window.location.href = "../LOGIN Teacher/TEACHER LOGIN.html";

                }, 800);

            }

        });

    });

    refreshIcons();

}

notificationBtn.addEventListener("click", (e) => {

    e.stopPropagation();
    renderNotificationPanel();
    toggleDropdown(notificationPanel);

});

filterBtn.addEventListener("click", (e) => {

    e.stopPropagation();
    renderFilterPanel();
    toggleDropdown(filterPanel);

});

profileBtn.addEventListener("click", (e) => {

    e.stopPropagation();
    renderProfilePanel();
    toggleDropdown(profilePanel);

});

document.addEventListener("click", () => {

    closeAllDropdowns();
    closeFloatingMenu();

});

/* ======================================================
                DATOS DE EJEMPLO
====================================================== */

let assignments = [

    {
        id:1, title:"Linear Equations Practice",
        description:"Solve the following equations and show your step-by-step process.",
        tag:"Quiz", icon:"square-radical", iconBg:"purple",
        className:"12A - Mathematics", students:28,
        dueDate:"2025-05-24", submitted:20, total:28, status:"published"
    },
    {
        id:2, title:"Science Lab Report",
        description:"Write a lab report based on the experiment conducted in class.",
        tag:"Lab Report", icon:"flask-conical", iconBg:"blue",
        className:"12B - Science", students:31,
        dueDate:"2025-05-27", submitted:15, total:31, status:"published"
    },
    {
        id:3, title:"English Essay",
        description:"Write a 500-word essay on your favorite literary character.",
        tag:"Essay", icon:"book-open", iconBg:"green",
        className:"11A - English", students:24,
        dueDate:"2025-05-30", submitted:18, total:24, status:"published"
    },
    {
        id:4, title:"Statistics Problem Set",
        description:"Complete all problems from chapter 4 (1\u201320).",
        tag:"Homework", icon:"bar-chart-3", iconBg:"amber",
        className:"12A - Mathematics", students:28,
        dueDate:"2025-06-02", submitted:8, total:28, status:"draft"
    },
    {
        id:5, title:"Biology Research",
        description:"Research a cell organelle and create a presentation.",
        tag:"Project", icon:"dna", iconBg:"pink",
        className:"11B - Biology", students:26,
        dueDate:"2025-06-05", submitted:0, total:26, status:"draft"
    },
    {
        id:6, title:"Poetry Analysis",
        description:"Analyze the use of metaphor in the assigned poem.",
        tag:"Essay", icon:"book-open", iconBg:"green",
        className:"11A - English", students:24,
        dueDate:"2025-04-10", submitted:24, total:24, status:"completed"
    },
    {
        id:7, title:"Intro to Fractions Quiz",
        description:"Basic quiz covering fraction addition and subtraction.",
        tag:"Quiz", icon:"square-radical", iconBg:"purple",
        className:"11B - Biology", students:26,
        dueDate:"2025-02-14", submitted:26, total:26, status:"archived"
    }

];

const overviewStats = { total:24, drafts:6, published:18, completed:12, archived:3 };

const submissionStatus = { submitted:162, pending:58, late:22 };

/* ======================================================
        FUTURO: CARGA REAL DESDE SUPABASE
====================================================== */

async function loadAssignments(){

    // TODO: reemplazar por consulta real, por ejemplo:
    // const { data, error } = await db
    //     .from("assignments")
    //     .select("id, title, description, tag, icon, class_name, students, due_date, submitted, total, status")
    //     .eq("teacher_id", currentUserId);
    //
    // if(error){ console.error("Error cargando assignments:", error); return; }
    // assignments = data;

    return assignments;

}

/* ======================================================
                STATE
====================================================== */

let activeStatusTab = "all";
let searchTerm = "";
let sortMode = "default";
let visibleCount = 5;

const iconBgColors = {
    purple:"linear-gradient(135deg,#7C5CFF,#A855F7)",
    blue:"linear-gradient(135deg,#3B82F6,#00D4FF)",
    green:"linear-gradient(135deg,#22C55E,#00D4FF)",
    amber:"linear-gradient(135deg,#F59E0B,#F43F5E)",
    pink:"linear-gradient(135deg,#F43F5E,#A855F7)"
};

function daysLeftInfo(dueDateStr){

    const due = new Date(dueDateStr + "T00:00:00");

    const today = new Date();

    today.setHours(0,0,0,0);

    const diffDays = Math.round((due - today) / 86400000);

    if(diffDays < 0){

        return { text: t("dueOverdue")(Math.abs(diffDays)), cls:"overdue" };

    }

    if(diffDays === 0){

        return { text: t("dueToday"), cls:"soon" };

    }

    if(diffDays <= 3){

        return { text: t("dueSoon")(diffDays), cls:"soon" };

    }

    return { text: t("dueOk")(diffDays), cls:"ok" };

}

function ringColorFor(pct){

    if(pct >= 70){ return "#22C55E"; }
    if(pct >= 40){ return "#00D4FF"; }
    if(pct > 0){ return "#F59E0B"; }
    return "#F43F5E";

}

function formatDueDate(dueDateStr){

    const due = new Date(dueDateStr + "T00:00:00");

    return due.toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });

}

/* ======================================================
                RENDER: STATS ROW
====================================================== */

const assignStatsRow = document.getElementById("assignStatsRow");

function renderStats(){

    const publishedCount = assignments.filter((a) => a.status === "published").length;

    const totalSubmissions = assignments.reduce((sum, a) => sum + a.submitted, 0);

    const avgScore = 87;

    const stats = [
        { icon:"file-text", cls:"purple", label:t("statTotal"), value:overviewStats.total, note:t("statTotalNote") },
        { icon:"pencil", cls:"blue", label:t("statDrafts"), value:overviewStats.drafts, note:t("statDraftsNote") },
        { icon:"send", cls:"green", label:t("statPublished"), value:publishedCount, note:t("statPublishedNote") },
        { icon:"clock", cls:"amber", label:t("statPending"), value:totalSubmissions, note:t("statPendingNote") },
        { icon:"star", cls:"violet", label:t("statAvg"), value:`${avgScore}%`, note:t("statAvgNote"), up:true }
    ];

    assignStatsRow.innerHTML = stats.map((s) => `
        <div class="assign-stat-card">
            <div class="assign-stat-icon ${s.cls}"><i data-lucide="${s.icon}"></i></div>
            <div class="assign-stat-label">${s.label}</div>
            <div class="assign-stat-value">${s.value}</div>
            <div class="assign-stat-note ${s.up ? "up" : ""}">${s.note}</div>
        </div>
    `).join("");

    refreshIcons();

}

/* ======================================================
                RENDER: TABS
====================================================== */

const assignTabs = document.querySelectorAll(".assign-tab");

assignTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        assignTabs.forEach((t) => t.classList.remove("active"));

        tab.classList.add("active");

        activeStatusTab = tab.dataset.status;

        visibleCount = 5;

        renderAssignList();

    });

});

/* ======================================================
                RENDER: LISTA DE ASIGNACIONES
====================================================== */

const assignList = document.getElementById("assignList");
const loadMoreBtn = document.getElementById("loadMoreBtn");

function getFilteredAssignments(){

    let list = assignments.slice();

    if(activeStatusTab !== "all"){

        list = list.filter((a) => a.status === activeStatusTab);

    }

    if(searchTerm){

        list = list.filter((a) => a.title.toLowerCase().includes(searchTerm));

    }

    if(sortMode === "dueSoon"){

        list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    }
    else if(sortMode === "lowSubmission"){

        list.sort((a, b) => (a.submitted / a.total) - (b.submitted / b.total));

    }
    else if(sortMode === "az"){

        list.sort((a, b) => a.title.localeCompare(b.title));

    }

    return list;

}

const tagI18nKey = {
    "Quiz":"tagQuiz", "Homework":"tagHomework", "Essay":"tagEssay",
    "Lab Report":"tagLabReport", "Project":"tagProject"
};

const statusI18nKey = {
    "published":"statusPublished", "draft":"statusDraft",
    "completed":"statusCompleted", "archived":"statusArchived"
};

function renderAssignList(){

    const filtered = getFilteredAssignments();

    assignList.innerHTML = "";

    if(filtered.length === 0){

        assignList.innerHTML = `<div class="assign-empty">${t("noMatch")}</div>`;

        loadMoreBtn.style.display = "none";

        return;

    }

    const visible = filtered.slice(0, visibleCount);

    visible.forEach((a) => {

        const pct = a.total > 0 ? Math.round((a.submitted / a.total) * 100) : 0;

        const due = daysLeftInfo(a.dueDate);

        const ringColor = ringColorFor(pct);

        const tagLabel = t(tagI18nKey[a.tag]) || a.tag;

        const statusLabel = t(statusI18nKey[a.status]) || a.status;

        const row = document.createElement("div");

        row.classList.add("assign-row");

        row.innerHTML = `
            <div class="assign-icon" style="background:${iconBgColors[a.iconBg]};">
                <i data-lucide="${a.icon}"></i>
            </div>

            <div class="assign-main">
                <h3>${a.title}</h3>
                <p>${a.description}</p>
                <span class="assign-tag">${tagLabel}</span>
            </div>

            <div class="assign-meta">
                <div class="assign-meta-label">${t("classLabel")}</div>
                <div class="assign-meta-value">${a.className}</div>
                <div class="assign-meta-sub"><i data-lucide="users"></i>${a.students} ${t("studentsSuffix")}</div>
            </div>

            <div class="assign-meta">
                <div class="assign-meta-label">${t("dueDateLabel")}</div>
                <div class="assign-meta-value"><i data-lucide="calendar"></i>${formatDueDate(a.dueDate)}</div>
                <div class="assign-meta-sub assign-due-days ${due.cls}">${due.text}</div>
            </div>

            <div class="assign-ring-wrap">
                <div class="assign-ring" style="--pct:${pct}; --ring-color:${ringColor};">
                    <div class="assign-ring-inner">
                        <strong>${a.submitted}/${a.total}</strong>
                        <span>${pct}%</span>
                    </div>
                </div>
                <span class="assign-ring-label">${t("submissionsLabel")}</span>
            </div>

            <span class="assign-status-badge ${a.status}">${statusLabel}</span>

            <button class="assign-menu-btn" data-id="${a.id}">
                <i data-lucide="more-vertical"></i>
            </button>
        `;

        assignList.appendChild(row);

    });

    loadMoreBtn.style.display = filtered.length > visibleCount ? "flex" : "none";

    refreshIcons();

    bindKebabButtons();

}

document.getElementById("assignmentSearch").addEventListener("input", (e) => {

    searchTerm = e.target.value.toLowerCase().trim();

    visibleCount = 5;

    renderAssignList();

});

loadMoreBtn.addEventListener("click", () => {

    visibleCount += 5;

    renderAssignList();

});

/* ======================================================
                KEBAB MENU (men\u00fa flotante, mismo fix
    que en Teacher > Students: vive fuera de cualquier
    tarjeta para que position:fixed nunca se rompa)
====================================================== */

const floatingAssignMenu = document.getElementById("floatingAssignMenu");

function closeFloatingMenu(){

    floatingAssignMenu.classList.remove("open");

}

function positionFixedPanel(panel, anchorBtn){

    const rect = anchorBtn.getBoundingClientRect();

    const estWidth = 200;
    const estHeight = 230;

    let left = rect.right - estWidth;
    let top = rect.bottom + 8;

    if(left < 8){ left = 8; }

    if(left + estWidth > window.innerWidth - 8){ left = window.innerWidth - estWidth - 8; }

    if(top + estHeight > window.innerHeight - 8){ top = rect.top - estHeight - 8; }

    panel.style.position = "fixed";
    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
    panel.style.right = "auto";

}

function bindKebabButtons(){

    assignList.querySelectorAll(".assign-menu-btn").forEach((btn) => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            const wasOpenForThis = floatingAssignMenu.classList.contains("open") && floatingAssignMenu.dataset.forId === btn.dataset.id;

            closeFloatingMenu();

            closeAllDropdowns();

            if(wasOpenForThis){ return; }

            const assignmentId = Number(btn.dataset.id);

            floatingAssignMenu.dataset.forId = btn.dataset.id;

            floatingAssignMenu.innerHTML = `
                <button class="dropdown-item" data-action="view"><i data-lucide="eye"></i><span>${t("menuView")}</span></button>
                <button class="dropdown-item" data-action="edit"><i data-lucide="pencil"></i><span>${t("menuEdit")}</span></button>
                <button class="dropdown-item" data-action="duplicate"><i data-lucide="copy"></i><span>${t("menuDuplicate")}</span></button>
                <button class="dropdown-item" data-action="archive"><i data-lucide="archive"></i><span>${t("menuArchive")}</span></button>
                <button class="dropdown-item delete-item" data-action="delete"><i data-lucide="trash-2"></i><span>${t("menuDelete")}</span></button>
            `;

            positionFixedPanel(floatingAssignMenu, btn);

            floatingAssignMenu.classList.add("open");

            refreshIcons();

            floatingAssignMenu.querySelectorAll(".dropdown-item").forEach((item) => {

                item.addEventListener("click", (ev) => {

                    ev.stopPropagation();

                    const assignment = assignments.find((a) => a.id === assignmentId);

                    const action = item.dataset.action;

                    closeFloatingMenu();

                    if(action === "view"){

                        showToast(t("toastOpening")(assignment.title), "eye");

                    }
                    else if(action === "edit"){

                        openAssignModal(assignment);

                    }
                    else if(action === "duplicate"){

                        const copy = Object.assign({}, assignment, { id:Date.now(), title:`${assignment.title} (Copy)`, status:"draft", submitted:0 });

                        assignments.unshift(copy);

                        renderAll();

                        showToast(t("toastDuplicated")(assignment.title), "copy");

                    }
                    else if(action === "archive"){

                        assignment.status = "archived";

                        renderAll();

                        showToast(t("toastArchived")(assignment.title), "archive");

                    }
                    else if(action === "delete"){

                        openConfirmModal(

                            t("confirmDeleteTitle"),

                            t("confirmDeleteMsg")(assignment.title),

                            () => {

                                assignments = assignments.filter((a) => a.id !== assignmentId);

                                renderAll();

                                showToast(t("toastDeleted"), "trash-2");

                            }

                        );

                    }

                });

            });

        });

    });

}

window.addEventListener("scroll", closeFloatingMenu, true);

/* ======================================================
                RENDER: OVERVIEW DONUT
====================================================== */

const overviewDonut = document.getElementById("overviewDonut");
const overviewLegend = document.getElementById("overviewLegend");
const overviewTotal = document.getElementById("overviewTotal");

function renderOverview(){

    const { total, drafts, published, completed, archived } = overviewStats;

    const draftsPct = Math.round((drafts / total) * 100);
    const publishedPct = Math.round((published / total) * 100);
    const completedPct = Math.round((completed / total) * 100);
    const archivedPct = Math.round((archived / total) * 100);

    overviewDonut.style.setProperty("--drafts-end", `${draftsPct}%`);
    overviewDonut.style.setProperty("--published-end", `${draftsPct + publishedPct}%`);
    overviewDonut.style.setProperty("--completed-end", `${draftsPct + publishedPct + completedPct}%`);

    overviewTotal.textContent = total;

    overviewLegend.innerHTML = `
        <li><span class="legend-dot" style="background:#F59E0B;"></span>${t("statusDraft")}<strong>${drafts} (${draftsPct}%)</strong></li>
        <li><span class="legend-dot" style="background:#22C55E;"></span>${t("statusPublished")}<strong>${published} (${publishedPct}%)</strong></li>
        <li><span class="legend-dot" style="background:#3B82F6;"></span>${t("statusCompleted")}<strong>${completed} (${completedPct}%)</strong></li>
        <li><span class="legend-dot" style="background:#94A3B8;"></span>${t("statusArchived")}<strong>${archived} (${archivedPct}%)</strong></li>
    `;

}

/* ======================================================
                RENDER: SUBMISSION STATUS
====================================================== */

const submissionStatusList = document.getElementById("submissionStatusList");

function renderSubmissionStatus(){

    const total = submissionStatus.submitted + submissionStatus.pending + submissionStatus.late;

    const rows = [
        { key:"submitted", icon:"check-check", label:t("submitted"), value:submissionStatus.submitted, cls:"green" },
        { key:"pending", icon:"clock", label:t("pending"), value:submissionStatus.pending, cls:"amber" },
        { key:"late", icon:"triangle-alert", label:t("late"), value:submissionStatus.late, cls:"red" }
    ];

    submissionStatusList.innerHTML = rows.map((r) => {

        const pct = Math.round((r.value / total) * 100);

        return `
            <div class="submission-status-row">
                <div class="submission-status-icon ${r.key}"><i data-lucide="${r.icon}"></i></div>
                <span class="submission-status-name">${r.label}</span>
                <span class="submission-status-count">${r.value}</span>
                <span class="submission-status-pct ${r.cls}">${pct}%</span>
            </div>
        `;

    }).join("");

    refreshIcons();

}

/* ======================================================
                QUICK ACTIONS
====================================================== */

document.getElementById("qaNewAssignment").addEventListener("click", () => openAssignModal(null));

document.getElementById("qaImport").addEventListener("click", () => {

    // TODO: conectar con un flujo real de importaci\u00f3n (CSV, Google Classroom, etc.)

    showToast(t("toastImport"), "upload");

});

document.getElementById("qaQuestionBank").addEventListener("click", () => {

    // TODO: conectar con tu banco de preguntas real

    showToast(t("toastQuestionBank"), "clipboard-list");

});

document.getElementById("qaAnalytics").addEventListener("click", () => {

    // TODO: llevar a una p\u00e1gina real de Assignment Analytics

    showToast(t("toastAnalytics"), "bar-chart-3");

});

document.getElementById("tryBombiBtn").addEventListener("click", () => {

    // TODO: abrir el chat real de Bombi AI

    showToast(t("toastBombi"), "bot");

});

/* ======================================================
                NEW / EDIT ASSIGNMENT MODAL
====================================================== */

const assignModalOverlay = document.getElementById("assignModalOverlay");
const assignForm = document.getElementById("assignForm");
const assignTitleInput = document.getElementById("assignTitleInput");
const assignDescInput = document.getElementById("assignDescInput");
const assignTypeSelect = document.getElementById("assignTypeSelect");
const assignClassSelect = document.getElementById("assignClassSelect");
const assignDueInput = document.getElementById("assignDueInput");
const assignStudentsInput = document.getElementById("assignStudentsInput");
const assignStatusOptions = document.querySelectorAll("#assignStatusOptions .priority-btn");

let editingAssignmentId = null;
let selectedAssignStatus = "draft";

const tagIconMap = {
    Quiz:{ icon:"square-radical", iconBg:"purple" },
    Homework:{ icon:"bar-chart-3", iconBg:"amber" },
    Essay:{ icon:"book-open", iconBg:"green" },
    "Lab Report":{ icon:"flask-conical", iconBg:"blue" },
    Project:{ icon:"dna", iconBg:"pink" }
};

function openAssignModal(assignment){

    assignForm.reset();

    const modalTitleEl = document.getElementById("assignModalTitle");

    if(assignment){

        editingAssignmentId = assignment.id;

        modalTitleEl.textContent = t("editAssignmentModalTitle");

        assignTitleInput.value = assignment.title;
        assignDescInput.value = assignment.description;
        assignTypeSelect.value = assignment.tag;
        assignClassSelect.value = assignment.className;
        assignDueInput.value = assignment.dueDate;
        assignStudentsInput.value = assignment.students;
        selectedAssignStatus = assignment.status === "published" ? "published" : "draft";

    }
    else{

        editingAssignmentId = null;

        modalTitleEl.textContent = t("newAssignmentModalTitle");

        assignDueInput.value = new Date().toISOString().slice(0,10);
        assignStudentsInput.value = 28;
        selectedAssignStatus = "draft";

    }

    assignStatusOptions.forEach((btn) => {

        btn.classList.toggle("active", btn.dataset.status === selectedAssignStatus);

    });

    assignModalOverlay.classList.add("open");

    assignTitleInput.focus();

}

function closeAssignModal(){

    assignModalOverlay.classList.remove("open");

}

document.getElementById("newAssignmentBtn").addEventListener("click", () => openAssignModal(null));
document.getElementById("assignModalCloseBtn").addEventListener("click", closeAssignModal);
document.getElementById("assignModalCancelBtn").addEventListener("click", closeAssignModal);

assignModalOverlay.addEventListener("click", (e) => {

    if(e.target === assignModalOverlay){ closeAssignModal(); }

});

assignStatusOptions.forEach((btn) => {

    btn.addEventListener("click", () => {

        assignStatusOptions.forEach((b) => b.classList.remove("active"));

        btn.classList.add("active");

        selectedAssignStatus = btn.dataset.status;

    });

});

assignForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = assignTitleInput.value.trim();

    if(!title){ return; }

    const tag = assignTypeSelect.value;

    const iconInfo = tagIconMap[tag] || tagIconMap.Quiz;

    if(editingAssignmentId){

        const a = assignments.find((x) => x.id === editingAssignmentId);

        Object.assign(a, {
            title,
            description: assignDescInput.value.trim(),
            tag,
            icon: iconInfo.icon,
            iconBg: iconInfo.iconBg,
            className: assignClassSelect.value,
            students: Number(assignStudentsInput.value),
            dueDate: assignDueInput.value,
            status: selectedAssignStatus
        });

        showToast(t("toastUpdated")(title), "pencil");

    }
    else{

        // TODO: reemplazar por un insert real en Supabase (tabla "assignments").

        assignments.unshift({
            id: Date.now(),
            title,
            description: assignDescInput.value.trim(),
            tag,
            icon: iconInfo.icon,
            iconBg: iconInfo.iconBg,
            className: assignClassSelect.value,
            students: Number(assignStudentsInput.value),
            dueDate: assignDueInput.value,
            submitted: 0,
            total: Number(assignStudentsInput.value),
            status: selectedAssignStatus
        });

        showToast(t("toastCreated")(title), "check-circle");

    }

    closeAssignModal();

    renderAll();

});

/* ======================================================
                GENERIC CONFIRM MODAL
====================================================== */

const confirmModalOverlay = document.getElementById("confirmModalOverlay");
const confirmModalTitle = document.getElementById("confirmModalTitle");
const confirmModalMessage = document.getElementById("confirmModalMessage");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const confirmCancelBtn = document.getElementById("confirmCancelBtn");
const confirmModalCloseBtn = document.getElementById("confirmModalCloseBtn");

let pendingConfirmAction = null;

function openConfirmModal(title, message, onConfirm){

    confirmModalTitle.textContent = title;
    confirmModalMessage.textContent = message;
    pendingConfirmAction = onConfirm;
    confirmModalOverlay.classList.add("open");

}

function closeConfirmModal(){

    confirmModalOverlay.classList.remove("open");
    pendingConfirmAction = null;

}

confirmDeleteBtn.addEventListener("click", () => {

    if(pendingConfirmAction){ pendingConfirmAction(); }

    closeConfirmModal();

});

confirmCancelBtn.addEventListener("click", closeConfirmModal);
confirmModalCloseBtn.addEventListener("click", closeConfirmModal);

confirmModalOverlay.addEventListener("click", (e) => {

    if(e.target === confirmModalOverlay){ closeConfirmModal(); }

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        closeAssignModal();
        closeConfirmModal();
        closeFloatingMenu();
        closeAllDropdowns();

    }

});

/* ======================================================
                RENDER ALL
====================================================== */

function renderAll(){

    renderStats();
    renderAssignList();
    renderOverview();
    renderSubmissionStatus();

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

    await loadAssignments();

    applyStaticTranslations();

    renderAll();

    console.log("Thinking Teacher Assignments Screen Loaded \ud83d\ude80");

}

init();
