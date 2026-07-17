// ======================
// CONEXIÓN A SUPABASE
// ======================
const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";
const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC"; // clave pública (anon)

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ======================
// ELEMENTOS DEL FORMULARIO
// ======================
const form = document.getElementById("student-form");
const createBtn = form.querySelector(".create-btn");

// Mensaje de estado (se crea debajo del botón, sin tocar el HTML)
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
    const school = document.getElementById("school").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Verificar campos vacíos
    if (!name || !email || !school || !password || !confirmPassword) {
        msg.textContent = "⚠️ Completa todos los campos";
        msg.style.color = "red";
        return;
    }

    // Verificar contraseña
    if (password !== confirmPassword) {
        msg.textContent = "⚠️ Las contraseñas no coinciden";
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
                Escuela: school
            },
        ]);

    if (insertError) {
        console.error(insertError);
        msg.textContent = "❌ " + insertError.message;
        msg.style.color = "red";
        return;
    }

    msg.textContent = "✅ Cuenta creada con éxito. Redirigiendo...";
    msg.style.color = "green";

    // pequeña pausa para UX antes de mandar al login
    setTimeout(() => {
        window.location.href = "STUDENT LOGIN.html";
    }, 1000);

});

// ======================
// BOTÓN GOOGLE (placeholder, sin OAuth configurado todavía)
// ======================
const googleBtn = document.querySelector(".google-btn");

if (googleBtn) {
    googleBtn.addEventListener("click", () => {
        alert("Google Login coming soon");
    });
}
