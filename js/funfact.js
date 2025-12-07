const facts = [
  "Saturn’s rings are only 10–100 meters thick — thinner than a house! 🪐",
  "A day on Venus lasts longer than a year on Venus (243 Earth days vs 225).",
  "Neptune rains actual diamonds under its atmosphere. 💎",
  "One teaspoon of a neutron star weighs about 6 billion tons.",
  "Olympus Mons on Mars is 22 km tall — nearly 3× Mount Everest! 🏔️",
  "The Sun loses 1–4 million tons of mass every second… and doesn’t even notice.",
  "If you drove straight up at highway speed, you’d reach space in about an hour.",
  "There are more stars in the universe than grains of sand on all Earth’s beaches.",
  "Jupiter’s Great Red Spot is shrinking — soon it might only fit one Earth.",
  "Astronauts grow up to 5 cm taller in space because their spine uncompresses.",
  "The smell of space? Burnt steak + hot metal, according to astronauts.",
  "Pluto’s heart-shaped glacier is named Tombaugh Regio after its discoverer."
  // Add as many as you want here
];

let current = -1;
const textEl = document.getElementById('fact-text');
const counterEl = document.getElementById('fact-counter');

document.getElementById('new-fact').addEventListener('click', () => {
  current = (current + 1) % facts.length;
  textEl.style.opacity = 0;
  setTimeout(() => {
    textEl.textContent = facts[current];
    counterEl.textContent = `Fact #${current + 1} / ${facts.length}`;
    textEl.style.opacity = 1;
  }, 300);
});

const planetColors = {
  Mercury: 'rgba(169, 169, 169, 0.6)', // Dark gray
  Venus:   'rgba(255, 215, 0, 0.6)',   // Gold
  Earth:   'rgba(34, 139, 34, 0.6)',   // Forest Green
  Mars:    'rgba(220, 20, 60, 0.6)',   // Crimson
  Jupiter: 'rgba(255, 165, 0, 0.6)',   // Orange
  Saturn:  'rgba(218, 165, 32, 0.6)',  // Goldenrod
  Uranus:  'rgba(64, 224, 208, 0.6)',  // Turquoise
  Neptune: 'rgba(65, 105, 225, 0.6)'   // Royal Blue
};

const planetBorderColors = {
  Mercury: 'rgba(169, 169, 169, 1)',
  Venus:   'rgba(255, 215, 0, 1)',
  Earth:   'rgba(34, 139, 34, 1)',
  Mars:    'rgba(220, 20, 60, 1)',
  Jupiter: 'rgba(255, 165, 0, 1)',
  Saturn:  'rgba(218, 165, 32, 1)',
  Uranus:  'rgba(64, 224, 208, 1)',
  Neptune: 'rgba(65, 105, 225, 1)'
};

// Habitability factors: 1 (poor) → 5 (excellent)
const habitabilityData = {
  labels: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
  datasets: [{
    label: 'Habitability Score',
    data: [1, 3, 9, 6, 2, 1, 0, 0],
    backgroundColor: [
      'rgba(169, 169, 169, 0.9)',    // Mercury - gray
      'rgba(255, 215, 0, 0.9)',      // Venus - gold
      'rgba(34, 139, 34, 0.9)',      // Earth - green
      'rgba(255, 69, 0, 0.9)',       // Mars - red
      'rgba(210, 180, 140, 0.9)',    // Jupiter - tan
      'rgba(238, 232, 170, 0.9)',    // Saturn - pale yellow
      'rgba(175, 238, 238, 0.9)',    // Uranus - light cyan
      'rgba(100, 149, 237, 0.9)'     // Neptune - cornflower blue
    ],
    borderColor: [
      'rgba(105, 105, 105, 1)',
      'rgba(218, 165, 32, 1)',
      'rgba(0, 100, 0, 1)',
      'rgba(178, 34, 34, 1)',
      'rgba(139, 69, 19, 1)',
      'rgba(205, 205, 105, 1)',
      'rgba(0, 206, 209, 1)',
      'rgba(65, 105, 225, 1)'
    ],
    borderWidth: 2
  }]
};

const habitabilityConfig = {
  type: 'bar',
  data: habitabilityData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.raw} Habitability Score`
        }
      },
      title: {
        display: true,
        text: 'Planet Habitability Scores',
        color: '#00ffff',
        font: { size: 20, weight: '600' },
        padding: { top: 10, bottom: 20 }
      },
      // Custom plugin to render summary inside the chart
 afterDraw: chart => {
    const { ctx, chartArea: { left, right, bottom, width } } = chart;
    ctx.save();

    const boxHeight = 50;
    const padding = 10;
    const boxX = left + padding;
    const boxY = bottom - boxHeight - padding;
    const boxWidth = width - 2 * padding;

    // Draw semi-transparent background
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    // Draw border
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Draw summary text
    ctx.fillStyle = '#a0f7ff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const summaryText = "Earth is the most habitable planet. Mercury and Neptune are extreme extremes.";
    ctx.fillText(summaryText, left + width / 2, boxY + boxHeight / 2);

    ctx.restore();
}
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#a0f7ff' },
        grid: { color: 'rgba(0,255,255,0.1)' }
      },
      x: {
        ticks: { color: '#a0f7ff' },
        grid: { color: 'rgba(0,255,255,0.05)' }
      }
    }
  }
};

new Chart(document.getElementById('habitabilityChart'), habitabilityConfig);
