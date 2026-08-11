// ============================================================
// THINKING · Create-Material.js
// Conecta la pantalla del profesor con el backend (Render)
// que analiza documentos y genera materiales con IA.
// ============================================================

// --------- Configuración ---------
const API_BASE = "https://thinking-backend-qvmz.onrender.com";

// Datos de Supabase (los mismos que usa el resto del sitio).
// En CodePen, comenta estas 3 líneas si te da problemas de redirección;
// en GitHub Pages, déjalas activas.
const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC"; // la "anon public", nunca la service_role
let db = null;
try {
  db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (e) {
  console.warn("Supabase no se pudo inicializar (normal en CodePen).", e);
}

// --------- Estado del flujo ---------
let archivoSeleccionado = null;
let jobIdActual = null;
let rutaArchivoActual = null;
let teacherIdActual = null;

// --------- Elementos del DOM ---------
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const filePreview = document.getElementById("filePreview");
const fileNameEl = document.getElementById("fileName");
const fileSizeEl = document.getElementById("fileSize");
const removeFileBtn = document.getElementById("removeFileBtn");
const analyzeBtn = document.getElementById("analyzeBtn");

const temaDetectadoEl = document.getElementById("temaDetectado");
const resumenDetectadoEl = document.getElementById("resumenDetectado");
const downloadLink = document.getElementById("downloadLink");
const restartBtn = document.getElementById("restartBtn");

const panels = {
  upload: document.getElementById("panel-upload"),
  analyzing: document.getElementById("panel-analyzing"),
  "style-select": document.getElementById("panel-style"),
  generating: document.getElementById("panel-generating"),
  result: document.getElementById("panel-result"),
};

// --------- Utilidades ---------

function mostrarToast(mensaje, tipo = "info") {
  const contenedor = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  toast.textContent = mensaje;
  contenedor.appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}

function irAlPaso(nombrePaso) {
  Object.entries(panels).forEach(([nombre, panel]) => {
    panel.hidden = nombre !== nombrePaso;
  });

  // Actualiza el stepper visual de arriba
  const ordenPasos = ["upload", "analyzing", "style-select", "result"];
  // "generating" visualmente cuenta como parte del paso "style-select" -> "result"
  const pasoVisual = nombrePaso === "generating" ? "style-select" : nombrePaso;
  const indexActual = ordenPasos.indexOf(pasoVisual);

  document.querySelectorAll(".step").forEach((li) => {
    const paso = li.dataset.step;
    const index = ordenPasos.indexOf(paso);
    li.classList.remove("active", "done");
    if (index < indexActual) li.classList.add("done");
    if (index === indexActual) li.classList.add("active");
  });
}

function formatearTamano(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// --------- Obtener el ID del profesor logueado ---------

async function obtenerTeacherId() {
  if (!db) return null;
  try {
    const { data, error } = await db.auth.getUser();
    if (error || !data?.user) return null;
    return data.user.id;
  } catch (e) {
    console.warn("No se pudo obtener el usuario actual:", e);
    return null;
  }
}

// --------- Selección de archivo ---------

function seleccionarArchivo(archivo) {
  if (!archivo) return;

  if (archivo.type !== "application/pdf") {
    mostrarToast("Por ahora solo se aceptan archivos PDF.", "error");
    return;
  }

  const LIMITE_MB = 20;
  if (archivo.size > LIMITE_MB * 1024 * 1024) {
    mostrarToast(`El archivo supera el límite de ${LIMITE_MB} MB.`, "error");
    return;
  }

  archivoSeleccionado = archivo;
  fileNameEl.textContent = archivo.name;
  fileSizeEl.textContent = formatearTamano(archivo.size);
  filePreview.hidden = false;
  dropzone.hidden = true;
  analyzeBtn.disabled = false;
}

function quitarArchivo() {
  archivoSeleccionado = null;
  fileInput.value = "";
  filePreview.hidden = true;
  dropzone.hidden = false;
  analyzeBtn.disabled = true;
}

dropzone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => seleccionarArchivo(e.target.files[0]));
removeFileBtn.addEventListener("click", quitarArchivo);

["dragover", "dragenter"].forEach((evento) => {
  dropzone.addEventListener(evento, (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });
});
["dragleave", "drop"].forEach((evento) => {
  dropzone.addEventListener(evento, (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
  });
});
dropzone.addEventListener("drop", (e) => {
  const archivo = e.dataTransfer.files[0];
  seleccionarArchivo(archivo);
});

// --------- Paso 1 → 2: Subir y analizar ---------

analyzeBtn.addEventListener("click", async () => {
  if (!archivoSeleccionado) return;

  teacherIdActual = await obtenerTeacherId();
  if (!teacherIdActual) {
    mostrarToast("No se pudo identificar tu sesión. Inicia sesión nuevamente.", "error");
    return;
  }

  irAlPaso("analyzing");

  try {
    // 1. Subir el archivo
    const formData = new FormData();
    formData.append("archivo", archivoSeleccionado);
    formData.append("teacher_id", teacherIdActual);

    const respuestaUpload = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      body: formData,
    });
    const datosUpload = await respuestaUpload.json();

    if (!respuestaUpload.ok) {
      throw new Error(datosUpload.error || "No se pudo subir el archivo.");
    }

    jobIdActual = datosUpload.job_id;
    rutaArchivoActual = datosUpload.ruta_archivo;

    // 2. Analizar el archivo subido
    const respuestaAnalyze = await fetch(`${API_BASE}/api/analyze/${jobIdActual}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ruta_archivo: rutaArchivoActual }),
    });
    const datosAnalyze = await respuestaAnalyze.json();

    if (!respuestaAnalyze.ok) {
      throw new Error(datosAnalyze.error || "No se pudo analizar el documento.");
    }

    // Mostramos el resultado del análisis
    temaDetectadoEl.textContent = datosAnalyze.analisis.tema_principal || "Tema no identificado";
    resumenDetectadoEl.textContent = datosAnalyze.analisis.resumen_corto || "";

    irAlPaso("style-select");
  } catch (error) {
    console.error(error);
    mostrarToast(error.message || "Ocurrió un error al analizar el documento.", "error");
    irAlPaso("upload");
  }
});

// --------- Paso 3 → 4 → 5: Elegir estilo y generar ---------

document.querySelectorAll(".style-card").forEach((boton) => {
  boton.addEventListener("click", async () => {
    if (boton.disabled) return;
    const estilo = boton.dataset.style;

    // MVP: solo "visual" está implementado
    if (estilo !== "visual") {
      mostrarToast("Este estilo estará disponible próximamente.", "info");
      return;
    }

    irAlPaso("generating");

    try {
      const respuesta = await fetch(`${API_BASE}/api/generate/${jobIdActual}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estilo }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || "No se pudo generar el material.");
      }

      // En vez de un link de descarga, mostramos un botón para ver las
      // flashcards interactivas dentro del mismo Thinking.
      downloadLink.href = `../../Dashboard-Student/Flashcards-Viewer/Flashcards-Viewer.html?material_id=${datos.material_id}`;
      downloadLink.target = "_self";
      downloadLink.innerHTML = '<i data-lucide="sparkles"></i> Ver flashcards';
      if (window.lucide) lucide.createIcons();

      irAlPaso("result");
      mostrarToast("¡Material generado con éxito!", "success");
    } catch (error) {
      console.error(error);
      mostrarToast(error.message || "Ocurrió un error al generar el material.", "error");
      irAlPaso("style-select");
    }
  });
});

// --------- Reiniciar flujo ---------

restartBtn.addEventListener("click", () => {
  quitarArchivo();
  jobIdActual = null;
  rutaArchivoActual = null;
  irAlPaso("upload");
});

// --------- Íconos ---------
if (window.lucide) lucide.createIcons();
