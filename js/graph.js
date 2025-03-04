function initChart() {
    const ctx = document.getElementById('emotion-chart').getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Emotion Level',
                data: [],
                borderColor: 'blue',
                backgroundColor: '#3498db',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 10
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


function calculateAverage(data) {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / data.length);
}


function mapEmotion(rating) {
    const emotions = [
        "Absolutely Devastated", "Very Sad", "Sad", "Neutral", "Content",
        "Happy", "Excited", "Very Excited", "Ecstatic", "Absolutely Ecstatic"
    ];
    return emotions[rating - 1];
}


function updateGraphAndAverage(emotionChart, date, rating) {
    rating = parseInt(rating);
    if (!isNaN(rating) && rating >= 1 && rating <= 10) {
        emotionChart.data.labels.push(date);
        emotionChart.data.datasets[0].data.push(rating);
        emotionChart.update();

        const averageRating = calculateAverage(emotionChart.data.datasets[0].data);
        const averageEmotion = mapEmotion(averageRating);
        document.getElementById('value').textContent = `On average, you've been feeling ${averageEmotion}.`;
    } else {
        console.error('Invalid rating:', rating);
    }
}


function setupFormSubmission(emotionChart) {
    document.getElementById('emotion-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const date = document.getElementById('emotion-date').value;
        const rating = document.getElementById('emotion-rating').value;
        updateGraphAndAverage(emotionChart, date, rating);
    });
}


function initializeDatepicker() {
    const datepicker = document.querySelector('[data-toggle="datepicker"]');
    if (datepicker) {
        new Datepicker(datepicker);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const emotionChart = initChart();
    setupFormSubmission(emotionChart);
    initializeDatepicker();
});
