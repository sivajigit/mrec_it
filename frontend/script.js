
const questions = [
    {
        question: "Which language is used to structure a webpage?",
        options: ["Python", "HTML", "Java", "SQL"],
        answer: 1
    },
    {
        question: "Which language is used to style a webpage?",
        options: ["CSS", "C", "Java", "SQL"],
        answer: 0
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["define", "int", "let", "create"],
        answer: 2
    },
    {
        question: "Which method displays a message in the browser console?",
        options: ["print()", "console.log()", "show()", "display()"],
        answer: 1
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        options: ["<link>", "<p>", "<a>", "<h1>"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    showPage("quiz");
    displayQuestion();
}

function displayQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    document.getElementById("question-count").textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("score-label").textContent =
        `Score: ${score}`;

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("progress-bar").style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    document.getElementById("feedback").textContent = "";

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    document.getElementById("next-btn").disabled = true;

    question.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = option;
        button.onclick = () => selectAnswer(index);

        optionsContainer.appendChild(button);
    });

    document.getElementById("next-btn").textContent =
        currentQuestion === questions.length - 1
            ? "See Results →"
            : "Next Question →";
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(button => button.disabled = true);

    if (selectedIndex === question.answer) {
        score++;
        buttons[selectedIndex].classList.add("correct");
        document.getElementById("feedback").textContent =
            "Correct answer! 🎉";
        document.getElementById("feedback").style.color = "#16a34a";
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[question.answer].classList.add("correct");
        document.getElementById("feedback").textContent =
            "Incorrect. Check the highlighted correct answer.";
        document.getElementById("feedback").style.color = "#dc2626";
    }

    document.getElementById("score-label").textContent =
        `Score: ${score}`;

    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showPage("result");

    document.getElementById("progress-bar").style.width = "100%";

    document.getElementById("final-score").textContent =
        `${score}/${questions.length}`;

    let message;

    if (score === questions.length) {
        message = "Excellent! You got every question correct!";
    } else if (score >= 3) {
        message = "Great job! Keep practicing to improve.";
    } else {
        message = "Good try! Practice more and try again.";
    }

    document.getElementById("result-message").textContent = message;
}

// Demo form handlers — these do not create real accounts.
function signUp(event) {
    event.preventDefault();

    const name = document.getElementById("signup-name").value.trim();

    alert(`Welcome, ${name}! This is a demo signup form.`);
    event.target.reset();
    showPage("signin");
}

function signIn(event) {
    event.preventDefault();

    alert("This is a demo sign-in form. Real authentication is not configured.");
    event.target.reset();
}
