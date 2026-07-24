/* ###########################################################################
#
#                       THINKING BOARD
#
#                   WHITEBOARD V1.0
#
############################################################################ */

/* ======================================================
                    LUCIDE ICONS
====================================================== */

lucide.createIcons();

/* ======================================================
                    ELEMENTS
====================================================== */

const canvas = document.getElementById("whiteboard");

const ctx = canvas.getContext("2d");

const canvasWrapper = document.getElementById("canvasWrapper");

const colorPicker = document.getElementById("colorPicker");

const brushSize = document.getElementById("brushSize");

const brushValue = document.getElementById("brushValue");

const opacity = document.getElementById("opacity");

const opacityValue = document.getElementById("opacityValue");

const zoom = document.getElementById("zoom");

const zoomValue = document.getElementById("zoomValue");

const workspaceMode = document.getElementById("workspaceMode");

const canvasStyle = document.getElementById("canvasStyle");

const mouseX = document.getElementById("mouseX");

const mouseY = document.getElementById("mouseY");

const zoomLevel = document.getElementById("zoomLevel");

const objectLayer = document.getElementById("objectLayer");
const selectionLayer = document.getElementById("selectionLayer");
const zoomLayer = document.getElementById("zoomLayer");
const imageInput = document.getElementById("imageInput");
const pdfInput = document.getElementById("pdfInput");
const themeToggle = document.querySelector(".theme-toggle");
const appEl = document.querySelector(".app");
const boardSidebar = document.getElementById("boardSidebar");
const sidebarTab = document.getElementById("sidebarTab");
const sidebarOverlay = document.getElementById("sidebarOverlay");
/* ======================================================
                MULTI-BOARD SUPPORT
====================================================== */

const urlParams = new URLSearchParams(window.location.search);
const currentBoardId = urlParams.get("board");
const currentBoardName = urlParams.get("name");

const BOARD_STORAGE_KEY = currentBoardId
    ? ("thinkingBoardState_" + currentBoardId)
    : "thinkingBoardState";

if(currentBoardName){
    document.querySelector(".logo-text span").textContent = currentBoardName;
}
/* ======================================================
                    VARIABLES
====================================================== */

let drawing = false;

let brushColor = "#6C63FF";

let brushWidth = 5;

let brushOpacity = 1;

let lastX = 0;

let lastY = 0;

/* NUEVAS VARIABLES */

let startX = 0;

let startY = 0;

let currentZoom = 100;

let currentTool = "pencil";
let selectedText = null;

let draggingText = false;

let offsetX = 0;

let offsetY = 0;
const floatingToolbar = document.getElementById("floatingToolbar");

let selectedObjects = [];
let selecting = false;

let selectionStartX = 0;

let selectionStartY = 0;

let selectionBox = null;

let selectedObject = null;

let isSelectingObject = false;

let zIndexCounter = 10;

let pendingImageFile = null;

let pendingPdfFile = null;

let resizingObject = null;

let resizeDir = null;

let resizeStartX = 0;

let resizeStartY = 0;

let resizeStartWidth = 0;

let resizeStartHeight = 0;

let resizeStartLeft = 0;

let resizeStartTop = 0;

let creationTool = null;

let creationPreview = null;

let creationStartX = 0;

let creationStartY = 0;

const CREATION_TOOLS = ["text","sticky","image","pdf","rectangle","circle","triangle"];

const SHAPE_TOOLS = ["rectangle","circle","triangle"];
/* ======================================================
                RESIZE CANVAS
====================================================== */

function resizeCanvas(){

    canvas.width = canvas.offsetWidth;

    canvas.height = canvas.offsetHeight;

}

resizeCanvas();

window.addEventListener(

    "resize",

    resizeCanvas

);
/* ======================================================
                    BRUSH
====================================================== */

ctx.lineCap = "round";

ctx.lineJoin = "round";

ctx.strokeStyle = brushColor;

ctx.lineWidth = brushWidth;

ctx.globalAlpha = brushOpacity;
/* ======================================================
                UPDATE BRUSH
====================================================== */

colorPicker.addEventListener("input",()=>{

    brushColor = colorPicker.value;

    ctx.strokeStyle = brushColor;

});

brushSize.addEventListener("input",()=>{

    brushWidth = brushSize.value;

    brushValue.textContent = brushWidth + " px";

    ctx.lineWidth = brushWidth;

});

opacity.addEventListener("input",()=>{

    brushOpacity = opacity.value / 100;

    opacityValue.textContent = opacity.value + "%";

    ctx.globalAlpha = brushOpacity;

});
/* ======================================================
                    DRAW FUNCTIONS
====================================================== */

function startDrawing(x, y){

    drawing = true;

    // Punto inicial
    startX = x;
    startY = y;

    // Punto actual
    lastX = x;
    lastY = y;

}
/* ======================================================
                    LINE TOOL
====================================================== */

function drawLine(x, y){

    ctx.beginPath();

    ctx.moveTo(startX, startY);

    ctx.lineTo(x, y);

    ctx.stroke();

}
/* ======================================================
                    RECTANGLE TOOL
====================================================== */

function drawRectangle(x, y){

    const width = x - startX;

    const height = y - startY;

    ctx.beginPath();

    ctx.rect(startX, startY, width, height);

    ctx.stroke();

}
/* ======================================================
                    CIRCLE TOOL
====================================================== */

function drawCircle(x, y){

    const radius = Math.sqrt(

        Math.pow(x - startX, 2) +

        Math.pow(y - startY, 2)

    );

    ctx.beginPath();

    ctx.arc(

        startX,

        startY,

        radius,

        0,

        Math.PI * 2

    );

    ctx.stroke();

}
/* ======================================================
                    TRIANGLE TOOL
====================================================== */

function drawTriangle(x, y){

    ctx.beginPath();

    ctx.moveTo(

        startX,

        y

    );

    ctx.lineTo(

        (startX + x) / 2,

        startY

    );

    ctx.lineTo(

        x,

        y

    );

    ctx.closePath();

    ctx.stroke();

}


function draw(x, y){

    if(!drawing) return;

    switch(currentTool){

        case "pencil":

            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = brushColor;
            ctx.lineWidth = brushWidth;
            ctx.globalAlpha = brushOpacity;
            break;

        case "highlighter":

            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = brushColor;
            ctx.lineWidth = brushWidth * 3;
            ctx.globalAlpha = 0.25;
            break;

        case "eraser":

            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = brushWidth * 2;
            ctx.globalAlpha = 1;
            break;

       case "line":

    return;

default:

    ctx.globalCompositeOperation = "source-over";
    return;

    }

    ctx.beginPath();

    ctx.moveTo(lastX, lastY);

    ctx.lineTo(x, y);

    ctx.stroke();

    lastX = x;
    lastY = y;

}
/* ======================================================
                    MOUSE EVENTS
====================================================== */

/* ======================================================
                COORDENADAS CON ZOOM
====================================================== */

function getCanvasPos(e){

    const rect = canvas.getBoundingClientRect();

    const scale = currentZoom / 100;

    return {

        x: (e.clientX - rect.left) / scale,

        y: (e.clientY - rect.top) / scale

    };

}

canvas.addEventListener("mousedown",(e)=>{

    deselectObject();

    const pos = getCanvasPos(e);

    if(CREATION_TOOLS.includes(currentTool)){

        startObjectCreation(currentTool, pos.x, pos.y);

        return;

    }

    startDrawing(pos.x, pos.y);

});

canvas.addEventListener("mousemove",(e)=>{

    const pos = getCanvasPos(e);

    if(creationPreview){

        updateObjectCreation(pos.x, pos.y);

    } else {

        draw(pos.x, pos.y);

    }

    mouseX.textContent = Math.round(pos.x);
    mouseY.textContent = Math.round(pos.y);

});

canvas.addEventListener("mouseup", (e) => {

    const pos = getCanvasPos(e);

    if(creationPreview){

        finishObjectCreation(pos.x, pos.y);

        return;

    }

if(currentTool === "line"){

        drawLine(pos.x, pos.y);

    }

    stopDrawing();
    draggingText = false;

});

canvas.addEventListener(

    "mouseleave",

    stopDrawing

);
/* ======================================================
                    TOUCH EVENTS
====================================================== */

canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    const touch = e.touches[0];

    const pos = getCanvasPos(touch);

    startDrawing(pos.x, pos.y);

});

canvas.addEventListener("touchmove",(e)=>{

    e.preventDefault();

    const touch = e.touches[0];

    const pos = getCanvasPos(touch);

    draw(pos.x, pos.y);

});

canvas.addEventListener(

    "touchend",

    stopDrawing

);

/* ======================================================
                    HISTORY
====================================================== */

let history = [];

let redoHistory = [];

function snapshot(){

    return {

        drawing: canvas.toDataURL(),

        objects: objectLayer.innerHTML

    };

}

function applySnapshot(state){

    const img = new Image();

    img.onload = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0);

    };

    img.src = state.drawing;

    objectLayer.innerHTML = state.objects;

    objectLayer
        .querySelectorAll(".text-box, .sticky-note, .image-object, .pdf-object")
        .forEach(attachObjectBehavior);

    deselectObject();

}

function saveState(){

    history.push(snapshot());

    if(history.length > 50){

        history.shift();

    }

    redoHistory = [];

}

function stopDrawing(){

    if(drawing){

        saveState();

    }

    drawing = false;

    ctx.beginPath();

}

/* ======================================================
                    UNDO
====================================================== */

function undo(){

    if(history.length === 0) return;

    redoHistory.push(snapshot());

    applySnapshot(history.pop());

}

/* ======================================================
                    REDO
====================================================== */

function redo(){

    if(redoHistory.length === 0) return;

    history.push(snapshot());

    applySnapshot(redoHistory.pop());

}
/* ======================================================
                CLEAR BOARD
====================================================== */

function clearBoard(){

    saveState();

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}
document
.getElementById("undoBtn")
.addEventListener("click",undo);

document
.getElementById("redoBtn")
.addEventListener("click",redo);

document
.getElementById("clearBtn")
.addEventListener("click",clearBoard);
/* ======================================================
                    TOOLS
====================================================== */



const tools = {

    pencil: document.getElementById("pencilBtn"),

    highlighter: document.getElementById("highlighterBtn"),

    eraser: document.getElementById("eraserBtn"),

    line: document.getElementById("lineBtn"),

    rectangle: document.getElementById("rectangleBtn"),

    circle: document.getElementById("circleBtn"),

    triangle: document.getElementById("triangleBtn"),
    text: document.getElementById("textBtn"),

    sticky: document.getElementById("stickyBtn"),

    image: document.getElementById("imageBtn"),

    pdf: document.getElementById("pdfBtn")

};
/* ======================================================
                SELECT TOOL
====================================================== */

function selectTool(tool){

    currentTool = tool;

    document
        .querySelectorAll(".tool")
        .forEach(btn => btn.classList.remove("active"));

    if(tools[tool]){

        tools[tool].classList.add("active");

    }

    ctx.globalCompositeOperation = "source-over";

    ctx.globalAlpha = brushOpacity;

    ctx.strokeStyle = brushColor;

    ctx.lineWidth = brushWidth;

}
/* ======================================================
                OBJECT FACTORY
====================================================== */

function attachObjectBehavior(el){

    addResizeHandles(el);

    el.addEventListener("animationend", () => {
        el.classList.remove("pop-in");
    }, { once:true });

    el.addEventListener("mousedown", function(e){

        e.stopPropagation();

        selectObject(el);

        if(!el.classList.contains("locked")){

            draggingText = true;

            offsetX = e.offsetX;
            offsetY = e.offsetY;

        }

    });

el.addEventListener("dblclick", function(e){

    e.stopPropagation();

    const isTextual =
        el.classList.contains("text-box") ||
        el.classList.contains("sticky-note");

    if(isTextual && !el.classList.contains("locked")){

        el.contentEditable = "true";

        el.focus();

    }

});

el.addEventListener("blur", function(){

    if(el.classList.contains("text-box")){

        el.contentEditable = "true";

    } else if(el.classList.contains("sticky-note")){

        el.contentEditable = "false";

    }

});
}
/* ======================================================
                RESIZE HANDLES
====================================================== */

function addResizeHandles(el){

    if(el.querySelector(".resize-handle")) return;

    ["nw","ne","sw","se"].forEach((dir) => {

        const handle = document.createElement("div");

        handle.className = "resize-handle handle-" + dir;

        handle.addEventListener("mousedown", (e) => {

            e.stopPropagation();
            e.preventDefault();

            startResize(el, dir, e);

        });

        el.appendChild(handle);

    });

}

function startResize(el, dir, e){

    if(el.classList.contains("locked")) return;

    selectObject(el);

    resizingObject = el;
    resizeDir = dir;

    resizeStartX = e.clientX;
    resizeStartY = e.clientY;

    resizeStartWidth = el.offsetWidth;
    resizeStartHeight = el.offsetHeight;

    resizeStartLeft = parseFloat(el.style.left) || 0;
    resizeStartTop = parseFloat(el.style.top) || 0;

}

document.addEventListener("mousemove", (e) => {

    if(!resizingObject) return;

    const scale = currentZoom / 100;

    const dx = (e.clientX - resizeStartX) / scale;
    const dy = (e.clientY - resizeStartY) / scale;

    let newWidth = resizeStartWidth;
    let newHeight = resizeStartHeight;
    let newLeft = resizeStartLeft;
    let newTop = resizeStartTop;

    const MIN_W = 60;
    const MIN_H = 40;

    if(resizeDir.includes("e")){

        newWidth = Math.max(MIN_W, resizeStartWidth + dx);

    }

    if(resizeDir.includes("s")){

        newHeight = Math.max(MIN_H, resizeStartHeight + dy);

    }

    if(resizeDir.includes("w")){

        newWidth = Math.max(MIN_W, resizeStartWidth - dx);
        newLeft = resizeStartLeft + (resizeStartWidth - newWidth);

    }

    if(resizeDir.includes("n")){

        newHeight = Math.max(MIN_H, resizeStartHeight - dy);
        newTop = resizeStartTop + (resizeStartHeight - newHeight);

    }

    resizingObject.style.width = newWidth + "px";
    resizingObject.style.height = newHeight + "px";
    resizingObject.style.left = newLeft + "px";
    resizingObject.style.top = newTop + "px";

});

document.addEventListener("mouseup", () => {

    resizingObject = null;
    resizeDir = null;

});
function selectObject(el){

    if(selectedObject && selectedObject !== el){

        selectedObject.classList.remove("selected");

    }

    selectedObject = el;
    selectedText = el;

    el.classList.add("selected");

    zIndexCounter++;
    el.style.zIndex = zIndexCounter;

    showToolbar(el);

}

function deselectObject(){

    if(selectedObject){

        selectedObject.classList.remove("selected");

    }

    selectedObject = null;
    selectedText = null;

    floatingToolbar.classList.remove("visible");

}

function createTextBox(x, y, width, height){

    const box = document.createElement("div");

    box.className = "text-box pop-in";

    box.contentEditable = "true";

    box.style.left = x + "px";
    box.style.top = y + "px";

    if(width)  box.style.width = width + "px";
    if(height) box.style.height = height + "px";

    box.style.color = brushColor;
    box.style.fontSize = (brushWidth * 4 + 12) + "px";

    zIndexCounter++;
    box.style.zIndex = zIndexCounter;

    objectLayer.appendChild(box);

    attachObjectBehavior(box);

    box.focus();

    return box;

}

function createStickyNote(x, y, width, height){

    const note = document.createElement("div");

    note.className = "sticky-note pop-in";

    note.contentEditable = "false";

    note.style.left = x + "px";
    note.style.top = y + "px";

    if(width)  note.style.width = width + "px";
    if(height) note.style.height = height + "px";

    zIndexCounter++;
    note.style.zIndex = zIndexCounter;

    objectLayer.appendChild(note);

    attachObjectBehavior(note);

    return note;

}

function duplicateObject(el){

    const clone = el.cloneNode(true);

    clone.style.left = (parseInt(el.style.left) + 25) + "px";
    clone.style.top = (parseInt(el.style.top) + 25) + "px";

    clone.classList.remove("selected");
    clone.classList.add("pop-in");

    zIndexCounter++;
    clone.style.zIndex = zIndexCounter;

    objectLayer.appendChild(clone);

    attachObjectBehavior(clone);

    selectObject(clone);

    return clone;

}

function deleteObjectAnimated(el){

    if(!el) return;

    el.classList.add("pop-out");

    setTimeout(() => {
        el.remove();
    }, 180);

}

/* ======================================================
                FLOATING TOOLBAR
====================================================== */

function showToolbar(object){

    const rect = object.getBoundingClientRect();

    const parent = canvasWrapper.getBoundingClientRect();

    floatingToolbar.classList.add("visible");

    floatingToolbar.style.left =
        (rect.left - parent.left + rect.width/2 - floatingToolbar.offsetWidth/2) + "px";

    floatingToolbar.style.top =
        (rect.top - parent.top - 55) + "px";

    const pinBtn = document.getElementById("toolbarPin");

    pinBtn.style.opacity =
        object.classList.contains("locked") ? "1" : "0.55";

}
/* ======================================================
                TOOL EVENTS
====================================================== */

tools.pencil.addEventListener("click", () => selectTool("pencil"));

tools.highlighter.addEventListener("click", () => selectTool("highlighter"));

tools.eraser.addEventListener("click", () => selectTool("eraser"));

tools.line.addEventListener("click", () => selectTool("line"));

tools.rectangle.addEventListener("click", () => selectTool("rectangle"));

tools.circle.addEventListener("click", () => selectTool("circle"));

tools.triangle.addEventListener("click", () => selectTool("triangle"));

tools.text.addEventListener("click", () => selectTool("text"));

tools.sticky.addEventListener("click", () => selectTool("sticky"));

tools.image.addEventListener("click", () => selectTool("image"));

tools.pdf.addEventListener("click", () => selectTool("pdf"));

selectTool("pencil");

/* ======================================================
                FLOATING TOOLBAR ACTIONS
====================================================== */

document
.getElementById("toolbarDelete")
.addEventListener("click", () => {

    if(selectedObject){

        deleteObjectAnimated(selectedObject);

        selectedObject = null;
        selectedText = null;

        floatingToolbar.classList.remove("visible");

    }

});

document
.getElementById("toolbarDuplicate")
.addEventListener("click", () => {

    if(selectedObject){

        duplicateObject(selectedObject);

    }

});

document
.getElementById("toolbarPin")
.addEventListener("click", () => {

    if(!selectedObject) return;

    selectedObject.classList.toggle("locked");

    document.getElementById("toolbarPin").style.opacity =
        selectedObject.classList.contains("locked") ? "1" : "0.55";

});

document
.getElementById("toolbarColor")
.addEventListener("click", () => {

    if(!selectedObject) return;

    const picker = document.createElement("input");

    picker.type = "color";

    picker.value = brushColor;

    picker.style.position = "fixed";

    picker.style.left = "-9999px";

    document.body.appendChild(picker);

    picker.addEventListener("input", () => {

        if(selectedObject.classList.contains("sticky-note")){

            selectedObject.style.background = picker.value;

        } else {

            selectedObject.style.color = picker.value;

        }

    });

    picker.addEventListener("change", () => picker.remove());

    picker.click();

});

/* ======================================================
                KEYBOARD SHORTCUTS
====================================================== */

document.addEventListener("keydown", (e) => {

    const isEditing =
        document.activeElement &&
        document.activeElement.isContentEditable;

    if(e.key === "Delete" && selectedObject && !isEditing){

        deleteObjectAnimated(selectedObject);

        selectedObject = null;
        selectedText = null;

        floatingToolbar.classList.remove("visible");

    }

    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d" && selectedObject && !isEditing){

        e.preventDefault();

        duplicateObject(selectedObject);

    }

});
/* ======================================================
                IMAGEN
====================================================== */

tools.image.addEventListener("click", () => {

    selectTool("image");

    imageInput.click();

});

imageInput.addEventListener("change", () => {

    if(imageInput.files[0]){

        pendingImageFile = imageInput.files[0];

    }

    imageInput.value = "";

});

function createImageObject(x, y, file, width, height){

    const reader = new FileReader();

    reader.onload = () => {

        const wrapper = document.createElement("div");

        wrapper.className = "image-object pop-in";

        wrapper.style.left = x + "px";
        wrapper.style.top = y + "px";

        if(width)  wrapper.style.width = width + "px";
        if(height) wrapper.style.height = height + "px";

        zIndexCounter++;
        wrapper.style.zIndex = zIndexCounter;

        const img = document.createElement("img");
        img.src = reader.result;

        wrapper.appendChild(img);

        objectLayer.appendChild(wrapper);

        attachObjectBehavior(wrapper);

    };

    reader.readAsDataURL(file);

}

/* ======================================================
                PDF
====================================================== */

tools.pdf.addEventListener("click", () => {

    selectTool("pdf");

    pdfInput.click();

});

pdfInput.addEventListener("change", () => {

    if(pdfInput.files[0]){

        pendingPdfFile = pdfInput.files[0];

    }

    pdfInput.value = "";

});

function createPdfObject(x, y, file){

    const url = URL.createObjectURL(file);

    const card = document.createElement("div");

    card.className = "pdf-object pop-in";

    card.style.left = x + "px";
    card.style.top = y + "px";

    zIndexCounter++;
    card.style.zIndex = zIndexCounter;

    card.innerHTML = `

        <span class="pdf-icon">📄</span>

        <span class="pdf-name">${file.name}</span>

    `;

    card.addEventListener("dblclick", (e) => {

        e.stopPropagation();

        window.open(url, "_blank");

    });

    objectLayer.appendChild(card);

    attachObjectBehavior(card);

}

/* ======================================================
                ZOOM
====================================================== */

function setZoom(value){

    currentZoom = Math.min(200, Math.max(50, Number(value)));

    zoomLayer.style.transform = `scale(${currentZoom / 100})`;

    zoom.value = currentZoom;
    zoomValue.textContent = currentZoom + "%";
    zoomLevel.textContent = currentZoom + "%";

}

zoom.addEventListener("input", () => setZoom(zoom.value));

document.getElementById("zoomIn").addEventListener("click", () => setZoom(currentZoom + 10));

document.getElementById("zoomOut").addEventListener("click", () => setZoom(currentZoom - 10));

/* ======================================================
                CANVAS BACKGROUND
====================================================== */

canvasStyle.addEventListener("change", () => {

    canvasWrapper.className = "canvas-wrapper " + canvasStyle.value;

    requestAnimationFrame(() => {
      
        const ink = getComputedStyle(canvasWrapper)
            .getPropertyValue("--board-ink")
            .trim() || "#1B1F2A";

        brushColor = ink;
        colorPicker.value = ink;
        ctx.strokeStyle = brushColor;

    });

});
/* ======================================================
                WORKSPACE MODE
====================================================== */

const modeAccents = {

    notes:"#6C63FF",
    math:"#F59E0B",
    mindmap:"#22C55E",
    science:"#EF4444",
    presentation:"#4FD1FF",
    creative:"#EC4899",
    coding:"#10B981",
    reading:"#8B5CF6"

};

workspaceMode.addEventListener("change", () => {

    document.querySelector(".app").dataset.mode = workspaceMode.value;

    document.documentElement.style.setProperty(

        "--primary",

        modeAccents[workspaceMode.value] || "#6C63FF"

    );

});

/* ======================================================
                THEME TOGGLE
====================================================== */

const toggleCircleBoard = document.querySelector(".theme-toggle .toggle-circle");

function enableDarkMode(){

    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");

    if(toggleCircleBoard) toggleCircleBoard.style.left = "6px";

}

function enableLightMode(){

    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");

    if(toggleCircleBoard) toggleCircleBoard.style.left = "42px";

}

function saveThemePreference(){

    const mode = document.body.classList.contains("dark-theme") ? "dark" : "light";

    localStorage.setItem("thinking-theme", mode);

}

function loadThemePreference(){

    const saved = localStorage.getItem("thinking-theme");

    if(saved === "light"){

        enableLightMode();

    } else {

        enableDarkMode();

    }

}

themeToggle.addEventListener("click", () => {

    if(document.body.classList.contains("dark-theme")){

        enableLightMode();

    } else {

        enableDarkMode();

    }

    saveThemePreference();

});

loadThemePreference();
/* ======================================================
                GUARDAR / DESCARGAR / COMPARTIR
====================================================== */

document.getElementById("saveBtn").addEventListener("click", () => {

    const state = {

        drawing: canvas.toDataURL(),

        objects: objectLayer.innerHTML,

        zoom: currentZoom,

        canvasStyle: canvasWrapper.className

    };

    localStorage.setItem(BOARD_STORAGE_KEY, JSON.stringify(state));

if(currentBoardId){
    const boards = JSON.parse(localStorage.getItem("thinkingBoards") || "[]");
    const board = boards.find(b => b.id === currentBoardId);
    if(board){
        board.updatedAt = new Date().toISOString();
        localStorage.setItem("thinkingBoards", JSON.stringify(boards));
    }
}

    const btn = document.getElementById("saveBtn");

    btn.style.background = "rgba(34,197,94,.30)";

    setTimeout(() => { btn.style.background = ""; }, 600);

});

document.getElementById("downloadBtn").addEventListener("click", () => {

    html2canvas(canvasWrapper, { backgroundColor:null, scale:2 }).then((snapshot) => {

        const link = document.createElement("a");

        link.download = "thinking-board.png";

        link.href = snapshot.toDataURL("image/png");

        link.click();

    });

});

document.getElementById("shareBtn").addEventListener("click", async () => {

    if(navigator.share){

        try{

            await navigator.share({

                title: "Thinking Board",

                text: "Mira mi pizarra en Thinking Board",

                url: window.location.href

            });

        } catch(e){}

    } else {

        await navigator.clipboard.writeText(window.location.href);

        alert("Enlace copiado al portapapeles.");

    }

});

/* ======================================================
                RESTAURAR ESTADO GUARDADO
====================================================== */

function loadBoardState(){

    const raw = localStorage.getItem(BOARD_STORAGE_KEY);

    if(!raw) return;

    try{

        const state = JSON.parse(raw);

        const img = new Image();

        img.onload = () => ctx.drawImage(img, 0, 0);

        img.src = state.drawing;

        objectLayer.innerHTML = state.objects;

        objectLayer
            .querySelectorAll(".resize-handle")
            .forEach(handle => handle.remove());

        objectLayer
            .querySelectorAll(".text-box, .sticky-note, .image-object, .pdf-object")
            .forEach(attachObjectBehavior);

        canvasWrapper.className = state.canvasStyle;

        setZoom(state.zoom || 100);

    } catch(e){

        console.warn("No se pudo restaurar el estado guardado.");

    }

}

setZoom(100);
loadBoardState();
/* ======================================================
                BOARD SIDEBAR TOGGLE
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
                OBJECT HISTORY HOOKS
====================================================== */

document.addEventListener("mouseup", () => {

    if(draggingText){

        saveState();

    }

});

const originalDeleteAnimated = deleteObjectAnimated;

deleteObjectAnimated = function(el){

    originalDeleteAnimated(el);

    setTimeout(saveState, 190);

};

const originalDuplicateObject = duplicateObject;

duplicateObject = function(el){

    const clone = originalDuplicateObject(el);

    saveState();

    return clone;

};
/* ======================================================
                OBJECT CREATION PREVIEW
====================================================== */

const CREATION_DEFAULTS = {

    text:   { w:220, h:60  },
    sticky: { w:240, h:180 },
    image:  { w:220, h:160 },
    pdf:    { w:200, h:70  }

};

function startObjectCreation(tool, x, y){

    creationTool = tool;
    creationStartX = x;
    creationStartY = y;

    creationPreview = document.createElement("div");
    creationPreview.className = "creation-preview";

    let shapeMarkup = "";

    if(tool === "rectangle"){

        shapeMarkup = `<rect class="ants-shape" x="1" y="1" width="98" height="98"></rect>`;

    }
    else if(tool === "circle"){

        shapeMarkup = `<ellipse class="ants-shape" cx="50" cy="50" rx="49" ry="49"></ellipse>`;

    }
    else if(tool === "triangle"){

        shapeMarkup = `<polygon class="ants-shape" points="50,2 2,98 98,98"></polygon>`;

    }
    else{

        shapeMarkup = `<rect class="ants-rect" x="1" y="1" width="98" height="98" rx="6" ry="6"></rect>`;

    }

    const showLabel = tool !== "pdf";

    creationPreview.innerHTML = `

        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            ${shapeMarkup}
        </svg>

        ${showLabel ? '<div class="dim-label">0 × 0</div>' : ""}

    `;

    if(SHAPE_TOOLS.includes(tool)){

        const shapeEl = creationPreview.querySelector(".ants-shape");

        if(shapeEl) shapeEl.style.stroke = brushColor;

    }

    creationPreview.style.left = x + "px";
    creationPreview.style.top = y + "px";
    creationPreview.style.width = "0px";
    creationPreview.style.height = "0px";

    objectLayer.appendChild(creationPreview);

}

function updateObjectCreation(x, y){

    if(!creationPreview) return;

    let left, top, width, height;

    if(creationTool === "circle"){

        const radius = Math.sqrt(

            Math.pow(x - creationStartX, 2) +
            Math.pow(y - creationStartY, 2)

        );

        left = creationStartX - radius;
        top = creationStartY - radius;
        width = radius * 2;
        height = radius * 2;

    } else {

        left = Math.min(creationStartX, x);
        top = Math.min(creationStartY, y);
        width = Math.abs(x - creationStartX);
        height = Math.abs(y - creationStartY);

    }

    creationPreview.style.left = left + "px";
    creationPreview.style.top = top + "px";
    creationPreview.style.width = width + "px";
    creationPreview.style.height = height + "px";

    const label = creationPreview.querySelector(".dim-label");

    if(label){

        label.textContent = Math.round(width) + " × " + Math.round(height);

    }

}
function finishObjectCreation(x, y){

    if(!creationPreview) return;

    creationPreview.remove();
    creationPreview = null;

    if(SHAPE_TOOLS.includes(creationTool)){

        const moved =
            Math.abs(x - creationStartX) > 3 ||
            Math.abs(y - creationStartY) > 3;

        if(moved){

            startX = creationStartX;
            startY = creationStartY;

            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = brushColor;
            ctx.lineWidth = brushWidth;
            ctx.globalAlpha = brushOpacity;

            if(creationTool === "rectangle"){

                drawRectangle(x, y);

            }
            else if(creationTool === "circle"){

                drawCircle(x, y);

            }
            else if(creationTool === "triangle"){

                drawTriangle(x, y);

            }

            saveState();

        }

        creationTool = null;

        return;

    }

    let left = Math.min(creationStartX, x);
    let top = Math.min(creationStartY, y);
    let width = Math.abs(x - creationStartX);
    let height = Math.abs(y - creationStartY);

    const defaults = CREATION_DEFAULTS[creationTool];

    // clic simple sin arrastre real -> usa tamaño por defecto
    if(width < 12 || height < 12){

        width = defaults.w;
        height = defaults.h;

    }

    if(creationTool === "text"){

        createTextBox(left, top, width, height);

    }

    else if(creationTool === "sticky"){

        createStickyNote(left, top, width, height);

    }

    else if(creationTool === "image"){

        if(pendingImageFile){

            createImageObject(left, top, pendingImageFile, width, height);

            pendingImageFile = null;

        }

    }

    else if(creationTool === "pdf"){

        if(pendingPdfFile){

            createPdfObject(left, top, pendingPdfFile);

            pendingPdfFile = null;

        }

    }

    creationTool = null;

    saveState();

}
