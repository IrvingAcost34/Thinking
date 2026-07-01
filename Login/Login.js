// ======================
// BOMBI - MENSAJES ALEATORIOS
// ======================
const bombiText = document.querySelector(".bombi .tooltip");
 
const mensajes = [
  "Hi! 👋 Need help?",
  "I’m Bombi 🤖",
  "Let’s build something cool 🚀",
  "Thinking mode: ON 💡",
  "You got this 🔥"
];
 
document.querySelector(".bombi").addEventListener("mouseenter", () => {
  let random = Math.floor(Math.random() * mensajes.length);
  bombiText.textContent = mensajes[random];
});
 
// ======================
// TARJETA 3D QUE SIGUE EL MOUSE
// ======================
const card = document.querySelector(".card");
const bombi = document.querySelector(".bombi");
 
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
 
document.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 15;
  targetY = (e.clientY / window.innerHeight - 0.5) * -15;
 
  card.style.setProperty("--x", e.clientX + "px");
  card.style.setProperty("--y", e.clientY + "px");
});
 
function animate() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;
 
  card.style.transform = `
        rotateY(${currentX}deg)
        rotateX(${currentY}deg)
    `;
 
  requestAnimationFrame(animate);
}
animate();
 
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  bombi.style.transform = `translate(${x}px, ${y}px)`;
});
 
// ======================
// MOSTRAR / OCULTAR CONTRASEÑA
// ======================
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("si-password");
 
if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
 
    const icon = togglePassword.querySelector("i");
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
}
 
// ======================
// CONEXIÓN A SUPABASE
// ======================
const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";
const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC"; // clave pública (anon)
 
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
 
// ======================
// MENSAJE DE ESTADO (se crea dinámicamente debajo del botón Sign In)
// ======================
const loginForm = document.getElementById("loginForm");
const signinBtn = loginForm.querySelector(".signin-btn");
 
const msg = document.createElement("p");
msg.id = "msg-signin";
msg.style.textAlign = "center";
msg.style.marginTop = "10px";
signinBtn.insertAdjacentElement("afterend", msg);
 
// ======================
// INICIO DE SESIÓN (Sign In)
// ======================
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
 
  const email = document.getElementById("si-email").value.trim();
  const password = document.getElementById("si-password").value;
 
  if (!email || !password) {
    msg.textContent = "⚠️ Llena todos los campos";
    msg.style.color = "red";
    return;
  }
 
  const { data, error } = await db.auth.signInWithPassword({ email, password });
 
  if (error) {
    console.error(error);
    msg.textContent = "❌ Correo o contraseña incorrectos";
    msg.style.color = "red";
    return;
  }
 
  msg.textContent = "✅ ¡Bienvenido!";
  msg.style.color = "green";

// pequeña pausa para UX (efecto app real)
setTimeout(() => {

  window.location.href = "../student-dashboard.html";

}, 800);
  // Redirigir al dashboard si quieres:
  // window.location.href = "dashboard.html";
});
