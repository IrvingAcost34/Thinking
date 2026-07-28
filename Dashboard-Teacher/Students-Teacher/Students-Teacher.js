/* ======================================================
                    THINKING
        TEACHER STUDENTS SCREEN — CODEPEN BUILD
    Corre standalone con datos de ejemplo. Cuando tengas
    las tablas reales en Supabase, reemplaza el cuerpo de
    loadClassrooms() y loadStudents() por los SELECT reales
    (los TODO ya est\u00e1n marcados m\u00e1s abajo).
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

if(window.lucide){

    lucide.createIcons();

}
else{

    console.warn("lucide no se carg\u00f3. Agr\u00e9galo en Settings > JS > Add External Scripts:\nhttps://unpkg.com/lucide@latest");

}

/* ======================================================
                    THEME
    (aplicamos la clase por JS, as\u00ed no depende de que
    el HTML panel tenga <body class="dark-theme">)
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
                DATOS DE EJEMPLO
    (misma forma que tendr\u00e1n las tablas reales
     "classrooms" y "students" en Supabase)
====================================================== */

let classrooms = [

    {
        id:1,
        name:"12A",
        type:"Homeroom",
        avgProgress:86,
        color:"#7C5CFF",
        status:"active",
        attendance:98,
        participation:95,
        assignments:87,
        engagement:91,
        learningStyles:{ visual:40, auditory:35, kinesthetic:25 }
    },
    {
        id:2,
        name:"12B",
        type:"Homeroom",
        avgProgress:92,
        color:"#00D4FF",
        status:"active",
        attendance:96,
        participation:93,
        assignments:90,
        engagement:88,
        learningStyles:{ visual:32, auditory:44, kinesthetic:24 }
    },
    {
        id:3,
        name:"11A",
        type:"Homeroom",
        avgProgress:79,
        color:"#22C55E",
        status:"active",
        attendance:94,
        participation:89,
        assignments:81,
        engagement:85,
        learningStyles:{ visual:28, auditory:30, kinesthetic:42 }
    }

];

let students = [

    { id:1, classroomId:1, name:"Camila Torres", style:"Visual Learner", progress:91, status:"active" },
    { id:2, classroomId:1, name:"Daniel L\u00f3pez", style:"Kinesthetic Learner", progress:76, status:"needs-help" },
    { id:3, classroomId:1, name:"Mar\u00eda Gonz\u00e1lez", style:"Auditory Learner", progress:96, status:"active" },
    { id:4, classroomId:1, name:"Jos\u00e9 Mart\u00ednez", style:"Visual Learner", progress:82, status:"active" },
    { id:5, classroomId:1, name:"Sof\u00eda Ram\u00edrez", style:"Kinesthetic Learner", progress:68, status:"needs-help" },
    { id:6, classroomId:1, name:"Luis Fern\u00e1ndez", style:"Auditory Learner", progress:89, status:"active" },

    { id:7, classroomId:2, name:"Valentina Cruz", style:"Auditory Learner", progress:94, status:"active" },
    { id:8, classroomId:2, name:"Andr\u00e9s Morales", style:"Visual Learner", progress:88, status:"active" },
    { id:9, classroomId:2, name:"Renata Ortiz", style:"Kinesthetic Learner", progress:71, status:"needs-help" },

    { id:10, classroomId:3, name:"Emiliano Rojas", style:"Kinesthetic Learner", progress:80, status:"active" },
    { id:11, classroomId:3, name:"Paula Herrera", style:"Visual Learner", progress:65, status:"needs-help" },
    { id:12, classroomId:3, name:"Mateo Silva", style:"Auditory Learner", progress:77, status:"active" }

];

/* ======================================================
        FUTURO: CARGA REAL DESDE SUPABASE
====================================================== */

async function loadClassrooms(){

    // TODO: reemplazar por consulta real, por ejemplo:
    // const { data, error } = await db
    //     .from("classrooms")
    //     .select("id, name, type, avg_progress, color, attendance, participation, assignments, engagement, learning_styles")
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
    //     .select("id, classroom_id, name, learning_style, progress, status")
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
            <span class="classroom-badge">${room.status.toUpperCase()}</span>
            <div class="classroom-card-top">
                <div>
                    <div class="classroom-name">${room.name}</div>
                    <div class="classroom-type">${room.type}</div>
                </div>
                <div class="classroom-ring" style="--pct:${room.avgProgress};">
                    <div class="classroom-ring-inner">${room.avgProgress}%</div>
                </div>
            </div>
            <div class="classroom-planet"></div>
            <div class="classroom-stats-row">
                <div class="classroom-stat">
                    <i data-lucide="users"></i>
                    <strong>${roomStudents.length}</strong>
                    Students
                </div>
                <div class="classroom-stat">
                    <i data-lucide="star"></i>
                    <strong>${topStudents}</strong>
                    Top
                </div>
                <div class="classroom-stat warn">
                    <i data-lucide="triangle-alert"></i>
                    <strong>${needHelp}</strong>
                    Need Help
                </div>
            </div>
            <button class="enter-classroom-btn">
                Enter Classroom
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

    if(window.lucide){ lucide.createIcons(); }

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
                RENDER: PREVIEW ILLUSTRATION (mini seats)
====================================================== */

const previewIllustration = document.getElementById("previewIllustration");

function renderPreviewIllustration(room, roomStudents){

    previewIllustration.innerHTML = "";

    const totalSeats = 24;

    for(let i = 0; i < totalSeats; i++){

        const seat = document.createElement("div");

        seat.classList.add("preview-seat");

        if(i < roomStudents.length){

            seat.classList.add("filled");

        }

        previewIllustration.appendChild(seat);

    }

}

/* ======================================================
                RENDER: QUICK STATS
====================================================== */

const quickStatsGrid = document.getElementById("quickStatsGrid");

function renderQuickStats(room){

    const stats = [
        { label:"Attendance", value:room.attendance },
        { label:"Participation", value:room.participation },
        { label:"Assignments", value:room.assignments },
        { label:"Engagement", value:room.engagement }
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
        <li><span class="legend-dot" style="background:#A855F7;"></span> Visual <strong>${visual}%</strong></li>
        <li><span class="legend-dot" style="background:#5B8CFF;"></span> Auditory <strong>${auditory}%</strong></li>
        <li><span class="legend-dot" style="background:#22C55E;"></span> Kinesthetic <strong>${kinesthetic}%</strong></li>
    `;

}

/* ======================================================
                RENDER: STUDENTS GRID
====================================================== */

const studentsGrid = document.getElementById("studentsGrid");

const insideClassName = document.getElementById("insideClassName");

const insideCount = document.getElementById("insideCount");

const viewMoreBtn = document.getElementById("viewMoreBtn");

function renderStudentsGrid(){

    const room = getSelectedClassroom();

    let roomStudents = students.filter((s) => s.classroomId === room.id);

    insideClassName.textContent = room.name;

    insideCount.textContent = `${roomStudents.length} Students`;

    if(studentSearchTerm){

        roomStudents = roomStudents.filter((s) =>
            s.name.toLowerCase().includes(studentSearchTerm)
        );

    }

    studentsGrid.innerHTML = "";

    if(roomStudents.length === 0){

        studentsGrid.innerHTML = `<div class="grid-empty">No students match your search yet.</div>`;

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
                        <div class="student-style">${student.style}</div>
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
                    ${student.status === "active" ? "Active" : "Needs Help"}
                </span>
                <button class="student-menu-btn">
                    <i data-lucide="more-vertical"></i>
                </button>
            </div>
        `;

        studentsGrid.appendChild(card);

    });

    viewMoreBtn.style.display = roomStudents.length > visibleStudentCount ? "flex" : "none";

    if(window.lucide){ lucide.createIcons(); }

}

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

        viewTabs.forEach((t) => t.classList.remove("active"));

        tab.classList.add("active");

        if(tab.dataset.view !== "grid"){

            studentsGrid.innerHTML = `
                <div class="grid-empty">
                    The "${tab.textContent.trim()}" view is coming soon.
                </div>
            `;

            viewMoreBtn.style.display = "none";

        }
        else{

            renderStudentsGrid();

        }

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
                CREATE CLASSROOM (placeholder)
====================================================== */

document.getElementById("createClassroomBtn").addEventListener("click", () => {

    // TODO: abrir modal real de creaci\u00f3n de classroom
    // y hacer un insert en la tabla "classrooms" de Supabase.

    alert("Create Classroom: connect this to your Supabase insert flow.");

});

/* ======================================================
                RENDER ALL (helper central)
====================================================== */

function renderAll(){

    const room = getSelectedClassroom();

    const roomStudents = students.filter((s) => s.classroomId === room.id);

    renderClassrooms();

    renderClassroomSelect();

    renderPreviewIllustration(room, roomStudents);

    renderQuickStats(room);

    renderLearningDonut(room);

    renderStudentsGrid();

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

            }

        }
        catch(err){

            console.warn("Supabase no disponible en este entorno, usando datos de ejemplo.", err);

        }

    }

    await loadClassrooms();

    await loadStudents();

    renderAll();

    console.log("Thinking Teacher Students Screen Loaded \ud83d\ude80");

}

init();
