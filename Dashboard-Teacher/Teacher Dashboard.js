/* ======================================================
                    SUPABASE
====================================================== */

const SUPABASE_URL =
"https://lihwjqcimyysxlluiwcj.supabase.co";

const SUPABASE_KEY =
"sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

/* ======================================================
                    GLOBAL ELEMENTS
====================================================== */

const body = document.body;

const themeToggle =
document.querySelector(".theme-toggle");

const toggleCircle =
document.querySelector(".toggle-circle");

const bombiMessage =
document.getElementById("bombi-message");

/* ======================================================
                    START APP
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});

/* ======================================================
                INITIALIZE DASHBOARD
====================================================== */

async function initializeDashboard(){

    // Icons
    lucide.createIcons();

    // Theme
    loadTheme();

    // Teacher
    await loadTeacherData();
await loadDashboardStats();
  

    // Bombi
    startBombiMessages();

    // Events
    initializeEvents();

    // Animations
    startAnimations();

    console.log("Teacher Dashboard Ready");

}/* ======================================================
                    THEME
====================================================== */

function enableDarkMode(){

    body.classList.remove("light-theme");
    body.classList.add("dark-theme");

    if(toggleCircle){
        toggleCircle.style.left = "11px";
    }

}

function enableLightMode(){

    body.classList.remove("dark-theme");
    body.classList.add("light-theme");

    if(toggleCircle){
        toggleCircle.style.left = "49px";
    }

}

/* ======================================================
                SAVE THEME
====================================================== */

function saveTheme(){

    const theme = body.classList.contains("dark-theme")
        ? "dark"
        : "light";

    localStorage.setItem(
        "thinking-theme",
        theme
    );

}

/* ======================================================
                LOAD THEME
====================================================== */

function loadTheme(){

    const savedTheme =
        localStorage.getItem("thinking-theme");

    if(savedTheme === "light"){

        enableLightMode();

    }else{

        enableDarkMode();

    }

}

/* ======================================================
                TOGGLE THEME
====================================================== */

function toggleTheme(){

    if(body.classList.contains("dark-theme")){

        enableLightMode();

    }else{

        enableDarkMode();

    }

    saveTheme();

}
/* ======================================================
                LOAD TEACHER DATA
====================================================== */

async function loadTeacherData(){

    try{

        /* ==========================================
                    SESSION
        ========================================== */

        const {

            data:{session},

            error:sessionError

        } = await db.auth.getSession();

        if(sessionError){

            throw sessionError;

        }

        if(!session){

            window.location.href="../Login/Login.html";
            return;

        }

        const user = session.user;

        /* ==========================================
                GET USER INFORMATION
        ========================================== */

        const {

            data,

            error

        } = await db

            .from("THINKING")

            .select("*")

            .eq("id",user.id)

            .single();

        if(error){

            throw error;

        }

        updateTeacherInterface(data);

    }

    catch(error){

        console.error("Teacher Error:",error);

    }

}
/* ======================================================
            UPDATE TEACHER INTERFACE
====================================================== */

function updateTeacherInterface(teacher){

    updateUserName(teacher);

    updateProfileName(teacher);

    updateGreeting(teacher);

    updateAvatar(teacher);

}
/* ======================================================
                SIDEBAR NAME
====================================================== */

function updateUserName(teacher){

    const userName =
        document.getElementById("userName");

    if(!userName) return;

    userName.textContent =
        teacher.Nombre_Usuario;

}
/* ======================================================
                PROFILE NAME
====================================================== */

function updateProfileName(teacher){

    const profileName =
        document.getElementById("profileName");

    if(!profileName) return;

    profileName.textContent =
        teacher.Nombre_Usuario;

}
/* ======================================================
                    GREETING
====================================================== */

function updateGreeting(teacher){

    const greeting =
        document.getElementById("greeting");

    if(!greeting) return;

    const hour = new Date().getHours();

    let message;

    if(hour >= 5 && hour < 12){

        message = "Good Morning";

    }

    else if(hour >= 12 && hour < 18){

        message = "Good Afternoon";

    }

    else{

        message = "Good Evening";

    }

    greeting.textContent =
        `${message}, ${teacher.Nombre_Usuario}`;

}
/* ======================================================
                    AVATAR
====================================================== */

function updateAvatar(teacher){

    const avatar =
        document.getElementById("userAvatar");

    if(!avatar) return;

    const initials = teacher.Nombre_Usuario

        .split(" ")

        .map(word => word.charAt(0))

        .join("")

        .substring(0,2)

        .toUpperCase();

    avatar.textContent = initials;

}
/* ======================================================
                    BOMBI AI
====================================================== */

const bombiMessages = [

    "Ready to help you teach today! 👨‍🏫",

    "Let's prepare an amazing class.",

    "Your students are waiting for today's lesson.",

    "Need a quiz? I can create one.",

    "Let's improve your classroom.",

    "Teaching is inspiring minds every day.",

    "Ask me anything about your classes."

];

let bombiIndex = 0;
let bombiInterval = null;
/* ======================================================
            START BOMBI MESSAGES
====================================================== */

function startBombiMessages(){

    if(!bombiMessage) return;

    bombiMessage.textContent = bombiMessages[0];

    bombiInterval = setInterval(() => {

        nextBombiMessage();

    },5000);

}
/* ======================================================
            NEXT BOMBI MESSAGE
====================================================== */

function nextBombiMessage(){

    bombiIndex++;

    if(bombiIndex >= bombiMessages.length){

        bombiIndex = 0;

    }

    bombiMessage.style.opacity = "0";

    setTimeout(() => {

        bombiMessage.textContent =
        bombiMessages[bombiIndex];

        bombiMessage.style.opacity = "1";

    },300);

}
/* ======================================================
                BOMBI BUTTON
====================================================== */

const bombiButton =
document.querySelector(".bombi-button");

if(bombiButton){

    bombiButton.addEventListener("click",openBombi);

}
/* ======================================================
                OPEN BOMBI
====================================================== */

function openBombi(){

    alert(
        "Bombi AI will be available soon!"
    );

}
/* ======================================================
                START ANIMATIONS
====================================================== */

function startAnimations(){

    animateProgressCircle();

    animateCards();

    animateButtons();

}
/* ======================================================
            PROGRESS CIRCLE
====================================================== */

function animateProgressCircle(){

    const progressCircle =
    document.querySelector(".circle-progress");

    if(!progressCircle) return;

    progressCircle.style.strokeDasharray = "440";

    progressCircle.style.strokeDashoffset = "440";

    setTimeout(()=>{

        progressCircle.style.transition =
        "2s ease";

        progressCircle.style.strokeDashoffset =
        "79";

    },500);

}
/* ======================================================
                ANIMATE CARDS
====================================================== */

function animateCards(){

    const cards = document.querySelectorAll(

        ".dashboard-card," +
        ".stat-card," +
        ".course-card," +
        ".achievement"

    );

    cards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(25px)";

        setTimeout(()=>{

            card.style.transition=".6s ease";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*120);

    });

}
/* ======================================================
                BUTTON EFFECTS
====================================================== */

function animateButtons(){

    const buttons = document.querySelectorAll(

        ".primary-btn,.secondary-btn"

    );

    buttons.forEach(button=>{

        button.addEventListener("mouseenter",()=>{

            button.style.transform="translateY(-4px)";

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="translateY(0)";

        });

    });

}
/* ======================================================
                ICON HOVER
====================================================== */

const iconButtons =
document.querySelectorAll(".icon-btn");

iconButtons.forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform =
        "translateY(-3px) scale(1.08)";

    });
/* ======================================================
                STAT EFFECT
====================================================== */

const statCards =
document.querySelectorAll(".stat-card");

statCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform =
        "translateY(-8px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
        "translateY(0px)";

    });

});
    button.addEventListener("mouseleave",()=>{

        button.style.transform =
        "translateY(0) scale(1)";

    });

});
/* ======================================================
                INITIALIZE EVENTS
====================================================== */

function initializeEvents(){

    initializeTheme();

    initializeSearch();

    initializeNotifications();

    initializeHeroButtons();

    initializeCourseButtons();

    initializeSidebar();

    initializeBombi();

}
/* ======================================================
                    THEME
====================================================== */

function initializeTheme(){

    if(!themeToggle) return;

    themeToggle.addEventListener(

        "click",

        toggleTheme

    );

}
/* ======================================================
                SEARCH BOX
====================================================== */

function initializeSearch(){

    const searchInput =

    document.querySelector(".search-box input");

    if(!searchInput) return;

    searchInput.addEventListener(

        "keyup",

        event => {

            const value =

            event.target.value.trim();

            console.log(

                "Searching:",

                value

            );

        }

    );

}
/* ======================================================
                NOTIFICATIONS
====================================================== */

function initializeNotifications(){

    const notificationBtn =

    document.querySelector(".notification-btn");

    if(!notificationBtn) return;

    notificationBtn.addEventListener(

        "click",

        showNotifications

    );

}

function showNotifications(){

    alert(

        "You have 5 new notifications."

    );

}
/* ======================================================
                HERO BUTTONS
====================================================== */

function initializeHeroButtons(){

    const buttons =

    document.querySelectorAll(

        ".hero-buttons button"

    );

    buttons.forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                console.log(

                    button.textContent,

                    "clicked"

                );

            }

        );

    });

}
/* ======================================================
                COURSE BUTTONS
====================================================== */

function initializeCourseButtons(){

    const buttons =

    document.querySelectorAll(

        ".course-card .primary-btn"

    );

    buttons.forEach(button=>{

        button.addEventListener(

            "click",

            ()=>{

                openCourse(button);

            }

        );

    });

}

function openCourse(button){

    const title =

    button.parentElement

    .querySelector("h3");

    if(!title) return;

    alert(

        "Opening " +

        title.textContent

    );

}
/* ======================================================
                SIDEBAR
====================================================== */

function initializeSidebar(){

    initializeSettings();

    initializeLogout();

}
/* ======================================================
                SETTINGS
====================================================== */

function initializeSettings(){

    const settings =

    document.querySelector(

        ".sidebar-footer a:first-child"

    );

    if(!settings) return;

    settings.addEventListener(

        "click",

        event=>{

            event.preventDefault();

            alert(

                "Settings page coming soon!"

            );

        }

    );

}

/* ======================================================
                LOGOUT
====================================================== */

function initializeLogout(){

    const logout =

    document.querySelector(

        ".sidebar-footer a:last-child"

    );

    if(!logout) return;

    logout.addEventListener(

        "click",

        logoutTeacher

    );

}

async function logoutTeacher(event){

    event.preventDefault();

    const confirmLogout = confirm(

        "Are you sure you want to log out?"

    );

    if(!confirmLogout) return;

    const { error } =

    await db.auth.signOut();

    if(error){

        alert(

            "Logout failed."

        );

        console.error(error);

        return;

    }

    window.location.href =

    "../Login/Login.html";

}
/* ======================================================
                BOMBI BUTTON
====================================================== */

function initializeBombi(){

    const bombiButton =

    document.querySelector(

        ".bombi-button"

    );

    if(!bombiButton) return;

    bombiButton.addEventListener(

        "click",

        openBombi

    );

}
/* ======================================================
                DASHBOARD STATS
====================================================== */

async function loadDashboardStats(){

    await Promise.all([

        loadStudents(),

        loadClasses(),

        loadAssignments(),

        loadAverage()

    ]);

}
/* ======================================================
                STUDENTS
====================================================== */

async function loadStudents(){

    const{

        count,

        error

    }=await db

    .from("Students")

    .select("*",{

        count:"exact",

        head:true

    });

    if(error){

        console.error(error);

        return;

    }

    const total=

    document.getElementById("totalStudents");

    if(total){

       animateCounter(total,count);

    }

}
/* ======================================================
                CLASSES
====================================================== */

async function loadClasses(){

    const{

        count,

        error

    }=await db

    .from("Classes")

    .select("*",{

        count:"exact",

        head:true

    });

    if(error){

        console.error(error);

        return;

    }

    const total=

    document.getElementById("totalClasses");

    if(total){

        total.textContent=count;

    }

}
/* ======================================================
                ASSIGNMENTS
====================================================== */

async function loadAssignments(){

    const{

        count,

        error

    }=await db

    .from("Assignments")

    .select("*",{

        count:"exact",

        head:true

    });

    if(error){

        console.error(error);

        return;

    }

    const total=

    document.getElementById("totalAssignments");

    if(total){

        total.textContent=count;

    }

}
/* ======================================================
                AVERAGE GRADE
====================================================== */

async function loadAverage(){

    const average=

    document.getElementById("averageGrade");

    if(!average) return;

    average.textContent="89%";

}
/* ======================================================
                COUNTER
====================================================== */

function animateCounter(element,value){

    let start=0;

    const increment=

    Math.ceil(value/40);

    const timer=

    setInterval(()=>{

        start+=increment;

        if(start>=value){

            start=value;

            clearInterval(timer);

        }

        element.textContent=start;

    },25);

}
