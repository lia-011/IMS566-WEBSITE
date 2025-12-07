// ================================================
//        dashboard.js
// ================================================

document.addEventListener("DOMContentLoaded", () => {

  // ===== STARFIELD ANIMATION =====
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

  // ===== DARK MODE TOGGLE + COMET TRAIL =====
  const toggle = document.getElementById("toggle-dark-navbar");
  const icon = document.querySelector(".toggle-icon");
  const trailContainer = document.querySelector(".trail-container");

  if (toggle) {
    toggle.addEventListener("change", () => {
      icon.textContent = toggle.checked ? "🌙" : "☀️";
      document.body.classList.toggle("dark-mode", toggle.checked);
      document.body.classList.toggle("light-mode", !toggle.checked);
      createCometTrail(toggle.checked);
    });
  }

  function createCometTrail(isDark) {
    if (!trailContainer) return;
    const count = 12;
    const containerRect = trailContainer.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.classList.add("trail-particle");
        if (isDark) particle.classList.add("moon-mode");

        const distance = isDark ? 10 : -20;
        particle.style.setProperty("--distance", `${distance}px`);
        particle.style.setProperty("--scatter-y", `${Math.random() * 10 - 5}px`);

        const iconRect = icon.getBoundingClientRect();
        const top = iconRect.top + iconRect.height / 2 - containerRect.top;
        const left = iconRect.left + iconRect.width / 2 - containerRect.left;
        particle.style.top = `${top}px`;
        particle.style.left = `${left}px`;

        const duration = 0.7 + Math.random() * 0.5;
        particle.style.animation = `comet ${duration}s ease-out forwards`;

        trailContainer.appendChild(particle);

        setTimeout(() => particle.remove(), duration * 1000);
      }, i * 40);
    }
  }

  // ===== DYNAMIC SPACE EVENTS =====
  const eventsList = document.querySelector(".space-events");
  if (eventsList) {
    const events = [
      "🚀 SpaceX launches new satellite",
      "🌑 Lunar eclipse visible tonight",
      "☄️ Comet Zeta passing close to Earth",
      "🛰️ James Webb telescope captures new exoplanet",
      "🌌 Milky Way center imaged in infrared"
    ];
    let eventIndex = 0;

    setInterval(() => {
      const items = eventsList.querySelectorAll("li");
      items.forEach((li, idx) => {
        li.textContent = events[(eventIndex + idx) % events.length];
      });
      eventIndex = (eventIndex + 1) % events.length;
    }, 3000);
  }

  // ===== PLANET SIZE BUBBLE CHART =====
 const planetChartCanvas = document.getElementById('planetChart');
if (planetChartCanvas) {
  const ctx = planetChartCanvas.getContext('2d');

  new Chart(ctx, {
    type: 'bubble',
    data: {
      labels: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
      datasets: [{
        label: 'Planet Sizes',
        data: [
          { x: 18, y: 12, r: 7 },
          { x: 35, y: 25, r: 13 },
          { x: 50, y: 35, r: 14 },
          { x: 68, y: 18, r: 8 },
          { x: 90, y: 48, r: 48 },
          { x: 115, y: 38, r: 42 },
          { x: 138, y: 28, r: 22 },
          { x: 160, y: 32, r: 20 }
        ],
        backgroundColor: [
          '#c8c8c8', '#FFD700', '#5080ff', '#D14C28',
          '#FFC850', '#FFC87A', '#96FFE6', '#5A8CFF'
        ],
        borderColor: '#ffffff',
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.3,
      interaction: { mode: 'nearest', intersect: false },
      hitRadius: 60,

      // THIS IS ALL YOU NEED — LEGEND IS BACK + BEAUTIFUL
      plugins: {
        legend: {
          display: true,
          position: 'bottom',        // or 'top'
          align: 'center',
          labels: {
            color: '#e0e8ff',
            font: { size: 14, weight: '600' },
            padding: 20,
            usePointStyle: true,     // round dots instead of squares
            pointStyle: 'circle',
            boxWidth: 12,
            boxHeight: 12,
            generateLabels: (chart) => {
              return chart.data.labels.map((label, i) => ({
                text: label,
                fillStyle: chart.data.datasets[0].backgroundColor[i],
                strokeStyle: '#ffffff',
                lineWidth: 2,
                hidden: false,
                index: i
              }));
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(10, 10, 40, 0.95)',
          borderColor: '#7b00ff',
          borderWidth: 2,
          cornerRadius: 14,
          padding: 14,
          titleColor: '#c0f0ff',
          bodyColor: '#e0f8ff',
          titleFont: { size: 18, weight: 'bold' },
          callbacks: {
            label: (ctx) => `Diameter: ~${(ctx.raw.r * 2000).toLocaleString()} km`
          }
        }
      },

      scales: { x: { display: false }, y: { display: false } }
    }
  });
}
  // ===== TEMPERATURE BAR CHART =====
  const tempChartCanvas = document.getElementById('tempChart');
  if (tempChartCanvas) {
    const tempCtx = tempChartCanvas.getContext('2d');
    const tempData = {
      labels: ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'],
      datasets: [{
        label: 'Surface Temp (°C)',
        data: [167, 464, 15, -65, -110, -140, -195, -200],
        backgroundColor: [
          'rgba(200,200,200,0.8)',
          'rgba(255,220,120,0.8)',
          'rgba(80,160,255,0.8)',
          'rgba(210,80,40,0.8)',
          'rgba(255,200,50,0.8)',
          'rgba(255,230,170,0.8)',
          'rgba(150,255,235,0.8)',
          'rgba(90,140,255,0.8)'
        ],
        borderWidth: 1,
        borderColor: '#fff'
      }]
    };

    new Chart(tempCtx, {
      type: 'bar',
      data: tempData,
      options: {
        responsive: true,
        plugins: { legend: { display: false }, title: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#fff' } },
          x: { ticks: { color: '#fff' } }
        }
      }
    });
  }

});

