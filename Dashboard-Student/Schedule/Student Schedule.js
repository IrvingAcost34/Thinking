/* ======================================================
                    THINKING
                SCHEDULE SCREEN V2.0
        (calendario y agenda 100% funcional,
         eventos guardados y le\u00eddos desde Supabase)
====================================================== */

// ======================================================
// SUPABASE
// ======================================================

const SUPABASE_URL = "https://lihwjqcimyysxlluiwcj.supabase.co";

const SUPABASE_KEY = "sb_publishable_ebg_1KjxrX6KuKQRAlExFg_XNKKQ_rC";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

let currentUserId = null;

/* ======================================================
                    LUCIDE ICONS
====================================================== */

lucide.createIcons();

/* ======================================================
                    THEME (igual al Dashboard)
====================================================== */

const body = document.body;

const themeToggle = document.querySelector(".theme-toggle");

const toggleCircle = document.querySelector(".toggle-circle");

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

    if(body.classList.contains("dark-theme")){

        enableLightMode();

    }
    else{

        enableDarkMode();

    }

    saveTheme();

});

function saveTheme(){

    if(body.classList.contains("dark-theme")){

        localStorage.setItem("thinking-theme","dark");

    }
    else{

        localStorage.setItem("thinking-theme","light");

    }

}

function loadTheme(){

    const savedTheme = localStorage.getItem("thinking-theme");

    if(savedTheme === "light"){

        enableLightMode();

    }
    else{

        enableDarkMode();

    }

}

loadTheme();

/* ======================================================
                MOBILE SIDEBAR TOGGLE
====================================================== */

const sidebarEl = document.querySelector(".sidebar");

const menuToggle = document.getElementById("menuToggle");

const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar(){

    sidebarEl.classList.add("open");

    sidebarOverlay.classList.add("open");

}

function closeSidebar(){

    sidebarEl.classList.remove("open");

    sidebarOverlay.classList.remove("open");

}

menuToggle.addEventListener("click", () => {

    if(sidebarEl.classList.contains("open")){

        closeSidebar();

    }
    else{

        openSidebar();

    }

});

sidebarOverlay.addEventListener("click", closeSidebar);

/* ======================================================
                DATE HELPERS
====================================================== */

function toDateKey(year, month, day){

    const m = String(month + 1).padStart(2,"0");

    const d = String(day).padStart(2,"0");

    return `${year}-${m}-${d}`;

}

function isSameDay(a,b){

    return a.getFullYear() === b.getFullYear()
        && a.getMonth() === b.getMonth()
        && a.getDate() === b.getDate();

}

// Convierte "14:30:00" (formato de Supabase) -> "2:30 PM" (formato bonito)
function formatTimeDisplay(timeStr){

    const [hh, mm] = timeStr.split(":").map(Number);

    const period = hh >= 12 ? "PM" : "AM";

    let hour12 = hh % 12;

    if(hour12 === 0){

        hour12 = 12;

    }

    return `${hour12}:${String(mm).padStart(2,"0")} ${period}`;

}

const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

const monthNamesShort = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
];

const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const typeLabels = { study:"Study session", break:"Break", task:"Task", reminder:"Reminder" };

const today = new Date();

/* ======================================================
                EVENTOS (ahora vienen de Supabase)
    key: "YYYY-MM-DD"  ->  array de eventos
====================================================== */

let scheduleEvents = {};

// Trae todos los eventos del usuario logueado y arma scheduleEvents
async function loadEventsForUser(){

    const { data, error } = await db
        .from("events")
        .select("*")
        .eq("user_id", currentUserId)
        .order("event_date", { ascending: true })
        .order("event_time", { ascending: true });

    if(error){

        console.error("Error cargando eventos:", error);

        return;

    }

    scheduleEvents = {};

    data.forEach((row) => {

        const key = row.event_date;

        if(!scheduleEvents[key]){

            scheduleEvents[key] = [];

        }

        scheduleEvents[key].push({
            id: row.id,
            time: formatTimeDisplay(row.event_time),
            title: row.title,
            subtitle: row.description || typeLabels[row.category] || "",
            duration: `${row.duration_minutes} min`,
            type: row.category,
            priority: row.priority || "medium"
        });

    });

}

/* ======================================================
                ICONS PER TYPE
====================================================== */

const typeIcons = {

    study:"book-open",
    break:"coffee",
    task:"clipboard-list",
    reminder:"bell"

};

/* ======================================================
                CALENDAR STATE
====================================================== */

let viewYear = today.getFullYear();

let viewMonth = today.getMonth();

let selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

let activeFilter = "all";

/* ======================================================
                RENDER CALENDAR
====================================================== */

const calendarGrid = document.getElementById("calendarGrid");

const calendarMonthLabel = document.getElementById("calendarMonthLabel");

function renderCalendar(){

    calendarGrid.innerHTML = "";

    calendarMonthLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;

    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);

    const startWeekday = firstDayOfMonth.getDay();

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const totalCells = 42;

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < totalCells; i++){

        const cell = document.createElement("div");

        cell.classList.add("calendar-day");

        let cellDate;

        let dayNumber;

        if(i < startWeekday){

            dayNumber = daysInPrevMonth - startWeekday + i + 1;

            cellDate = new Date(viewYear, viewMonth - 1, dayNumber);

            cell.classList.add("other-month");

        }
        else if(i >= startWeekday + daysInMonth){

            dayNumber = i - (startWeekday + daysInMonth) + 1;

            cellDate = new Date(viewYear, viewMonth + 1, dayNumber);

            cell.classList.add("other-month");

        }
        else{

            dayNumber = i - startWeekday + 1;

            cellDate = new Date(viewYear, viewMonth, dayNumber);

        }

        const dayLabel = document.createElement("span");

        dayLabel.textContent = dayNumber;

        cell.appendChild(dayLabel);

        if(isSameDay(cellDate, today)){

            cell.classList.add("today");

        }

        if(isSameDay(cellDate, selectedDate)){

            cell.classList.add("selected");

        }

        const key = toDateKey(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());

        if(scheduleEvents[key] && scheduleEvents[key].length > 0){

            const dot = document.createElement("span");

            dot.classList.add("day-dot");

            cell.appendChild(dot);

        }

        cell.addEventListener("click", () => {

            selectedDate = cellDate;

            if(cellDate.getMonth() !== viewMonth || cellDate.getFullYear() !== viewYear){

                viewYear = cellDate.getFullYear();

                viewMonth = cellDate.getMonth();

            }

            renderCalendar();

            renderTimeline();

        });

        fragment.appendChild(cell);

    }

    calendarGrid.appendChild(fragment);

}

document.getElementById("prevMonth").addEventListener("click", () => {

    viewMonth--;

    if(viewMonth < 0){

        viewMonth = 11;

        viewYear--;

    }

    renderCalendar();

});

document.getElementById("nextMonth").addEventListener("click", () => {

    viewMonth++;

    if(viewMonth > 11){

        viewMonth = 0;

        viewYear++;

    }

    renderCalendar();

});

document.getElementById("todayBtn").addEventListener("click", () => {

    viewYear = today.getFullYear();

    viewMonth = today.getMonth();

    selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    renderCalendar();

    renderTimeline();

});

/* ======================================================
                TYPE FILTERS
====================================================== */

const filterChips = document.querySelectorAll(".filter-chip");

filterChips.forEach((chip) => {

    chip.addEventListener("click", () => {

        filterChips.forEach((c) => c.classList.remove("active"));

        chip.classList.add("active");

        activeFilter = chip.dataset.filter;

        renderTimeline();

    });

});

/* ======================================================
                RENDER TIMELINE (d\u00eda seleccionado)
====================================================== */

const timelineList = document.getElementById("timelineList");

const selectedDayLabel = document.getElementById("selectedDayLabel");

function renderTimeline(){

    const key = toDateKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

    let events = scheduleEvents[key] || [];

    if(activeFilter !== "all"){

        events = events.filter((ev) => ev.type === activeFilter);

    }

    if(isSameDay(selectedDate, today)){

        selectedDayLabel.textContent = "Today";

    }
    else{

        selectedDayLabel.textContent = `${weekdayNames[selectedDate.getDay()]}, ${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}`;

    }

    timelineList.innerHTML = "";

    if(events.length === 0){

        timelineList.innerHTML = `
            <div class="timeline-empty">
                <p>No events for this day yet. Try Quick Add on the left.</p>
            </div>
        `;

        return;

    }

    events.forEach((event) => {

        const item = document.createElement("div");

        item.classList.add("timeline-item", event.type);

        const priority = event.priority || "medium";

        item.innerHTML = `
            <div class="timeline-time-col">
                <span class="timeline-time">${event.time}</span>
                <span class="timeline-dot"></span>
                <div class="timeline-line"></div>
            </div>
            <div class="timeline-card priority-${priority}">
                <div class="timeline-card-left">
                    <div class="timeline-icon">
                        <i data-lucide="${typeIcons[event.type] || "circle"}"></i>
                    </div>
                    <div class="timeline-info">
                        <h4>${event.title}</h4>
                        <p>${event.subtitle}</p>
                    </div>
                </div>
                <div class="timeline-card-right">
                    <div class="timeline-duration">
                        <i data-lucide="clock"></i>
                        ${event.duration}
                    </div>
                    <button class="timeline-delete" data-id="${event.id}">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </div>
        `;

        timelineList.appendChild(item);

    });

    lucide.createIcons();

    document.querySelectorAll(".timeline-delete").forEach((btn) => {

        btn.addEventListener("click", async () => {

            const eventId = btn.dataset.id;

            const { error } = await db
                .from("events")
                .delete()
                .eq("id", eventId);

            if(error){

                console.error("Error borrando evento:", error);

                return;

            }

            await loadEventsForUser();

            renderCalendar();

            renderTimeline();

            renderUpcoming();

        });

    });

}

/* ======================================================
                UPCOMING THIS MONTH
====================================================== */

const upcomingList = document.getElementById("upcomingList");

function renderUpcoming(){

    const items = [];

    Object.keys(scheduleEvents).forEach((key) => {

        const [y,m,d] = key.split("-").map(Number);

        const date = new Date(y, m - 1, d);

        if(date < new Date(today.getFullYear(), today.getMonth(), today.getDate())){

            return;

        }

        scheduleEvents[key].forEach((ev) => {

            items.push({ date, key, ...ev });

        });

    });

    items.sort((a,b) => a.date - b.date);

    const next = items.slice(0,5);

    upcomingList.innerHTML = "";

    if(next.length === 0){

        upcomingList.innerHTML = `<p class="upcoming-empty">Nothing coming up yet.</p>`;

        return;

    }

    next.forEach((ev) => {

        const row = document.createElement("div");

        row.classList.add("upcoming-item");

        row.innerHTML = `
            <div class="upcoming-date">
                <span>${ev.date.getDate()}</span>
                <span>${monthNamesShort[ev.date.getMonth()]}</span>
            </div>
            <div class="upcoming-info">
                <h4>${ev.title}</h4>
                <p>${ev.time} \u2022 ${ev.duration}</p>
            </div>
        `;

        row.addEventListener("click", () => {

            selectedDate = ev.date;

            viewYear = ev.date.getFullYear();

            viewMonth = ev.date.getMonth();

            renderCalendar();

            renderTimeline();

        });

        upcomingList.appendChild(row);

    });

}

/* ======================================================
                QUICK ADD (ahora guarda en Supabase)
====================================================== */

const quickAddButtons = document.querySelectorAll(".quick-add-btn");

const quickAddDefaults = {

    study:{ title:"Study Session", subtitle:"Focused study time", durationMinutes:45 },
    break:{ title:"Break", subtitle:"Take a breather", durationMinutes:15 },
    task:{ title:"New Task", subtitle:"Something to finish", durationMinutes:30 },
    reminder:{ title:"Reminder", subtitle:"Don't forget this", durationMinutes:5 }

};

async function addQuickEvent(type){

    const key = toDateKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

    const now = new Date();

    const timeString = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:00`;

    const preset = quickAddDefaults[type];

    const { error } = await db
        .from("events")
        .insert({
            user_id: currentUserId,
            title: preset.title,
            description: preset.subtitle,
            event_date: key,
            event_time: timeString,
            duration_minutes: preset.durationMinutes,
            category: type,
            priority: "medium"
        });

    if(error){

        console.error("Error guardando evento r\u00e1pido:", error);

        return;

    }

    await loadEventsForUser();

    renderCalendar();

    renderTimeline();

    renderUpcoming();

}

quickAddButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        addQuickEvent(btn.dataset.type);

    });

});

/* ======================================================
                ADD EVENT MODAL (ahora guarda en Supabase)
====================================================== */

const eventModalOverlay = document.getElementById("eventModalOverlay");

const eventForm = document.getElementById("eventForm");

const eventTitleInput = document.getElementById("eventTitle");

const eventDateInput = document.getElementById("eventDate");

const eventTimeInput = document.getElementById("eventTime");

const eventDurationInput = document.getElementById("eventDuration");

const eventTypeSelect = document.getElementById("eventType");

const eventNotesInput = document.getElementById("eventNotes");

const priorityButtons = document.querySelectorAll(".priority-btn");

let selectedPriority = "medium";

function dateForInput(date){

    const y = date.getFullYear();

    const m = String(date.getMonth() + 1).padStart(2,"0");

    const d = String(date.getDate()).padStart(2,"0");

    return `${y}-${m}-${d}`;

}

function openEventModal(){

    eventForm.reset();

    eventDateInput.value = dateForInput(selectedDate);

    const now = new Date();

    eventTimeInput.value = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

    eventDurationInput.value = 30;

    eventTypeSelect.value = "study";

    selectedPriority = "medium";

    priorityButtons.forEach((btn) => {

        btn.classList.toggle("active", btn.dataset.priority === "medium");

    });

    eventModalOverlay.classList.add("open");

    eventTitleInput.focus();

}

function closeEventModal(){

    eventModalOverlay.classList.remove("open");

}

document.getElementById("addEventBtn").addEventListener("click", openEventModal);

document.getElementById("modalCloseBtn").addEventListener("click", closeEventModal);

document.getElementById("modalCancelBtn").addEventListener("click", closeEventModal);

eventModalOverlay.addEventListener("click", (e) => {

    if(e.target === eventModalOverlay){

        closeEventModal();

    }

});

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        closeEventModal();

    }

});

priorityButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        priorityButtons.forEach((b) => b.classList.remove("active"));

        btn.classList.add("active");

        selectedPriority = btn.dataset.priority;

    });

});

eventForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = eventTitleInput.value.trim();

    if(!title){

        return;

    }

    const eventDateValue = eventDateInput.value;

    const eventTimeValue = eventTimeInput.value;

    const durationMinutes = parseInt(eventDurationInput.value, 10);

    const type = eventTypeSelect.value;

    const notes = eventNotesInput.value.trim();

    const { error } = await db
        .from("events")
        .insert({
            user_id: currentUserId,
            title,
            description: notes || typeLabels[type],
            event_date: eventDateValue,
            event_time: `${eventTimeValue}:00`,
            duration_minutes: durationMinutes,
            category: type,
            priority: selectedPriority
        });

    if(error){

        console.error("Error guardando evento:", error);

        return;

    }

    closeEventModal();

    const [y,m,d] = eventDateValue.split("-").map(Number);

    selectedDate = new Date(y, m - 1, d);

    viewYear = selectedDate.getFullYear();

    viewMonth = selectedDate.getMonth();

    await loadEventsForUser();

    renderCalendar();

    renderTimeline();

    renderUpcoming();

});

/* ======================================================
                SEARCH (filtra el timeline del d\u00eda actual)
====================================================== */

document.getElementById("scheduleSearch").addEventListener("input", (e) => {

    const term = e.target.value.toLowerCase();

    document.querySelectorAll(".timeline-item").forEach((item) => {

        const text = item.textContent.toLowerCase();

        item.style.display = text.includes(term) ? "flex" : "none";

    });

});

/* ======================================================
                INITIALIZE (revisa sesi\u00f3n y carga datos reales)
====================================================== */

async function init(){

    const { data: { session }, error: sessionError } = await db.auth.getSession();

    if(sessionError){

        console.error(sessionError);

    }

    if(!session){

        console.log("No hay sesi\u00f3n");

        window.location.href = "../Login/Login.html";

        return;

    }

    currentUserId = session.user.id;

    await loadEventsForUser();

    renderCalendar();

    renderTimeline();

    renderUpcoming();

    console.log("Thinking Schedule Screen Loaded \ud83d\ude80");

}

init();
