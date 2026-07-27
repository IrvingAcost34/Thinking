* ---------------- Stars ---------------- */
  const starField = document.getElementById('starField');
  const STAR_COUNT = 120;
  for(let i=0;i<STAR_COUNT;i++){
    const s = document.createElement('div');
    s.className = 'star';
    const size = (Math.random()*2 + 1).toFixed(1);
    s.style.width = size+'px';
    s.style.height = size+'px';
    s.style.top = Math.random()*100+'%';
    s.style.left = Math.random()*100+'%';
    s.style.animationDuration = (Math.random()*3 + 2).toFixed(1)+'s';
    s.style.animationDelay = (Math.random()*4).toFixed(1)+'s';
    starField.appendChild(s);
  }
 
  /* ---------------- Theme toggle ---------------- */
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
 
  /* ---------------- Dropdowns ---------------- */
  function setupDropdown(btnId, dropdownId){
    const btn = document.getElementById(btnId);
    const dd = document.getElementById(dropdownId);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.contains('open');
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
      if(!isOpen) dd.classList.add('open');
    });
  }
  setupDropdown('notifBtn', 'notifDropdown');
  setupDropdown('profileBtn', 'profileDropdown');
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  });
 
  /* ---------------- Language toggle ---------------- */
  const translations = {
    en: {
      nav_home:"Home", nav_test:"Test", nav_students:"Students", nav_assignments:"Assigments",
      nav_resources:"Resources", nav_schedule:"Schedule", nav_bombi:"Bombi AI",
      role_teacher:"Teacher",
      search_ph:"Search",
      notif_title:"Notifications",
      notif1_title:"Anatomy Quiz tomorrow", notif1_time:"10 minutes ago",
      notif2_title:"3 new submissions in Biology 101", notif2_time:"1 hour ago",
      notif3_title:"Faculty meeting moved to 11:00 AM", notif3_time:"Yesterday",
      menu_profile:"View Profile", menu_settings:"Settings", menu_logout:"Log out",
      good_morning:"Good Morning",
      hero_title:"Everything you need to teach in one place.",
      hero_sub:"Organize your classes, assignments, schedules and student progress with Thinking.",
      btn_myclasses:"My classes", btn_analytics:"Analytics",
      bombi_title:"Bombi AI", bombi_sub:"Get instant teaching support with Bombi.", btn_ask_bombi:"Ask Bombi",
      schedule_title:"Today's Schedule", monday:"Monday",
      event1_title:"Biology 101", event1_room:"Room A-203",
      event2_title:"Faculty Meeting", event2_room:"Coference Room",
      event3_title:"Anatomy Lab", event3_room:"Lab 4",
      myclasses_title:"My Classes", view_all:"View All",
      students_word:"Students", status_open:"Open",
      quickactions_title:"Quick Actions",
      qa1:"Create a assigment", qa2:"New lesson", qa3:"uploan Resource",
      deadlines_title:"Upcoming Deadlines",
      deadline1_title:"Biology Homework #5", deadline1_time:"Due Today- 11:59",
      deadline2_title:"Anatomy Quiz", deadline2_time:"Tomorrow",
      deadline3_title:"Submit Final Grades", deadline3_time:"Friday",
      view_more:"View More"
    },
    es: {
      nav_home:"Inicio", nav_test:"Examen", nav_students:"Estudiantes", nav_assignments:"Tareas",
      nav_resources:"Recursos", nav_schedule:"Horario", nav_bombi:"Bombi IA",
      role_teacher:"Profesor",
      search_ph:"Buscar",
      notif_title:"Notificaciones",
      notif1_title:"Examen de Anatomía mañana", notif1_time:"Hace 10 minutos",
      notif2_title:"3 entregas nuevas en Biología 101", notif2_time:"Hace 1 hora",
      notif3_title:"Reunión de facultad movida a las 11:00 AM", notif3_time:"Ayer",
      menu_profile:"Ver Perfil", menu_settings:"Configuración", menu_logout:"Cerrar sesión",
      good_morning:"Buenos Días",
      hero_title:"Todo lo que necesitas para enseñar en un solo lugar.",
      hero_sub:"Organiza tus clases, tareas, horarios y el progreso de tus estudiantes con Thinking.",
      btn_myclasses:"Mis clases", btn_analytics:"Analítica",
      bombi_title:"Bombi IA", bombi_sub:"Obtén ayuda docente al instante con Bombi.", btn_ask_bombi:"Preguntar a Bombi",
      schedule_title:"Horario de Hoy", monday:"Lunes",
      event1_title:"Biología 101", event1_room:"Salón A-203",
      event2_title:"Reunión de Facultad", event2_room:"Sala de Conferencias",
      event3_title:"Laboratorio de Anatomía", event3_room:"Lab 4",
      myclasses_title:"Mis Clases", view_all:"Ver Todo",
      students_word:"Estudiantes", status_open:"Abierto",
      quickactions_title:"Acciones Rápidas",
      qa1:"Crear una tarea", qa2:"Nueva lección", qa3:"Subir recurso",
      deadlines_title:"Próximas Entregas",
      deadline1_title:"Tarea de Biología #5", deadline1_time:"Vence Hoy - 11:59",
      deadline2_title:"Examen de Anatomía", deadline2_time:"Mañana",
      deadline3_title:"Entregar Calificaciones Finales", deadline3_time:"Viernes",
      view_more:"Ver Más"
    }
  };
 
  let currentLang = 'en';
  function applyLanguage(lang){
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if(dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });
    document.getElementById('langLabel').textContent = lang.toUpperCase();
    document.documentElement.lang = lang;
  }
 
  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    applyLanguage(currentLang);
  });
 
  applyLanguage(currentLang);
