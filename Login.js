const bombiText = document.getElementById("bombiText");

const mensajes = [
    "Hi! 👋 Need help?",
    "I’m Bombi 🤖",
    "Let’s build something cool 🚀",
    "Thinking mode: ON 💡",
    "You got this 🔥"
];

document.querySelector(".bombi").addEventListener("mouseenter", () => {
    let random = Math.floor(Math.random() * mensajes.length);
    bombiText.textContent = mensajes[random];
});
const card = document.querySelector(".card");
const bombi = document.querySelector(".bombi");

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener("mousemove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 15;
    targetY = (e.clientY / window.innerHeight - 0.5) * -15;

    card.style.setProperty("--x", e.clientX + "px");
    card.style.setProperty("--y", e.clientY + "px");
});

function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    card.style.transform = `
        rotateY(${currentX}deg)
        rotateX(${currentY}deg)
    `;

    requestAnimationFrame(animate);
}

animate();

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    bombi.style.transform = `translate(${x}px, ${y}px)`;
});
