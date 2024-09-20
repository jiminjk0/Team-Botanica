// Function to display notes for all plants
function displayNotes() {
    const notesContainer = document.getElementById('notes-container');
    const notes = JSON.parse(localStorage.getItem('notes')) || {};

    // Clear previous content
    notesContainer.innerHTML = '';

    if (Object.keys(notes).length === 0) {
        notesContainer.innerHTML = '<p>No notes yet!</p>';
    } else {
        // Retrieve all plants data from localStorage
        const plants = JSON.parse(localStorage.getItem('plants')) || [];
        
        plants.forEach(plant => {
            if (notes[plant.id]) {
                // Create a note card for each plant with saved notes
                const noteCard = document.createElement('div');
                noteCard.className = 'note-card';
                noteCard.style.display = 'flex';
                noteCard.style.marginBottom = '20px';
                noteCard.style.padding = '10px';
                noteCard.style.border = '1px solid #ccc';
                noteCard.style.borderRadius = '8px';
                noteCard.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';

                noteCard.innerHTML = `
                    <div style="flex-shrink: 0; width: 80px;">
                        <img src="${plant.imageUrl}" alt="${plant.name}" class="plant-image" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
                    </div>
                    <div style="flex-grow: 1; margin-left: 20px;">
                        <h5>${plant.name}</h5>
                        <textarea class="form-control" id="note-${plant.id}" style="margin-bottom: 10px;">${notes[plant.id]}</textarea>
                        <button class="btn btn-primary save-note-button" data-id="${plant.id}" style="margin-right: 10px;">
                            <i class="fas fa-save"></i> Save
                        </button>
                        <button class="btn btn-danger delete-note-button" data-id="${plant.id}">
                            <i class="fas fa-trash"></i> 
                        </button>
                    </div>
                `;

                notesContainer.appendChild(noteCard);
            }
        });

        // Add event listeners to all save and delete buttons
        document.querySelectorAll('.save-note-button').forEach(button => {
            button.addEventListener('click', saveNote);
        });

        document.querySelectorAll('.delete-note-button').forEach(button => {
            button.addEventListener('click', deleteNote);
        });
    }
}

// Function to save edited notes
function saveNote(event) {
    const plantId = event.target.getAttribute('data-id');
    const notes = JSON.parse(localStorage.getItem('notes')) || {};
    const noteContent = document.getElementById(`note-${plantId}`).value;

    notes[plantId] = noteContent;
    localStorage.setItem('notes', JSON.stringify(notes));

    alert('Note saved!');
}

// Function to delete notes
function deleteNote(event) {
    const plantId = event.target.getAttribute('data-id');
    const notes = JSON.parse(localStorage.getItem('notes')) || {};

    delete notes[plantId];
    localStorage.setItem('notes', JSON.stringify(notes));

    // Refresh the notes display
    displayNotes();

    alert('Note deleted!');
}

// Event listener for Notes button in the navbar
document.getElementById('notes-nav-button').addEventListener('click', function() {
    displayNotes();
});

// Ensure the notes display when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayNotes();
});



