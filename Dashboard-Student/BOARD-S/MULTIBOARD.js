/* ###########################################################################
#
#                       MY BOARDS
#
#           Grupos de tableros + tableros dentro de cada grupo
#
############################################################################ */

lucide.createIcons();

/* ======================================================
                STORAGE KEYS
====================================================== */

const GROUPS_KEY = "thinkingGroups";
const BOARDS_KEY = "thinkingBoards";

// Cada tablero guarda su contenido (dibujo + objetos) en:
// "thinkingBoardState_" + board.id
// Esto es lo que permite tener MÁS DE UN tablero a la vez.

/* ======================================================
                ELEMENTS
====================================================== */

const appEl = document.querySelector(".app");
const sidebarTab = document.getElementById("sidebarTab");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

const groupsView = document.getElementById("groupsView");
const boardsView = document.getElementById("boardsView");

const groupsGrid = document.getElementById("groupsGrid");
const boardsGrid = document.getElementById("boardsGrid");

const groupsEmpty = document.getElementById("groupsEmpty");
const boardsEmpty = document.getElementById("boardsEmpty");

const breadcrumb = document.getElementById("breadcrumb");

const newItemBtn = document.getElementById("newItemBtn");
const newItemLabel = document.getElementById("newItemLabel");
const backToGroupsBtn = document.getElementById("backToGroupsBtn");

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalInput = document.getElementById("modalInput");
const modalConfirm = document.getElementById("modalConfirm");
const modalCancel = document.getElementById("modalCancel");

/* ======================================================
                STATE
====================================================== */

let currentGroupId = null; // null => estamos viendo la lista de grupos
let modalMode = null;      // "create-group" | "rename-group" | "create-board" | "rename-board"
let modalTargetId = null;  // id del grupo/tablero que se está renombrando

/* ======================================================
                DATA HELPERS
====================================================== */

function loadGroups(){
    return JSON.parse(localStorage.getItem(GROUPS_KEY) || "[]");
}

function saveGroups(groups){
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
}

function loadBoards(){
    return JSON.parse(localStorage.getItem(BOARDS_KEY) || "[]");
}

function saveBoards(boards){
    localStorage.setItem(BOARDS_KEY, JSON.stringify(boards));
}

function uid(){
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatDate(iso){

    const d = new Date(iso);

    return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

}

/* ======================================================
                RENDER: GROUPS VIEW
====================================================== */

function renderGroupsView(){

    const groups = loadGroups();
    const boards = loadBoards();

    groupsGrid.innerHTML = "";

    // Tarjeta "+ New Group"
    const newCard = document.createElement("div");
    newCard.className = "new-card";
    newCard.innerHTML = `<i data-lucide="folder-plus"></i><span>New Group</span>`;
    newCard.addEventListener("click", () => openModal("create-group"));
    groupsGrid.appendChild(newCard);

    groups.forEach(group => {

        const boardCount = boards.filter(b => b.groupId === group.id).length;

        const card = document.createElement("div");
        card.className = "item-card";

        card.innerHTML = `

            <div class="item-card-actions">
                <button class="item-action-btn rename-btn" title="Rename">
                    <i data-lucide="pencil"></i>
                </button>
                <button class="item-action-btn delete-btn" title="Delete">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>

            <div class="item-icon">
                <i data-lucide="folder"></i>
            </div>

            <h4>${escapeHtml(group.name)}</h4>
            <p>${boardCount} board${boardCount === 1 ? "" : "s"}</p>

        `;

        card.addEventListener("click", (e) => {
            if(e.target.closest(".item-action-btn")) return;
            openGroup(group.id);
        });

        card.querySelector(".rename-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            openModal("rename-group", group.id, group.name);
        });

        card.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            deleteGroup(group.id);
        });

        groupsGrid.appendChild(card);

    });

    lucide.createIcons();

    groupsEmpty.classList.toggle("visible", groups.length === 0);

}

/* ======================================================
                RENDER: BOARDS VIEW (inside a group)
====================================================== */

function renderBoardsView(){

    const group = loadGroups().find(g => g.id === currentGroupId);

    if(!group){
        goToGroups();
        return;
    }

    const boards = loadBoards().filter(b => b.groupId === currentGroupId);

    boardsGrid.innerHTML = "";

    const newCard = document.createElement("div");
    newCard.className = "new-card";
    newCard.innerHTML = `<i data-lucide="plus"></i><span>New Board</span>`;
    newCard.addEventListener("click", () => openModal("create-board"));
    boardsGrid.appendChild(newCard);

    boards.forEach(board => {

        const card = document.createElement("div");
        card.className = "item-card";

        card.innerHTML = `

            <div class="item-card-actions">
                <button class="item-action-btn rename-btn" title="Rename">
                    <i data-lucide="pencil"></i>
                </button>
                <button class="item-action-btn delete-btn" title="Delete">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>

            <div class="item-icon">
                <i data-lucide="pen-tool"></i>
            </div>

            <h4>${escapeHtml(board.name)}</h4>
            <p>Edited ${formatDate(board.updatedAt || board.createdAt)}</p>

        `;

        card.addEventListener("click", (e) => {
            if(e.target.closest(".item-action-btn")) return;
            openBoard(board);
        });

        card.querySelector(".rename-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            openModal("rename-board", board.id, board.name);
        });

        card.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            deleteBoard(board.id);
        });

        boardsGrid.appendChild(card);

    });

    lucide.createIcons();

    boardsEmpty.classList.toggle("visible", boards.length === 0);

}

/* ======================================================
                NAVIGATION BETWEEN VIEWS
====================================================== */

function goToGroups(){

    currentGroupId = null;

    groupsView.style.display = "";
    boardsView.style.display = "none";

    pageTitle.textContent = "My Boards";
    pageSubtitle.textContent = "Organize your whiteboards into groups.";

    newItemLabel.textContent = "New Group";
    backToGroupsBtn.style.display = "none";

    breadcrumb.innerHTML = `<span class="crumb current">My Boards</span>`;

    renderGroupsView();

}

function openGroup(groupId){

    currentGroupId = groupId;

    const group = loadGroups().find(g => g.id === groupId);

    groupsView.style.display = "none";
    boardsView.style.display = "";

    pageTitle.textContent = group.name;
    pageSubtitle.textContent = "Boards inside this group.";

    newItemLabel.textContent = "New Board";
    backToGroupsBtn.style.display = "flex";

    breadcrumb.innerHTML = `
        <span class="crumb" data-crumb="root">My Boards</span>
        <span class="crumb-sep">/</span>
        <span class="crumb current">${escapeHtml(group.name)}</span>
    `;

    breadcrumb.querySelector('[data-crumb="root"]').addEventListener("click", goToGroups);

    renderBoardsView();

}

backToGroupsBtn.addEventListener("click", goToGroups);

/* ======================================================
                CREATE / RENAME / DELETE
====================================================== */

function createGroup(name){

    const groups = loadGroups();

    groups.push({
        id: uid(),
        name: name,
        createdAt: new Date().toISOString()
    });

    saveGroups(groups);
    renderGroupsView();

}

function renameGroup(id, name){

    const groups = loadGroups();
    const group = groups.find(g => g.id === id);

    if(group){
        group.name = name;
        saveGroups(groups);
    }

    if(currentGroupId === id){
        openGroup(id);
    } else {
        renderGroupsView();
    }

}

function deleteGroup(id){

    const confirmDelete = confirm(
        "Delete this group and all boards inside it? This cannot be undone."
    );

    if(!confirmDelete) return;

    // Borra también el contenido guardado de cada tablero dentro del grupo
    const boards = loadBoards();

    boards
        .filter(b => b.groupId === id)
        .forEach(b => localStorage.removeItem("thinkingBoardState_" + b.id));

    saveBoards(boards.filter(b => b.groupId !== id));
    saveGroups(loadGroups().filter(g => g.id !== id));

    renderGroupsView();

}

function createBoard(name){

    const boards = loadBoards();

    const board = {
        id: uid(),
        groupId: currentGroupId,
        name: name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    boards.push(board);
    saveBoards(boards);

    renderBoardsView();

}

function renameBoard(id, name){

    const boards = loadBoards();
    const board = boards.find(b => b.id === id);

    if(board){
        board.name = name;
        saveBoards(boards);
    }

    renderBoardsView();

}

function deleteBoard(id){

    const confirmDelete = confirm("Delete this board? This cannot be undone.");

    if(!confirmDelete) return;

    localStorage.removeItem("thinkingBoardState_" + id);

    saveBoards(loadBoards().filter(b => b.id !== id));

    renderBoardsView();

}

function openBoard(board){

    const url =
        "Student-Board.html" +
        "?board=" + encodeURIComponent(board.id) +
        "&name=" + encodeURIComponent(board.name);

    window.location.href = url;

}

/* ======================================================
                ESCAPE HTML (seguridad básica)
====================================================== */

function escapeHtml(str){

    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;

}

/* ======================================================
                MODAL
====================================================== */

function openModal(mode, targetId, currentName){

    modalMode = mode;
    modalTargetId = targetId || null;

    modalInput.value = currentName || "";

    if(mode === "create-group"){
        modalTitle.textContent = "New Group";
        modalConfirm.textContent = "Create";
    }
    else if(mode === "rename-group"){
        modalTitle.textContent = "Rename Group";
        modalConfirm.textContent = "Save";
    }
    else if(mode === "create-board"){
        modalTitle.textContent = "New Board";
        modalConfirm.textContent = "Create";
    }
    else if(mode === "rename-board"){
        modalTitle.textContent = "Rename Board";
        modalConfirm.textContent = "Save";
    }

    modalOverlay.classList.add("visible");

    setTimeout(() => modalInput.focus(), 50);

}

function closeModal(){

    modalOverlay.classList.remove("visible");
    modalMode = null;
    modalTargetId = null;

}

function submitModal(){

    const value = modalInput.value.trim();

    if(!value) return;

    if(modalMode === "create-group"){
        createGroup(value);
    }
    else if(modalMode === "rename-group"){
        renameGroup(modalTargetId, value);
    }
    else if(modalMode === "create-board"){
        createBoard(value);
    }
    else if(modalMode === "rename-board"){
        renameBoard(modalTargetId, value);
    }

    closeModal();

}

modalConfirm.addEventListener("click", submitModal);
modalCancel.addEventListener("click", closeModal);

modalInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") submitModal();
    if(e.key === "Escape") closeModal();
});

modalOverlay.addEventListener("click", (e) => {
    if(e.target === modalOverlay) closeModal();
});

/* ======================================================
                MAIN "+" BUTTON (contextual)
====================================================== */

newItemBtn.addEventListener("click", () => {

    if(currentGroupId === null){
        openModal("create-group");
    } else {
        openModal("create-board");
    }

});

/* ======================================================
                SIDEBAR TOGGLE
====================================================== */

function toggleSidebar(){
    appEl.classList.toggle("sidebar-open");
}

function closeSidebar(){
    appEl.classList.remove("sidebar-open");
}

sidebarTab.addEventListener("click", toggleSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
        closeSidebar();
    }
});

/* ======================================================
                INIT
====================================================== */

goToGroups();
