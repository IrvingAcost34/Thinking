// ======================
// CONEXIÓN A SUPABASE
// ======================
const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";
const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC"; // clave pública (anon)
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ======================
// ELEMENTOS DEL FORMULARIO
// ======================
const form = document.getElementById("teacher-form");
const createBtn = form.querySelector(".create-btn");

// Mensaje de estado (se crea debajo del botón, sin tocar el HTML)
const msg = document.createElement("p");
msg.id = "msg-signup";
msg.style.textAlign = "center";
msg.style.marginTop = "10px";
createBtn.insertAdjacentElement("afterend", msg);

// ======================
// REGISTRO (Sign Up)
// ======================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const school = document.getElementById("school").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!name || !email || !school || !password || !confirmPassword) {
        msg.textContent = "⚠️ Llena todos los campos obligatorios";
        msg.style.color = "red";
        return;
    }

    if (password !== confirmPassword) {
        msg.textContent = "⚠️ Las contraseñas no coinciden";
        msg.style.color = "red";
        return;
    }

    if (password.length < 6) {
        msg.textContent = "⚠️ La contraseña debe tener al menos 6 caracteres";
        msg.style.color = "red";
        return;
    }

    createBtn.disabled = true;
    msg.textContent = "Creando tu cuenta...";
    msg.style.color = "#8c52ff";

    // Paso 1: crear el usuario en Supabase Auth
    const { data, error } = await db.auth.signUp({ email, password });

    if (error) {
        console.error(error);
        msg.textContent = "❌ " + (error.message || "No se pudo crear la cuenta");
        msg.style.color = "red";
        createBtn.disabled = false;
        return;
    }

    const authId = data.user ? data.user.id : null;

    // Paso 2: guardar los datos del profesor en la tabla exclusiva "teachers"
    const { error: errorInsert } = await db.from("teachers").insert({
        auth_id: authId,
        Nombre_Usuario: name,
        "E-mail": email,
        Escuela: school,
        subject: subject || null,
    });

    if (errorInsert) {
        console.error(errorInsert);
        msg.textContent = "❌ Tu cuenta se creó, pero hubo un problema guardando tus datos. Contacta soporte.";
        msg.style.color = "red";
        createBtn.disabled = false;
        return;
    }

    msg.textContent = "✅ ¡Cuenta creada! Redirigiendo a iniciar sesión...";
    msg.style.color = "green";

    setTimeout(() => {
        window.location.href = "../LOGIN Teacher/TEACHER LOGIN.html";
    }, 1200);
});
