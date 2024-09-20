// Function to display favorite plants
function displayFavorites() {
    // Retrieve favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('bookmarks')) || [];

    // Get the favorites container element
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = ''; // Clear previous content

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorite plants found!</p>';
    } else {
        favorites.forEach(plant => {
            const favoriteCard = document.createElement('div');
            favoriteCard.className = 'favorite-card';
            favoriteCard.innerHTML = `
                <img src="${plant.imageUrl}" alt="${plant.name}" class="favorite-img">
                <h5>${plant.name}</h5>
                <button class="remove-bookmark-btn" data-id="${plant.id}">Remove Bookmark</button>
            `;
            favoriteCard.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-bookmark-btn')) {
                    removeBookmark(plant.id);
                    e.stopPropagation(); // Prevent triggering viewPlant on button click
                } else {
                    viewPlant(plant.id);
                }
            });
            favoritesContainer.appendChild(favoriteCard);
        });
    }
}

// Function to view plant details (simulating page navigation)
function viewPlant(id) {
    const plant = JSON.parse(localStorage.getItem('currentPlant')) || {};
    if (plant.id === id) {
        localStorage.setItem('currentPlant', JSON.stringify(plant));
        window.location.href = 'plant.html'; // Redirect to detailed plant page
    }
}

// Function to remove a plant from bookmarks
function removeBookmark(id) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks = bookmarks.filter(plant => plant.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayFavorites(); // Update the display after removing the bookmark
    alert('Bookmark removed!');
}
 
 displayFavorites();


