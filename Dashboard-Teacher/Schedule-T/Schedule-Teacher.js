/* ======================================================
            THINKING — TEACHER SCHEDULE
====================================================== */


/* ======================================================
                    LUCIDE
====================================================== */

lucide.createIcons();



/* ======================================================
                    ELEMENTS
====================================================== */

const calendarGrid =
    document.getElementById("calendarGrid");

const calendarMonth =
    document.getElementById("calendarMonth");

const selectedDateTitle =
    document.getElementById("selectedDateTitle");

const timeline =
    document.getElementById("timeline");

const eventCount =
    document.getElementById("eventCount");

const upcomingList =
    document.getElementById("upcomingList");



/* ======================================================
                    DATE STATE
====================================================== */

const today = new Date();

let currentMonth =
    today.getMonth();

let currentYear =
    today.getFullYear();

let selectedDate =
    new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );


let activeFilter = "all";



/* ======================================================
                    STORAGE
====================================================== */

const STORAGE_KEY =
    "thinking-teacher-schedule";


let events =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];



/* ======================================================
                    EVENT TYPES
====================================================== */

const eventTypes = {

    class: {

        label:"Class",

        icon:"book-open"

    },

    assignment: {

        label:"Assignment",

        icon:"clipboard-list"

    },

    meeting: {

        label:"Student Meeting",

        icon:"users"

    },

    assessment: {

        label:"Assessment",

        icon:"file-check-2"

    },

    event: {

        label:"School Event",

        icon:"school"

    },

    reminder: {

        label:"Reminder",

        icon:"bell"

    }

};



/* ======================================================
                    HELPERS
====================================================== */

function saveEvents(){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(events)
    );

}


function dateKey(date){

    const y =
        date.getFullYear();

    const m =
        String(date.getMonth()+1)
        .padStart(2,"0");

    const d =
        String(date.getDate())
        .padStart(2,"0");

    return `${y}-${m}-${d}`;

}


function formatTime(time){

    const [hours,minutes] =
        time.split(":");

    let h =
        parseInt(hours);

    const period =
        h >= 12 ? "PM" : "AM";

    h =
        h % 12 || 12;

    return `${h}:${minutes} ${period}`;

}


function isSameDay(a,b){

    return (

        a.getFullYear() ===
        b.getFullYear()

        &&

        a.getMonth() ===
        b.getMonth()

        &&

        a.getDate() ===
        b.getDate()

    );

}


function formatDate(date){

    return date.toLocaleDateString(
        "en-US",
        {
            weekday:"long",
            month:"long",
            day:"numeric"
        }
    );

}



/* ======================================================
                    CALENDAR
====================================================== */

function renderCalendar(){

    calendarGrid.innerHTML = "";

    const monthName =
        new Date(
            currentYear,
            currentMonth
        ).toLocaleDateString(
            "en-US",
            {
                month:"long",
                year:"numeric"
            }
        );

    calendarMonth.textContent =
        monthName;


    const firstDay =
        new Date(
            currentYear,
            currentMonth,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();


    const daysInPreviousMonth =
        new Date(
            currentYear,
            currentMonth,
            0
        ).getDate();


    for(
        let i = 0;
        i < 42;
        i++
    ){

        const cell =
            document.createElement("div");

        cell.className =
            "calendar-day";


        let day;

        let cellDate;


        /* Previous month */

        if(i < firstDay){

            day =
                daysInPreviousMonth
                - firstDay
                + i
                + 1;


            cellDate =
                new Date(
                    currentYear,
                    currentMonth - 1,
                    day
                );


            cell.classList.add(
                "other-month"
            );

        }


        /* Next month */

        else if(
            i >=
            firstDay + daysInMonth
        ){

            day =
                i
                - firstDay
                - daysInMonth
                + 1;


            cellDate =
                new Date(
                    currentYear,
                    currentMonth + 1,
                    day
                );


            cell.classList.add(
                "other-month"
            );

        }


        /* Current month */

        else{

            day =
                i - firstDay + 1;


            cellDate =
                new Date(
                    currentYear,
                    currentMonth,
                    day
                );

        }


        const number =
            document.createElement("span");

        number.textContent =
            day;

        cell.appendChild(number);


        /* Today */

        if(
            isSameDay(
                cellDate,
                today
            )
        ){

            cell.classList.add(
                "today"
            );

        }


        /* Selected */

        if(
            isSameDay(
                cellDate,
                selectedDate
            )
        ){

            cell.classList.add(
                "selected"
            );

        }


        /* Event indicator */

        const hasEvents =
            events.some(
                event =>
                    event.date ===
                    dateKey(cellDate)
            );


        if(hasEvents){

            const dot =
                document.createElement("span");

            dot.className =
                "day-event-dot";

            cell.appendChild(dot);

        }


        cell.addEventListener(
            "click",
            () => {

                selectedDate =
                    cellDate;

                currentMonth =
                    cellDate.getMonth();

                currentYear =
                    cellDate.getFullYear();

                renderCalendar();

                renderTimeline();

            }
        );


        calendarGrid.appendChild(cell);

    }

}



/* ======================================================
                TIMELINE
====================================================== */

function renderTimeline(){

    const key =
        dateKey(selectedDate);


    let dayEvents =
        events.filter(
            event =>
                event.date === key
        );


    if(activeFilter !== "all"){

        dayEvents =
            dayEvents.filter(
                event =>
                    event.type ===
                    activeFilter
            );

    }


    if(
        isSameDay(
            selectedDate,
            today
        )
    ){

        selectedDateTitle.textContent =
            "Today";

    }

    else{

        selectedDateTitle.textContent =
            formatDate(selectedDate);

    }


    eventCount.textContent =
        dayEvents.length;


    timeline.innerHTML = "";


    if(dayEvents.length === 0){

        timeline.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i data-lucide="calendar-off"></i>

                </div>

                <h3>No events scheduled</h3>

                <p>
                    Your schedule is clear for this day.
                </p>

            </div>

        `;

        lucide.createIcons();

        return;

    }


    /* Sort by time */

    dayEvents.sort(
        (a,b) =>
            a.time.localeCompare(b.time)
    );


    dayEvents.forEach(
        event => {

            const type =
                eventTypes[event.type];


            const item =
                document.createElement("div");

            item.className =
                "timeline-item";


            item.innerHTML = `

                <div>

                    <span class="timeline-time">
                        ${formatTime(event.time)}
                    </span>

                </div>


                <div class="timeline-card-item">

                    <div class="timeline-card-top">

                        <div class="timeline-title">

                            <div class="timeline-icon">

                                <i data-lucide="${type.icon}"></i>

                            </div>

                            <h4>
                                ${escapeHTML(event.title)}
                            </h4>

                        </div>


                        <button
                            class="delete-event"
                            data-id="${event.id}"
                            title="Delete event"
                        >

                            <i data-lucide="trash-2"></i>

                        </button>

                    </div>


                    ${
                        event.notes
                        ?
                        `
                        <p class="timeline-description">
                            ${escapeHTML(event.notes)}
                        </p>
                        `
                        :
                        ""
                    }


                    <div class="timeline-meta">

                        <span>

                            <i data-lucide="tag"></i>

                            ${type.label}

                        </span>


                        <span>

                            <i data-lucide="clock"></i>

                            ${event.duration} min

                        </span>

                    </div>

                </div>

            `;


            timeline.appendChild(item);

        }
    );


    lucide.createIcons();


    /* Delete buttons */

    document
        .querySelectorAll(".delete-event")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.id;

                    events =
                        events.filter(
                            event =>
                                event.id !== id
                        );

                    saveEvents();

                    renderCalendar();

                    renderTimeline();

                    renderUpcoming();

                }
            );

        });

}



/* ======================================================
                    UPCOMING
====================================================== */

function renderUpcoming(){

    const now =
        new Date();

    now.setHours(
        0,0,0,0
    );


    const upcoming =
        events
            .map(event => {

                const date =
                    new Date(
                        event.date
                        + "T"
                        + event.time
                    );

                return {
                    ...event,
                    dateObject:date
                };

            })
            .filter(
                event =>
                    event.dateObject >= now
            )
            .sort(
                (a,b) =>
                    a.dateObject
                    -
                    b.dateObject
            )
            .slice(0,5);


    upcomingList.innerHTML = "";


    if(upcoming.length === 0){

        upcomingList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i data-lucide="calendar-check"></i>

                </div>

                <h3>No upcoming events</h3>

                <p>
                    Your upcoming schedule is clear.
                </p>

            </div>

        `;

        lucide.createIcons();

        return;

    }


    upcoming.forEach(
        event => {

            const date =
                event.dateObject;


            const item =
                document.createElement("div");

            item.className =
                "upcoming-item";


            item.innerHTML = `

                <div class="upcoming-date">

                    <strong>
                        ${date.getDate()}
                    </strong>

                    <span>
                        ${date.toLocaleDateString(
                            "en-US",
                            {month:"short"}
                        )}
                    </span>

                </div>


                <div class="upcoming-info">

                    <h4>
                        ${escapeHTML(event.title)}
                    </h4>

                    <p>
                        ${formatTime(event.time)}
                        •
                        ${eventTypes[event.type].label}
                    </p>

                </div>

            `;


            item.addEventListener(
                "click",
                () => {

                    selectedDate =
                        new Date(
                            event.date
                            + "T00:00:00"
                        );

                    currentMonth =
                        selectedDate.getMonth();

                    currentYear =
                        selectedDate.getFullYear();

                    renderCalendar();

                    renderTimeline();

                }
            );


            upcomingList.appendChild(item);

        }
    );

}



/* ======================================================
                    FILTERS
====================================================== */

document
    .querySelectorAll(".filter-chip")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filter-chip"
                    )
                    .forEach(
                        b =>
                            b.classList.remove(
                                "active"
                            )
                    );


                button.classList.add(
                    "active"
                );


                activeFilter =
                    button.dataset.filter;


                renderTimeline();

            }
        );

    });



/* ======================================================
                MONTH NAVIGATION
====================================================== */

document
    .getElementById("prevMonth")
    .addEventListener(
        "click",
        () => {

            currentMonth--;

            if(currentMonth < 0){

                currentMonth = 11;

                currentYear--;

            }

            renderCalendar();

        }
    );


document
    .getElementById("nextMonth")
    .addEventListener(
        "click",
        () => {

            currentMonth++;

            if(currentMonth > 11){

                currentMonth = 0;

                currentYear++;

            }

            renderCalendar();

        }
    );



/* ======================================================
                    TODAY
====================================================== */

document
    .getElementById("todayBtn")
    .addEventListener(
        "click",
        () => {

            selectedDate =
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                );

            currentMonth =
                today.getMonth();

            currentYear =
                today.getFullYear();

            renderCalendar();

            renderTimeline();

        }
    );



/* ======================================================
                    ADD EVENT
====================================================== */

const modal =
    document.getElementById(
        "modalOverlay"
    );

const eventForm =
    document.getElementById(
        "eventForm"
    );


const eventTitle =
    document.getElementById(
        "eventTitle"
    );

const eventDate =
    document.getElementById(
        "eventDate"
    );

const eventTime =
    document.getElementById(
        "eventTime"
    );

const eventType =
    document.getElementById(
        "eventType"
    );

const eventDuration =
    document.getElementById(
        "eventDuration"
    );

const eventNotes =
    document.getElementById(
        "eventNotes"
    );



function openModal(type = "class"){

    modal.classList.add("open");


    eventDate.value =
        dateKey(selectedDate);


    const now =
        new Date();


    eventTime.value =
        String(now.getHours())
        .padStart(2,"0")
        + ":"
        +
        String(now.getMinutes())
        .padStart(2,"0");


    eventType.value =
        type;


    eventTitle.focus();

}


function closeModal(){

    modal.classList.remove(
        "open"
    );

    eventForm.reset();

}



/* Add event button */

document
    .getElementById("addEventBtn")
    .addEventListener(
        "click",
        () => openModal()
    );


/* Close */

document
    .getElementById("modalClose")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancelEvent")
    .addEventListener(
        "click",
        closeModal
    );


modal.addEventListener(
    "click",
    event => {

        if(
            event.target === modal
        ){

            closeModal();

        }

    }
);



/* ======================================================
                FORM SUBMIT
====================================================== */

eventForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const newEvent = {

            id:
                Date.now().toString(),

            title:
                eventTitle.value.trim(),

            date:
                eventDate.value,

            time:
                eventTime.value,

            type:
                eventType.value,

            duration:
                eventDuration.value,

            notes:
                eventNotes.value.trim()

        };


        events.push(
            newEvent
        );


        saveEvents();


        selectedDate =
            new Date(
                newEvent.date
                + "T00:00:00"
            );


        currentMonth =
            selectedDate.getMonth();

        currentYear =
            selectedDate.getFullYear();


        closeModal();


        renderCalendar();

        renderTimeline();

        renderUpcoming();

    }
);



/* ======================================================
                QUICK ADD
====================================================== */

document
    .querySelectorAll(".quick-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openModal(
                    button.dataset.type
                );

            }
        );

    });



/* ======================================================
                    THEME
====================================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


function loadTheme(){

    const saved =
        localStorage.getItem(
            "thinking-theme"
        );


    if(saved === "light"){

        document.body
            .classList
            .add("light-theme");

    }

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body
            .classList
            .toggle(
                "light-theme"
            );


        const mode =
            document.body
                .classList
                .contains(
                    "light-theme"
                )
                ?
                "light"
                :
                "dark";


        localStorage.setItem(
            "thinking-theme",
            mode
        );

    }
);


loadTheme();



/* ======================================================
                MOBILE SIDEBAR
====================================================== */

const sidebar =
    document.querySelector(
        ".sidebar"
    );

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


menuToggle.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

        sidebarOverlay.classList.toggle(
            "open"
        );

    }
);


sidebarOverlay.addEventListener(
    "click",
    () => {

        sidebar.classList.remove(
            "open"
        );

        sidebarOverlay.classList.remove(
            "open"
        );

    }
);



/* ======================================================
                ESCAPE HTML
====================================================== */

function escapeHTML(value){

    return value
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}



/* ======================================================
                    INITIALIZE
====================================================== */

renderCalendar();

renderTimeline();

renderUpcoming();

lucide.createIcons();
