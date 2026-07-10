/* ==========================================
            THINKING DASHBOARD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeIcons();
    initializeTheme();
    initializeLanguage();
lucide.createIcons();
});

/* ==========================================
            ICONS
========================================== */

function initializeIcons(){

    lucide.createIcons();

}
/* ==========================================
            THEME
========================================== */

const themeBtn = document.getElementById("themeBtn");

function initializeTheme(){

    const savedTheme = localStorage.getItem("thinking-theme");

    if(savedTheme === "dark"){

        document.body.classList.add("dark");

        themeBtn.innerHTML = `
            <i data-lucide="moon"></i>
        `;

    }

    lucide.createIcons();

    themeBtn.addEventListener("click",toggleTheme);

}

function toggleTheme(){

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "thinking-theme",
        dark ? "dark" : "light"
    );

    themeBtn.innerHTML = dark
        ? `<i data-lucide="moon"></i>`
        : `<i data-lucide="sun"></i>`;

    lucide.createIcons();

}
/* ==========================================
            LANGUAGE
========================================== */

const languageBtn =
document.getElementById("languageBtn");

let currentLanguage =
localStorage.getItem("thinking-language") || "en";

function initializeLanguage(){

    languageBtn.addEventListener("click",toggleLanguage);

    updateLanguage();

}

function toggleLanguage(){

    currentLanguage =
        currentLanguage==="en"
        ? "es"
        : "en";

    localStorage.setItem(
        "thinking-language",
        currentLanguage
    );

    updateLanguage();

}
const dictionary = {

    en:{

        dashboard:"Dashboard",

        classes:"My Classes",

        students:"Students",

        assignments:"Assignments",

        resources:"Resources",

        schedule:"Schedule",

        analytics:"Analytics",

        bombi:"Bombi AI"

    },

    es:{

        dashboard:"Panel",

        classes:"Mis Clases",

        students:"Estudiantes",

        assignments:"Tareas",

        resources:"Recursos",

        schedule:"Horario",

        analytics:"Analíticas",

        bombi:"Bombi IA"

    }

};
function updateLanguage(){

    languageBtn.querySelector("span").textContent =
        currentLanguage.toUpperCase();

    const t =
        dictionary[currentLanguage];

    const menu =
        document.querySelectorAll(".sidebar li span");

    menu[0].textContent=t.dashboard;
    menu[1].textContent=t.classes;
    menu[2].textContent=t.students;
    menu[3].textContent=t.assignments;
    menu[4].textContent=t.resources;
    menu[5].textContent=t.schedule;
    menu[6].textContent=t.analytics;
    menu[7].textContent=t.bombi;

}
/*=========================================
        NOTIFICATIONS
=========================================*/

const notificationBtn =
document.getElementById("notificationBtn");

const notificationsPanel =
document.getElementById("notificationsPanel");

notificationBtn.addEventListener("click",()=>{

    notificationsPanel.classList.toggle("open");

});
/*=========================================
        PROFILE MENU
=========================================*/

const profileMenu =
document.getElementById("profileMenu");

const profileDropdown =
document.getElementById("profileDropdown");

profileMenu.addEventListener("click",()=>{

    profileDropdown.classList.toggle("open");

});
