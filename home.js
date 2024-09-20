// Mock plant data

    const plants = [
    {
        id: 1,
        name: "Tulsi",
        scientificName: "Ocimum tenuiflorum",
        region: "Asia",
        usage: "Medicinal",
        benefits: "Anti-inflammatory",
        imageUrl: "tulsi.jpg",
        videoUrl: 'https://sketchfab.com/models/c604e8f52c234f2e9259d895fe028819/embed'
        
    },
    {
        id: 2,
        name: "Neem",
        scientificName: "Azadirachta indica",
        region: "India",
        usage: "Medicinal",
        benefits: "Antibacterial, Antiviral",
        imageUrl: "neem.jpg",
        videoUrl: 'https://sketchfab.com/models/03edef8009d942d3a3db6fa64cecbe56/embed'
    },
    {
        id: 3,
        name: "Aloe Vera",
        scientificName: "Aloe barbadensis miller",
        region: "Africa",
        usage: "Medicinal",
        benefits: "Skin Healing, Digestive Aid",
        imageUrl: "aloe-vera.jpeg",
        videoUrl: 'https://sketchfab.com/models/66c6699e50ab4863989777f920a981dd/embed'
    },
    {
        id: 4,
        name: "Ashwagandha",
        scientificName: "Withania somnifera",
        region: "India",
        usage: "Medicinal",
        benefits: "Stress Relief, Immune Support",
        imageUrl: "Ashwagandha.jpeg",
        
    },
    {
        id: 5,
        name: "Turmeric",
        scientificName: "Curcuma longa",
        region: "Southeast Asia",
        usage: "Medicinal",
        benefits: "Anti-inflammatory, Antioxidant",
        imageUrl: "Turmeric.jpg",
        videoUrl: 'https://sketchfab.com/models/05f6febc74134387901d7bb5aa8d2ffb/embed'
    },
    {
        id: 6,
        name: "Ginger",
        scientificName: "Zingiber officinale",
        region: "Southeast Asia",
        usage: "Medicinal",
        benefits: "Digestive Aid, Anti-nausea",
        imageUrl: "ginger.jpg",
        videoUrl: 'https://sketchfab.com/models/2023c79497fb4f5f9d2373208a1e77bf/embed'
    },
    {
        id: 7,
        name: "Peppermint",
        scientificName: "Mentha piperita",
        region: "Europe",
        usage: "Medicinal",
        benefits: "Digestive Aid, Respiratory Relief",
        imageUrl: "plant/peppermint.jpeg"
    },
    {
        id: 8,
        name: "Lavender",
        scientificName: "Lavandula angustifolia",
        region: "Mediterranean",
        usage: "Medicinal",
        benefits: "Relaxation, Skin Healing",
        imageUrl: "plant/Lavender.jpg",
         videoUrl: 'https://sketchfab.com/models/e000a4a203ff43109e1bae876c5919c8/embed'
    },
    {
        id: 9,
        name: "Thyme",
        scientificName: "Thymus vulgaris",
        region: "Mediterranean",
        usage: "Medicinal",
        benefits: "Respiratory Health, Antibacterial",
        imageUrl: "plant/Thyme.jpg",
         videoUrl: 'https://sketchfab.com/models/50177d47b4c640f7a16a7ec9aa2b0d16/embed'
    },
    {
        id: 10,
        name: "Echinacea",
        scientificName: "Echinacea purpurea",
        region: "North America",
        usage: "Medicinal",
        benefits: "Immune Boost, Cold Prevention",
        imageUrl: "plant/Echinacea.jpg",
        videoUrl: 'https://sketchfab.com/models/0d4ba84a90d244858a67cfe0660c04ea/embed'
    },
    // Add more plant objects as needed
];


// Function to display plant cards
function displayPlants(plantList) {
    const plantContainer = document.getElementById('plant-container');
    plantContainer.innerHTML = ''; // Clear previous content

    if (plantList.length === 0) {
        plantContainer.innerHTML = '<p>No plants found!</p>';
    } else {
        plantList.forEach(plant => {
            const plantCard = document.createElement('div');
            plantCard.className = 'plant-card';
            plantCard.innerHTML = `
                <img src="${plant.imageUrl}" alt="${plant.name}" class="plant-img">
                <p>${plant.name}</p>
            `;
            plantCard.addEventListener('click', () => viewPlant(plant.id));
            plantContainer.appendChild(plantCard);
        });
    }
}

// Function to view plant details (simulating page navigation)
function viewPlant(id) {
    const plant = plants.find(p => p.id === id);
    if (plant) {
        localStorage.setItem('currentPlant', JSON.stringify(plant));
        window.location.href = 'plant.html'; // Redirect to detailed plant page
    }
}

// Function to handle search and filter
function searchPlants(searchTerm = '') {
    const selectedRegion = document.getElementById('filter-region').value;
    const selectedUsage = document.getElementById('filter-usage').value;
    const selectedBenefits = document.getElementById('filter-benefits').value;

    const filteredPlants = plants.filter(plant => {
        return (
            (searchTerm === '' || plant.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedRegion === '' || plant.region === selectedRegion) &&
            (selectedUsage === '' || plant.usage === selectedUsage) &&
            (selectedBenefits === '' || plant.benefits.includes(selectedBenefits))
        );
    });

    displayPlants(filteredPlants);
}

// Initial display of all plants
displayPlants(plants);

// Event listener for search functionality
document.getElementById('search-filter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    searchPlants(searchTerm);
});

// Voice command functionality
document.getElementById('voice-btn').addEventListener('click', function() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function(event) {
            const voiceInput = event.results[0][0].transcript.toLowerCase().trim();
            console.log('Voice Input: ', voiceInput);
            handleVoiceCommand(voiceInput);
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error', event.error);
        };

        recognition.start();
    } else {
        alert('Your browser does not support speech recognition. Please use Chrome or another compatible browser.');
    }
});

// Function to handle voice commands
function handleVoiceCommand(command) {
    if (command.startsWith('go to ')) {
        const page = command.replace('go to ', '').trim();
        navigateToPage(page);
    } else if (command.startsWith('show ')) {
        const plantName = command.replace('show ', '').trim();
        document.getElementById('search-input').value = plantName;
        searchPlants(plantName);
    } else if (command.startsWith('add ')) {
        const plantName = command.replace('add ', '').replace(' to favorites', '').trim();
        addToFavorites(plantName);
    } else if (command.startsWith('remove ')) {
        const plantName = command.replace('remove ', '').replace(' from favorites', '').trim();
        removeFromFavorites(plantName);
    } else if (command.startsWith('view details for ')) {
        const plantName = command.replace('view details for ', '').trim();
        viewPlantDetails(plantName);
    } else if (command.startsWith('add a note for ')) {
        const plantName = command.replace('add a note for ', '').trim();
        addNoteForPlant(plantName);
    } else {
        alert('Command not recognized. Please try again.');
    }
}

// Function to navigate to different pages based on command
function navigateToPage(pageName) {
    switch (pageName) {
        case 'home':
            window.location.href = 'index.html';
            break;
        case 'favorites':
            window.location.href = 'favorites.html';
            break;
        case 'notes':
            window.location.href = 'notes.html';
            break;
        case 'feedback':
            window.location.href = 'feedback.html';
            break;
        case 'contact':
            window.location.href = 'contact.html';
            break;
        case 'quiz':
            window.location.href = 'quiz.html';
            break;
        case 'remedies':
            window.location.href = 'remedies.html';
            break;
        case 'explore':
            window.location.href = 'explore.html';
            break;
        default:
            alert(`Page "${pageName}" not found.`);
            break;
    }
}

// Function to add a plant to favorites
function addToFavorites(plantName) {
    const plant = plants.find(p => p.name.toLowerCase() === plantName.toLowerCase());
    if (plant) {
        // Logic to add the plant to the favorites list
        alert(`${plant.name} added to favorites!`);
    } else {
        alert(`Plant "${plantName}" not found.`);
    }
}

// Function to remove a plant from favorites
function removeFromFavorites(plantName) {
    const plant = plants.find(p => p.name.toLowerCase() === plantName.toLowerCase());
    if (plant) {
        // Logic to remove the plant from the favorites list
        alert(`${plant.name} removed from favorites!`);
    } else {
        alert(`Plant "${plantName}" not found.`);
    }
}

// Function to view detailed plant information
function viewPlantDetails(plantName) {
    const plant = plants.find(p => p.name.toLowerCase() === plantName.toLowerCase());
    if (plant) {
        viewPlant(plant.id); // Simulate navigating to the plant's detailed page
    } else {
        alert(`Plant "${plantName}" not found.`);
    }
}

// Function to add a note for a plant
function addNoteForPlant(plantName) {
    const plant = plants.find(p => p.name.toLowerCase() === plantName.toLowerCase());
    if (plant) {
        // Logic to open the note creation dialog for the plant
        alert(`Note added for ${plant.name}.`);
    } else {
        alert(`Plant "${plantName}" not found.`);
    }
}


