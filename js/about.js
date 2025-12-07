const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 150; 

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * width - width / 2;
        this.y = Math.random() * height - height / 2;
        this.z = Math.random() * width; 
    }
    update() {
        this.z -= 1; 
        if (this.z <= 0) {
            this.reset();
            this.z = width;
        }
    }
    draw() {
        let x = (this.x / this.z) * width + width / 2;
        let y = (this.y / this.z) * height + height / 2;
        let radius = (1 - this.z / width) * 2; 

        if (x < 0 || x > width || y < 0 || y > height) return;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) { stars.push(new Star()); }
}

function animateStars() {
    ctx.clearRect(0, 0, width, height); 
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => { resize(); initStars(); });
resize();
initStars();
animateStars();


const animatedElements = document.querySelectorAll('.fade-in, .hidden');

function revealElements() {
    animatedElements.forEach((el, index) => {
        el.classList.add('hidden'); 
        setTimeout(() => {
            el.classList.remove('hidden');
            el.classList.add('show');
        }, index * 150); 
    });
}

window.addEventListener('load', revealElements);

const toggleDark = document.getElementById("toggle-dark-navbar");
const toggleIcon = document.querySelector(".toggle-icon");

toggleDark.addEventListener("change", () => {
  toggleIcon.textContent = toggleDark.checked ? "🌙" : "☀️";
  document.body.classList.toggle("dark-mode", toggleDark.checked);
  document.body.classList.toggle("light-mode", !toggleDark.checked);
});

const toggle = document.getElementById("toggle-dark-navbar");
const icon = document.querySelector(".toggle-icon");
const trailContainer = document.querySelector(".trail-container");

toggle.addEventListener("change", () => {
  // Change icon
  icon.textContent = toggle.checked ? "🌙" : "☀️";
  
  // Toggle dark/light mode class
  document.body.classList.toggle("dark-mode", toggle.checked);
  document.body.classList.toggle("light-mode", !toggle.checked);

  // Create comet trails
  createCometTrail(toggle.checked);
});

function createCometTrail(isDark) {
  const count = 12; // number of particles for denser trail
  const containerRect = trailContainer.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.classList.add("trail-particle");
      if (isDark) particle.classList.add("moon-mode");

      // Random vertical scatter
      particle.style.setProperty("--scatter-y", `${Math.random() * 10 - 5}px`);

      // Distance and direction
      const distance = isDark ? 10 : -20; // longer trail for better effect
      particle.style.setProperty("--distance", `${distance}px`);

      // Center particle vertically on icon
      const iconRect = icon.getBoundingClientRect();
      const top = iconRect.top + iconRect.height / 2 - containerRect.top;
      const left = iconRect.left + iconRect.width / 2 - containerRect.left;
      particle.style.top = `${top}px`;
      particle.style.left = `${left}px`;

      // Random animation duration (slower)
      const duration = 0.7 + Math.random() * 0.5; // 0.7s – 1.2s
      particle.style.animation = `comet ${duration}s ease-out forwards`;

      trailContainer.appendChild(particle);

      // Remove after animation
      setTimeout(() => particle.remove(), duration * 1000);
    }, i * 40); // stagger particles slightly
  }

 // ===== STARFIELD (only if exists) =====
  const canvas = document.getElementById("starfield");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let stars = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = canvas.width < 400 ? 10 : 20;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.5,
          a: Math.random(),
          s: Math.random() * 0.03 + 0.01
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a += (Math.random() - 0.5) * 0.12;
        s.a = Math.max(0.1, Math.min(1, s.a));
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
  }
}