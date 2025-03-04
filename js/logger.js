const emotionMessages = {
    1: "Hopeless",
    2: "Terrified",
    3: "Furious",
    4: "Anxious",
    5: "Lonely",
    6: "Irritated",
    7: "Disappointed",
    8: "Confused",
    9: "Nervous",
    10: "Curious",
    14: "Relaxed",
    15: "Hopeful",
    16: "Amazed",
    17: "Content",
    18: "Proud",
    19: "Excited",
    20: "Joyful"
};

document.addEventListener('DOMContentLoaded', function() {
    const emotionForm = document.getElementById('emotion-form');
    emotionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emotion = document.getElementById('emotion').value;
        const date = document.getElementById('date').value;
        const notes = document.getElementById('log').value;
        postEmotion({ emotion, date, notes });
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-button')) {
            const emotionId = event.target.dataset.emotionId;
            deleteEmotion(emotionId);
        }
    });

    fetchEmotions();
});

function postEmotion(data) {
    fetch('/api/emotions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        addEmotionToUI(data);
        fetchEmotions();
    })
    .catch(error => console.error('Error:', error));
}

function addEmotionToUI(emotion) {
    const submissionBox = document.getElementById('submission-box');
    const emotionContainer = document.createElement('div');
    emotionContainer.classList.add('emotion-container');
    const emotionText = document.createElement('div');
    emotionText.textContent = `${emotionMessages[emotion.emotion] || 'Emotion'} recorded on ${new Date(emotion.date).toLocaleDateString()}`;
    const emotionNote = document.createElement('div');
    emotionNote.textContent = `Note: ${emotion.notes}`;
    const deleteButton = createDeleteButton(emotion._id);

    emotionContainer.append(emotionText, emotionNote, deleteButton);
    submissionBox.appendChild(emotionContainer);
}

function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.classList.add('delete-button');
    button.dataset.emotionId = id;
    return button;
}

function fetchEmotions() {
    fetch('/api/emotions')
    .then(response => response.ok ? response.json() : Promise.reject('Failed to load emotions'))
    .then(emotions => {
        const submissionBox = document.getElementById('submission-box');
        submissionBox.innerHTML = '';
        emotions.forEach(addEmotionToUI);
    })
    .catch(error => console.error('Error:', error));
}

function deleteEmotion(emotionId) {
    fetch(`/api/emotions/${emotionId}`, { method: 'DELETE' })
    .then(response => response.ok ? fetchEmotions() : Promise.reject('Failed to delete emotion'))
    .catch(error => console.error('Error:', error));
}
