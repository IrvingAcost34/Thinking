const form=
document.getElementById(
"teacher-login"
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

// traer datos
const savedTeacher=
JSON.parse(
localStorage.getItem(
"teacherAccount"
)
);

// verificar
if(
savedTeacher &&
email===savedTeacher.email &&
password===savedTeacher.password
){

alert(
"Welcome Teacher!"
);

// futura pantalla código
window.location.href=
"VERIFICATION.html";

}
else{

alert(
"Incorrect email or password"
);

}

});
