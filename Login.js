// REFERENCIAS
const btnUp = document.getElementById("btnUp");
const btnIn = document.getElementById("btnIn");

const signup = document.getElementById("signup");
const signin = document.getElementById("signin");

const slider = document.getElementById("slider");

// EVENTO SIGN UP
btnUp.addEventListener("click", () => {

  // Mostrar formulario
  signup.classList.add("active");
  signin.classList.remove("active");

  // Mover slider
  slider.style.left = "0%";

  // Cambiar estilo botones
  btnUp.classList.add("active");
  btnIn.classList.remove("active");
});

// EVENTO SIGN IN
btnIn.addEventListener("click", () => {

  // Mostrar formulario
  signin.classList.add("active");
  signup.classList.remove("active");

  // Mover slider
  slider.style.left = "50%";

  // Cambiar estilo botones
  btnIn.classList.add("active");
  btnUp.classList.remove("active");
});

const subtitle = document.getElementById("subtitle");

const messages = [
  "Discover Your Learning Style",
  "Learn Smarter, Not Harder",
  "Unlock Your Full Potential",
  "Personalized Learning for Every Student",
  "Study Better with Thinking",
  "Visual, Auditory or Kinesthetic?",
  "Find the Way You Learn Best",
  "Turn Study Time into Success",
  "Learning Made Simple",
  "Your Journey Starts Here",
];

let current = 0;

setInterval(() => {
  current++;

  if(current >= messages.length){
    current = 0;
  }

  subtitle.textContent = messages[current];

}, 3000);
