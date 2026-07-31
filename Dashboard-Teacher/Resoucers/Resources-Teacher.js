/* ======================================================
                    THINKING
        TEACHER RESOURCES SCREEN
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
        searchPlaceholder:"Search resources...",
        pageTitle:"Resources", pageSubtitle:"Discover, create and share resources to enhance learning.",
        addResource:"Add Resource",
        qcMyResources:"My Resources", qcMyResourcesNote:"Resources created",
        qcShared:"Shared with Me", qcSharedNote:"Resources shared",
        qcFavorites:"Favorites", qcFavoritesNote:"Saved resources",
        qcUpload:"Upload New", qcUploadNote:"Add your own resources",
        browseByCategory:"Browse by Category", viewAll:"View all",
        catAll:"All", catDocuments:"Documents", catPresentations:"Presentations",
        catVideos:"Videos", catWorksheets:"Worksheets", catLinks:"Links",
        resourceLibrary:"Resource Library",
        sortRecent:"Most Recent", sortAZ:"Name A \u2013 Z", sortLargest:"Largest file",
        loadMore:"Load more resources",
        shareBannerTitle:"Share knowledge, inspire minds",
        shareBannerSub:"Upload and share resources that make a difference in your students' learning journey.",
        learnShare:"Learn how to share",
        addResourceModalTitle:"Add Resource", editResourceModalTitle:"Edit Resource",
        fieldName:"Name", fieldNamePlaceholder:"e.g. Study Techniques Guide",
        fieldType:"Type", fieldTag:"Tag", fieldTagPlaceholder:"e.g. Study Skills",
        fieldSize:"File size label",
        modalCancel:"Cancel", modalCreate:"Create", modalSave:"Save",
        renameModalTitle:"Rename resource",
        confirmDeleteBtn:"Delete",
        confirmDeleteTitle:"Delete resource?",
        confirmDeleteMsg:(title) => `This will permanently remove "${title}". This can't be undone.`,
        toastCreated:(title) => `"${title}" added to your library.`,
        toastRenamed:(title) => `Renamed to "${title}".`,
        toastDeleted:"Resource deleted.",
        toastFavAdded:(title) => `"${title}" added to Favorites.`,
        toastFavRemoved:(title) => `"${title}" removed from Favorites.`,
        toastViewing:(title) => `Opening "${title}"...`,
        toastDownloading:(title) => `Downloading "${title}"...`,
        toastShared:(title) => `Share link for "${title}" copied.`,
        noMatch:"No resources match this view yet.",
        notifTitle:"Notifications",
        notif1Title:"New resource shared with you", notif1Sub:"\"Active Learning Strategies\" from Maria G.",
        notif2Title:"Storage almost full", notif2Sub:"You've used 82% of your resource storage",
        notif3Title:"Weekly digest ready", notif3Sub:"See what your students viewed most this week",
        toastNotifOpen:"Opening notification...",
        profileSettings:"Account settings", profileHelp:"Help & support", profileLogout:"Log out",
        toastSettings:"Account settings: build this screen next.",
        toastHelp:"Help & support: build this screen next.",
        toastLoggedOut:"Logged out.",
        toastLearnShare:"Learn how to share: build this help article next.",
        toastViewAll:"Showing every resource across all categories.",
        menuView:"View", menuDownload:"Download", menuShare:"Share", menuRename:"Rename", menuDelete:"Delete"
    },

    es:{
        sidebarSubtitle:"Panel del Maestro",
        navHome:"Inicio", navTest:"Examen", navStudents:"Estudiantes", navAssignments:"Tareas",
        navResources:"Recursos", navSchedule:"Horario", navBombi:"Bombi IA",
        roleTeacher:"Maestro", footerSettings:"Ajustes", footerLogout:"Cerrar sesi\u00f3n",
        searchPlaceholder:"Buscar recursos...",
        pageTitle:"Recursos", pageSubtitle:"Descubre, crea y comparte recursos para enriquecer el aprendizaje.",
        addResource:"Agregar Recurso",
        qcMyResources:"Mis Recursos", qcMyResourcesNote:"Recursos creados",
        qcShared:"Compartidos Conmigo", qcSharedNote:"Recursos compartidos",
        qcFavorites:"Favoritos", qcFavoritesNote:"Recursos guardados",
        qcUpload:"Subir Nuevo", qcUploadNote:"Agrega tus propios recursos",
        browseByCategory:"Explorar por Categor\u00eda", viewAll:"Ver todo",
        catAll:"Todos", catDocuments:"Documentos", catPresentations:"Presentaciones",
        catVideos:"Videos", catWorksheets:"Hojas de Trabajo", catLinks:"Enlaces",
        resourceLibrary:"Biblioteca de Recursos",
        sortRecent:"M\u00e1s Recientes", sortAZ:"Nombre A \u2013 Z", sortLargest:"Archivo m\u00e1s grande",
        loadMore:"Ver m\u00e1s recursos",
        shareBannerTitle:"Comparte conocimiento, inspira mentes",
        shareBannerSub:"Sube y comparte recursos que marquen la diferencia en el aprendizaje de tus estudiantes.",
        learnShare:"Aprende a compartir",
        addResourceModalTitle:"Agregar Recurso", editResourceModalTitle:"Editar Recurso",
        fieldName:"Nombre", fieldNamePlaceholder:"ej. Gu\u00eda de T\u00e9cnicas de Estudio",
        fieldType:"Tipo", fieldTag:"Etiqueta", fieldTagPlaceholder:"ej. Habilidades de Estudio",
        fieldSize:"Etiqueta de tama\u00f1o",
        modalCancel:"Cancelar", modalCreate:"Crear", modalSave:"Guardar",
        renameModalTitle:"Renombrar recurso",
        confirmDeleteBtn:"Eliminar",
        confirmDeleteTitle:"\u00bfEliminar recurso?",
        confirmDeleteMsg:(title) => `Esto eliminar\u00e1 permanentemente "${title}". No se puede deshacer.`,
        toastCreated:(title) => `"${title}" agregado a tu biblioteca.`,
        toastRenamed:(title) => `Renombrado a "${title}".`,
        toastDeleted:"Recurso eliminado.",
        toastFavAdded:(title) => `"${title}" agregado a Favoritos.`,
        toastFavRemoved:(title) => `"${title}" quitado de Favoritos.`,
        toastViewing:(title) => `Abriendo "${title}"...`,
        toastDownloading:(title) => `Descargando "${title}"...`,
        toastShared:(title) => `Link para compartir "${title}" copiado.`,
        noMatch:"Ning\u00fan recurso coincide con esta vista todav\u00eda.",
        notifTitle:"Notificaciones",
        notif1Title:"Nuevo recurso compartido contigo", notif1Sub:"\"Active Learning Strategies\" de Mar\u00eda G.",
        notif2Title:"Almacenamiento casi lleno", notif2Sub:"Has usado el 82% de tu almacenamiento de recursos",
        notif3Title:"Resumen semanal listo", notif3Sub:"Mira qu\u00e9 vieron m\u00e1s tus estudiantes esta semana",
        toastNotifOpen:"Abriendo notificaci\u00f3n...",
        profileSettings:"Configuraci\u00f3n de cuenta", profileHelp:"Ayuda y soporte", profileLogout:"Cerrar sesi\u00f3n",
        toastSettings:"Configuraci\u00f3n de cuenta: construye esta pantalla despu\u00e9s.",
        toastHelp:"Ayuda y soporte: construye esta pantalla despu\u00e9s.",
        toastLoggedOut:"Sesi\u00f3n cerrada.",
        toastLearnShare:"Aprende a compartir: construye este art\u00edculo de ayuda despu\u00e9s.",
        toastViewAll:"Mostrando todos los recursos de todas las categor\u00edas.",
        menuView:"Ver", menuDownload:"Descargar", menuShare:"Compartir", menuRename:"Renombrar", menuDelete:"Eliminar"
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

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {

        const key = el.getAttribute("data-i18n-placeholder");

        if(I18N[currentLang][key] !== undefined){

            el.setAttribute("placeholder", I18N[currentLang][key]);

        }

    });

    const langLabel = document.getElementById("langLabel");

    langLabel.textContent = currentLang.toUpperCase();

}

document.getElementById("langToggle").addEventListener("click", () => {

    currentLang = currentLang === "en" ? "es" : "en";

    applyStaticTranslations();

    renderAll();

    closeAllDropdowns();
    closeFloatingMenu();

});

/* ======================================================
                    THEME
====================================================== */

const body = document.body;

const themeToggle = document.getElementById("themeToggle");

const toggleCircle = themeToggle.querySelector(".toggle-circle");

function enableDarkMode(){

    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    toggleCircle.style.left = "11px";

}

function enableLightMode(){

    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    toggleCircle.style.left = "49px";

}

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

    toast.innerHTML = `
        <div class="toast-icon"><i data-lucide="${icon}"></i></div>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    refreshIcons();

    setTimeout(() => {

        toast.classList.add("leaving");

        setTimeout(() => toast.remove(), 250);

    }, 3200);

}

/* ======================================================
                DROPDOWNS (notificaciones / perfil / orden)
====================================================== */

const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const profileBtn = document.getElementById("profileBtn");
const profilePanel = document.getElementById("profilePanel");
const sortBtn = document.getElementById("sortBtn");
const sortPanel = document.getElementById("sortPanel");

function closeAllDropdowns(){

    [notificationPanel, profilePanel, sortPanel].forEach((p) => p.classList.remove("open"));

}

function toggleDropdown(panel){

    const wasOpen = panel.classList.contains("open");

    closeAllDropdowns();

    if(!wasOpen){ panel.classList.add("open"); }

}

function renderNotificationPanel(){

    notificationPanel.innerHTML = `
        <div class="dropdown-panel-title">${t("notifTitle")}</div>
        <button class="dropdown-item">
            <i data-lucide="share-2"></i>
            <span>${t("notif1Title")}<div class="item-sub">${t("notif1Sub")}</div></span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="database"></i>
            <span>${t("notif2Title")}<div class="item-sub">${t("notif2Sub")}</div></span>
        </button>
        <button class="dropdown-item">
            <i data-lucide="bar-chart-3"></i>
            <span>${t("notif3Title")}<div class="item-sub">${t("notif3Sub")}</div></span>
        </button>
    `;

    notificationPanel.querySelectorAll(".dropdown-item").forEach((btn) => {

        btn.addEventListener("click", () => {

            closeAllDropdowns();

            showToast(t("toastNotifOpen"), "bell");

        });

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

            if(action === "settings"){

                showToast(t("toastSettings"), "settings");

            }
            else if(action === "help"){

                showToast(t("toastHelp"), "circle-help");

            }
            else if(action === "logout"){

                // TODO: ajusta la ruta de redirecci\u00f3n a tu p\u00e1gina real de Login Teacher.

                if(db){

                    try{ await db.auth.signOut(); }
                    catch(err){ console.warn("No se pudo cerrar sesi\u00f3n en Supabase:", err); }

                }

                showToast(t("toastLoggedOut"), "log-out");

                setTimeout(() => {

                    window.location.href = "../LOGIN Teacher/TEACHER LOGIN.html";

                }, 800);

            }

        });

    });

    refreshIcons();

}

function renderSortPanel(){

    const options = [
        { key:"recent", label:t("sortRecent") },
        { key:"az", label:t("sortAZ") },
        { key:"largest", label:t("sortLargest") }
    ];

    sortPanel.innerHTML = options.map((opt) => `
        <button class="dropdown-item ${sortMode === opt.key ? "active-filter" : ""}" data-sort="${opt.key}">
            <i data-lucide="arrow-down-up"></i>
            <span>${opt.label}</span>
        </button>
    `).join("");

    sortPanel.querySelectorAll(".dropdown-item").forEach((btn) => {

        btn.addEventListener("click", () => {

            sortMode = btn.dataset.sort;

            document.getElementById("sortLabel").textContent = options.find((o) => o.key === sortMode).label;

            renderResourceGrid();

            closeAllDropdowns();

        });

    });

    refreshIcons();

}

notificationBtn.addEventListener("click", (e) => {

    e.stopPropagation();
    renderNotificationPanel();
    toggleDropdown(notificationPanel);

});

profileBtn.addEventListener("click", (e) => {

    e.stopPropagation();
    renderProfilePanel();
    toggleDropdown(profilePanel);

});

sortBtn.addEventListener("click", (e) => {

    e.stopPropagation();
    renderSortPanel();
    toggleDropdown(sortPanel);

});

document.addEventListener("click", () => {

    closeAllDropdowns();
    closeFloatingMenu();

});

/* ======================================================
                DATOS DE EJEMPLO
====================================================== */

let resources = [

    { id:1, title:"Study Techniques Guide", type:"document", format:"PDF", sizeLabel:"2.4 MB", sizeMB:2.4, tag:"Study Skills", owner:true, shared:false, favorite:false },
    { id:2, title:"Learning Styles Presentation", type:"presentation", format:"PPTX", sizeLabel:"5.1 MB", sizeMB:5.1, tag:"Learning Styles", owner:true, shared:false, favorite:false },
    { id:3, title:"How to Create Mind Maps", type:"video", format:"MP4", sizeLabel:"12.6 MB", sizeMB:12.6, tag:"Visual Learning", owner:true, shared:false, favorite:false },
    { id:4, title:"Note Taking Worksheet", type:"worksheet", format:"PDF", sizeLabel:"1.3 MB", sizeMB:1.3, tag:"Worksheet", owner:true, shared:false, favorite:true },
    { id:5, title:"Best Websites for Students", type:"link", format:"Link", sizeLabel:"1.2 KB", sizeMB:0.001, tag:"Useful Links", owner:false, shared:true, favorite:false },
    { id:6, title:"Classroom Activities Collection", type:"document", format:"PDF", sizeLabel:"3.7 MB", sizeMB:3.7, tag:"Activities", owner:true, shared:false, favorite:false },
    { id:7, title:"Active Learning Strategies", type:"video", format:"MP4", sizeLabel:"8.9 MB", sizeMB:8.9, tag:"Kinesthetic", owner:false, shared:true, favorite:false },
    { id:8, title:"Effective Study Habits", type:"presentation", format:"PPTX", sizeLabel:"4.2 MB", sizeMB:4.2, tag:"Study Skills", owner:true, shared:false, favorite:true }

];

const quickStats = { myResources:24, shared:15, favorites:8 };

const resourceIcons = {
    document:"file-text", presentation:"monitor", video:"play", worksheet:"file-text", link:"link"
};

/* ======================================================
        FUTURO: CARGA REAL DESDE SUPABASE
====================================================== */

async function loadResources(){

    // TODO: reemplazar por consulta real, por ejemplo:
    // const { data, error } = await db
    //     .from("resources")
    //     .select("id, title, type, format, size_label, size_mb, tag, owner, shared, favorite")
    //     .eq("teacher_id", currentUserId);
    //
    // if(error){ console.error("Error cargando resources:", error); return; }
    // resources = data;

    return resources;

}

/* ======================================================
                STATE
====================================================== */

let scopeFilter = "all"; // all | owner | shared | favorite
let typeFilter = "all";
let searchTerm = "";
let sortMode = "recent";
let visibleCount = 8;

/* ======================================================
                RENDER: QUICK ACTION CARDS
====================================================== */

const quickCardsRow = document.getElementById("quickCardsRow");

function renderQuickCards(){

    const cards = [
        { key:"owner", icon:"folder", cls:"purple", label:t("qcMyResources"), value:quickStats.myResources, note:t("qcMyResourcesNote") },
        { key:"shared", icon:"users", cls:"blue", label:t("qcShared"), value:quickStats.shared, note:t("qcSharedNote") },
        { key:"favorite", icon:"bookmark", cls:"pink", label:t("qcFavorites"), value:quickStats.favorites, note:t("qcFavoritesNote") },
        { key:"upload", icon:"upload-cloud", cls:"teal", label:t("qcUpload"), value:"", note:t("qcUploadNote") }
    ];

    quickCardsRow.innerHTML = cards.map((c) => `
        <button class="quick-card ${scopeFilter === c.key ? "active" : ""}" data-scope="${c.key}">
            <div class="quick-card-icon ${c.cls}"><i data-lucide="${c.icon}"></i></div>
            <div class="quick-card-body">
                <div class="quick-card-label">${c.label}</div>
                ${c.value !== "" ? `<div class="quick-card-value">${c.value}</div>` : ""}
                <div class="quick-card-note">${c.note}</div>
            </div>
        </button>
    `).join("");

    quickCardsRow.querySelectorAll(".quick-card").forEach((btn) => {

        btn.addEventListener("click", () => {

            const scope = btn.dataset.scope;

            if(scope === "upload"){

                openResourceModal(null);

                return;

            }

            scopeFilter = scopeFilter === scope ? "all" : scope;

            visibleCount = 8;

            renderAll();

        });

    });

    refreshIcons();

}

/* ======================================================
                RENDER: CATEGORY TABS
====================================================== */

const categoryTabs = document.querySelectorAll(".category-tab");

categoryTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        categoryTabs.forEach((tb) => tb.classList.remove("active"));

        tab.classList.add("active");

        typeFilter = tab.dataset.type;

        visibleCount = 8;

        renderResourceGrid();

    });

});

document.getElementById("viewAllBtn").addEventListener("click", () => {

    typeFilter = "all";
    scopeFilter = "all";

    categoryTabs.forEach((tb) => tb.classList.toggle("active", tb.dataset.type === "all"));

    visibleCount = 8;

    renderAll();

    showToast(t("toastViewAll"), "layout-grid");

});

/* ======================================================
                RENDER: RESOURCE GRID
====================================================== */

const resourceGrid = document.getElementById("resourceGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");

function getFilteredResources(){

    let list = resources.slice();

    if(scopeFilter === "owner"){ list = list.filter((r) => r.owner); }
    else if(scopeFilter === "shared"){ list = list.filter((r) => r.shared); }
    else if(scopeFilter === "favorite"){ list = list.filter((r) => r.favorite); }

    if(typeFilter !== "all"){ list = list.filter((r) => r.type === typeFilter); }

    if(searchTerm){ list = list.filter((r) => r.title.toLowerCase().includes(searchTerm)); }

    if(sortMode === "az"){

        list.sort((a, b) => a.title.localeCompare(b.title));

    }
    else if(sortMode === "largest"){

        list.sort((a, b) => b.sizeMB - a.sizeMB);

    }
    else{

        list.sort((a, b) => b.id - a.id);

    }

    return list;

}

function renderResourceGrid(){

    const filtered = getFilteredResources();

    resourceGrid.innerHTML = "";

    if(filtered.length === 0){

        resourceGrid.innerHTML = `<div class="resource-empty">${t("noMatch")}</div>`;

        loadMoreBtn.style.display = "none";

        return;

    }

    const visible = filtered.slice(0, visibleCount);

    visible.forEach((r) => {

        const card = document.createElement("div");

        card.classList.add("resource-card");

        card.innerHTML = `
            <div class="resource-card-top">
                <div class="resource-icon ${r.type}"><i data-lucide="${resourceIcons[r.type]}"></i></div>
                <button class="resource-bookmark ${r.favorite ? "active" : ""}" data-id="${r.id}">
                    <i data-lucide="bookmark"></i>
                </button>
            </div>
            <div class="resource-title">${r.title}</div>
            <div class="resource-meta">${r.format} \u2022 ${r.sizeLabel}</div>
            <div class="resource-bottom">
                <span class="resource-tag">${r.tag}</span>
                <button class="resource-menu-btn" data-id="${r.id}">
                    <i data-lucide="more-vertical"></i>
                </button>
            </div>
        `;

        resourceGrid.appendChild(card);

    });

    loadMoreBtn.style.display = filtered.length > visibleCount ? "flex" : "none";

    refreshIcons();

    bindResourceCardButtons();

}

document.getElementById("resourceSearch").addEventListener("input", (e) => {

    searchTerm = e.target.value.toLowerCase().trim();

    visibleCount = 8;

    renderResourceGrid();

});

loadMoreBtn.addEventListener("click", () => {

    visibleCount += 8;

    renderResourceGrid();

});

// Ctrl+/ enfoca la b\u00fasqueda, para que el atajo mostrado en el input sirva de verdad

document.addEventListener("keydown", (e) => {

    if((e.ctrlKey || e.metaKey) && e.key === "/"){

        e.preventDefault();

        document.getElementById("resourceSearch").focus();

    }

});

/* ======================================================
                BOOKMARK + KEBAB MENU
====================================================== */

const floatingResourceMenu = document.getElementById("floatingResourceMenu");

function closeFloatingMenu(){

    floatingResourceMenu.classList.remove("open");

}

function positionFixedPanel(panel, anchorBtn){

    const rect = anchorBtn.getBoundingClientRect();

    const estWidth = 200;
    const estHeight = 220;

    let left = rect.right - estWidth;
    let top = rect.bottom + 8;

    if(left < 8){ left = 8; }

    if(left + estWidth > window.innerWidth - 8){ left = window.innerWidth - estWidth - 8; }

    if(top + estHeight > window.innerHeight - 8){ top = rect.top - estHeight - 8; }

    panel.style.position = "fixed";
    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
    panel.style.right = "auto";

}

function bindResourceCardButtons(){

    resourceGrid.querySelectorAll(".resource-bookmark").forEach((btn) => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            const resource = resources.find((r) => r.id === Number(btn.dataset.id));

            resource.favorite = !resource.favorite;

            renderResourceGrid();

            showToast(resource.favorite ? t("toastFavAdded")(resource.title) : t("toastFavRemoved")(resource.title), "bookmark");

        });

    });

    resourceGrid.querySelectorAll(".resource-menu-btn").forEach((btn) => {

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            const wasOpenForThis = floatingResourceMenu.classList.contains("open") && floatingResourceMenu.dataset.forId === btn.dataset.id;

            closeFloatingMenu();

            closeAllDropdowns();

            if(wasOpenForThis){ return; }

            const resourceId = Number(btn.dataset.id);

            floatingResourceMenu.dataset.forId = btn.dataset.id;

            floatingResourceMenu.innerHTML = `
                <button class="dropdown-item" data-action="view"><i data-lucide="eye"></i><span>${t("menuView")}</span></button>
                <button class="dropdown-item" data-action="download"><i data-lucide="download"></i><span>${t("menuDownload")}</span></button>
                <button class="dropdown-item" data-action="share"><i data-lucide="share-2"></i><span>${t("menuShare")}</span></button>
                <button class="dropdown-item" data-action="rename"><i data-lucide="pencil"></i><span>${t("menuRename")}</span></button>
                <button class="dropdown-item delete-item" data-action="delete"><i data-lucide="trash-2"></i><span>${t("menuDelete")}</span></button>
            `;

            positionFixedPanel(floatingResourceMenu, btn);

            floatingResourceMenu.classList.add("open");

            refreshIcons();

            floatingResourceMenu.querySelectorAll(".dropdown-item").forEach((item) => {

                item.addEventListener("click", (ev) => {

                    ev.stopPropagation();

                    const resource = resources.find((r) => r.id === resourceId);

                    const action = item.dataset.action;

                    closeFloatingMenu();

                    if(action === "view"){

                        showToast(t("toastViewing")(resource.title), "eye");

                    }
                    else if(action === "download"){

                        showToast(t("toastDownloading")(resource.title), "download");

                    }
                    else if(action === "share"){

                        showToast(t("toastShared")(resource.title), "share-2");

                    }
                    else if(action === "rename"){

                        openRenameModal(resource);

                    }
                    else if(action === "delete"){

                        openConfirmModal(

                            t("confirmDeleteTitle"),

                            t("confirmDeleteMsg")(resource.title),

                            () => {

                                resources = resources.filter((r) => r.id !== resourceId);

                                renderAll();

                                showToast(t("toastDeleted"), "trash-2");

                            }

                        );

                    }

                });

            });

        });

    });

}

window.addEventListener("scroll", closeFloatingMenu, true);

/* ======================================================
                ADD / EDIT RESOURCE MODAL
====================================================== */

const resourceModalOverlay = document.getElementById("resourceModalOverlay");
const resourceForm = document.getElementById("resourceForm");
const resourceTitleInput = document.getElementById("resourceTitleInput");
const resourceTypeSelect = document.getElementById("resourceTypeSelect");
const resourceTagInput = document.getElementById("resourceTagInput");
const resourceSizeInput = document.getElementById("resourceSizeInput");

function openResourceModal(){

    resourceForm.reset();

    resourceModalOverlay.classList.add("open");

    resourceTitleInput.focus();

}

function closeResourceModal(){

    resourceModalOverlay.classList.remove("open");

}

document.getElementById("addResourceBtn").addEventListener("click", () => openResourceModal());
document.getElementById("resourceModalCloseBtn").addEventListener("click", closeResourceModal);
document.getElementById("resourceModalCancelBtn").addEventListener("click", closeResourceModal);

resourceModalOverlay.addEventListener("click", (e) => {

    if(e.target === resourceModalOverlay){ closeResourceModal(); }

});

function parseSizeToMB(label){

    const match = label.match(/([\d.]+)\s*(MB|KB|GB)/i);

    if(!match){ return 1; }

    const num = parseFloat(match[1]);

    const unit = match[2].toUpperCase();

    if(unit === "GB"){ return num * 1024; }

    if(unit === "KB"){ return num / 1024; }

    return num;

}

const formatByType = { document:"PDF", presentation:"PPTX", video:"MP4", worksheet:"PDF", link:"Link" };

resourceForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = resourceTitleInput.value.trim();

    if(!title){ return; }

    const type = resourceTypeSelect.value;

    const sizeLabel = resourceSizeInput.value.trim();

    // TODO: reemplazar por un insert real en Supabase (tabla "resources").

    resources.unshift({
        id: Date.now(),
        title,
        type,
        format: formatByType[type],
        sizeLabel,
        sizeMB: parseSizeToMB(sizeLabel),
        tag: resourceTagInput.value.trim() || formatByType[type],
        owner: true,
        shared: false,
        favorite: false
    });

    closeResourceModal();

    scopeFilter = "all";
    typeFilter = "all";

    renderAll();

    showToast(t("toastCreated")(title), "check-circle");

});

/* ======================================================
                RENAME MODAL
====================================================== */

const renameModalOverlay = document.getElementById("renameModalOverlay");
const renameForm = document.getElementById("renameForm");
const renameInput = document.getElementById("renameInput");

let renamingResourceId = null;

function openRenameModal(resource){

    renamingResourceId = resource.id;

    renameInput.value = resource.title;

    renameModalOverlay.classList.add("open");

    renameInput.focus();

}

function closeRenameModal(){

    renameModalOverlay.classList.remove("open");

}

document.getElementById("renameModalCloseBtn").addEventListener("click", closeRenameModal);
document.getElementById("renameModalCancelBtn").addEventListener("click", closeRenameModal);

renameModalOverlay.addEventListener("click", (e) => {

    if(e.target === renameModalOverlay){ closeRenameModal(); }

});

renameForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const newTitle = renameInput.value.trim();

    if(!newTitle){ return; }

    const resource = resources.find((r) => r.id === renamingResourceId);

    resource.title = newTitle;

    closeRenameModal();

    renderResourceGrid();

    showToast(t("toastRenamed")(newTitle), "pencil");

});

/* ======================================================
                GENERIC CONFIRM MODAL
====================================================== */

const confirmModalOverlay = document.getElementById("confirmModalOverlay");
const confirmModalTitle = document.getElementById("confirmModalTitle");
const confirmModalMessage = document.getElementById("confirmModalMessage");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const confirmCancelBtn = document.getElementById("confirmCancelBtn");
const confirmModalCloseBtn = document.getElementById("confirmModalCloseBtn");

let pendingConfirmAction = null;

function openConfirmModal(title, message, onConfirm){

    confirmModalTitle.textContent = title;
    confirmModalMessage.textContent = message;
    pendingConfirmAction = onConfirm;
    confirmModalOverlay.classList.add("open");

}

function closeConfirmModal(){

    confirmModalOverlay.classList.remove("open");
    pendingConfirmAction = null;

}

confirmDeleteBtn.addEventListener("click", () => {

    if(pendingConfirmAction){ pendingConfirmAction(); }

    closeConfirmModal();

});

confirmCancelBtn.addEventListener("click", closeConfirmModal);
confirmModalCloseBtn.addEventListener("click", closeConfirmModal);

confirmModalOverlay.addEventListener("click", (e) => {

    if(e.target === confirmModalOverlay){ closeConfirmModal(); }

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        closeResourceModal();
        closeRenameModal();
        closeConfirmModal();
        closeFloatingMenu();
        closeAllDropdowns();

    }

});

/* ======================================================
                SHARE BANNER
====================================================== */

document.getElementById("learnShareBtn").addEventListener("click", () => {

    // TODO: llevar a un art\u00edculo real de ayuda / documentaci\u00f3n

    showToast(t("toastLearnShare"), "sparkles");

});

/* ======================================================
                RENDER ALL
====================================================== */

function renderAll(){

    renderQuickCards();
    renderResourceGrid();

}

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

    await loadResources();

    applyStaticTranslations();

    renderAll();

    console.log("Thinking Teacher Resources Screen Loaded \ud83d\ude80");

}

init();
