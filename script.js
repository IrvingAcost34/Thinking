
// =========================
// THINKING WEBSITE SCRIPT
// =========================

// BOTÓN LOGIN

const loginBtn = document.querySelector(".login-btn");

if(loginBtn){
    loginBtn.addEventListener("click", () => {
        window.location.href = "Login.html";
    });
}

// BOTÓN SIGN UP

const signupBtn = document.querySelector(".signup-btn");

if(signupBtn){
    signupBtn.addEventListener("click", () => {
        window.location.href = "Login.html";
    });
}

// BOTÓN START ASSESSMENT

const startBtn = document.querySelector(".start-btn");

if(startBtn){
    startBtn.addEventListener("click", () => {
        window.location.href = "Login.html";
    });
}

// BOTÓN EXPLORE TECHNIQUES

const exploreBtn = document.querySelector(".explore-btn");

if(exploreBtn){
    exploreBtn.addEventListener("click", () => {

        const learningSection =
        document.getElementById("learning-styles");

        if(learningSection){

            learningSection.scrollIntoView({
                behavior:"smooth"
            });

        }

    });
}

// LOGO THINKING

const brand = document.querySelector(".brand");

if(brand){

    brand.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

// =========================
// MENU NAVIGATION
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});
// =========================
// THEME TOGGLE
// =========================

const themeBtn =
document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    const currentTheme =
    document.documentElement.getAttribute(
        "data-theme"
    );

    if(currentTheme === "dark"){

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        themeBtn.innerHTML = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }else{

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeBtn.innerHTML = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );
    }
});

// =========================
// LOAD SAVED THEME
// =========================

const savedTheme =
localStorage.getItem("theme");

if(savedTheme){

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    if(savedTheme === "dark"){

        themeBtn.innerHTML = "☀️";
    }
}
// =========================
// BOMBI CHAT
// =========================

const bombiBtn =
document.getElementById("bombi-btn");

const bombiChat =
document.getElementById("bombi-chat");

const closeChat =
document.getElementById("close-chat");

if(bombiBtn){

    bombiBtn.addEventListener("click", () => {

        bombiChat.style.display = "block";

    });

}

if(closeChat){

    closeChat.addEventListener("click", () => {

        bombiChat.style.display = "none";

    });

}
/* ==========================
   NAVBAR SCROLL
==========================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});
