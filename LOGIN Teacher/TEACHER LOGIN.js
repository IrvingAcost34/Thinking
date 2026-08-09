// ======================
// CONEXIÓN A SUPABASE
// ======================
const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";
const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC"; // clave pública (anon)
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ======================
// ELEMENTOS DEL FORMULARIO
// ======================
const form = document.getElementById("login-form");
const loginBtn = form.querySelector(".login-btn");

// Mensaje de estado (se crea debajo del botón, sin tocar el HTML)
const msg = document.createElement("p");
msg.id = "msg-signin";
msg.style.textAlign = "center";
msg.style.marginTop = "10px";
loginBtn.insertAdjacentElement("afterend", msg);

// ======================
// MOSTRAR / OCULTAR CONTRASEÑA
// (solo se activa si existe el botón en el HTML)
// ======================
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("si-password");

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        const icon = togglePassword.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-eye");
            icon.classList.toggle("fa-eye-slash");
        }
    });
}

// ======================
// INICIO DE SESIÓN (Sign In)
// ======================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("si-email").value.trim();
    const password = document.getElementById("si-password").value;

    if (!email || !password) {
        msg.textContent = "⚠️ Llena todos los campos";
        msg.style.color = "red";
        return;
    }

    // Paso 1: intentar iniciar sesión con Supabase Auth
    const { data, error } = await db.auth.signInWithPassword({ email, password });

    if (error) {
        console.error(error);
        msg.textContent = "❌ Correo o contraseña incorrectos";
        msg.style.color = "red";
        return;
    }

    // Paso 2: verificar que esta cuenta exista en la tabla exclusiva "teachers"
    // (evita que una cuenta de estudiante entre por accidente aquí)
    const { data: perfil, error: errorPerfil } = await db
        .from("teachers")
        .select("id")
        .eq("E-mail", email)
        .single();

    if (errorPerfil || !perfil) {
        msg.textContent = "❌ Esta cuenta no está registrada como profesor.";
        msg.style.color = "red";
        await db.auth.signOut(); // cerramos la sesión para no dejarla "a medias"
        return;
    }

    // Paso 3: todo correcto, entra al Dashboard
    msg.textContent = "✅ ¡Bienvenido!";
    msg.style.color = "green";

    setTimeout(() => {
        window.location.href = "../Dashboard-Teacher/Teacher Dashboard.html";
    }, 800);
});

// ======================
// GOOGLE (placeholder, sin OAuth configurado todavía)
// ======================
const googleBtn = document.querySelector(".google-btn");
if (googleBtn) {
    googleBtn.addEventListener("click", () => {
        alert("Google Login coming soon");
    });
}
