document.addEventListener('DOMContentLoaded', function() {
    const goalForm = document.getElementById('goal-form');
    const goalList = document.getElementById('goal-list');

    goalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const goalContent = document.getElementById('goal').value;

        // Fetch to send data to server
        fetch('/api/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: goalContent }),
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            document.getElementById('goal').value = ''; // Clear the textarea
            fetchGoals(); // Fetch and display all goals
        })
        .catch(error => console.error('Error:', error));
    });

    function fetchGoals() {
        fetch('/api/goals')
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(goals => {
            goalList.innerHTML = ''; // Clear existing goals
            goals.forEach(goal => {
                const goalContainer = document.createElement('div');
                goalContainer.classList.add('goal-container');

                const goalItem = document.createElement('div');
                goalItem.classList.add('goal-item');
                goalItem.textContent = goal.content;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-button'); // Add this line to apply your CSS styles to the button
                deleteButton.onclick = function() {
                    deleteGoal(goal._id);
                };

                const dateSpan = document.createElement('span');
                dateSpan.className = 'date-span';
                const dateString = new Date(goal.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit'
                });
                dateSpan.textContent = ` - Posted on ${dateString}`;

                goalItem.appendChild(dateSpan);
                goalItem.appendChild(deleteButton);
                goalContainer.appendChild(goalItem);
                goalList.appendChild(goalContainer);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    function deleteGoal(goalId) {
        fetch(`/api/goals/${goalId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchGoals(); // Refresh the goals list
            } else {
                throw new Error('Failed to delete goal.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Fetch and display goals on initial load
    fetchGoals();
});

function autoExpand(field) {
    // Reset the field height to ensure the scroll height is measured correctly
    field.style.height = 'auto';

    // Calculate the height
    const computed = window.getComputedStyle(field);
    const height = field.scrollHeight + parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    // Set the new height
    field.style.height = `${height}px`;
}
