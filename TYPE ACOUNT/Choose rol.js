// =========================
// BOTÓN BACK
// =========================

const backBtn =
document.querySelector(".home-btn");

if(backBtn){

backBtn.addEventListener("click",(e)=>{

e.preventDefault();

window.location.href=
"REGISTER.html";

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
"REGISTER_TEACHER.html";

});


// STUDENT

roleCards[1].addEventListener("click",()=>{

window.location.href=
"REGISTER_STUDENT.html";

});
