const quizData = 
{
    general: [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: 2
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
            answer: 0
        }
    ],
    math: [
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: 1
        },
        {
            question: "What is the square root of 16?",
            options: ["2", "3", "4", "5"],
            answer: 2
        }
    ],
    science: [
        {
            question: "What planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: 1
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["O2", "H2O", "CO2", "NaCl"],
            answer: 1
        }
    ]
};

let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const questionData = quizData[currentCategory][currentQuestionIndex];
    document.getElementById('question').innerText = questionData.question;
    
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="answer" value="${index}"> ${option}`;
        answersDiv.appendChild(label);
    });
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const answerIndex = parseInt(selectedAnswer.value);
        const questionData = quizData[currentCategory][currentQuestionIndex];
        
        if (answerIndex === questionData.answer) {
            score++;
        }
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizData[currentCategory].length) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert('Please select an answer.');
    }
}

function showResult() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('score').innerText = `You scored ${score} out of ${quizData[currentCategory].length}.`;
}

function restartQuiz() {
    document.getElementById('category-selection').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}