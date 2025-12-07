const ctx = document.getElementById('distanceGraph').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'],
        datasets: [{
            label: 'Distance from Sun (AU)',
            data: [0.39,0.72,1,1.52,5.2,9.58,19.2,30.05],
            backgroundColor: 'rgba(0, 255, 255, 0.5)',
            borderColor: 'rgba(0,255,255,1)',
            borderWidth: 1,
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true }
        }
    }
});
