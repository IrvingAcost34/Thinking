// ======================
// THINKING REGISTER JS
// ======================


// FORMULARIO

const form =
document.getElementById(
"register-form"
);

form.addEventListener(
"submit",
function(e){

e.preventDefault();

const name =
document.getElementById(
"name"
).value;

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

const confirmPassword =
document.getElementById(
"confirm-password"
).value;


// verificar contraseña

if(
password !==
confirmPassword
){

alert(
"Passwords do not match"
);

return;

}

alert(
"Account created successfully"
);

console.log(
name,
email
);

});


// BOTON GOOGLE

const googleBtn =
document.querySelector(
".google-btn"
);

googleBtn.addEventListener(
"click",
()=>{

alert(
"Google Login coming soon"
);

});
