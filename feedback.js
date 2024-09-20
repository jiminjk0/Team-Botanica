/*// feedback.js

// Event listener for feedback form submission
document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const feedbackMessage = document.getElementById('feedback-message').value;
    const feedbackRating = document.getElementById('feedback-rating').value;

    // Save feedback to localStorage (or send to a server in a real-world scenario)
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({ message: feedbackMessage, rating: feedbackRating });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    alert('Thank you for your feedback!');
    document.getElementById('feedback-form').reset();
});
