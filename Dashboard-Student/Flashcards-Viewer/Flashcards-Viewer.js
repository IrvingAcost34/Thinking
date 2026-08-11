// ============================================================
// THINKING · Flashcards-Viewer.js
// Carga un material generado (estilo Visual) desde Supabase
// y lo muestra como flashcards interactivas, estilo Duolingo.
// ============================================================

const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --------- Leer el ID del material desde la URL ---------
// Ejemplo de uso: Flashcards-Viewer.html?material_id=xxxxx
const parametros = new URLSearchParams(window.location.search);
const materialId = parametros.get("material_id");

// --------- Elementos del DOM ---------
const stateLoading = document.getElementById("stateLoading");
const stateError = document.getElementById("stateError");
const errorMessage = document.getElementById("errorMessage");
const deckWrapper = document.getElementById("deckWrapper");

const introBlock = document.getElementById("introBlock");
const tituloMaterial = document.getElementById("tituloMaterial");
const resumenMaterial = document.getElementById("resumenMaterial");
const conceptsRow = document.getElementById("conceptsRow");
const startBtn = document.getElementById("startBtn");

const cardStage = document.getElementById("cardStage");
const flipCard = document.getElementById("flipCard");
const frontText = document.getElementById("frontText");
const backText = document.getElementById("backText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const finishBlock = document.getElementById("finishBlock");
const restartBtn = document.getElementById("restartBtn");

const progressFill = document.getElementById("progressFill");
const counter = document.getElementById("counter");
const backLink = document.getElementById("backLink");

// --------- Estado ---------
let flashcards = [];
let indiceActual = 0;

// --------- Cargar el material desde Supabase ---------

async function cargarMaterial() {
  if (!materialId) {
    mostrarError("No se especificó qué material cargar.");
    return;
  }

  const { data, error } = await db
    .from("generated_materials")
    .select("contenido_json")
    .eq("id", materialId)
    .single();

  if (error || !data) {
    console.error(error);
    mostrarError("No se encontró este material. Puede que ya no esté disponible.");
    return;
  }

  const contenido = data.contenido_json;
  flashcards = contenido.flashcards || [];

  tituloMaterial.textContent = contenido.titulo || "Material de estudio";
  resumenMaterial.textContent = contenido.resumen_visual || "";

  (contenido.conceptos || []).forEach((concepto) => {
    const chip = document.createElement("span");
    chip.className = "concept-chip";
    chip.textContent = concepto.nombre;
    conceptsRow.appendChild(chip);
  });

  stateLoading.hidden = true;
  deckWrapper.hidden = false;

  actualizarProgreso();

  if (window.lucide) lucide.createIcons();
}

function mostrarError(mensaje) {
  stateLoading.hidden = true;
  errorMessage.textContent = mensaje;
  stateError.hidden = false;
}

// --------- Progreso ---------

function actualizarProgreso() {
  const total = flashcards.length;
  const actual = Math.min(indiceActual, total);
  const porcentaje = total === 0 ? 0 : (actual / total) * 100;
  progressFill.style.width = `${porcentaje}%`;
  counter.textContent = `${actual} / ${total}`;
}

// --------- Mostrar una flashcard específica ---------

function mostrarTarjeta(indice) {
  if (indice >= flashcards.length) {
    cardStage.hidden = true;
    finishBlock.hidden = false;
    progressFill.style.width = "100%";
    counter.textContent = `${flashcards.length} / ${flashcards.length}`;
    return;
  }

  flipCard.classList.remove("is-flipped");
  const tarjeta = flashcards[indice];
  frontText.textContent = tarjeta.pregunta;
  backText.textContent = tarjeta.respuesta;

  prevBtn.disabled = indice === 0;
  nextBtn.textContent = indice === flashcards.length - 1 ? "Terminar" : "Siguiente";

  actualizarProgreso();
}

// --------- Interacciones ---------

startBtn.addEventListener("click", () => {
  if (flashcards.length === 0) {
    mostrarError("Este material todavía no tiene flashcards.");
    return;
  }
  introBlock.hidden = true;
  cardStage.hidden = false;
  indiceActual = 0;
  mostrarTarjeta(indiceActual);
});

flipCard.addEventListener("click", () => {
  flipCard.classList.toggle("is-flipped");
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  indiceActual++;
  mostrarTarjeta(indiceActual);
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (indiceActual > 0) {
    indiceActual--;
    mostrarTarjeta(indiceActual);
  }
});

restartBtn.addEventListener("click", () => {
  finishBlock.hidden = true;
  cardStage.hidden = false;
  indiceActual = 0;
  mostrarTarjeta(indiceActual);
});

backLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
});

// --------- Inicio ---------
cargarMaterial();
