// ======================================================
// SUPABASE
// ======================================================



/* 
const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";

const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
======================================================
                    LUCIDE ICONS
====================================================== */

lucide.createIcons();

/* ======================================================
                BOMBI MESSAGES
====================================================== */

const bombiMessages = [
    "Ready to help you learn today! 🚀",
    "Let's improve your learning style.",
    "Keep your learning streak alive! 🔥",
    "You're doing an amazing job!",
    "Learning every day makes you stronger.",
    "Let's complete today's mission!",
    "Need help? Ask me anything."
];

const bombiMessage = document.querySelector("#bombi-message");

let bombiIndex = 0;

setInterval(() => {

    bombiIndex++;

    if(bombiIndex >= bombiMessages.length){
        bombiIndex = 0;
    }

    bombiMessage.textContent = bombiMessages[bombiIndex];

}, 5000);

/* ======================================================
            SALUDO DINÁMICO DEL HERO
    1) Elige "Good Morning / Afternoon / Evening" según
       la hora real del dispositivo.
    2) Elige una frase distinta al azar cada vez que
       entras, para que no se sienta repetitivo.
====================================================== */

const heroSubtitles = [
    "Continue your learning journey and complete today's mission.",
    "Every lesson today gets you one step closer to your goal.",
    "Your streak is waiting for you — let's keep it alive!",
    "Small steps every day lead to big results.",
    "Ready to discover something new today?",
    "Let's make today count towards your next level."
];

function getTimeBasedGreeting(){

    const hour = new Date().getHours();

    if(hour < 12){
        return "Good Morning";
    }

    if(hour < 18){
        return "Good Afternoon";
    }

    return "Good Evening";

}

function applyRandomHeroSubtitle(){

    const heroSubtextEl = document.getElementById("hero-subtext");

    if(!heroSubtextEl){
        return;
    }

    const randomIndex = Math.floor(Math.random() * heroSubtitles.length);

    heroSubtextEl.textContent = heroSubtitles[randomIndex];

}

/* ======================================================
                    THEME (igual al Schedule)
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
    (idéntico mecanismo al de Student Schedule.js)
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

// Cierra el menú al tocar cualquier enlace dentro de él
document.querySelectorAll(".sidebar-menu a, .sidebar-footer a").forEach(link => {
    link.addEventListener("click", closeSidebar);
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
        closeSidebar();
    }
});

console.log("Thinking Student Dashboard Loaded 🚀");

/* ======================================================
                DROPDOWN DEL PERFIL
====================================================== */

const profileBtn = document.getElementById("profileBtn");

const profilePanel = document.getElementById("profilePanel");

profileBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    profilePanel.classList.toggle("open");

});

// Cierra el panel si le das clic a cualquier otro lado de la página
document.addEventListener("click", () => {

    profilePanel.classList.remove("open");

});

/* ======================================================
                LOGOUT REAL
====================================================== */

async function handleLogout(e){

    e.preventDefault();

    if(typeof db !== "undefined" && db.auth){

        await db.auth.signOut();

    }

    window.location.href = "../LOGIN-Student/STUDENT LOGIN.html";

}

document.getElementById("logoutBtn").addEventListener("click", handleLogout);

document.getElementById("logoutBtnSidebar").addEventListener("click", handleLogout);

// ======================================================
// STREAK HELPERS
// ======================================================

function getTodayDateString(){

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

function getYesterdayDateString(){

    const now = new Date();
    now.setDate(now.getDate() - 1);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

function calculateNewStreak(lastActivityDate, currentStreak){

    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    if(!lastActivityDate){
        return { newStreak: 1, shouldUpdate: true };
    }

    if(lastActivityDate === today){
        return { newStreak: currentStreak, shouldUpdate: false };
    }

    if(lastActivityDate === yesterday){
        return { newStreak: currentStreak + 1, shouldUpdate: true };
    }

    return { newStreak: 1, shouldUpdate: true };

}

// ======================================================
// LOAD USER DATA
// ======================================================

async function loadUserData(){

    const { data: { session }, error: sessionError } = await db.auth.getSession();

    console.log("SESSION:", session);

    if(sessionError){
        console.error(sessionError);
    }

    if(!session){
        console.log("No hay sesión");
        window.location.href = "../LOGIN-Student/STUDENT LOGIN.html";
        return;
    }

    const user = session.user;

    const { data, error } = await db
        .from("THINKING")
        .select("Nombre_Usuario, current_level, total_xp, progress_percent, study_streak, next_goal, achievements_count, last_activity_date")
        .eq("id", user.id)
        .single();

    if(error){
        console.error(error);
        return;
    }

    const nombre = data.Nombre_Usuario;

    document.getElementById("userName").textContent = nombre;
    document.getElementById("profileName").textContent = nombre;

    // Saludo dinámico: cambia según la hora real, y el
    // subtítulo de abajo rota entre varias frases.
    document.getElementById("greeting").textContent = `${getTimeBasedGreeting()}, ${nombre}`;

    applyRandomHeroSubtitle();

    const iniciales = nombre
        .split(" ")
        .map(p => p[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    document.getElementById("userAvatar").textContent = iniciales;

    const { newStreak, shouldUpdate } = calculateNewStreak(
        data.last_activity_date,
        data.study_streak ?? 0
    );

    if(shouldUpdate){

        const { error: updateError } = await db
            .from("THINKING")
            .update({
                study_streak: newStreak,
                last_activity_date: getTodayDateString()
            })
            .eq("id", user.id);

        if(updateError){
            console.error("Error actualizando racha:", updateError);
        }

    }

    const percent = data.progress_percent ?? 0;
    const level = data.current_level ?? 1;
    const xp = data.total_xp ?? 0;
    const streak = newStreak;
    const nextGoal = data.next_goal ?? "-";
    const achievements = data.achievements_count ?? 0;

    document.getElementById("stat-progress").textContent = `${percent}%`;
    document.getElementById("stat-progress-fill").style.width = `${percent}%`;
    document.getElementById("stat-streak").textContent = `${streak} Days`;
    document.getElementById("stat-xp").textContent = `${xp.toLocaleString()} XP`;
    document.getElementById("stat-achievements").textContent = achievements;

    document.getElementById("progress-number").textContent = `${percent}%`;
    document.getElementById("detail-level").textContent = level;
    document.getElementById("detail-xp").textContent = `${xp} XP`;
    document.getElementById("detail-streak").textContent = `${streak} Days 🔥`;
    document.getElementById("detail-next-goal").textContent = nextGoal;

    const circumference = 440;
    const offset = circumference - (percent / 100) * circumference;

    const progressCircle = document.querySelector(".circle-progress");

    if(progressCircle){

        progressCircle.style.strokeDashoffset = circumference;

        setTimeout(() => {
            progressCircle.style.transition = "2s";
            progressCircle.style.strokeDashoffset = offset;
        }, 500);

    }

}

loadUserData();
