document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const errorMsg = document.getElementById("error-msg");
    const adminBtn = document.getElementById("admin-btn"); 
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;

            // === HARD-CODED MASTER ACCOUNT (always works) ===
            if (username === "user" && password === "1234") {
                localStorage.setItem("cosmicUsername", username);
                localStorage.setItem("cosmicLoginTime", Date.now().toString());
                window.location.href = "loading.html";
                return;
            }

            // Get the registered credentials
            const savedUser = localStorage.getItem("registeredUser");
            const savedPass = localStorage.getItem("registeredPass");

            // Check if they match
            if (username === savedUser && password === savedPass && savedUser) {
           
                localStorage.setItem("cosmicUsername", username);
                localStorage.setItem("cosmicLoginTime", Date.now().toString());

                window.location.href = "loading.html";
            } else {
                errorMsg.textContent = "Wrong username or password!";
                errorMsg.style.color = "#ff6b6b";
            }
        });
    }

    // ----- CONTINUE AS ADMIN -----
    if (adminBtn) {
        adminBtn.addEventListener("click", () => {
            window.location.href = "dashboard.html";
        });
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
            const count = canvas.width < 600 ? 90 : 80;
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

    // ======== PLANETS PAGE INTERACTION ========
    const planetItems = document.querySelectorAll(".planet-item");

    planetItems.forEach(item => {
        const planet = item.dataset.planet;
        const orbit = document.querySelector(`.orbit[data-planet="${planet}"]`);
        const video = orbit?.querySelector(".planet-video");
      
        document.querySelectorAll(".planet-item").forEach(item => {
            const orbit = document.querySelector(`.orbit[data-planet="${item.dataset.planet}"]`);

            item.addEventListener("mouseenter", () => {
                orbit?.classList.add("highlight");
            });
            item.addEventListener("mouseleave", () => {
                orbit?.classList.remove("highlight");
            });
        });

        const info = item.querySelector(".planet-info"); 

        item.addEventListener("mouseenter", () => {
            orbit?.classList.add("highlight");
            if (video) video.style.transform = "scale(2)";
            if (video) video.style.boxShadow = "0 0 70px rgba(0,255,255,0.9)";
            info?.classList.add("show");
        });

        item.addEventListener("mouseleave", () => {
            orbit?.classList.remove("highlight");
            if (video) video.style.transform = "";
            if (video) video.style.boxShadow = "";
            info?.classList.remove("show");
        });

        item.addEventListener("click", () => {
            document.querySelectorAll(".planet-item").forEach(i => i.classList.remove("active"));
            document.querySelectorAll(".orbit").forEach(o => o.classList.remove("permanent"));
            item.classList.add("active");
            orbit?.classList.add("permanent");
        });
    });

    
    document.addEventListener("click", e => {
        if (!e.target.closest(".planet-item") && !e.target.closest(".orbit")) {
            document.querySelectorAll(".planet-item").forEach(i => i.classList.remove("active"));
            document.querySelectorAll(".orbit").forEach(o => o.classList.remove("permanent"));
        }
    });

    const toggleDark = document.getElementById("toggle-dark-navbar");
    const toggleIcon = document.querySelector(".toggle-icon");
    const trailContainer = document.querySelector(".trail-container");

    toggleDark.addEventListener("change", () => {
        toggleIcon.textContent = toggleDark.checked ? "🌙" : "☀️";
        document.body.classList.toggle("dark-mode", toggleDark.checked);
        document.body.classList.toggle("light-mode", !toggleDark.checked);
        createCometTrail(toggleDark.checked);
    });

    function createCometTrail(isDark) {
        const count = 12;
        const containerRect = trailContainer.getBoundingClientRect();

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const particle = document.createElement("div");
                particle.classList.add("trail-particle");
                if (isDark) particle.classList.add("moon-mode");

                const distance = isDark ? 10 : -20;
                const iconRect = toggleIcon.getBoundingClientRect();
                const top = iconRect.top + iconRect.height / 2 - containerRect.top;
                const left = iconRect.left + iconRect.width / 2 - containerRect.left;
                particle.style.top = `${top}px`;
                particle.style.left = `${left}px`;
                particle.style.setProperty("--distance", `${distance}px`);
                particle.style.setProperty("--scatter-y", `${Math.random() * 10 - 5}px`);

                const duration = 0.7 + Math.random() * 0.5;
                particle.style.animation = `comet ${duration}s ease-out forwards`;

                trailContainer.appendChild(particle);

                setTimeout(() => particle.remove(), duration * 1000);
            }, i * 40);
        }
    }

    // ===== TEMPERATURE CHART =====
    const tempCtx = document.getElementById('tempChart').getContext('2d');
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

    const tempChart = new Chart(tempCtx, {
        type: 'bar',
        data: tempData,
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: false }
            },
            scales: {
                y: { beginAtZero: true, ticks: { color: '#fff' } },
                x: { ticks: { color: '#fff' } }
            }
        }
    });

    const events = [
        "🚀 SpaceX successfully launches a new communication satellite into orbit, expanding global coverage",
        "🌑 A spectacular lunar eclipse will be visible tonight from multiple continents, don't miss it!",
        "☄️ Comet Zeta is passing remarkably close to Earth, offering an incredible view through telescopes",
        "🛰️ James Webb Space Telescope captures high-resolution images of a newly discovered exoplanet system",
        "🌌 Astronomers release stunning infrared images of the Milky Way's central region revealing hidden structures"
    ];

    const eventsList = document.querySelector(".space-events");

    events.forEach((event, idx) => {
        const li = eventsList.querySelectorAll("li")[idx];
        if(li) li.textContent = event;
    });

    document.querySelectorAll('.planet-list .planet-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const planet = item.dataset.planet;
            document.querySelectorAll('.orbit').forEach(o => o.classList.remove('highlight'));
            const orbit = document.querySelector(`.orbit[data-planet="${planet}"]`);
            if(orbit) orbit.classList.add('highlight');
        });
        item.addEventListener('mouseleave', () => {
            document.querySelectorAll('.orbit').forEach(o => o.classList.remove('highlight'));
        });
    });

}); 

document.getElementById('logoutBtn').addEventListener('click', () => {
 
  window.location.href = 'index.html';
});

document.querySelectorAll('.orbit').forEach(orbit => {
    const wrapper = orbit.querySelector('.planet-wrapper');


    const radius = getComputedStyle(orbit).getPropertyValue('--orbit-radius').trim();

 
    const radiusPx = radius.includes('px') ? radius : `${radius}px`;


    const angle = Math.random() * 360;

    wrapper.style.transform = `rotate(${angle}deg) translateX(${radiusPx}) rotate(${-angle}deg)`;
});
