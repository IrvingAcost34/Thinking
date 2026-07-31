/* ======================================================
                    THINKING
        LEARNING STYLE ASSESSMENT (TEST) SCREEN
====================================================== */

// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";

const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC";

let db = null;

if(window.supabase){

    db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

}

let currentUserId = null;

/* ======================================================
                    LUCIDE ICONS
====================================================== */

function refreshIcons(){

    if(window.lucide){ lucide.createIcons(); }

}

refreshIcons();

/* ======================================================
                    IDIOMA (EN / ES)
====================================================== */

let currentLang = "en";

const I18N = {

    en:{
        sidebarSubtitle:"Teacher Dashboard",
        navHome:"Home", navTest:"Test", navStudents:"Students", navAssignments:"Assigments",
        navResources:"Resources", navSchedule:"Schedule", navBombi:"Bombi AI",
        roleTeacher:"Teacher", footerSettings:"Settings", footerLogout:"Logout",
        backToDashboard:"Back to Dashboard",
        testTitle:"Learning Style Assessment",
        testSubtitle:"Discover how you learn best so we can personalize your experience.",
        progress:"Progress",
        stepIntroName:"Introduction", stepIntroDesc:"About the test",
        stepQuestionsName:"Questions", stepQuestionsDesc:"Answer honestly",
        stepResultsName:"Results", stepResultsDesc:"View your style",
        stepRecName:"Recommendations", stepRecDesc:"Get personalized tips",
        introTitle:"About this assessment",
        introDesc:"Answer 30 quick questions about how you like to learn. There are no right or wrong answers \u2014 just be honest to get the most accurate results.",
        startTest:"Start Test",
        testSections:"Test Sections",
        needHelp:"Need help?",
        needHelpDesc:"Watch this short video to understand how the test works.",
        watchVideo:"Watch video",
        flagQuestion:"Flag question", unflagQuestion:"Flagged",
        previous:"Previous", nextQuestion:"Next Question", finishTest:"Finish Test",
        yourProgress:"Your Progress", of30:"of 30",
        estimatedTime:"Estimated Time",
        minRemaining:(n) => `${n} min remaining`, almostDone:"Almost done!",
        takeYourTime:"Take your time!",
        takeYourTimeDesc:"There is no time limit for this assessment.",
        encourage1:"Keep going! You're doing great.",
        encourage2:"You're making great progress!",
        encourage3:"More than halfway there!",
        encourage4:"Almost finished, keep it up!",
        resultsTitle:"Your Learning Style Results",
        resultsDesc:"Here's how you learn best, based on your answers.",
        dominantStyle:"Dominant style",
        seeRecommendations:"See Recommendations",
        recTitle:"Personalized Recommendations",
        recSubtitle:(style) => `Because your dominant style is ${style}, here are techniques that work best for you.`,
        retakeTest:"Retake Test",
        visual:"Visual", auditory:"Auditory", kinesthetic:"Kinesthetic", reading:"Reading/Writing",
        questionOf:(i, total) => `Question ${i} of ${total}`,
        sectionQuestions:(n) => `${n} questions`,
        toastFlagAdded:"Question flagged for review.",
        toastFlagRemoved:"Flag removed.",
        toastVideo:"Playing walkthrough video...",
        toastJumpSection:(name) => `Jumped to "${name}".`,
        toastAnswerFirst:"Please select an answer before continuing.",
        toastRetake:"Test reset. Good luck!",
        notifTitle:"Notifications",
        notif1Title:"Assessment reminder", notif1Sub:"You're 33% through your Learning Style Assessment",
        notif2Title:"New tip from Bombi", notif2Sub:"Honesty leads to more accurate recommendations",
        notif3Title:"Weekly insight ready", notif3Sub:"See how your learning style compares to your class",
        toastNotifOpen:"Opening notification...",
        profileSettings:"Account settings", profileHelp:"Help & support", profileLogout:"Log out",
        toastSettings:"Account settings: build this screen next.",
        toastHelp:"Help & support: build this screen next.",
        toastLoggedOut:"Logged out.",
        recVisual1Title:"Use mind maps", recVisual1Desc:"Turn notes into diagrams, charts, and color-coded visuals.",
        recVisual2Title:"Watch before you read", recVisual2Desc:"Look for video explanations or infographics on the topic first.",
        recVisual3Title:"Color-code everything", recVisual3Desc:"Use different colors for different types of information.",
        recAuditory1Title:"Talk it through", recAuditory1Desc:"Explain concepts out loud or discuss them with a study partner.",
        recAuditory2Title:"Use audio resources", recAuditory2Desc:"Try podcasts, recorded lectures, or reading notes aloud.",
        recAuditory3Title:"Join study groups", recAuditory3Desc:"Group discussion helps you process information verbally.",
        recKinesthetic1Title:"Learn by doing", recKinesthetic1Desc:"Use hands-on activities, experiments, and real practice.",
        recKinesthetic2Title:"Take movement breaks", recKinesthetic2Desc:"Study in short bursts with physical breaks in between.",
        recKinesthetic3Title:"Use physical models", recKinesthetic3Desc:"Manipulate objects, flashcards, or models while studying.",
        recReading1Title:"Rewrite in your own words", recReading1Desc:"Summarize material in written form to reinforce it.",
        recReading2Title:"Read multiple sources", recReading2Desc:"Cross-reference textbooks, articles, and written guides.",
        recReading3Title:"Keep a written journal", recReading3Desc:"Track your learning progress through written reflection."
    },

    es:{
        sidebarSubtitle:"Panel del Maestro",
        navHome:"Inicio", navTest:"Examen", navStudents:"Estudiantes", navAssignments:"Tareas",
        navResources:"Recursos", navSchedule:"Horario", navBombi:"Bombi IA",
        roleTeacher:"Maestro", footerSettings:"Ajustes", footerLogout:"Cerrar sesi\u00f3n",
        backToDashboard:"Volver al Panel",
        testTitle:"Evaluaci\u00f3n de Estilo de Aprendizaje",
        testSubtitle:"Descubre c\u00f3mo aprendes mejor para personalizar tu experiencia.",
        progress:"Progreso",
        stepIntroName:"Introducci\u00f3n", stepIntroDesc:"Sobre el examen",
        stepQuestionsName:"Preguntas", stepQuestionsDesc:"Responde con honestidad",
        stepResultsName:"Resultados", stepResultsDesc:"Ve tu estilo",
        stepRecName:"Recomendaciones", stepRecDesc:"Recibe consejos personalizados",
        introTitle:"Sobre esta evaluaci\u00f3n",
        introDesc:"Responde 30 preguntas r\u00e1pidas sobre c\u00f3mo prefieres aprender. No hay respuestas correctas o incorrectas \u2014 solo s\u00e9 honesto para obtener los resultados m\u00e1s precisos.",
        startTest:"Comenzar Examen",
        testSections:"Secciones del Examen",
        needHelp:"\u00bfNecesitas ayuda?",
        needHelpDesc:"Mira este video corto para entender c\u00f3mo funciona el examen.",
        watchVideo:"Ver video",
        flagQuestion:"Marcar pregunta", unflagQuestion:"Marcada",
        previous:"Anterior", nextQuestion:"Siguiente Pregunta", finishTest:"Terminar Examen",
        yourProgress:"Tu Progreso", of30:"de 30",
        estimatedTime:"Tiempo Estimado",
        minRemaining:(n) => `${n} min restantes`, almostDone:"\u00a1Casi listo!",
        takeYourTime:"\u00a1T\u00f3mate tu tiempo!",
        takeYourTimeDesc:"No hay l\u00edmite de tiempo para esta evaluaci\u00f3n.",
        encourage1:"\u00a1Sigue as\u00ed! Lo est\u00e1s haciendo genial.",
        encourage2:"\u00a1Vas muy bien!",
        encourage3:"\u00a1Ya pasaste la mitad!",
        encourage4:"\u00a1Casi terminas, sigue as\u00ed!",
        resultsTitle:"Tus Resultados de Estilo de Aprendizaje",
        resultsDesc:"As\u00ed es como aprendes mejor, seg\u00fan tus respuestas.",
        dominantStyle:"Estilo dominante",
        seeRecommendations:"Ver Recomendaciones",
        recTitle:"Recomendaciones Personalizadas",
        recSubtitle:(style) => `Como tu estilo dominante es ${style}, aqu\u00ed tienes t\u00e9cnicas que funcionan mejor para ti.`,
        retakeTest:"Repetir Examen",
        visual:"Visual", auditory:"Auditivo", kinesthetic:"Kinest\u00e9sico", reading:"Lectura/Escritura",
        questionOf:(i, total) => `Pregunta ${i} de ${total}`,
        sectionQuestions:(n) => `${n} preguntas`,
        toastFlagAdded:"Pregunta marcada para revisar.",
        toastFlagRemoved:"Marca quitada.",
        toastVideo:"Reproduciendo video explicativo...",
        toastJumpSection:(name) => `Saltaste a "${name}".`,
        toastAnswerFirst:"Selecciona una respuesta antes de continuar.",
        toastRetake:"Examen reiniciado. \u00a1Buena suerte!",
        notifTitle:"Notificaciones",
        notif1Title:"Recordatorio de evaluaci\u00f3n", notif1Sub:"Vas al 33% de tu Evaluaci\u00f3n de Estilo de Aprendizaje",
        notif2Title:"Nuevo consejo de Bombi", notif2Sub:"La honestidad da recomendaciones m\u00e1s precisas",
        notif3Title:"Resumen semanal listo", notif3Sub:"Compara tu estilo de aprendizaje con el de tu clase",
        toastNotifOpen:"Abriendo notificaci\u00f3n...",
        profileSettings:"Configuraci\u00f3n de cuenta", profileHelp:"Ayuda y soporte", profileLogout:"Cerrar sesi\u00f3n",
        toastSettings:"Configuraci\u00f3n de cuenta: construye esta pantalla despu\u00e9s.",
        toastHelp:"Ayuda y soporte: construye esta pantalla despu\u00e9s.",
        toastLoggedOut:"Sesi\u00f3n cerrada.",
        recVisual1Title:"Usa mapas mentales", recVisual1Desc:"Convierte tus notas en diagramas, gr\u00e1ficos y colores.",
        recVisual2Title:"Mira antes de leer", recVisual2Desc:"Busca videos o infograf\u00edas sobre el tema primero.",
        recVisual3Title:"Codifica con colores", recVisual3Desc:"Usa colores distintos para cada tipo de informaci\u00f3n.",
        recAuditory1Title:"Habla en voz alta", recAuditory1Desc:"Explica los conceptos en voz alta o disc\u00fatelos con alguien.",
        recAuditory2Title:"Usa recursos de audio", recAuditory2Desc:"Prueba podcasts, clases grabadas o leer tus notas en voz alta.",
        recAuditory3Title:"\u00danete a grupos de estudio", recAuditory3Desc:"La discusi\u00f3n en grupo te ayuda a procesar la informaci\u00f3n hablando.",
        recKinesthetic1Title:"Aprende haciendo", recKinesthetic1Desc:"Usa actividades pr\u00e1cticas, experimentos y ejercicios reales.",
        recKinesthetic2Title:"Toma pausas activas", recKinesthetic2Desc:"Estudia en tramos cortos con pausas f\u00edsicas entre ellos.",
        recKinesthetic3Title:"Usa modelos f\u00edsicos", recKinesthetic3Desc:"Manipula objetos, tarjetas o modelos mientras estudias.",
        recReading1Title:"Reescribe con tus palabras", recReading1Desc:"Resume el material por escrito para reforzarlo.",
        recReading2Title:"Lee varias fuentes", recReading2Desc:"Cruza informaci\u00f3n entre libros, art\u00edculos y gu\u00edas escritas.",
        recReading3Title:"Lleva un diario escrito", recReading3Desc:"Registra tu progreso de aprendizaje reflexionando por escrito."
    }

};

function t(key){

    return I18N[currentLang][key];

}

function applyStaticTranslations(){

    document.querySelectorAll("[data-i18n]").forEach((el) => {

        const key = el.getAttribute("data-i18n");

        if(I18N[currentLang][key] !== undefined){

            el.textContent = I18N[currentLang][key];

        }

    });

    const langLabel = document.getElementById("langLabel");

    langLabel.textContent = currentLang.toUpperCase();

}

document.getElementById("langToggle").addEventListener("click", () => {

    currentLang = currentLang === "en" ? "es" : "en";

    applyStaticTranslations();

    renderCurrentStep();

    closeAllDropdowns();

});

/* ======================================================
                    THEME
====================================================== */

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const toggleCircle = themeToggle.querySelector(".toggle-circle");

function enableDarkMode(){ body.classList.remove("light-theme"); body.classList.add("dark-theme"); toggleCircle.style.left = "11px"; }
function enableLightMode(){ body.classList.remove("dark-theme"); body.classList.add("light-theme"); toggleCircle.style.left = "49px"; }

themeToggle.addEventListener("click", () => {

    body.classList.contains("dark-theme") ? enableLightMode() : enableDarkMode();

});

/* ======================================================
                MOBILE SIDEBAR TOGGLE
====================================================== */

const sidebarEl = document.querySelector(".sidebar");
const menuToggle = document.getElementById("menuToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar(){ sidebarEl.classList.add("open"); sidebarOverlay.classList.add("open"); }
function closeSidebar(){ sidebarEl.classList.remove("open"); sidebarOverlay.classList.remove("open"); }

menuToggle.addEventListener("click", () => {

    sidebarEl.classList.contains("open") ? closeSidebar() : openSidebar();

});

sidebarOverlay.addEventListener("click", closeSidebar);

/* ======================================================
                TOASTS
====================================================== */

const toastContainer = document.getElementById("toastContainer");

function showToast(message, icon){

    const toast = document.createElement("div");

    toast.classList.add("toast");

    toast.innerHTML = `<div class="toast-icon"><i data-lucide="${icon}"></i></div><span>${message}</span>`;

    toastContainer.appendChild(toast);

    refreshIcons();

    setTimeout(() => {

        toast.classList.add("leaving");

        setTimeout(() => toast.remove(), 250);

    }, 3200);

}

/* ======================================================
                DROPDOWNS (notificaciones / perfil)
====================================================== */

const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const profileBtn = document.getElementById("profileBtn");
const profilePanel = document.getElementById("profilePanel");

function closeAllDropdowns(){

    [notificationPanel, profilePanel].forEach((p) => p.classList.remove("open"));

}

function toggleDropdown(panel){

    const wasOpen = panel.classList.contains("open");

    closeAllDropdowns();

    if(!wasOpen){ panel.classList.add("open"); }

}

function renderNotificationPanel(){

    notificationPanel.innerHTML = `
        <div class="dropdown-panel-title">${t("notifTitle")}</div>
        <button class="dropdown-item"><i data-lucide="bell-ring"></i><span>${t("notif1Title")}<div class="item-sub">${t("notif1Sub")}</div></span></button>
        <button class="dropdown-item"><i data-lucide="lightbulb"></i><span>${t("notif2Title")}<div class="item-sub">${t("notif2Sub")}</div></span></button>
        <button class="dropdown-item"><i data-lucide="bar-chart-3"></i><span>${t("notif3Title")}<div class="item-sub">${t("notif3Sub")}</div></span></button>
    `;

    notificationPanel.querySelectorAll(".dropdown-item").forEach((btn) => {

        btn.addEventListener("click", () => { closeAllDropdowns(); showToast(t("toastNotifOpen"), "bell"); });

    });

    refreshIcons();

}

function renderProfilePanel(){

    profilePanel.innerHTML = `
        <button class="dropdown-item" data-profile-action="settings"><i data-lucide="settings"></i><span>${t("profileSettings")}</span></button>
        <button class="dropdown-item" data-profile-action="help"><i data-lucide="circle-help"></i><span>${t("profileHelp")}</span></button>
        <button class="dropdown-item delete-item" data-profile-action="logout"><i data-lucide="log-out"></i><span>${t("profileLogout")}</span></button>
    `;

    profilePanel.querySelectorAll(".dropdown-item").forEach((btn) => {

        btn.addEventListener("click", async () => {

            closeAllDropdowns();

            const action = btn.dataset.profileAction;

            if(action === "settings"){ showToast(t("toastSettings"), "settings"); }
            else if(action === "help"){ showToast(t("toastHelp"), "circle-help"); }
            else if(action === "logout"){

                // TODO: ajusta la ruta de redirecci\u00f3n a tu p\u00e1gina real de Login Teacher.

                if(db){ try{ await db.auth.signOut(); } catch(err){ console.warn(err); } }

                showToast(t("toastLoggedOut"), "log-out");

                setTimeout(() => { window.location.href = "../LOGIN Teacher/TEACHER LOGIN.html"; }, 800);

            }

        });

    });

    refreshIcons();

}

notificationBtn.addEventListener("click", (e) => { e.stopPropagation(); renderNotificationPanel(); toggleDropdown(notificationPanel); });
profileBtn.addEventListener("click", (e) => { e.stopPropagation(); renderProfilePanel(); toggleDropdown(profilePanel); });

document.addEventListener("click", closeAllDropdowns);

/* ======================================================
                BANCO DE PREGUNTAS (VARK)
    Contenido de ejemplo. TODO: reemplazar por preguntas
    reales cargadas desde una tabla "assessment_questions"
    en Supabase cuando est\u00e9 lista.
====================================================== */

const sections = [
    { id:"preferences", name:"Learning Preferences", color:"#7C5CFF", count:10 },
    { id:"habits", name:"Study Habits", color:"#00D4FF", count:10 },
    { id:"environment", name:"Learning Environment", color:"#22C55E", count:5 },
    { id:"problem", name:"Problem Solving", color:"#F59E0B", count:5 }
];

function opt(style, text){

    const iconMap = { visual:"eye", auditory:"headphones", kinesthetic:"hand", reading:"book-open" };

    return { style, icon:iconMap[style], text };

}

const questions = [

    // --- Learning Preferences (10) ---
    { sectionId:"preferences", text:"When I try to learn something new, what helps me the most?",
      options:[ opt("visual","Seeing diagrams, charts, or images."), opt("auditory","Listening to explanations or discussions."), opt("kinesthetic","Doing hands-on activities or practice."), opt("reading","Reading written instructions or texts.") ] },
    { sectionId:"preferences", text:"How do you prefer to receive instructions for a new task?",
      options:[ opt("visual","Watching a demonstration."), opt("auditory","Having someone explain it verbally."), opt("kinesthetic","Trying it myself with guidance."), opt("reading","Reading a step-by-step manual.") ] },
    { sectionId:"preferences", text:"When studying for a test, what do you find most helpful?",
      options:[ opt("visual","Reviewing color-coded notes or mind maps."), opt("auditory","Discussing the material out loud with someone."), opt("kinesthetic","Using flashcards or practice problems."), opt("reading","Rewriting notes in your own words.") ] },
    { sectionId:"preferences", text:"What helps you remember new information best?",
      options:[ opt("visual","Visual images or diagrams."), opt("auditory","Repeating it aloud."), opt("kinesthetic","Physically doing something related to it."), opt("reading","Writing it down.") ] },
    { sectionId:"preferences", text:"In a classroom, which activity engages you the most?",
      options:[ opt("visual","Watching a video or slideshow."), opt("auditory","Group discussions."), opt("kinesthetic","Lab experiments or building things."), opt("reading","Independent reading assignments.") ] },
    { sectionId:"preferences", text:"When learning a new skill, you prefer to:",
      options:[ opt("visual","Watch someone else do it first."), opt("auditory","Listen to detailed verbal instructions."), opt("kinesthetic","Jump in and try it yourself."), opt("reading","Read the instructions carefully first.") ] },
    { sectionId:"preferences", text:"Which best describes your ideal way to learn a new language?",
      options:[ opt("visual","Flashcards with images."), opt("auditory","Listening to conversations and podcasts."), opt("kinesthetic","Practicing conversations with people."), opt("reading","Reading grammar books and articles.") ] },
    { sectionId:"preferences", text:"What kind of feedback helps you improve the most?",
      options:[ opt("visual","A visual chart of your progress."), opt("auditory","A verbal conversation about your performance."), opt("kinesthetic","Hands-on correction while doing the task."), opt("reading","Written comments and notes.") ] },
    { sectionId:"preferences", text:"When following directions to a new place, you prefer:",
      options:[ opt("visual","A map or visual guide."), opt("auditory","Someone telling you the directions."), opt("kinesthetic","Walking the route once with someone."), opt("reading","Written turn-by-turn directions.") ] },
    { sectionId:"preferences", text:"How do you best understand a complicated concept?",
      options:[ opt("visual","Through diagrams and visual models."), opt("auditory","Through spoken explanation and discussion."), opt("kinesthetic","Through a hands-on demonstration."), opt("reading","Through detailed written text.") ] },

    // --- Study Habits (10) ---
    { sectionId:"habits", text:"When preparing for an exam, you usually:",
      options:[ opt("visual","Create visual study guides or mind maps."), opt("auditory","Study with a group and talk through the material."), opt("kinesthetic","Do practice questions and mock exams."), opt("reading","Read and re-read your notes and textbook.") ] },
    { sectionId:"habits", text:"Where do you prefer to study?",
      options:[ opt("visual","Somewhere with visual aids like posters or charts."), opt("auditory","Somewhere you can discuss topics with others."), opt("kinesthetic","Somewhere you can move around or use materials."), opt("reading","A quiet space perfect for reading.") ] },
    { sectionId:"habits", text:"How do you organize your study notes?",
      options:[ opt("visual","With colors, highlights, and diagrams."), opt("auditory","I prefer recording voice notes or discussions."), opt("kinesthetic","I use physical flashcards I can sort and handle."), opt("reading","In detailed written paragraphs.") ] },
    { sectionId:"habits", text:"What's your go-to method when you don't understand something?",
      options:[ opt("visual","Look for a video or image that explains it."), opt("auditory","Ask someone to explain it to me."), opt("kinesthetic","Try to work through it hands-on."), opt("reading","Look it up and read about it.") ] },
    { sectionId:"habits", text:"How long can you focus while reading a textbook?",
      options:[ opt("visual","I get more from skimming and looking at figures."), opt("auditory","I prefer listening to an audiobook version instead."), opt("kinesthetic","I need to take breaks and move around often."), opt("reading","I can focus for long periods of reading.") ] },
    { sectionId:"habits", text:"When taking notes in class, you tend to:",
      options:[ opt("visual","Draw diagrams and use color-coding."), opt("auditory","Record the lecture or repeat it out loud later."), opt("kinesthetic","Write key actions or steps to try later."), opt("reading","Write detailed, thorough notes.") ] },
    { sectionId:"habits", text:"What motivates you to keep studying?",
      options:[ opt("visual","Seeing visual progress, like a chart or graph."), opt("auditory","Talking through goals with someone."), opt("kinesthetic","Completing hands-on milestones."), opt("reading","Tracking progress in a written journal.") ] },
    { sectionId:"habits", text:"When reviewing past mistakes, you prefer to:",
      options:[ opt("visual","See a visual breakdown of what went wrong."), opt("auditory","Talk it through with a teacher or peer."), opt("kinesthetic","Redo the task differently to correct it."), opt("reading","Read a detailed written explanation.") ] },
    { sectionId:"habits", text:"Which study tool do you use most often?",
      options:[ opt("visual","Mind maps or visual charts."), opt("auditory","Study groups or discussion recordings."), opt("kinesthetic","Practice problem sets."), opt("reading","Textbooks and written summaries.") ] },
    { sectionId:"habits", text:"What helps you stay engaged during a long study session?",
      options:[ opt("visual","Switching between visual materials."), opt("auditory","Studying out loud or with music/podcasts."), opt("kinesthetic","Taking hands-on breaks between topics."), opt("reading","Reading different written sources.") ] },

    // --- Learning Environment (5) ---
    { sectionId:"environment", text:"Which classroom environment helps you focus best?",
      options:[ opt("visual","One with visual displays and organized materials."), opt("auditory","One that allows for group discussion."), opt("kinesthetic","One with room to move and use hands-on materials."), opt("reading","A quiet, distraction-free reading space.") ] },
    { sectionId:"environment", text:"What kind of background noise helps or hurts your focus?",
      options:[ opt("visual","I focus best in a visually clean and quiet space."), opt("auditory","I focus better with some background talking or music."), opt("kinesthetic","I don't mind noise if I'm doing something active."), opt("reading","I need complete silence to read and focus.") ] },
    { sectionId:"environment", text:"How do you feel about working in groups vs alone?",
      options:[ opt("visual","I prefer seeing everyone's visual contributions."), opt("auditory","I thrive in group discussions."), opt("kinesthetic","I like group activities that involve doing things."), opt("reading","I prefer working alone with written materials.") ] },
    { sectionId:"environment", text:"What kind of classroom decor helps you learn?",
      options:[ opt("visual","Colorful posters, charts, and visual aids."), opt("auditory","I don't focus much on decor, more on discussion."), opt("kinesthetic","Hands-on stations and interactive displays."), opt("reading","A simple space with books and reading materials.") ] },
    { sectionId:"environment", text:"Which seating arrangement do you prefer?",
      options:[ opt("visual","Somewhere I can see the board or screen clearly."), opt("auditory","Somewhere I can hear and participate in discussion."), opt("kinesthetic","Somewhere with room to move or use materials."), opt("reading","A quiet corner for focused reading.") ] },

    // --- Problem Solving (5) ---
    { sectionId:"problem", text:"When solving a difficult problem, you first:",
      options:[ opt("visual","Draw a diagram or sketch it out."), opt("auditory","Talk through the problem out loud."), opt("kinesthetic","Try different hands-on approaches."), opt("reading","Write out the problem step by step.") ] },
    { sectionId:"problem", text:"How do you prefer to approach a group project?",
      options:[ opt("visual","Create a visual plan or storyboard."), opt("auditory","Discuss and divide roles verbally."), opt("kinesthetic","Jump into hands-on tasks first."), opt("reading","Write out a detailed project outline.") ] },
    { sectionId:"problem", text:"When stuck on a math problem, you tend to:",
      options:[ opt("visual","Look for a visual pattern or graph."), opt("auditory","Talk through the steps with someone."), opt("kinesthetic","Try solving it with physical objects or models."), opt("reading","Re-read the problem and instructions carefully.") ] },
    { sectionId:"problem", text:"What helps you solve puzzles or riddles?",
      options:[ opt("visual","Visualizing the pieces or patterns."), opt("auditory","Talking it through with someone else."), opt("kinesthetic","Physically manipulating the pieces."), opt("reading","Reading through the clues carefully.") ] },
    { sectionId:"problem", text:"When debugging an error, you typically:",
      options:[ opt("visual","Look for a visual error highlight or diagram."), opt("auditory","Explain the problem out loud to find the issue."), opt("kinesthetic","Try different fixes hands-on until it works."), opt("reading","Carefully read through the code or instructions.") ] }

];

/* ======================================================
                STATE
====================================================== */

let currentStep = "intro"; // intro | questions | results | recommendations
let currentIndex = 0;
let answers = {}; // { questionIndex: style }
let flags = {};   // { questionIndex: true }

const AVG_SECONDS_PER_QUESTION = 30;

/* ======================================================
                STEP TRACKER
====================================================== */

const stepTracker = document.getElementById("stepTracker");

const stepOrder = ["intro", "questions", "results", "recommendations"];

function stepIsUnlocked(step){

    if(step === "intro"){ return true; }

    if(step === "questions"){ return true; }

    if(step === "results"){ return Object.keys(answers).length === questions.length; }

    if(step === "recommendations"){ return Object.keys(answers).length === questions.length; }

    return false;

}

function renderStepTracker(){

    const steps = [
        { key:"intro", name:t("stepIntroName"), desc:t("stepIntroDesc") },
        { key:"questions", name:t("stepQuestionsName"), desc:t("stepQuestionsDesc") },
        { key:"results", name:t("stepResultsName"), desc:t("stepResultsDesc") },
        { key:"recommendations", name:t("stepRecName"), desc:t("stepRecDesc") }
    ];

    let html = "";

    steps.forEach((s, i) => {

        const idx = i + 1;

        const isActive = currentStep === s.key;

        const isDone = stepOrder.indexOf(currentStep) > stepOrder.indexOf(s.key);

        html += `
            <button class="step-item ${isActive ? "active" : ""} ${isDone ? "done" : ""}" data-step="${s.key}">
                <div class="step-circle">${idx}</div>
                <div class="step-label"><strong>${s.name}</strong><span>${s.desc}</span></div>
            </button>
        `;

        if(i < steps.length - 1){

            html += `<div class="step-connector ${isDone ? "done" : ""}"></div>`;

        }

    });

    stepTracker.innerHTML = html;

    stepTracker.querySelectorAll(".step-item").forEach((btn) => {

        btn.addEventListener("click", () => {

            const target = btn.dataset.step;

            if(!stepIsUnlocked(target)){

                showToast(t("toastAnswerFirst"), "lock");

                return;

            }

            goToStep(target);

        });

    });

}

/* ======================================================
                NAVEGACI\u00d3N ENTRE PASOS
====================================================== */

function goToStep(step){

    currentStep = step;

    ["introStep", "questionStep", "resultsStep", "recommendationsStep"].forEach((id) => {

        document.getElementById(id).classList.remove("visible");

    });

    const map = { intro:"introStep", questions:"questionStep", results:"resultsStep", recommendations:"recommendationsStep" };

    document.getElementById(map[step]).classList.add("visible");

    renderCurrentStep();

    window.scrollTo({ top:0, behavior:"smooth" });

}

function renderCurrentStep(){

    renderStepTracker();
    renderHeroProgress();

    if(currentStep === "intro"){ renderIntro(); }
    else if(currentStep === "questions"){ renderQuestion(); renderSectionList(); }
    else if(currentStep === "results"){ renderResults(); }
    else if(currentStep === "recommendations"){ renderRecommendations(); }

}

/* ======================================================
                HERO PROGRESS
====================================================== */

function renderHeroProgress(){

    const answeredCount = Object.keys(answers).length;

    const pct = Math.round((answeredCount / questions.length) * 100);

    document.getElementById("heroProgressPct").textContent = `${pct}%`;

    document.getElementById("heroProgressFill").style.width = `${pct}%`;

    document.getElementById("heroProgressSub").textContent = `${answeredCount} ${currentLang === "es" ? "de" : "of"} ${questions.length} ${currentLang === "es" ? "preguntas" : "questions"}`;

}

/* ======================================================
                INTRO STEP
====================================================== */

const introSectionsEl = document.getElementById("introSections");

function renderIntro(){

    introSectionsEl.innerHTML = sections.map((s) => `
        <div class="intro-section-item">
            <span class="intro-section-dot" style="background:${s.color};"></span>
            <div><strong>${s.name}</strong><span>${t("sectionQuestions")(s.count)}</span></div>
        </div>
    `).join("");

}

document.getElementById("startTestBtn").addEventListener("click", () => {

    goToStep("questions");

});

/* ======================================================
                SECTION LIST (columna izquierda)
====================================================== */

const sectionListEl = document.getElementById("sectionList");

function currentSectionId(){

    return questions[currentIndex].sectionId;

}

function renderSectionList(){

    sectionListEl.innerHTML = sections.map((s) => `
        <div class="section-item ${s.id === currentSectionId() ? "active" : ""}" data-section="${s.id}">
            <span class="section-dot" style="background:${s.color};"></span>
            <div><strong>${s.name}</strong><span>${t("sectionQuestions")(s.count)}</span></div>
        </div>
    `).join("");

    sectionListEl.querySelectorAll(".section-item").forEach((item) => {

        item.addEventListener("click", () => {

            const sectionId = item.dataset.section;

            const firstIndex = questions.findIndex((q) => q.sectionId === sectionId);

            currentIndex = firstIndex;

            renderQuestion();
            renderSectionList();

            const sectionName = sections.find((s) => s.id === sectionId).name;

            showToast(t("toastJumpSection")(sectionName), "corner-down-right");

        });

    });

}

document.getElementById("watchVideoBtn").addEventListener("click", () => {

    // TODO: reemplazar por un video real o embed

    showToast(t("toastVideo"), "play-circle");

});

/* ======================================================
                QUESTION CARD
====================================================== */

const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const flagBtn = document.getElementById("flagBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function renderQuestion(){

    const q = questions[currentIndex];

    questionCounter.textContent = t("questionOf")(currentIndex + 1, questions.length);

    questionText.textContent = q.text;

    flagBtn.classList.toggle("active", !!flags[currentIndex]);

    flagBtn.querySelector("span").textContent = flags[currentIndex] ? t("unflagQuestion") : t("flagQuestion");

    const letters = ["A", "B", "C", "D"];

    optionsList.innerHTML = q.options.map((o, i) => `
        <div class="option-row ${answers[currentIndex] === o.style ? "selected" : ""}" data-style="${o.style}">
            <div class="option-icon ${o.style}"><i data-lucide="${o.icon}"></i></div>
            <div class="option-letter">${letters[i]}</div>
            <span class="option-text">${o.text}</span>
            <div class="option-radio"></div>
        </div>
    `).join("");

    optionsList.querySelectorAll(".option-row").forEach((row) => {

        row.addEventListener("click", () => {

            answers[currentIndex] = row.dataset.style;

            renderQuestion();
            renderHeroProgress();
            renderMiniProgress();
            renderEstimatedTime();
            renderStepTracker();

        });

    });

    prevBtn.disabled = currentIndex === 0;

    nextBtn.querySelector("span").textContent = currentIndex === questions.length - 1 ? t("finishTest") : t("nextQuestion");

    renderMiniProgress();
    renderEstimatedTime();

    refreshIcons();

}

flagBtn.addEventListener("click", () => {

    flags[currentIndex] = !flags[currentIndex];

    renderQuestion();

    showToast(flags[currentIndex] ? t("toastFlagAdded") : t("toastFlagRemoved"), "flag");

});

prevBtn.addEventListener("click", () => {

    if(currentIndex > 0){

        currentIndex--;

        renderQuestion();
        renderSectionList();

    }

});

nextBtn.addEventListener("click", () => {

    if(answers[currentIndex] === undefined){

        showToast(t("toastAnswerFirst"), "triangle-alert");

        return;

    }

    if(currentIndex < questions.length - 1){

        currentIndex++;

        renderQuestion();
        renderSectionList();

    }
    else{

        goToStep("results");

    }

});

/* ======================================================
                MINI PROGRESS RING + TIEMPO ESTIMADO
====================================================== */

function renderMiniProgress(){

    const answeredCount = Object.keys(answers).length;

    const pct = Math.round((answeredCount / questions.length) * 100);

    document.getElementById("miniProgressRing").style.setProperty("--pct", pct);

    document.getElementById("miniProgressCount").textContent = answeredCount;

    const encourageText = document.getElementById("encourageText");

    if(pct >= 90){ encourageText.textContent = t("encourage4"); }
    else if(pct >= 50){ encourageText.textContent = t("encourage3"); }
    else if(pct >= 20){ encourageText.textContent = t("encourage2"); }
    else{ encourageText.textContent = t("encourage1"); }

}

function renderEstimatedTime(){

    const remainingQuestions = questions.length - Object.keys(answers).length;

    const remainingMinutes = Math.max(1, Math.round((remainingQuestions * AVG_SECONDS_PER_QUESTION) / 60));

    const el = document.getElementById("estimatedTimeText");

    el.textContent = remainingQuestions === 0 ? t("almostDone") : t("minRemaining")(remainingMinutes);

}

/* ======================================================
                RESULTS STEP
====================================================== */

const resultsDonut = document.getElementById("resultsDonut");
const resultsLegend = document.getElementById("resultsLegend");
const dominantStyleLabel = document.getElementById("dominantStyleLabel");

const styleColors = { visual:"#7C5CFF", auditory:"#00D4FF", kinesthetic:"#22C55E", reading:"#F59E0B" };

function computeStyleCounts(){

    const counts = { visual:0, auditory:0, kinesthetic:0, reading:0 };

    Object.values(answers).forEach((style) => { counts[style]++; });

    return counts;

}

function renderResults(){

    const counts = computeStyleCounts();

    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

    const pct = {
        visual: Math.round((counts.visual / total) * 100),
        auditory: Math.round((counts.auditory / total) * 100),
        kinesthetic: Math.round((counts.kinesthetic / total) * 100),
        reading: Math.round((counts.reading / total) * 100)
    };

    resultsDonut.style.setProperty("--v-end", `${pct.visual}%`);
    resultsDonut.style.setProperty("--a-end", `${pct.visual + pct.auditory}%`);
    resultsDonut.style.setProperty("--k-end", `${pct.visual + pct.auditory + pct.kinesthetic}%`);

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

    dominantStyleLabel.textContent = t(dominant);

    resultsLegend.innerHTML = `
        <li><span class="legend-dot" style="background:${styleColors.visual};"></span>${t("visual")}<strong>${pct.visual}%</strong></li>
        <li><span class="legend-dot" style="background:${styleColors.auditory};"></span>${t("auditory")}<strong>${pct.auditory}%</strong></li>
        <li><span class="legend-dot" style="background:${styleColors.kinesthetic};"></span>${t("kinesthetic")}<strong>${pct.kinesthetic}%</strong></li>
        <li><span class="legend-dot" style="background:${styleColors.reading};"></span>${t("reading")}<strong>${pct.reading}%</strong></li>
    `;

}

document.getElementById("seeRecommendationsBtn").addEventListener("click", () => {

    goToStep("recommendations");

});

/* ======================================================
                RECOMMENDATIONS STEP
====================================================== */

const recGrid = document.getElementById("recGrid");
const recSubtitle = document.getElementById("recSubtitle");

const recIconMap = { visual:"eye", auditory:"headphones", kinesthetic:"hand", reading:"book-open" };

function renderRecommendations(){

    const counts = computeStyleCounts();

    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

    recSubtitle.textContent = t("recSubtitle")(t(dominant));

    const prefix = dominant.charAt(0).toUpperCase() + dominant.slice(1);

    const items = [1, 2, 3].map((n) => ({

        title: t(`rec${prefix}${n}Title`),
        desc: t(`rec${prefix}${n}Desc`)

    }));

    recGrid.innerHTML = items.map((it) => `
        <div class="rec-item">
            <div class="rec-item-icon"><i data-lucide="${recIconMap[dominant]}"></i></div>
            <h4>${it.title}</h4>
            <p>${it.desc}</p>
        </div>
    `).join("");

    refreshIcons();

}

document.getElementById("retakeTestBtn").addEventListener("click", () => {

    answers = {};
    flags = {};
    currentIndex = 0;

    goToStep("intro");

    showToast(t("toastRetake"), "rotate-ccw");

});

/* ======================================================
                INITIALIZE
====================================================== */

async function init(){

    if(db){

        try{

            const { data:{ session } } = await db.auth.getSession();

            if(session){ currentUserId = session.user.id; }

        }
        catch(err){

            console.warn("Supabase no disponible en este entorno, usando datos de ejemplo.", err);

        }

    }

    // TODO: cuando tengas una tabla real "assessment_answers", carga aqu\u00ed
    // las respuestas guardadas del usuario para retomar donde se qued\u00f3.

    applyStaticTranslations();

    goToStep("intro");

    console.log("Thinking Learning Style Assessment Loaded \ud83d\ude80");

}

init();
