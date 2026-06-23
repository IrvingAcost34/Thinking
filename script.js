// BOTONES LOGIN Y SIGN UP

const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");

loginBtn.addEventListener("click", () => {
    window.location.href = "Login.html";
});

signupBtn.addEventListener("click", () => {
    window.location.href = "Login.html";
});

// BOTÓN START ASSESSMENT

const startBtn = document.querySelector(".start-btn");

startBtn.addEventListener("click", () => {
    window.location.href = "Login.html";
});

// BOTÓN EXPLORE

const exploreBtn = document.querySelector(".explore-btn");

exploreBtn.addEventListener("click", () => {
    alert("Learning Techniques section coming soon!");
});

// LOGO THINKING

const brand = document.querySelector(".brand");

brand.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
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
