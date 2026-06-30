const form =
document.getElementById(
"student-form"
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

const password=
document.getElementById(
"password"
).value;

const confirmPassword=
document.getElementById(
"confirm-password"
).value;


if(
password!==confirmPassword
){

alert(
"Passwords do not match"
);

return;

}


const studentData={

name:name,
email:email,
password:password

};


localStorage.setItem(

"studentAccount",

JSON.stringify(
studentData
)

);


alert(
"Student account created successfully!"
);


window.location.href=
"LOGIN_STUDENT.html";

});
