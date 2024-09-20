document.addEventListener('DOMContentLoaded', () => {
    const voiceButton = document.getElementById('voice-btn');
    const searchBar = document.getElementById('search-bar');
    const plantCards = document.querySelectorAll('.plant-card');

    // Check for the Web Speech API support
    if (!('webkitSpeechRecognition' in window)) {
        alert("Sorry, your browser does not support speech recognition.");
    } else {
        // Initialize speech recognition
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US'; // Set the language to English
        recognition.continuous = false; // Do not keep recognizing continuously
        recognition.interimResults = false; // Do not return partial results

        // Start recognition when the voice button is clicked
        voiceButton.addEventListener('click', () => {
            recognition.start();
        });

        // Handle speech result
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim().toLowerCase();
            searchBar.value = transcript; // Show the recognized text in the search bar
            filterPlants(transcript); // Filter the plant cards
        };

        // Handle speech recognition errors
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    }

    // Function to filter plant cards based on recognized text
    function filterPlants(searchTerm) {
        plantCards.forEach(card => {
            const plantName = card.getAttribute('data-name').toLowerCase();
            if (plantName.includes(searchTerm)) {
                card.style.display = 'block'; // Show matching plant cards
            } else {
                card.style.display = 'none'; // Hide non-matching plant cards
            }
        });
    }
});
