
// =========================
// THINKING WEBSITE SCRIPT
// =========================

// BOTÓN LOGIN

const loginBtn = document.querySelector(".login-btn");

if(loginBtn){
    loginBtn.addEventListener("click", () => {
        window.location.href = "Login/Login.html";
    });
}

// BOTÓN SIGN UP

const signupBtn = document.querySelector(".signup-btn");

if(signupBtn){
    signupBtn.addEventListener("click", () => {
        window.location.href = "Register/REGISTER.html";
    });
}

// BOTÓN START ASSESSMENT

const startBtn = document.querySelector(".start-btn");

if(startBtn){
    startBtn.addEventListener("click", () => {
        window.location.href = "Login/Login.html";
    });
}

// BOTÓN EXPLORE TECHNIQUES

const exploreBtn = document.querySelector(".explore-btn");

if(exploreBtn){
    exploreBtn.addEventListener("click", () => {

        const learningSection =
        document.getElementById("learning-styles");

        if(learningSection){

            learningSection.scrollIntoView({
                behavior:"smooth"
            });

        }

    });
}

// LOGO THINKING

const brand = document.querySelector(".brand");

if(brand){

    brand.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

// =========================
// MENU NAVIGATION
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});
// =========================
// THEME TOGGLE
// =========================

const themeBtn =
document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {

    const currentTheme =
    document.documentElement.getAttribute(
        "data-theme"
    );

    if(currentTheme === "dark"){

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        themeBtn.innerHTML = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }else{

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        themeBtn.innerHTML = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );
    }
});

// =========================
// LOAD SAVED THEME
// =========================

const savedTheme =
localStorage.getItem("theme");

if(savedTheme){

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    if(savedTheme === "dark"){

        themeBtn.innerHTML = "☀️";
    }
}
// =========================
// BOMBI CHAT
// =========================

const bombiBtn =
document.getElementById("bombi-btn");

const bombiChat =
document.getElementById("bombi-chat");

const closeChat =
document.getElementById("close-chat");

if(bombiBtn){

    bombiBtn.addEventListener("click", () => {

        bombiChat.style.display = "block";

    });

}

if(closeChat){

    closeChat.addEventListener("click", () => {

        bombiChat.style.display = "none";

    });

}
/* ==========================
   NAVBAR SCROLL
==========================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});
/* ==========================
   THINKING STARFIELD
==========================*/

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let meteors = [];

let scrollOffset = 0;
let nebulaOffset = 0;

// ==========================
// CANVAS SIZE
// ==========================

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// ==========================
// SCROLL
// ==========================

window.addEventListener("scroll", () => {

    scrollOffset = window.scrollY;

});

// ==========================
// STAR COLORS
// ==========================

function randomColor(){

    const colors = [

        "#ffffff",
        "#ffffff",
        "#ffffff",
        "#8c52ff",
        "#00c2ff"

    ];

    return colors[Math.floor(Math.random()*colors.length)];

}

// ==========================
// CREATE STARS
// ==========================

function createStars(){
    stars = [];
    for(let i=0;i<600;i++){
        let layer;
        if(i<350){
            layer=1;
        }else if(i<520){
            layer=2;
        }else{
            layer=3;
        }
        stars.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height*5,
            radius:
                layer===1
                ?Math.random()*1.2+.2
                :layer===2
                ?Math.random()*2+.8
                :Math.random()*3+1.5,
            speed:
                layer===1
                ?0.12
                :layer===2
                ?0.28
                :0.45,
            alpha:Math.random(),
            twinkle:(Math.random()*0.01)+0.002,
            color:randomColor(),
            layer
        });
    }
}
createStars();

// ==========================
// METEORS
// ==========================

setInterval(()=>{

    if(document.documentElement.getAttribute("data-theme") !== "dark") return;

    meteors.push({

        x: Math.random()*canvas.width,

        y: -100,

        length: 120 + Math.random()*80,

        speed: 10 + Math.random()*4,

        opacity: 1

    });

},5000);

// ==========================
// DRAW
// ==========================

function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
  nebulaOffset += 0.15;

// Nebulosa morada

let gradient1 = ctx.createRadialGradient(

    canvas.width*0.25 + Math.sin(nebulaOffset*0.01)*80,

    canvas.height*0.30,

    50,

    canvas.width*0.25,

    canvas.height*0.30,

    500

);

gradient1.addColorStop(0,"rgba(140,82,255,0.12)");
gradient1.addColorStop(1,"rgba(140,82,255,0)");

ctx.fillStyle = gradient1;
ctx.fillRect(0,0,canvas.width,canvas.height);

// Nebulosa azul

let gradient2 = ctx.createRadialGradient(

    canvas.width*0.80 + Math.cos(nebulaOffset*0.008)*100,

    canvas.height*0.70,

    80,

    canvas.width*0.80,

    canvas.height*0.70,

    600

);

gradient2.addColorStop(0,"rgba(0,194,255,0.10)");
gradient2.addColorStop(1,"rgba(0,194,255,0)");

ctx.fillStyle = gradient2;
ctx.fillRect(0,0,canvas.width,canvas.height);

    if(document.documentElement.getAttribute("data-theme") !== "dark"){
        
        drawConstellations();
        requestAnimationFrame(drawStars);

        return;

    }

    // ---------- STARS ----------

    stars.forEach(star=>{

        star.alpha += star.twinkle;

        if(star.alpha > 1 || star.alpha < 0.2){

            star.twinkle *= -1;

        }

        const totalHeight = canvas.height * 5;

        const y = ((star.y - scrollOffset * star.speed) % totalHeight + totalHeight) % totalHeight;
        

        ctx.beginPath();

        ctx.arc(

            star.x,

            y,

            star.radius,

            0,

            Math.PI*2

        );

        ctx.fillStyle = star.color;

        ctx.shadowBlur = star.radius*10;

        ctx.shadowColor = star.color;

        ctx.globalAlpha = star.alpha;

        ctx.fill();

        ctx.globalAlpha = 1;

    });

    // ---------- METEORS ----------

    meteors.forEach((meteor,index)=>{

        ctx.beginPath();

        ctx.moveTo(meteor.x, meteor.y);

        ctx.lineTo(

            meteor.x - meteor.length,

            meteor.y - meteor.length

        );

        ctx.strokeStyle = `rgba(255,255,255,${meteor.opacity})`;

        ctx.lineWidth = 1 + Math.random()*2;

        ctx.shadowBlur = 45;

        ctx.shadowColor = "#ffffff";

        ctx.stroke();

        meteor.x += meteor.speed;

        meteor.y += meteor.speed;

        meteor.opacity -= 0.01;

        if(meteor.opacity <= 0){

            meteors.splice(index,1);

        }

    });

    requestAnimationFrame(drawStars);

}

drawStars();
/* ==========================
   THINKING STARFIELD PHASE 5
==========================*/

const mouse = {

    x: -9999,
    y: -9999

};

window.addEventListener("mousemove",(e)=>{

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

window.addEventListener("mouseleave",()=>{

    mouse.x = -9999;
    mouse.y = -9999;

});
function drawConstellations(){

    if(document.documentElement.getAttribute("data-theme") !== "dark") return;

    for(let i=0;i<stars.length;i++){

        const star = stars[i];

        const x1 = star.x + mouseX*star.layer;

        const y1 = star.y-scrollOffset*star.speed;

        const distanceMouse = Math.hypot(

            mouse.x-x1,

            mouse.y-y1

        );

        if(distanceMouse>180) continue;

        for(let j=i+1;j<stars.length;j++){

            const star2 = stars[j];

            const x2 = star2.x + mouseX*star2.layer;

            const y2 = star2.y-scrollOffset*star2.speed;

            const distance = Math.hypot(

                x2-x1,

                y2-y1

            );

            if(distance<80){

                ctx.beginPath();

                ctx.moveTo(x1,y1);

                ctx.lineTo(x2,y2);

                ctx.strokeStyle="rgba(255,255,255,.08)";

                ctx.lineWidth=.5;

                ctx.stroke();

            }

        }

    }

}
const progressText = document.querySelector(".progress-circle span");

if(progressText){

    const values = ["20%","45%","75%","90%"];

    let index = 0;

    setInterval(()=>{

        index++;

        if(index >= values.length){

            index = 0;

        }

        progressText.textContent = values[index];

    },1000);

}
const discoverBtn = document.getElementById("discover-btn");

if(discoverBtn){

    discoverBtn.addEventListener("click",()=>{

        window.location.href="Login.html";

    });

}
