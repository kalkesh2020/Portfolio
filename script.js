const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ['#00F5FF', '#8A2BE2', '#fff'];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particlesArray.length = 0; // Clear old particles
  init(); // Reinitialize
});


/* =========================
   GRAPHIC DESIGN CAROUSEL LOOP
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const cards = Array.from(track.children);

  // Clone cards once for seamless loop
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollPosition = 0;
  const speed = 0.5; 

  function carouselAnimate() {
    scrollPosition += speed;

    if (scrollPosition >= track.scrollWidth / 2) {
      scrollPosition = 0;
    }

    track.style.transform = `translateX(-${scrollPosition}px)`;
    requestAnimationFrame(carouselAnimate);
  }

  carouselAnimate();
});