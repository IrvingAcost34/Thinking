const form=
document.getElementById(
"teacher-form"
);

form.addEventListener(
"submit",
function(e){

e.preventDefault();

const name=
document.getElementById(
"name"
).value;

const email=
document.getElementById(
"email"
).value;

const school=
document.getElementById(
"school"
).value;

const subject=
document.getElementById(
"subject"
).value;

const password=
document.getElementById(
"password"
).value;

const confirmPassword=
document.getElementById(
"confirm-password"
).value;


if(password!==confirmPassword){

alert(
"Passwords do not match"
);

return;

}

const teacherData={

name:name,
email:email,
school:school,
subject:subject,
password:password

};

localStorage.setItem(
"teacherAccount",
JSON.stringify(
teacherData
)
);

alert(
"Teacher account created successfully!"
);

window.location.href=
"LOGIN_TEACHER.html";

});
