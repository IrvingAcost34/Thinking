// ======================
// STUDENT LOGIN
// ======================

const form=
document.getElementById(
"login-form"
);

form.addEventListener(
"submit",
function(e){

e.preventDefault();

const email=
document.getElementById(
"email"
).value;

const password=
document.getElementById(
"password"
).value;


// obtener estudiante guardado

const savedStudent=

JSON.parse(

localStorage.getItem(
"studentAccount"
)

);


// verificar datos

if(

savedStudent &&
email===savedStudent.email &&
password===savedStudent.password

){

alert(

"Welcome Student!"

);


// futura pantalla de verificación

window.location.href=

"VERIFICATION.html";

}

else{

alert(

"Incorrect email or password"

);

}

});



// GOOGLE

const googleBtn=

document.querySelector(
".google-btn"
);

if(googleBtn){

googleBtn.addEventListener(
"click",
()=>{

alert(
"Google Login coming soon"
);

});

}
