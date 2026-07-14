// =========================
// BOTÓN BACK
// =========================

const backBtn =
document.querySelector(".home-btn");

if(backBtn){

backBtn.addEventListener("click",(e)=>{

e.preventDefault();

window.location.href=
"../index.html";

});

}


// =========================
// TARJETAS DE ROLES
// =========================

const roleCards =
document.querySelectorAll(".role-card");


// TEACHER

roleCards[0].addEventListener("click",()=>{

window.location.href=
"../LOGIN Teacher/TEACHER LOGIN.html";

});


// STUDENT

roleCards[1].addEventListener("click",()=>{

window.location.href=
"../LOGIN-Student/STUDENT LOGIN.html";

});

// =========================
// CLIC PARA IR A STUDENT REGISTER
// =========================
const roleCards = document.querySelectorAll(".role-card");

roleCards[1].addEventListener("click", () => {

    window.location.href = "STUDENT_REGISTER.html";

});


