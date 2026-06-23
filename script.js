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
