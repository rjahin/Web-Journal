function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function showMessage() {
    const messages = [
        "\"Accepting your emotions means allowing yourself to be vulnerable. In vulnerability, there is a strength that comes from being honest about how you truly feel.\"",
        "\"Every emotion carries its own wisdom. Accepting your emotions allows you to learn from them, understanding deeper truths about yourself and how you relate to the world.\"",
        "\"Your emotions are signals, not enemies. They alert you to what's really going on beneath the surface, guiding you to address needs that might otherwise go unnoticed.\"",
        "\"Resistance to emotions often creates more turmoil. Accepting your emotions can lead to peace, as it involves acknowledging what is present without judgment.\"",
        "\"Accepting your emotions is a crucial step in personal growth. It allows you to move through feelings, rather than getting stuck in them, fostering resilience and adaptability.\"",
        "\"When you accept your emotions, you align more closely with your true self. This authenticity is powerful, drawing respect and genuine relationships.\"",
        "\"You cannot heal what you do not acknowledge. Accepting your emotions is the first step towards healing and improving your emotional wellbeing.\""
    ];

    const today = new Date();
    const dayOfYear = getDayOfYear(today);
    document.getElementById('message').textContent = messages[dayOfYear % messages.length];
}

document.getElementById('emotion-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const date = document.getElementById('emotion-date').value;
    const rating = document.getElementById('emotion-rating').value;
    const data = { date, rating };

    try {
        const response = await fetch('/api/emotions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Emotion data saved successfully');
        } else {
            console.error('Failed to save emotion data:', response.statusText);
        }
    } catch (error) {
        console.error('Error saving emotion data:', error.message);
    }
});

document.addEventListener('DOMContentLoaded', showMessage);

document.getElementById('emotion-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const date = document.getElementById('emotion-date').value;
    const rating = document.getElementById('emotion-rating').value;

    const data = { date: date, rating: rating };

    try {
        const response = await fetch('mongodb+srv://rehonoma1:JJjj33..@blue.aw6qzs9.mongodb.net/Login+signup/emotion', { // <-- Update this URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Emotion data saved successfully');
        } else {
            console.error('Failed to save emotion data:', response.statusText);
        }
    } catch (error) {
        console.error('Error saving emotion data:', error.message);
    }
});
