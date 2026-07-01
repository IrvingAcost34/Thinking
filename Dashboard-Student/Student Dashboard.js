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
/* ======================================================
                PROGRESS ANIMATION
====================================================== */

const progressCircle = document.querySelector(".circle-progress");

if(progressCircle){

    progressCircle.style.strokeDashoffset = "440";

    setTimeout(()=>{

        progressCircle.style.transition="2s";

        progressCircle.style.strokeDashoffset="79";

    },500);

}
