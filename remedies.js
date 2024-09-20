// Sample data for remedies
const remediesData = [
    {
        name: "Aloe Vera",
        imageUrl: "aloe-vera.jpeg",
        remedy: "Soothes burns and skin irritations.",
        recipe: "Apply fresh Aloe Vera gel directly to the affected area.",
        caution: "Avoid ingestion and consult a healthcare professional before use."
    },

    {
        name: "Ginger",
        imageUrl: "ginger.jpg",
        remedy: "Helps with nausea and digestive issues.",
        recipe: "Add fresh ginger to tea or dishes.",
        caution: "May cause heartburn in large amounts."
    },
    
    {
        "name": "Lavender",
        "imageUrl": "plant/lavender.jpg",
        "remedy": "Promotes relaxation and relieves anxiety.",
        "recipe": "Add a few drops of lavender essential oil to a diffuser or a bath.",
        "caution": "Avoid direct application of essential oils to the skin without dilution. Consult a healthcare professional if pregnant or breastfeeding."
    },
    {
        "name": "Thyme",
        "imageUrl": "plant/thyme.jpg",
        "remedy": "Supports respiratory health and can help with coughs and colds.",
        "recipe": "Steep thyme leaves in hot water to make a soothing tea.",
        "caution": "Avoid excessive use as it can cause gastrointestinal upset. Consult a healthcare professional before use."
    },
    {
        name: "Tulsi",
        imageUrl: "tulsi.jpg",
        remedy: "Boosts immunity and helps manage stress.",
        recipe: "Brew Tulsi leaves in hot water to make a herbal tea.",
        caution: "Consult a healthcare professional if pregnant, breastfeeding, or on medication."
    },

    {
        name: "Echinacea",
        imageUrl: "plant/Echinacea.jpg",
        remedy: "Supports immune function and helps prevent colds.",
        recipe: "Take Echinacea tea or use in tincture form.",
        caution: "May cause allergic reactions in people sensitive to plants in the daisy family. Consult a healthcare professional before use."
    },

   

    // Add more remedies as needed
];


// Function to display remedies



function displayRemedies() {
    const container = document.getElementById('remedies-container');
    container.innerHTML = ''; // Clear previous content

    remediesData.forEach(remedy => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card">
                <img src="${remedy.imageUrl}" class="card-img-top" alt="${remedy.name}">
                <div class="card-body">
                    <h5 class="card-title">${remedy.name}</h5>
                    <p class="card-text"><strong>Remedy:</strong> ${remedy.remedy}</p>
                    <p class="card-text"><strong>Recipe:</strong> ${remedy.recipe}</p>
                    <p class="card-text"><strong>Caution:</strong> ${remedy.caution}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize the remedies display
displayRemedies();