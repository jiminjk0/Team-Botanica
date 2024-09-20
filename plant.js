// Load the current plant from localStorage
const plant = JSON.parse(localStorage.getItem('currentPlant'));

if (plant) {
    // Ensure all plant details are displayed on the page
    const plantNameElement = document.getElementById('plant-name');
    const scientificNameElement = document.getElementById('scientific-name');
    const familyElement = document.getElementById('family');
    const regionElement = document.getElementById('region');
    const usageElement = document.getElementById('usage');
    const benefitsElement = document.getElementById('benefits');

    // Check if elements exist before assigning values to avoid potential errors
    if (plantNameElement) plantNameElement.textContent = plant.name;
    if (scientificNameElement) scientificNameElement.textContent = plant.scientificName;
    if (familyElement) familyElement.textContent = plant.family;
    if (regionElement) regionElement.textContent = plant.region;
    if (usageElement) usageElement.textContent = plant.usage;
    if (benefitsElement) benefitsElement.textContent = plant.benefits;

    // Handle the video embed
    const sketchfabEmbedWrapper = document.getElementById('sketchfab-embed-wrapper');
    if (sketchfabEmbedWrapper && plant.videoUrl) {
        sketchfabEmbedWrapper.innerHTML = `
            <iframe title="3D Plant Model" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking"
                src="${plant.videoUrl}">
            </iframe>
        `;
    }

    const bookmarkButton = document.getElementById('bookmark-button');
    const notesTextarea = document.getElementById('notes-textarea');

    // Handle bookmarking
    if (bookmarkButton) {
        bookmarkButton.addEventListener('click', () => {
            let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            if (!bookmarks.some(b => b.id === plant.id)) {
                bookmarks.push(plant);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                alert('Plant bookmarked!');
            } else {
                alert('Plant already bookmarked.');
            }
        });
    }

    // Handle notes saving
    const saveNotesButton = document.getElementById('save-notes-button');
    if (saveNotesButton) {
        saveNotesButton.addEventListener('click', () => {
            const notes = notesTextarea.value;
            let savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
            savedNotes[plant.id] = notes;
            localStorage.setItem('notes', JSON.stringify(savedNotes));
            alert('Notes saved!');
        });
    }

    // Load existing notes for this plant
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    if (notesTextarea) {
        notesTextarea.value = savedNotes[plant.id] || '';
    }
} else {
    console.error('No current plant found in localStorage.');
}



