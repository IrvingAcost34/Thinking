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
                    THINKING
            STUDENT DASHBOARD V1.0
====================================================== */

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

},5000);

/* ======================================================
                    ELEMENTS
====================================================== */

const body = document.body;

const themeToggle = document.querySelector(".theme-toggle");

const toggleCircle = document.querySelector(".toggle-circle");

/* ======================================================
                MOBILE SIDEBAR TOGGLE
====================================================== */
// FIX: el sidebar no tenía forma de ocultarse/mostrarse en
// pantallas angostas, por eso ocupaba espacio fijo siempre y
// aplastaba el contenido. Ahora se puede abrir/cerrar como menú
// deslizable en móvil.

const appEl = document.querySelector(".app");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openMobileSidebar(){
    appEl.classList.add("sidebar-open");
}

function closeMobileSidebar(){
    appEl.classList.remove("sidebar-open");
}

if(mobileMenuBtn){

    mobileMenuBtn.addEventListener("click", () => {

        if(appEl.classList.contains("sidebar-open")){
            closeMobileSidebar();
        } else {
            openMobileSidebar();
        }

    });

}

if(sidebarOverlay){

    sidebarOverlay.addEventListener("click", closeMobileSidebar);

}

// Cierra el menú automáticamente al tocar un enlace (útil en móvil)
document.querySelectorAll(".sidebar-menu a, .sidebar-footer a").forEach(link => {

    link.addEventListener("click", closeMobileSidebar);

});

/* ======================================================
                    THEME
====================================================== */

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

/* ======================================================
                THEME BUTTON
====================================================== */

themeToggle.addEventListener("click", () => {

    if(body.classList.contains("dark-theme")){

        enableLightMode();

    }

    else{

        enableDarkMode();

    }

});

/* ======================================================
                SAVE THEME
====================================================== */

function saveTheme(){

    if(body.classList.contains("dark-theme")){

        localStorage.setItem("thinking-theme","dark");

    }

    else{

        localStorage.setItem("thinking-theme","light");

    }

}

/* ======================================================
                LOAD THEME
====================================================== */

function loadTheme(){

    const savedTheme = localStorage.getItem("thinking-theme");

    if(savedTheme === "light"){

        enableLightMode();

    }

    else{

        enableDarkMode();

    }

}

/* ======================================================
            SAVE AUTOMATICALLY
====================================================== */

themeToggle.addEventListener("click", saveTheme);

/* ======================================================
                INITIALIZE
====================================================== */

loadTheme();

console.log("Thinking Student Dashboard Loaded 🚀");

// ======================================================
// STREAK HELPERS
// ======================================================

// Devuelve la fecha de hoy en formato YYYY-MM-DD (sin hora)
function getTodayDateString(){

    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

// Devuelve la fecha de ayer en formato YYYY-MM-DD
function getYesterdayDateString(){

    const now = new Date();

    now.setDate(now.getDate() - 1);

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

// Calcula la nueva racha comparando la última fecha guardada
function calculateNewStreak(lastActivityDate, currentStreak){

    const today = getTodayDateString();

    const yesterday = getYesterdayDateString();

    // Si no hay fecha guardada todavía, es la primera vez
    if(!lastActivityDate){

        return { newStreak: 1, shouldUpdate: true };

    }

    // Ya entró hoy antes, no cambiamos nada
    if(lastActivityDate === today){

        return { newStreak: currentStreak, shouldUpdate: false };

    }

    // Entró ayer, la racha sigue viva y sube +1
    if(lastActivityDate === yesterday){

        return { newStreak: currentStreak + 1, shouldUpdate: true };

    }

    // Se saltó uno o más días, la racha se reinicia
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
        window.location.href="../LOGIN-Student/STUDENT LOGIN.html";
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

    // Sidebar
    document.getElementById("userName").textContent = nombre;

    // Topbar
    document.getElementById("profileName").textContent = nombre;

    // Hero
    document.getElementById("greeting").textContent = `Good Morning, ${nombre}`;

    // Avatar
    const iniciales = nombre
        .split(" ")
        .map(p=>p[0])
        .join("")
        .substring(0,2)
        .toUpperCase();

    document.getElementById("userAvatar").textContent = iniciales;

    // ==================================================
    // CALCULATE REAL STREAK
    // ==================================================

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

    // ==================================================
    // PROGRESS DATA (usa la racha ya actualizada)
    // ==================================================

    const percent = data.progress_percent ?? 0;
    const level = data.current_level ?? 1;
    const xp = data.total_xp ?? 0;
    const streak = newStreak;
    const nextGoal = data.next_goal ?? "-";
    const achievements = data.achievements_count ?? 0;

    // Top stat cards
    document.getElementById("stat-progress").textContent = `${percent}%`;
    document.getElementById("stat-progress-fill").style.width = `${percent}%`;
    document.getElementById("stat-streak").textContent = `${streak} Days`;
    document.getElementById("stat-xp").textContent = `${xp.toLocaleString()} XP`;
    document.getElementById("stat-achievements").textContent = achievements;

    // "Your Progress" card
    document.getElementById("progress-number").textContent = `${percent}%`;
    document.getElementById("detail-level").textContent = level;
    document.getElementById("detail-xp").textContent = `${xp} XP`;
    document.getElementById("detail-streak").textContent = `${streak} Days 🔥`;
    document.getElementById("detail-next-goal").textContent = nextGoal;
  
    // Animate circle (circumference = 2 * PI * 70 ≈ 440)
    const circumference = 440;
    const offset = circumference - (percent / 100) * circumference;

    const progressCircle = document.querySelector(".circle-progress");

    if(progressCircle){
        progressCircle.style.strokeDashoffset = circumference;

        setTimeout(()=>{
            progressCircle.style.transition = "2s";
            progressCircle.style.strokeDashoffset = offset;
        },500);
    }
}

loadUserData();
