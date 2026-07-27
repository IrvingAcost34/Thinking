// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";

const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

/* ======================================================
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
                    ELEMENTS
====================================================== */

const body = document.body;

const themeToggle = document.querySelector(".theme-toggle");

const toggleCircle = document.querySelector(".toggle-circle");

const appEl = document.querySelector(".app");

const mobileMenuBtn = document.getElementById("mobileMenuBtn");

const sidebarOverlay = document.getElementById("sidebarOverlay");

/* ======================================================
        MENÚ / SIDEBAR (siempre deslizable)
====================================================== */
// El botón de menú es SIEMPRE visible, en cualquier ancho de
// pantalla, y controla el mismo sidebar deslizable — esto evita
// depender de detectar si la pantalla es "móvil" o "escritorio".

function openSidebar(){
    appEl.classList.add("sidebar-open");
}

function closeSidebar(){
    appEl.classList.remove("sidebar-open");
}

function toggleSidebar(){

    if(appEl.classList.contains("sidebar-open")){
        closeSidebar();
    } else {
        openSidebar();
    }

}

if(mobileMenuBtn){
    mobileMenuBtn.addEventListener("click", toggleSidebar);
}

if(sidebarOverlay){
    sidebarOverlay.addEventListener("click", closeSidebar);
}

// Cierra el menú al tocar cualquier enlace dentro de él
document.querySelectorAll(".sidebar-menu a, .sidebar-footer a").forEach(link => {
    link.addEventListener("click", closeSidebar);
});

// Cierra el menú con la tecla Escape
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
        closeSidebar();
    }
});

/* ======================================================
                    THEME
====================================================== */

function enableDarkMode(){
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    toggleCircle.style.left = "10px";
}

function enableLightMode(){
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    toggleCircle.style.left = "48px";
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

console.log("Thinking Student Dashboard Loaded 🚀");

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
    document.getElementById("greeting").textContent = `Good Morning, ${nombre}`;

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
