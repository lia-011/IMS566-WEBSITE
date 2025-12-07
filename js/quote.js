const wishesFromOthers = [
  "The universe is under no obligation to make sense to you. But it’s beautiful anyway.",
  "We are all made of star stuff. — Carl Sagan",
  "Look up. Someone out there is looking back.",
  "Sir bagi kami full marks, semoga sir murah rezeki ",
  "To the kid reading this in 2050: Did we make it to Mars yet?",
  "The stars don’t judge. They just shine.",
  "Keep looking up. That’s the secret of life.",
  "I launched this message from Earth on December 2025. Hello from the past!",
  "You are exactly where you need to be.",
  "The cosmos is within us. We are a way for the universe to know itself.",
  "Never stop exploring.",
  "You are not lost. You are here. And here is infinite.",
  "Somewhere, something incredible is waiting to be known.",
  "Sending love across the void",
  "Dream big. The universe is listening."
];

// ONE AND ONLY createLantern function
function createLantern(text = "", isUser = false) {
  const lantern = document.createElement('div');
  lantern.className = 'lantern' + (isUser ? ' user' : '');
  lantern.dataset.message = text;   // ← wrapped text with \n

  // POSITIONING
  if (isUser) {
    // Start perfectly centered
    lantern.style.position = 'fixed';
    lantern.style.left = '50%';
    lantern.style.top = '50%';
    lantern.style.marginLeft = '-55px';
    lantern.style.marginTop = '-65px';
    lantern.style.opacity = '0';
    lantern.style.transform = 'scale(0.3)';
  } else {
    // Background lanterns start from left
    lantern.style.position = 'fixed';
    lantern.style.left = '-200px';
    lantern.style.top = (Math.random() * 80 + 10) + 'vh';
  }

  // Click handler
  lantern.addEventListener('click', (e) => {
    e.stopPropagation();
    showMessageBubble(text, lantern);
  });

  document.body.appendChild(lantern);

  // USER LANTERN: appear → grow → fly right
  if (isUser) {
    setTimeout(() => {
      lantern.style.transition = 'all 3s ease-out';
      lantern.style.opacity = '1';
      lantern.style.transform = 'scale(1.1)';
    }, 300);

    setTimeout(() => {
      lantern.style.transition = 'all 42s ease-out';
      lantern.style.left = 'calc(100vw + 300px)';
      lantern.style.top = '30vh';
      lantern.style.transform = 'scale(1) rotate(20deg)';
    }, 1000);
  }

  // BACKGROUND LANTERNS: fly from left
  else {
    setTimeout(() => {
      lantern.style.transition = 'all 50s linear';
      lantern.style.left = 'calc(100vw + 300px)';
      lantern.style.transform = 'rotate(25deg)';
    }, 800);
  }

  // Auto-remove
  setTimeout(() => lantern.remove(), isUser ? 50000 : 55000);

  return lantern;   // ← THIS LINE WAS MISSING BEFORE!
}

// LAUNCH USER LANTERN
document.getElementById('launchBtn').addEventListener('click', () => {
  let rawText = document.getElementById('userMessage').value.trim();
  if (!rawText) return alert("Write your wish first!");

  // FORCE WRAP LONG MESSAGES — THIS IS THE REAL FIX
  const maxCharsPerLine = 44;  // perfect for 420px bubble
  const words = rawText.split(' ');
  let lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length > maxCharsPerLine) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  if (currentLine) lines.push(currentLine.trim());

  const finalText = lines.join('\n');  // ← use \n as line breaks

  // Show card
  const card = document.createElement('div');
  card.textContent = `"${rawText}"`;  // show original in card
  card.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,20,50,0.98);color:#ffd4a3;font-size:2.3rem;padding:2.5rem 4rem;border-radius:28px;border:3px solid #ff9500;box-shadow:0 0 100px #ff9500;backdrop-filter:blur(16px);z-index:1000;text-align:center;max-width:85%;opacity:0;transition:all 1.5s ease-out;`;
  document.body.appendChild(card);
  setTimeout(() => card.style.opacity = '1', 100);

  setTimeout(() => {
    card.style.transition = 'all 3.5s cubic-bezier(0.25,0.8,0.25,1)';
    card.style.transform = 'translate(-50%,-50%) scale(0.1) rotate(20deg)';
    card.style.opacity = '0';

    const lantern = createLantern(finalText, true);  // ← PASS WRAPPED TEXT
    // ... rest of your lantern spawn code (unchanged)

    setTimeout(() => card.remove(), 4000);
  }, 2800);

  document.getElementById('userMessage').value = '';
});
function showMessageBubble(text, lanternElement) {
  // Remove old canvas
  const old = document.getElementById('glow-text-canvas');
  if (old) old.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'glow-text-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function draw() {
    if (!document.body.contains(lanternElement)) {
      canvas.remove();
      return;
    }

    const rect = lanternElement.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top - 50;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = '1rem "Georgia", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Glowing text
    ctx.shadowColor = '#ffeb3b';
    ctx.shadowBlur = 70;
    ctx.fillStyle = '#ffeec7';

    // Auto-wrap long text
    const maxWidth = 500;
    const words = text.split(' ');
    let line = '';
    let yOffset = y;

    words.forEach((word, i) => {
      const testLine = line + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== '') {
        ctx.fillText(line, x, yOffset);
        line = word + ' ';
        yOffset += 20;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, x, yOffset);

    requestAnimationFrame(draw);
  }

  // Fade out after 6 seconds
  setTimeout(() => {
    const fade = setInterval(() => {
      ctx.globalAlpha *= 0.95;
      if (ctx.globalAlpha < 0.01) {
        clearInterval(fade);
        canvas.remove();
      }
    }, 50);
  }, 6000);

  requestAnimationFrame(draw);
}
// BACKGROUND LANTERNS — pure JS movement (flies off-screen perfectly)
function spawnBackgroundLantern() {
  if (document.querySelectorAll('.lantern').length >= 10) return;

  const lantern = document.createElement('div');
  lantern.className = 'lantern';
  lantern.dataset.message = wishesFromOthers[Math.floor(Math.random() * wishesFromOthers.length)];

  lantern.style.position = 'fixed';
  lantern.style.left = '-200px';
  lantern.style.top = (Math.random() * 80 + 10) + 'vh';
  lantern.style.opacity = '0';

  lantern.addEventListener('click', (e) => {
    e.stopPropagation();
    showMessageBubble(lantern.dataset.message, lantern);
  });

  document.body.appendChild(lantern);

  setTimeout(() => lantern.style.opacity = '1', 100);
  setTimeout(() => {
    lantern.style.transition = 'all 50s linear';
    lantern.style.left = 'calc(100vw + 300px)';
    lantern.style.transform = 'rotate(25deg)';
  }, 800);

  setTimeout(() => lantern.remove(), 55000);
}

setInterval(spawnBackgroundLantern, 7000);

window.addEventListener('load', () => {
  for (let i = 0; i < 4; i++) {  // ← FIXED: i < 4
    setTimeout(spawnBackgroundLantern, i * 6000);
  }
});