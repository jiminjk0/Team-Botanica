document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz');
    const resultContainer = document.getElementById('quiz-result');

    const questions = [
        {
            question: "What is the scientific name for the Tulsi plant?",
            options: ["Ocimum basilicum", "Ocimum sanctum", "Rosa damascena", "Cinnamomum verum"],
            answer: "Ocimum sanctum"
        },
        {
            question: "Which part of the Aloe Vera plant is used for medicinal purposes?",
            options: ["Roots", "Leaves", "Flowers", "Seeds"],
            answer: "Leaves"
        },
        {
            question: "Which plant is known for its use in treating indigestion and nausea?",
            options: ["Mint", "Ginger", "Lavender", "Chamomile"],
            answer: "Ginger"
        },
        {
            question: "What is the primary benefit of Peppermint?",
            options: ["Digestive Aid", "Stress Relief", "Skin Healing", "Cold Prevention"],
            answer: "Digestive Aid"
        },
        {
            question: "Which plant is known for its anti-inflammatory properties and use in treating respiratory issues?",
            options: ["Thyme", "Lavender", "Rosemary", "Echinacea"],
            answer: "Thyme"
        },
        {
            question: "Which part of the Lavender plant is commonly used for its calming effects?",
            options: ["Flowers", "Leaves", "Stems", "Roots"],
            answer: "Flowers"
        },
        {
            question: "What is a common use of Chamomile in traditional medicine?",
            options: ["Sleep Aid", "Pain Relief", "Skin Healing", "Digestive Aid"],
            answer: "Sleep Aid"
        }
    ];

    function loadQuiz() {
        quizContainer.innerHTML = questions.map((q, index) => `
            <div class="mb-3">
                <h4>${index + 1}. ${q.question}</h4>
                ${q.options.map((option, i) => `
                    <div class="form-check">
                        <input type="radio" name="question${index}" value="${option}" id="q${index}o${i}" class="form-check-input">
                        <label for="q${index}o${i}" class="form-check-label">${option}</label>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    function getAnswers() {
        return questions.map((_, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            return selectedOption ? selectedOption.value : null;
        });
    }

    function calculateScore(answers) {
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer === questions[index].answer) {
                score += 1;
            }
        });
        return score;
    }

    function displayResult(score) {
        resultContainer.innerHTML = `
            <h3>Quiz Result</h3>
            <p>You got ${score} out of ${questions.length} correct.</p>
        `;
    }

    submitButton.addEventListener('click', () => {
        const answers = getAnswers();
        const score = calculateScore(answers);
        displayResult(score);
    });

    loadQuiz();
});

