/* ======================================================
                    THINKING
        TEACHER STUDENTS SCREEN — v3 (i18n + botones)
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

    console.warn("supabase-js no se carg\u00f3. Agr\u00e9galo en Settings > JS > Add External Scripts:\nhttps://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");

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
        pageTitle:"Students",
        pageSubtitle:"Explore your classrooms and students in a dynamic way",
        searchClassrooms:"Search classrooms...",
        searchStudents:"Search students...",
        learningSpaces:"Learning Spaces",
        learningSpacesSub:"Select a classroom to explore students, progress and insights.",
        createClassroom:"Create Classroom",
        insideLabel:"Inside",
        viewGrid:"Grid",
        viewSeats:"Seats",
        viewTimeline:"Timeline",
        viewAnalytics:"Analytics",
        filter:"Filter",
        viewMore:"View More Students",
        classroomPreview:"Classroom Preview",
        quickStats:"Quick Stats",
        learningStyles:"Learning Styles Distribution",
        students:"Students",
        top:"Top",
        needHelp:"Need Help",
        enterClassroom:"Enter Classroom",
        active:"Active",
        needsHelp:"Needs Help",
        homeroom:"Homeroom",
        attendance:"Attendance",
        participation:"Participation",
        assignments:"Assignments",
        engagement:"Engagement",
        visual:"Visual",
        auditory:"Auditory",
        kinesthetic:"Kinesthetic",
        classProgress:"Class Progress",
        excellent:"Excellent",
        good:"Good",
        todaysActivity:"Today's Activity",
        quizzes:"Quizzes",
        discussions:"Discussions",
        aiInteractions:"AI Interactions",
        onTrack:"On Track",
        topPerformer:"Top Performer",
        usingAI:"Using AI",
        comingSoon:(view) => `The "${view}" view is coming soon.`,
        noMatch:"No students match your search yet.",
        notifTitle:"Notifications",
        notif1Title:"New assignment submitted",
        notif1Sub:"Daniel L\u00f3pez just submitted Math Homework 4",
        notif2Title:"Student needs help",
        notif2Sub:"Sof\u00eda Ram\u00edrez's progress dropped below 70%",
        notif3Title:"Weekly report ready",
        notif3Sub:"Your classes' weekly summary is ready to view",
        filterAll:"All students",
        filterActive:"Active only",
        filterNeedsHelp:"Needs help only",
        profileSettings:"Account settings",
        profileHelp:"Help & support",
        profileLogout:"Log out",
        createClassroomAlert:"Create Classroom: connect this to your Supabase insert flow.",
        studentMenuProfile:"View profile",
        studentMenuMessage:"Message parent",
        studentMenuReviewed:"Mark as reviewed",
        modalCreateTitle:"Create Classroom",
        modalNameLabel:"Classroom name",
        modalNamePlaceholder:"e.g. 10B",
        modalColorLabel:"Color",
        modalCancel:"Cancel",
        modalCreate:"Create",
        addStudent:"Add Student",
        modalAddStudentTitle:"Add Student",
        modalStudentNameLabel:"Student name",
        modalStudentNamePlaceholder:"e.g. Ana Ruiz",
        modalStyleLabel:"Learning style",
        modalProgressLabel:"Progress (%)",
        modalStatusLabel:"Status",
        deleteClassroom:"Delete classroom",
        deleteStudent:"Delete student",
        confirmDeleteBtn:"Delete",
        confirmDeleteClassroomTitle:"Delete classroom?",
        confirmDeleteClassroomMsg:(name) => `This will permanently remove "${name}" and all its students. This can't be undone.`,
        confirmDeleteStudentTitle:"Delete student?",
        confirmDeleteStudentMsg:(name) => `This will permanently remove ${name} from this classroom. This can't be undone.`,
        noClassrooms:"No classrooms yet. Create one to get started.",
        noStudentsYet:"No students in this classroom yet. Use \"Add Student\" to get started.",
        messageLabel:"Message",
        messagePlaceholder:"Write a message...",
        messageSend:"Send",
        messageSentToast:(name) => `Message sent to ${name}'s parent.`,
        reviewedToast:(name) => `${name} marked as reviewed.`,
        profileProgress:"Progress",
        profileStatus:"Status",
        profileStyle:"Learning style",
        reviewedTag:"Reviewed",
        analyticsAvgProgress:"Class average progress",
        analyticsOnTrack:"On track / Needs help",
        analyticsTopPerformer:"Top performer",
        analyticsStyleBreakdown:"Learning styles in this class",
        seatEmpty:"Empty seat",
        inviteLink:"Invite Link",
        inviteModalTitle:"Invite students to this classroom",
        inviteModalDesc:"Share this link with your students. When they register through it, they'll join this classroom automatically \u2014 make sure your registration page reads the classroom code from the URL.",
        inviteLinkLabel:"Class link",
        copyBtn:"Copy",
        linkCopiedToast:"Link copied to clipboard.",
        noMessagesYet:"No messages yet. Say hello!",
        conversationWith:(name) => `Conversation with ${name}'s parent`

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
        footerLogout:"Cerrar sesi\u00f3n",
        pageTitle:"Estudiantes",
        pageSubtitle:"Explora tus salones y estudiantes de forma din\u00e1mica",
        searchClassrooms:"Buscar salones...",
        searchStudents:"Buscar estudiantes...",
        learningSpaces:"Espacios de Aprendizaje",
        learningSpacesSub:"Selecciona un sal\u00f3n para explorar estudiantes, progreso e insights.",
        createClassroom:"Crear Sal\u00f3n",
        insideLabel:"Dentro de",
        viewGrid:"Cuadr\u00edcula",
        viewSeats:"Asientos",
        viewTimeline:"L\u00ednea de tiempo",
        viewAnalytics:"Anal\u00edtica",
        filter:"Filtrar",
        viewMore:"Ver M\u00e1s Estudiantes",
        classroomPreview:"Vista del Sal\u00f3n",
        quickStats:"Estad\u00edsticas R\u00e1pidas",
        learningStyles:"Distribuci\u00f3n de Estilos de Aprendizaje",
        students:"Estudiantes",
        top:"Destacados",
        needHelp:"Necesitan Ayuda",
        enterClassroom:"Entrar al Sal\u00f3n",
        active:"Activo",
        needsHelp:"Necesita Ayuda",
        homeroom:"Sal\u00f3n Principal",
        attendance:"Asistencia",
        participation:"Participaci\u00f3n",
        assignments:"Tareas",
        engagement:"Compromiso",
        visual:"Visual",
        auditory:"Auditivo",
        kinesthetic:"Kinest\u00e9sico",
        classProgress:"Progreso de la Clase",
        excellent:"Excelente",
        good:"Bien",
        todaysActivity:"Actividad de Hoy",
        quizzes:"Cuestionarios",
        discussions:"Discusiones",
        aiInteractions:"Interacciones IA",
        onTrack:"Al D\u00eda",
        topPerformer:"Destacado",
        usingAI:"Usando IA",
        comingSoon:(view) => `La vista "${view}" estar\u00e1 disponible pronto.`,
        noMatch:"Ning\u00fan estudiante coincide con tu b\u00fasqueda.",
        notifTitle:"Notificaciones",
        notif1Title:"Nueva tarea entregada",
        notif1Sub:"Daniel L\u00f3pez entreg\u00f3 la Tarea de Matem\u00e1ticas 4",
        notif2Title:"Un estudiante necesita ayuda",
        notif2Sub:"El progreso de Sof\u00eda Ram\u00edrez baj\u00f3 de 70%",
        notif3Title:"Reporte semanal listo",
        notif3Sub:"El resumen semanal de tus clases ya est\u00e1 disponible",
        filterAll:"Todos los estudiantes",
        filterActive:"Solo activos",
        filterNeedsHelp:"Solo con ayuda necesaria",
        profileSettings:"Configuraci\u00f3n de cuenta",
        profileHelp:"Ayuda y soporte",
        profileLogout:"Cerrar sesi\u00f3n",
        createClassroomAlert:"Crear Sal\u00f3n: conecta esto a tu flujo de inserci\u00f3n de Supabase.",
        studentMenuProfile:"Ver perfil",
        studentMenuMessage:"Mensaje a padres",
        studentMenuReviewed:"Marcar como revisado",
        modalCreateTitle:"Crear Sal\u00f3n",
        modalNameLabel:"Nombre del sal\u00f3n",
        modalNamePlaceholder:"ej. 10B",
        modalColorLabel:"Color",
        modalCancel:"Cancelar",
        modalCreate:"Crear",
        addStudent:"Agregar Estudiante",
        modalAddStudentTitle:"Agregar Estudiante",
        modalStudentNameLabel:"Nombre del estudiante",
        modalStudentNamePlaceholder:"ej. Ana Ru\u00edz",
        modalStyleLabel:"Estilo de aprendizaje",
        modalProgressLabel:"Progreso (%)",
        modalStatusLabel:"Estado",
        deleteClassroom:"Eliminar sal\u00f3n",
        deleteStudent:"Eliminar estudiante",
        confirmDeleteBtn:"Eliminar",
        confirmDeleteClassroomTitle:"\u00bfEliminar sal\u00f3n?",
        confirmDeleteClassroomMsg:(name) => `Esto eliminar\u00e1 permanentemente "${name}" y a todos sus estudiantes. No se puede deshacer.`,
        confirmDeleteStudentTitle:"\u00bfEliminar estudiante?",
        confirmDeleteStudentMsg:(name) => `Esto eliminar\u00e1 permanentemente a ${name} de este sal\u00f3n. No se puede deshacer.`,
        noClassrooms:"A\u00fan no hay salones. Crea uno para empezar.",
        noStudentsYet:"A\u00fan no hay estudiantes en este sal\u00f3n. Usa \"Agregar Estudiante\" para empezar.",
        messageLabel:"Mensaje",
        messagePlaceholder:"Escribe un mensaje...",
        messageSend:"Enviar",
        messageSentToast:(name) => `Mensaje enviado a los padres de ${name}.`,
        reviewedToast:(name) => `${name} marcado como revisado.`,
        profileProgress:"Progreso",
        profileStatus:"Estado",
        profileStyle:"Estilo de aprendizaje",
        reviewedTag:"Revisado",
        analyticsAvgProgress:"Progreso promedio de la clase",
        analyticsOnTrack:"Al d\u00eda / Necesitan ayuda",
        analyticsTopPerformer:"Estudiante destacado",
        analyticsStyleBreakdown:"Estilos de aprendizaje en la clase",
        seatEmpty:"Asiento vac\u00edo",
        inviteLink:"Link de Invitaci\u00f3n",
        inviteModalTitle:"Invita estudiantes a este sal\u00f3n",
        inviteModalDesc:"Comparte este link con tus estudiantes. Cuando se registren con \u00e9l, se unir\u00e1n autom\u00e1ticamente a este sal\u00f3n \u2014 aseg\u00farate de que tu p\u00e1gina de registro lea el c\u00f3digo del sal\u00f3n desde la URL.",
        inviteLinkLabel:"Link del sal\u00f3n",
        copyBtn:"Copiar",
        linkCopiedToast:"Link copiado al portapapeles.",
        noMessagesYet:"A\u00fan no hay mensajes. \u00a1Escribe el primero!",
        conversationWith:(name) => `Conversaci\u00f3n con los padres de ${name}`

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

    if(!wasOpen){

        panel.classList.add("open");

    }

}

function renderNotificationPanel(){

    notificationPanel.innerHTML = `
        <div class="dropdown-panel-title">${t("notifTitle")}</div>
        <button class="dropdown-item">
            <i data-lucide="clipboard-check"></i>
            <span>
                ${t("notif1Title")}
                <div class="item-sub">${t("notif1Sub")}</div>
            </span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="triangle-alert"></i>
            <span>
                ${t("notif2Title")}
                <div class="item-sub">${t("notif2Sub")}</div>
            </span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="bar-chart-3"></i>
            <span>
                ${t("notif3Title")}
                <div class="item-sub">${t("notif3Sub")}</div>
            </span>
        </button>
    `;

    refreshIcons();

}

function renderFilterPanel(){

    const options = [
        { key:"all", label:t("filterAll"), icon:"users" },
        { key:"active", label:t("filterActive"), icon:"circle-check" },
        { key:"needs-help", label:t("filterNeedsHelp"), icon:"triangle-alert" }
    ];

    filterPanel.innerHTML = options.map((opt) => `
        <button class="dropdown-item ${studentStatusFilter === opt.key ? "active-filter" : ""}" data-filter="${opt.key}">
            <i data-lucide="${opt.icon}"></i>
            <span>${opt.label}</span>
        </button>
    `).join("");

    filterPanel.querySelectorAll(".dropdown-item").forEach((btn) => {

        btn.addEventListener("click", () => {

            studentStatusFilter = btn.dataset.filter;

            visibleStudentCount = 6;

            renderFilterPanel();

            renderStudentsGrid();

            closeAllDropdowns();

        });

    });

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

});

/* ======================================================
                DATOS DE EJEMPLO
====================================================== */

let classrooms = [

    {
        id:1,
        name:"12A",
        avgProgress:86,
        color:"#7C5CFF",
        status:"active",
        attendance:98,
        participation:95,
        assignments:87,
        engagement:91,
        activity:{ quizzes:8, discussions:2, aiInteractions:12 },
        learningStyles:{ visual:40, auditory:35, kinesthetic:25 }
    },
    {
        id:2,
        name:"12B",
        avgProgress:92,
        color:"#00D4FF",
        status:"active",
        attendance:96,
        participation:93,
        assignments:90,
        engagement:88,
        activity:{ quizzes:6, discussions:4, aiInteractions:9 },
        learningStyles:{ visual:32, auditory:44, kinesthetic:24 }
    },
    {
        id:3,
        name:"11A",
        avgProgress:79,
        color:"#22C55E",
        status:"active",
        attendance:94,
        participation:89,
        assignments:81,
        engagement:85,
        activity:{ quizzes:5, discussions:3, aiInteractions:7 },
        learningStyles:{ visual:28, auditory:30, kinesthetic:42 }
    }

];

let students = [

    { id:1, classroomId:1, name:"Camila Torres", styleKey:"visual", progress:91, status:"active" },
    { id:2, classroomId:1, name:"Daniel L\u00f3pez", styleKey:"kinesthetic", progress:76, status:"needs-help" },
    { id:3, classroomId:1, name:"Mar\u00eda Gonz\u00e1lez", styleKey:"auditory", progress:96, status:"active" },
    { id:4, classroomId:1, name:"Jos\u00e9 Mart\u00ednez", styleKey:"visual", progress:82, status:"active" },
    { id:5, classroomId:1, name:"Sof\u00eda Ram\u00edrez", styleKey:"kinesthetic", progress:68, status:"needs-help" },
    { id:6, classroomId:1, name:"Luis Fern\u00e1ndez", styleKey:"auditory", progress:89, status:"active" },

    { id:7, classroomId:2, name:"Valentina Cruz", styleKey:"auditory", progress:94, status:"active" },
    { id:8, classroomId:2, name:"Andr\u00e9s Morales", styleKey:"visual", progress:88, status:"active" },
    { id:9, classroomId:2, name:"Renata Ortiz", styleKey:"kinesthetic", progress:71, status:"needs-help" },

    { id:10, classroomId:3, name:"Emiliano Rojas", styleKey:"kinesthetic", progress:80, status:"active" },
    { id:11, classroomId:3, name:"Paula Herrera", styleKey:"visual", progress:65, status:"needs-help" },
    { id:12, classroomId:3, name:"Mateo Silva", styleKey:"auditory", progress:77, status:"active" }

];

/* ======================================================
        FUTURO: CARGA REAL DESDE SUPABASE
====================================================== */

async function loadClassrooms(){

    // TODO: reemplazar por consulta real, por ejemplo:
    // const { data, error } = await db
    //     .from("classrooms")
    //     .select("id, name, avg_progress, color, attendance, participation, assignments, engagement, learning_styles")
    //     .eq("teacher_id", currentUserId);
    //
    // if(error){ console.error("Error cargando classrooms:", error); return; }
    // classrooms = data;

    return classrooms;

}

async function loadStudents(){

    // TODO: reemplazar por consulta real, por ejemplo:
    // const { data, error } = await db
    //     .from("students")
    //     .select("id, classroom_id, name, learning_style_key, progress, status")
    //     .in("classroom_id", classrooms.map(c => c.id));
    //
    // if(error){ console.error("Error cargando estudiantes:", error); return; }
    // students = data;

    return students;

}

/* ======================================================
                STATE
====================================================== */

let selectedClassroomId = classrooms[0].id;

let studentSearchTerm = "";

let studentStatusFilter = "all";

let visibleStudentCount = 6;

function getSelectedClassroom(){

    return classrooms.find((c) => c.id === selectedClassroomId);

}

function getInitials(name){

    return name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .substring(0,2)
        .toUpperCase();

}

function ringColorFor(progress){

    if(progress >= 85){ return "#22C55E"; }

    if(progress >= 70){ return "#00D4FF"; }

    return "#F59E0B";

}

/* ======================================================
                RENDER: CLASSROOMS ROW
====================================================== */

const classroomsRow = document.getElementById("classroomsRow");

function renderClassrooms(){

    classroomsRow.innerHTML = "";

    if(classrooms.length === 0){

        classroomsRow.innerHTML = `<div class="grid-empty">${t("noClassrooms")}</div>`;

        return;

    }

    classrooms.forEach((room) => {

        const roomStudents = students.filter((s) => s.classroomId === room.id);

        const needHelp = roomStudents.filter((s) => s.status === "needs-help").length;

        const topStudents = roomStudents.filter((s) => s.progress >= 90).length;

        const card = document.createElement("div");

        card.classList.add("classroom-card");

        if(room.id === selectedClassroomId){

            card.classList.add("selected");

        }

        card.style.setProperty("--card-color", room.color);

        card.innerHTML = `
            <button class="classroom-delete-btn" data-room="${room.id}" title="${t("deleteClassroom")}">
                <i data-lucide="trash-2"></i>
            </button>
            <span class="classroom-badge">${room.status === "active" ? t("active").toUpperCase() : room.status.toUpperCase()}</span>
            <div class="classroom-card-top">
                <div>
                    <div class="classroom-name">${room.name}</div>
                    <div class="classroom-type">${t("homeroom")}</div>
                </div>
                <div class="classroom-ring" style="--pct:${room.avgProgress};">
                    <div class="classroom-ring-inner">${room.avgProgress}%</div>
                </div>
            </div>
            <div class="classroom-planet">
                <i data-lucide="graduation-cap"></i>
            </div>
            <div class="classroom-stats-row">
                <div class="classroom-stat">
                    <i data-lucide="users"></i>
                    <strong>${roomStudents.length}</strong>
                    ${t("students")}
                </div>
                <div class="classroom-stat">
                    <i data-lucide="star"></i>
                    <strong>${topStudents}</strong>
                    ${t("top")}
                </div>
                <div class="classroom-stat warn">
                    <i data-lucide="triangle-alert"></i>
                    <strong>${needHelp}</strong>
                    ${t("needHelp")}
                </div>
            </div>
            <button class="enter-classroom-btn" data-room="${room.id}">
                ${t("enterClassroom")}
                <i data-lucide="arrow-right"></i>
            </button>
        `;

        card.addEventListener("click", () => {

            selectedClassroomId = room.id;

            visibleStudentCount = 6;

            renderAll();

        });

        classroomsRow.appendChild(card);

    });

    classroomsRow.querySelectorAll(".enter-classroom-btn").forEach((btn) => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            selectedClassroomId = Number(btn.dataset.room);

            visibleStudentCount = 6;

            renderAll();

            document.querySelector(".inside-classroom-header").scrollIntoView({ behavior:"smooth", block:"start" });

        });

    });

    classroomsRow.querySelectorAll(".classroom-delete-btn").forEach((btn) => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            const roomId = Number(btn.dataset.room);

            const room = classrooms.find((c) => c.id === roomId);

            openConfirmModal(

                t("confirmDeleteClassroomTitle"),

                t("confirmDeleteClassroomMsg")(room.name),

                () => {

                    classrooms = classrooms.filter((c) => c.id !== roomId);

                    students = students.filter((s) => s.classroomId !== roomId);

                    if(selectedClassroomId === roomId){

                        selectedClassroomId = classrooms.length > 0 ? classrooms[0].id : null;

                    }

                    visibleStudentCount = 6;

                    renderAll();

                }

            );

        });

    });

    refreshIcons();

}

document.getElementById("classroomsNext").addEventListener("click", () => {

    classroomsRow.scrollBy({ left:270, behavior:"smooth" });

});

/* ======================================================
                RENDER: CLASSROOM SELECT (preview panel)
====================================================== */

const classroomSelect = document.getElementById("classroomSelect");

function renderClassroomSelect(){

    classroomSelect.innerHTML = classrooms
        .map((room) => `<option value="${room.id}">${room.name}</option>`)
        .join("");

    classroomSelect.value = selectedClassroomId;

}

classroomSelect.addEventListener("change", () => {

    selectedClassroomId = Number(classroomSelect.value);

    visibleStudentCount = 6;

    renderAll();

});

/* ======================================================
                RENDER: PREVIEW ILLUSTRATION (asientos)
====================================================== */

const previewIllustration = document.getElementById("previewIllustration");

function badgeForStudent(student, index){

    if(student.progress >= 90){ return "star"; }

    if(student.status === "needs-help"){ return "warning"; }

    if(index % 3 === 0){ return "chat"; }

    return "check";

}

function renderPreviewIllustration(room, roomStudents){

    const totalDesks = 12;

    const cols = 4;

    const deskW = 46;

    const deskH = 16;

    const colGap = 14;

    const rowGap = 40;

    const colWidth = deskW + colGap;

    const startX = (460 - (cols * colWidth - colGap)) / 2;

    const startY = 150;

    let deskMarkup = "";

    for(let i = 0; i < totalDesks; i++){

        const row = Math.floor(i / cols);

        const col = i % cols;

        const x = startX + col * colWidth;

        const y = startY + row * (deskH + rowGap);

        const student = roomStudents[i];

        const badgeCx = x + deskW - 3;

        const badgeCy = y - 20;

        let badgeSvg = "";

        if(student){

            const kind = badgeForStudent(student, i);

            const badgeColor =
                kind === "star" ? "#F59E0B" :
                kind === "warning" ? "#F59E0B" :
                kind === "chat" ? "#00D4FF" : "#22C55E";

            const iconSvg =
                kind === "star"
                ? `<path d="M ${badgeCx} ${badgeCy - 3.6} L ${badgeCx + 1} ${badgeCy - 0.8} L ${badgeCx + 3.8} ${badgeCy - 0.6} L ${badgeCx + 1.5} ${badgeCy + 1.1} L ${badgeCx + 2.3} ${badgeCy + 3.7} L ${badgeCx} ${badgeCy + 2.1} L ${badgeCx - 2.3} ${badgeCy + 3.7} L ${badgeCx - 1.5} ${badgeCy + 1.1} L ${badgeCx - 3.8} ${badgeCy - 0.6} L ${badgeCx - 1} ${badgeCy - 0.8} Z" style="fill:white;"></path>`
                : kind === "warning"
                ? `<path d="M ${badgeCx} ${badgeCy - 3.4} L ${badgeCx} ${badgeCy + 0.6}" style="stroke:white; stroke-width:1.5; stroke-linecap:round;"></path><circle cx="${badgeCx}" cy="${badgeCy + 3}" r="0.9" style="fill:white;"></circle>`
                : kind === "chat"
                ? `<circle cx="${badgeCx - 1.6}" cy="${badgeCy}" r="0.9" style="fill:white;"></circle><circle cx="${badgeCx}" cy="${badgeCy}" r="0.9" style="fill:white;"></circle><circle cx="${badgeCx + 1.6}" cy="${badgeCy}" r="0.9" style="fill:white;"></circle>`
                : `<path d="M ${badgeCx - 3.2} ${badgeCy} L ${badgeCx - 0.8} ${badgeCy + 2.6} L ${badgeCx + 3.4} ${badgeCy - 3}" style="fill:none; stroke:white; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round;"></path>`;

            badgeSvg = `
                <circle cx="${badgeCx}" cy="${badgeCy}" r="7" style="fill:${badgeColor}; stroke:var(--background); stroke-width:1.5;"></circle>
                ${iconSvg}
            `;

        }

        deskMarkup += `
            <g>
                <rect x="${x}" y="${y + 8}" width="${deskW}" height="${deskH}" rx="4"
                    style="fill:rgba(255,255,255,.15);"></rect>
                <rect x="${x}" y="${y + 3}" width="${deskW}" height="${deskH - 7}" rx="3"
                    style="fill:rgba(255,255,255,.28);"></rect>
                ${
                    student
                    ? `
                        <path d="M ${x + 7} ${y + 10} Q ${x + deskW / 2} ${y - 12} ${x + deskW - 7} ${y + 10} Z"
                            style="fill:url(#studentGrad);" opacity=".95"></path>
                        <circle cx="${x + deskW / 2}" cy="${y - 12}" r="7.5"
                            style="fill:url(#studentGrad);"></circle>
                        ${badgeSvg}
                    `
                    : `
                        <circle cx="${x + deskW / 2}" cy="${y - 6}" r="9"
                            style="fill:none; stroke:var(--primary); stroke-width:1.4; opacity:.5;" stroke-dasharray="3 3"></circle>
                        <path d="M ${x + deskW / 2 - 3.5} ${y - 6} h7 M ${x + deskW / 2} ${y - 9.5} v7"
                            style="stroke:var(--primary); stroke-width:1.4; opacity:.55; stroke-linecap:round;"></path>
                    `
                }
            </g>
        `;

    }

    previewIllustration.innerHTML = `
        <svg viewBox="0 0 460 340" xmlns="http://www.w3.org/2000/svg">

            <defs>
                <linearGradient id="studentGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" style="stop-color:var(--primary);"></stop>
                    <stop offset="1" style="stop-color:var(--secondary);"></stop>
                </linearGradient>
                <linearGradient id="boardGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" style="stop-color:var(--primary);"></stop>
                    <stop offset="1" style="stop-color:var(--secondary);"></stop>
                </linearGradient>
                <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" style="stop-color:var(--primary);"></stop>
                    <stop offset="1" style="stop-color:var(--secondary);"></stop>
                </linearGradient>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur"></feGaussianBlur>
                    <feMerge>
                        <feMergeNode in="blur"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            </defs>

            <!-- piso de la sala (fondo) -->
            <path d="M230 8 L440 78 L440 246 L230 316 L20 246 L20 78 Z"
                style="fill:rgba(255,255,255,.03);"></path>

            <!-- borde de ne\u00f3n de la sala -->
            <path d="M230 8 L440 78 L440 246 L230 316 L20 246 L20 78 Z"
                style="fill:none; stroke:url(#glowGrad); stroke-width:3; opacity:.85;" filter="url(#softGlow)"></path>

            <!-- pizarra central -->
            <rect x="150" y="46" width="160" height="60" rx="14"
                style="fill:rgba(10,12,30,.6); stroke:var(--border); stroke-width:1;"></rect>
            <rect x="166" y="60" width="26" height="26" rx="8" style="fill:url(#boardGrad);"></rect>
            <circle cx="179" cy="71" r="6" style="fill:rgba(255,255,255,.9);"></circle>
            <rect x="174" y="79" width="10" height="3.5" rx="1.7" style="fill:rgba(255,255,255,.9);"></rect>
            <text x="200" y="76" style="fill:var(--title); font-size:14px; font-weight:700; font-family:Poppins,sans-serif;">Thinking</text>
            <text x="200" y="92" style="fill:var(--text); font-size:8px; font-family:Poppins,sans-serif;">Learn smarter, think better.</text>

            <!-- estanteria + reloj (izquierda) -->
            <g>
                <rect x="140" y="60" width="34" height="30" rx="4"
                    style="fill:rgba(255,255,255,.08); stroke:var(--border); stroke-width:1;"></rect>
                <circle cx="157" cy="70" r="6" style="fill:none; stroke:var(--secondary); stroke-width:1.4;"></circle>
                <path d="M157 66 v4 l3 2" style="fill:none; stroke:var(--secondary); stroke-width:1.2; stroke-linecap:round;"></path>
                <rect x="144" y="80" width="4" height="7" style="fill:#F59E0B; opacity:.8;"></rect>
                <rect x="149" y="80" width="4" height="7" style="fill:var(--secondary); opacity:.8;"></rect>
                <rect x="154" y="80" width="4" height="7" style="fill:var(--primary); opacity:.8;"></rect>
                <rect x="159" y="80" width="4" height="7" style="fill:#22C55E; opacity:.8;"></rect>
                <rect x="164" y="80" width="4" height="7" style="fill:#F59E0B; opacity:.6;"></rect>
            </g>

            <!-- escritorio del profesor + planta (derecha) -->
            <g>
                <rect x="352" y="150" width="58" height="26" rx="5"
                    style="fill:rgba(255,255,255,.14); stroke:var(--border); stroke-width:1;"></rect>
                <rect x="364" y="138" width="30" height="16" rx="2" style="fill:#1a1f3a; stroke:var(--secondary); stroke-width:1;"></rect>
                <rect x="366" y="140" width="26" height="10" rx="1" style="fill:var(--secondary); opacity:.35;"></rect>
                <rect x="416" y="160" width="22" height="16" rx="4" style="fill:rgba(255,255,255,.14);"></rect>
                <path d="M427 160 C 415 155, 413 138, 427 132 C 431 143, 431 152, 427 160 Z" style="fill:#22C55E; opacity:.6;"></path>
                <path d="M427 160 C 439 154, 442 140, 427 134 C 424 145, 424 152, 427 160 Z" style="fill:#22C55E; opacity:.85;"></path>
            </g>

            <!-- escritorios y estudiantes -->
            ${deskMarkup}

            <!-- leyenda -->
            <g>
                <circle cx="46" cy="322" r="6" style="fill:#22C55E;"></circle>
                <path d="M43.2 322 L45.6 324.6 L49.4 320" style="fill:none; stroke:white; stroke-width:1.4; stroke-linecap:round; stroke-linejoin:round;"></path>
                <text x="56" y="325" style="fill:var(--title); font-size:9px; font-family:Poppins,sans-serif;">${t("onTrack")}</text>

                <circle cx="140" cy="322" r="6" style="fill:#F59E0B;"></circle>
                <path d="M137.2 322 L138.6 319.9 L141.4 319.9 L142.8 322 L141.4 324.1 L138.6 324.1 Z" style="fill:white; opacity:0;"></path>
                <text x="150" y="325" style="fill:var(--title); font-size:9px; font-family:Poppins,sans-serif;">${t("topPerformer")}</text>

                <circle cx="242" cy="322" r="6" style="fill:#F59E0B;"></circle>
                <path d="M242 319.6 L242 323" style="stroke:white; stroke-width:1.3; stroke-linecap:round;"></path>
                <circle cx="242" cy="325" r="0.8" style="fill:white;"></circle>
                <text x="252" y="325" style="fill:var(--title); font-size:9px; font-family:Poppins,sans-serif;">${t("needsHelp")}</text>

                <circle cx="332" cy="322" r="6" style="fill:#00D4FF;"></circle>
                <text x="342" y="325" style="fill:var(--title); font-size:9px; font-family:Poppins,sans-serif;">${t("usingAI")}</text>
            </g>

        </svg>
    `;

}

/* ======================================================
                RENDER: QUICK STATS
====================================================== */

const quickStatsGrid = document.getElementById("quickStatsGrid");

function renderQuickStats(room){

    const stats = [
        { label:t("attendance"), value:room.attendance },
        { label:t("participation"), value:room.participation },
        { label:t("assignments"), value:room.assignments },
        { label:t("engagement"), value:room.engagement }
    ];

    quickStatsGrid.innerHTML = stats.map((stat) => `
        <div class="quick-stat up">
            <span>${stat.label}</span>
            <strong>${stat.value}%</strong>
        </div>
    `).join("");

}

/* ======================================================
                RENDER: LEARNING STYLES DONUT
====================================================== */

const learningDonut = document.getElementById("learningDonut");

const learningLegend = document.getElementById("learningLegend");

function renderLearningDonut(room){

    const { visual, auditory, kinesthetic } = room.learningStyles;

    learningDonut.style.setProperty("--visual-end", `${visual}%`);

    learningDonut.style.setProperty("--auditory-end", `${visual + auditory}%`);

    learningLegend.innerHTML = `
        <li><span class="legend-dot" style="background:#A855F7;"></span> ${t("visual")} <strong>${visual}%</strong></li>
        <li><span class="legend-dot" style="background:#5B8CFF;"></span> ${t("auditory")} <strong>${auditory}%</strong></li>
        <li><span class="legend-dot" style="background:#22C55E;"></span> ${t("kinesthetic")} <strong>${kinesthetic}%</strong></li>
    `;

}

/* ======================================================
                RENDER: STUDENTS GRID
====================================================== */

const studentsGrid = document.getElementById("studentsGrid");

const insideClassName = document.getElementById("insideClassName");

const insideCount = document.getElementById("insideCount");

const viewMoreBtn = document.getElementById("viewMoreBtn");

let activeView = "grid";

function renderStudentsGrid(){

    const room = getSelectedClassroom();

    if(!room){

        studentsGrid.innerHTML = `<div class="grid-empty">${t("noClassrooms")}</div>`;

        viewMoreBtn.style.display = "none";

        return;

    }

    const allRoomStudents = students.filter((s) => s.classroomId === room.id);

    if(activeView !== "grid"){

        viewMoreBtn.style.display = "none";

        if(allRoomStudents.length === 0){

            studentsGrid.innerHTML = `<div class="grid-empty">${t("noStudentsYet")}</div>`;

            return;

        }

        if(activeView === "seats"){

            renderSeatsView(allRoomStudents);

        }
        else if(activeView === "timeline"){

            renderTimelineView(allRoomStudents);

        }
        else if(activeView === "analytics"){

            renderAnalyticsView(room, allRoomStudents);

        }

        return;

    }

    let roomStudents = students.filter((s) => s.classroomId === room.id);

    insideClassName.textContent = room.name;

    insideCount.textContent = `${roomStudents.length} ${t("students")}`;

    if(studentStatusFilter !== "all"){

        roomStudents = roomStudents.filter((s) => s.status === studentStatusFilter);

    }

    if(studentSearchTerm){

        roomStudents = roomStudents.filter((s) =>
            s.name.toLowerCase().includes(studentSearchTerm)
        );

    }

    studentsGrid.innerHTML = "";

    if(roomStudents.length === 0){

        studentsGrid.innerHTML = `<div class="grid-empty">${t("noMatch")}</div>`;

        viewMoreBtn.style.display = "none";

        return;

    }

    const visible = roomStudents.slice(0, visibleStudentCount);

    visible.forEach((student) => {

        const ringColor = ringColorFor(student.progress);

        const card = document.createElement("div");

        card.classList.add("student-card");

        card.innerHTML = `
            <div class="student-card-top">
                <div class="student-identity">
                    <div class="student-avatar">${getInitials(student.name)}</div>
                    <div>
                        <div class="student-name">${student.name}</div>
                        <div class="student-style">${t(student.styleKey)}</div>
                    </div>
                </div>
                <div class="student-ring" style="--pct:${student.progress}; --ring-color:${ringColor};">
                    <div class="student-ring-inner">${student.progress}%</div>
                </div>
            </div>
            <div class="student-progress-bar">
                <div class="student-progress-fill" style="width:${student.progress}%;"></div>
            </div>
            <div class="student-card-bottom">
                <span class="student-status ${student.status}">
                    <i data-lucide="circle"></i>
                    ${student.status === "active" ? t("active") : t("needsHelp")}
                    ${student.reviewed ? `<span class="reviewed-tag">\u2713 ${t("reviewedTag")}</span>` : ""}
                </span>
                <button class="student-menu-btn" data-id="${student.id}">
                    <i data-lucide="more-vertical"></i>
                </button>
            </div>
        `;

        studentsGrid.appendChild(card);

    });

    viewMoreBtn.style.display = roomStudents.length > visibleStudentCount ? "flex" : "none";

    // Men\u00fa de cada estudiante (kebab)

    const floatingMenu = document.getElementById("floatingStudentMenu");

    studentsGrid.querySelectorAll(".student-menu-btn").forEach((btn) => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            const wasOpenForThisBtn = floatingMenu.classList.contains("open") && floatingMenu.dataset.forId === btn.dataset.id;

            closeFloatingMenu();

            closeAllDropdowns();

            if(wasOpenForThisBtn){

                return;

            }

            const studentId = Number(btn.dataset.id);

            floatingMenu.dataset.forId = btn.dataset.id;

            floatingMenu.innerHTML = `
                <button class="dropdown-item" data-action="profile">
                    <i data-lucide="user-round"></i>
                    <span>${t("studentMenuProfile")}</span>
                </button>
                <button class="dropdown-item" data-action="message">
                    <i data-lucide="message-circle"></i>
                    <span>${t("studentMenuMessage")}</span>
                </button>
                <button class="dropdown-item" data-action="reviewed">
                    <i data-lucide="check-circle"></i>
                    <span>${t("studentMenuReviewed")}</span>
                </button>
                <button class="dropdown-item delete-student-item" data-action="delete">
                    <i data-lucide="trash-2"></i>
                    <span>${t("deleteStudent")}</span>
                </button>
            `;

            // El men\u00fa vive como hijo directo del <body> (ver HTML), as\u00ed que
            // position:fixed aqu\u00ed SIEMPRE es relativo al viewport \u2014 ya no
            // puede quedar atrapado por el transform:translateY() que la
            // tarjeta del estudiante aplica en :hover (esa era la causa real
            // de que el men\u00fa apareciera arriba a la izquierda).

            positionFixedPanel(floatingMenu, btn);

            floatingMenu.classList.add("open");

            refreshIcons();

            floatingMenu.querySelectorAll(".dropdown-item").forEach((item) => {

                item.addEventListener("click", (ev) => {

                    ev.stopPropagation();

                    const student = students.find((s) => s.id === studentId);

                    const action = item.dataset.action;

                    closeFloatingMenu();

                    if(action === "profile"){

                        openProfileViewModal(student);

                    }
                    else if(action === "message"){

                        openMessageModal(student);

                    }
                    else if(action === "reviewed"){

                        student.reviewed = true;

                        renderStudentsGrid();

                        showToast(t("reviewedToast")(student.name), "check-circle");

                    }
                    else if(action === "delete"){

                        openConfirmModal(

                            t("confirmDeleteStudentTitle"),

                            t("confirmDeleteStudentMsg")(student.name),

                            () => {

                                students = students.filter((s) => s.id !== studentId);

                                renderAll();

                            }

                        );

                    }

                });

            });

        });

    });

    refreshIcons();

}

/* ======================================================
                MEN\u00da FLOTANTE GLOBAL: posici\u00f3n y cierre
====================================================== */

function closeFloatingMenu(){

    const floatingMenu = document.getElementById("floatingStudentMenu");

    floatingMenu.classList.remove("open");

}

function positionFixedPanel(panel, anchorBtn){

    const rect = anchorBtn.getBoundingClientRect();

    const estWidth = 220;

    const estHeight = 190;

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

document.addEventListener("click", closeFloatingMenu);

window.addEventListener("scroll", closeFloatingMenu, true);

document.getElementById("studentSearch").addEventListener("input", (e) => {

    studentSearchTerm = e.target.value.toLowerCase().trim();

    visibleStudentCount = 6;

    renderStudentsGrid();

});

viewMoreBtn.addEventListener("click", () => {

    visibleStudentCount += 6;

    renderStudentsGrid();

});

/* ======================================================
                VIEW TABS (Grid / Seats / Timeline / Analytics)
====================================================== */

const viewTabs = document.querySelectorAll(".view-tab");

viewTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        viewTabs.forEach((tb) => tb.classList.remove("active"));

        tab.classList.add("active");

        activeView = tab.dataset.view;

        renderStudentsGrid();

    });

});

/* ======================================================
                CLASSROOM SEARCH (topbar)
====================================================== */

document.getElementById("classroomSearch").addEventListener("input", (e) => {

    const term = e.target.value.toLowerCase().trim();

    document.querySelectorAll(".classroom-card").forEach((card) => {

        const text = card.textContent.toLowerCase();

        card.style.display = text.includes(term) ? "block" : "none";

    });

});

/* ======================================================
                CREATE CLASSROOM MODAL
====================================================== */

const classroomModalOverlay = document.getElementById("classroomModalOverlay");

const classroomForm = document.getElementById("classroomForm");

const classroomNameInput = document.getElementById("classroomNameInput");

const colorButtons = document.querySelectorAll(".color-btn");

let selectedColor = "#7C5CFF";

function openClassroomModal(){

    classroomForm.reset();

    selectedColor = "#7C5CFF";

    colorButtons.forEach((btn) => {

        btn.classList.toggle("active", btn.dataset.color === selectedColor);

    });

    classroomModalOverlay.classList.add("open");

    classroomNameInput.focus();

}

function closeClassroomModal(){

    classroomModalOverlay.classList.remove("open");

}

document.getElementById("createClassroomBtn").addEventListener("click", openClassroomModal);

document.getElementById("modalCloseBtn").addEventListener("click", closeClassroomModal);

document.getElementById("modalCancelBtn").addEventListener("click", closeClassroomModal);

classroomModalOverlay.addEventListener("click", (e) => {

    if(e.target === classroomModalOverlay){

        closeClassroomModal();

    }

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        closeClassroomModal();

    }

});

colorButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        colorButtons.forEach((b) => b.classList.remove("active"));

        btn.classList.add("active");

        selectedColor = btn.dataset.color;

    });

});

classroomForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = classroomNameInput.value.trim();

    if(!name){

        return;

    }

    // TODO: cuando conectes Supabase, reemplaza este push local
    // por un insert real en la tabla "classrooms" con teacher_id: currentUserId.

    const newRoom = {
        id: Date.now(),
        name,
        avgProgress:0,
        color:selectedColor,
        status:"active",
        attendance:0,
        participation:0,
        assignments:0,
        engagement:0,
        activity:{ quizzes:0, discussions:0, aiInteractions:0 },
        learningStyles:{ visual:34, auditory:33, kinesthetic:33 }
    };

    classrooms.push(newRoom);

    selectedClassroomId = newRoom.id;

    visibleStudentCount = 6;

    closeClassroomModal();

    renderAll();

});

/* ======================================================
                RENDER ALL (helper central)
====================================================== */

function renderAll(){

    renderClassrooms();

    const room = getSelectedClassroom();

    if(!room){

        classroomSelect.innerHTML = "";

        previewIllustration.innerHTML = "";

        quickStatsGrid.innerHTML = "";

        learningLegend.innerHTML = "";

        learningDonut.style.setProperty("--visual-end", "0%");

        learningDonut.style.setProperty("--auditory-end", "0%");

        insideClassName.textContent = "";

        insideCount.textContent = "";

        studentsGrid.innerHTML = `<div class="grid-empty">${t("noClassrooms")}</div>`;

        viewMoreBtn.style.display = "none";

        return;

    }

    const roomStudents = students.filter((s) => s.classroomId === room.id);

    renderClassroomSelect();

    renderPreviewIllustration(room, roomStudents);

    renderQuickStats(room);

    renderLearningDonut(room);

    renderStudentsGrid();

}

/* ======================================================
                ADD STUDENT MODAL
====================================================== */

const studentModalOverlay = document.getElementById("studentModalOverlay");

const studentForm = document.getElementById("studentForm");

const studentNameInput = document.getElementById("studentNameInput");

const studentStyleSelect = document.getElementById("studentStyleSelect");

const studentProgressInput = document.getElementById("studentProgressInput");

const studentStatusOptions = document.querySelectorAll("#studentStatusOptions .priority-btn");

let selectedStudentStatus = "active";

function openStudentModal(){

    studentForm.reset();

    studentProgressInput.value = 75;

    selectedStudentStatus = "active";

    studentStatusOptions.forEach((btn) => {

        btn.classList.toggle("active", btn.dataset.status === "active");

    });

    studentModalOverlay.classList.add("open");

    studentNameInput.focus();

}

function closeStudentModal(){

    studentModalOverlay.classList.remove("open");

}

document.getElementById("addStudentBtn").addEventListener("click", () => {

    if(!getSelectedClassroom()){

        return;

    }

    openStudentModal();

});

document.getElementById("studentModalCloseBtn").addEventListener("click", closeStudentModal);

document.getElementById("studentModalCancelBtn").addEventListener("click", closeStudentModal);

studentModalOverlay.addEventListener("click", (e) => {

    if(e.target === studentModalOverlay){

        closeStudentModal();

    }

});

studentStatusOptions.forEach((btn) => {

    btn.addEventListener("click", () => {

        studentStatusOptions.forEach((b) => b.classList.remove("active"));

        btn.classList.add("active");

        selectedStudentStatus = btn.dataset.status;

    });

});

studentForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = studentNameInput.value.trim();

    if(!name){

        return;

    }

    const room = getSelectedClassroom();

    if(!room){

        return;

    }

    // TODO: cuando conectes Supabase, reemplaza este push local
    // por un insert real en la tabla "students" con classroom_id: room.id.

    students.push({
        id: Date.now(),
        classroomId: room.id,
        name,
        styleKey: studentStyleSelect.value,
        progress: Math.min(100, Math.max(0, parseInt(studentProgressInput.value, 10) || 0)),
        status: selectedStudentStatus
    });

    visibleStudentCount = Math.max(visibleStudentCount, 6);

    closeStudentModal();

    renderAll();

});

/* ======================================================
                GENERIC CONFIRM MODAL
    (usado para borrar salones y estudiantes)
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

    if(pendingConfirmAction){

        pendingConfirmAction();

    }

    closeConfirmModal();

});

confirmCancelBtn.addEventListener("click", closeConfirmModal);

confirmModalCloseBtn.addEventListener("click", closeConfirmModal);

confirmModalOverlay.addEventListener("click", (e) => {

    if(e.target === confirmModalOverlay){

        closeConfirmModal();

    }

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        closeStudentModal();

        closeConfirmModal();

        closeMessageModal();

        closeProfileViewModal();

        closeInviteModal();

    }

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
                VIEW PROFILE MODAL
====================================================== */

const profileViewModalOverlay = document.getElementById("profileViewModalOverlay");

const profileViewBody = document.getElementById("profileViewBody");

function openProfileViewModal(student){

    const room = getSelectedClassroom();

    profileViewBody.innerHTML = `
        <div style="display:flex; align-items:center; gap:14px; margin-bottom:18px;">
            <div class="student-avatar" style="width:56px; height:56px; font-size:17px;">${getInitials(student.name)}</div>
            <div>
                <div style="color:var(--title); font-weight:700; font-size:16px;">${student.name}</div>
                <div style="color:var(--secondary); font-size:13px;">${t(student.styleKey)}</div>
            </div>
        </div>
        <div class="modal-field">
            <label>${t("profileProgress")}</label>
            <div class="student-progress-bar"><div class="student-progress-fill" style="width:${student.progress}%;"></div></div>
        </div>
        <div class="modal-field">
            <label>${t("profileStatus")}</label>
            <span class="student-status ${student.status}">
                <i data-lucide="circle"></i>
                ${student.status === "active" ? t("active") : t("needsHelp")}
                ${student.reviewed ? `<span class="reviewed-tag">\u2713 ${t("reviewedTag")}</span>` : ""}
            </span>
        </div>
    `;

    refreshIcons();

    profileViewModalOverlay.classList.add("open");

}

function closeProfileViewModal(){

    profileViewModalOverlay.classList.remove("open");

}

document.getElementById("profileViewCloseBtn").addEventListener("click", closeProfileViewModal);

document.getElementById("profileViewOkBtn").addEventListener("click", closeProfileViewModal);

profileViewModalOverlay.addEventListener("click", (e) => {

    if(e.target === profileViewModalOverlay){

        closeProfileViewModal();

    }

});

/* ======================================================
                MESSAGE PARENT MODAL
====================================================== */

const messageModalOverlay = document.getElementById("messageModalOverlay");

const messageModalTitle = document.getElementById("messageModalTitle");

const messageForm = document.getElementById("messageForm");

const messageTextarea = document.getElementById("messageTextarea");

const messageHistory = document.getElementById("messageHistory");

let messageTargetStudent = null;

function renderMessageHistory(student){

    if(!student.messages || student.messages.length === 0){

        messageHistory.innerHTML = `<p style="font-size:12px; color:var(--text);">${t("noMessagesYet")}</p>`;

        return;

    }

    messageHistory.innerHTML = student.messages.map((m) => `
        <div class="message-bubble">
            <p>${m.text}</p>
            <span>${m.date}</span>
        </div>
    `).join("");

    messageHistory.scrollTop = messageHistory.scrollHeight;

}

function openMessageModal(student){

    messageTargetStudent = student;

    messageModalTitle.textContent = t("conversationWith")(student.name);

    messageForm.reset();

    renderMessageHistory(student);

    messageModalOverlay.classList.add("open");

    messageTextarea.focus();

}

function closeMessageModal(){

    messageModalOverlay.classList.remove("open");

}

document.getElementById("messageModalCloseBtn").addEventListener("click", closeMessageModal);

document.getElementById("messageCancelBtn").addEventListener("click", closeMessageModal);

messageModalOverlay.addEventListener("click", (e) => {

    if(e.target === messageModalOverlay){

        closeMessageModal();

    }

});

messageForm.addEventListener("submit", (e) => {

    e.preventDefault();

    // TODO: cuando tengas backend, aqu\u00ed va el env\u00edo real
    // (correo, notificaci\u00f3n push, etc.) y el insert en una tabla
    // "messages" de Supabase (student_id, teacher_id, text, created_at).

    if(!messageTargetStudent.messages){

        messageTargetStudent.messages = [];

    }

    messageTargetStudent.messages.push({

        text: messageTextarea.value.trim(),

        date: new Date().toLocaleString(currentLang === "es" ? "es-ES" : "en-US", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" })

    });

    renderMessageHistory(messageTargetStudent);

    messageTextarea.value = "";

    showToast(t("messageSentToast")(messageTargetStudent.name), "send");

});

/* ======================================================
                VISTAS: SEATS / TIMELINE / ANALYTICS
====================================================== */

function renderSeatsView(roomStudents){

    const totalSeats = Math.max(roomStudents.length, 12);

    let html = `<div class="seats-grid">`;

    for(let i = 0; i < totalSeats; i++){

        const student = roomStudents[i];

        if(student){

            const ringColor = ringColorFor(student.progress);

            html += `
                <div class="seat-card">
                    <div class="classroom-ring" style="--pct:${student.progress}; --card-color:${ringColor};">
                        <div class="classroom-ring-inner">${student.progress}%</div>
                    </div>
                    <div class="seat-name">${student.name}</div>
                    <span class="seat-badge ${student.status}">${student.status === "active" ? t("active") : t("needsHelp")}</span>
                </div>
            `;

        }
        else{

            html += `
                <div class="seat-card" style="opacity:.4;">
                    <div class="classroom-ring" style="--pct:0; --card-color:var(--border);">
                        <div class="classroom-ring-inner">+</div>
                    </div>
                    <div class="seat-name">${t("seatEmpty")}</div>
                </div>
            `;

        }

    }

    html += `</div>`;

    studentsGrid.innerHTML = html;

    refreshIcons();

}

function renderTimelineView(roomStudents){

    const sorted = [...roomStudents].sort((a, b) => b.progress - a.progress);

    let html = `<div class="timeline-view">`;

    sorted.forEach((student, i) => {

        html += `
            <div class="timeline-row">
                <div class="timeline-rank">${i + 1}</div>
                <div class="timeline-row-name">${student.name}</div>
                <div class="timeline-row-bar">
                    <div class="timeline-row-fill" style="width:${student.progress}%; background:${ringColorFor(student.progress) === "#22C55E" ? "linear-gradient(90deg,#22C55E,#00D4FF)" : ringColorFor(student.progress) === "#00D4FF" ? "linear-gradient(90deg,var(--primary),var(--secondary))" : "linear-gradient(90deg,#F59E0B,#F43F5E)"};"></div>
                </div>
                <div class="timeline-row-pct">${student.progress}%</div>
            </div>
        `;

    });

    html += `</div>`;

    studentsGrid.innerHTML = html;

}

function renderAnalyticsView(room, roomStudents){

    const avg = roomStudents.length
        ? Math.round(roomStudents.reduce((sum, s) => sum + s.progress, 0) / roomStudents.length)
        : 0;

    const onTrack = roomStudents.filter((s) => s.status === "active").length;

    const needsHelp = roomStudents.filter((s) => s.status === "needs-help").length;

    const totalForBar = Math.max(onTrack + needsHelp, 1);

    const topStudent = [...roomStudents].sort((a, b) => b.progress - a.progress)[0];

    const { visual, auditory, kinesthetic } = room.learningStyles;

    studentsGrid.innerHTML = `
        <div class="analytics-view">

            <div class="analytics-card">
                <span>${t("analyticsAvgProgress")}</span>
                <strong>${avg}%</strong>
            </div>

            <div class="analytics-card">
                <span>${t("analyticsOnTrack")}</span>
                <strong>${onTrack} / ${needsHelp}</strong>
                <div class="analytics-bar-row">
                    <div class="analytics-bar-track">
                        <div class="analytics-bar-fill" style="width:${(onTrack/totalForBar*100)}%; background:#22C55E;"></div>
                    </div>
                </div>
            </div>

            <div class="analytics-card">
                <span>${t("analyticsTopPerformer")}</span>
                <strong style="font-size:15px;">${topStudent ? topStudent.name : "\u2014"}</strong>
            </div>

            <div class="analytics-card">
                <span>${t("analyticsStyleBreakdown")}</span>
                <div class="analytics-bar-row"><span style="width:60px;">${t("visual")}</span>
                    <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:${visual}%; background:#A855F7;"></div></div>
                    <span>${visual}%</span>
                </div>
                <div class="analytics-bar-row"><span style="width:60px;">${t("auditory")}</span>
                    <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:${auditory}%; background:#5B8CFF;"></div></div>
                    <span>${auditory}%</span>
                </div>
                <div class="analytics-bar-row"><span style="width:60px;">${t("kinesthetic")}</span>
                    <div class="analytics-bar-track"><div class="analytics-bar-fill" style="width:${kinesthetic}%; background:#22C55E;"></div></div>
                    <span>${kinesthetic}%</span>
                </div>
            </div>

        </div>
    `;

}

/* ======================================================
                INVITE LINK MODAL
    Genera un link \u00fanico por sal\u00f3n para que los estudiantes
    se registren y se les asigne el sal\u00f3n autom\u00e1ticamente.

    IMPORTANTE: esto solo genera y copia el link. Para que
    funcione de verdad, tu p\u00e1gina de registro de estudiante
    (REGISTER-Student) debe leer el par\u00e1metro ?classroom=
    de la URL con `new URLSearchParams(window.location.search)`
    y guardar ese valor como classroom_id al crear al
    estudiante en Supabase. Si me pasas ese archivo, te ayudo
    a conectarlo.
====================================================== */

const inviteModalOverlay = document.getElementById("inviteModalOverlay");

const inviteLinkInput = document.getElementById("inviteLinkInput");

function buildInviteLink(room){

    // TODO: reemplaza este origin/ruta por la URL real de tu
    // p\u00e1gina de registro de estudiante en GitHub Pages, ej:
    // "https://irvingacost34.github.io/Thinking/REGISTER-Student/Register.html"

    const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, "REGISTER-Student/Register.html");

    const code = room.name.replace(/\s+/g, "").toUpperCase();

    return `${baseUrl}?classroom=${room.id}&code=${code}`;

}

function openInviteModal(){

    const room = getSelectedClassroom();

    if(!room){

        return;

    }

    inviteLinkInput.value = buildInviteLink(room);

    inviteModalOverlay.classList.add("open");

}

function closeInviteModal(){

    inviteModalOverlay.classList.remove("open");

}

document.getElementById("inviteLinkBtn").addEventListener("click", openInviteModal);

document.getElementById("inviteModalCloseBtn").addEventListener("click", closeInviteModal);

document.getElementById("inviteModalCloseBtn2").addEventListener("click", closeInviteModal);

inviteModalOverlay.addEventListener("click", (e) => {

    if(e.target === inviteModalOverlay){

        closeInviteModal();

    }

});

document.getElementById("copyInviteBtn").addEventListener("click", () => {

    inviteLinkInput.select();

    inviteLinkInput.setSelectionRange(0, 99999);

    let copied = false;

    try{

        if(navigator.clipboard && navigator.clipboard.writeText){

            navigator.clipboard.writeText(inviteLinkInput.value);

            copied = true;

        }

    }
    catch(err){

        copied = false;

    }

    if(!copied){

        try{

            document.execCommand("copy");

            copied = true;

        }
        catch(err){

            copied = false;

        }

    }

    showToast(t("linkCopiedToast"), "copy");

});

/* ======================================================
                INITIALIZE
====================================================== */

async function init(){

    if(db){

        try{

            const { data:{ session } } = await db.auth.getSession();

            if(session){

                currentUserId = session.user.id;

            }

        }
        catch(err){

            console.warn("Supabase no disponible en este entorno, usando datos de ejemplo.", err);

        }

    }

    await loadClassrooms();

    await loadStudents();

    applyStaticTranslations();

    renderAll();

    console.log("Thinking Teacher Students Screen Loaded \ud83d\ude80");

}

init();
