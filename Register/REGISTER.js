// ======================
// THINKING REGISTER JS
// ======================
 
// ======================
// CONEXIÓN A SUPABASE
// ======================
const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";
const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC"; // clave pública (anon)
 
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
 
// ======================
// CALCULAR EDAD
// ======================
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
 
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
 
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
 
  return edad;
}
 
// ======================
// MENSAJE DE ESTADO (se crea dinámicamente debajo del botón Create account)
// ======================
const form = document.getElementById("register-form");
const createBtn = form.querySelector(".create-btn");
 
const msg = document.createElement("p");
msg.id = "msg-register";
msg.style.textAlign = "center";
msg.style.marginTop = "10px";
createBtn.insertAdjacentElement("afterend", msg);
 
// ======================
// FORMULARIO DE REGISTRO
// ======================
form.addEventListener("submit", async function (e) {
  e.preventDefault();
 
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const fecha = document.getElementById("su-fecha").value;
  const escuela = document.getElementById("su-escuela").value.trim();
 
  // Verificar campos vacíos
  if (!name || !email || !password || !confirmPassword || !fecha || !escuela) {
    msg.textContent = "⚠️ Completa todos los campos";
    msg.style.color = "red";
    return;
  }
 
  // Verificar contraseña
  if (password !== confirmPassword) {
    msg.textContent = "⚠️ Passwords do not match";
    msg.style.color = "red";
    return;
  }
 
  // 1. Crear usuario en Supabase Auth
  const { data, error } = await db.auth.signUp({ email, password });
 
  if (error) {
    console.error(error);
    msg.textContent = "❌ " + error.message;
    msg.style.color = "red";
    return;
  }
 
  // 2. Guardar datos extra en la tabla "THINKING", vinculados al id de Auth
  const { error: insertError } = await db
    .from("THINKING")
    .insert([
      {
        id: data.user.id, // vincula con auth.users
        Nombre_Usuario: name,
        "E-mail": email,
        Edad: calcularEdad(fecha),
        Escuela: escuela,
      },
    ]);
 
  if (insertError) {
    console.error(insertError);
    msg.textContent = "❌ " + insertError.message;
    msg.style.color = "red";
    return;
  }
 
  msg.textContent = "✅ Account created successfully";
  msg.style.color = "green";
 
  console.log(name, email);
 
  // Redirigir al login si quieres:
  // window.location.href = "Login.html";
});
 
// ======================
// BOTON GOOGLE
// ======================
const googleBtn = document.querySelector(".google-btn");
googleBtn.addEventListener("click", () => {
  alert("Google Login coming soon");
});
