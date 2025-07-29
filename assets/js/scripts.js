window.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("userName");
  const wel = document.getElementById("wel");
  if (userName && wel) {
    wel.textContent = `Welcome, ${userName}!`;
  }
});

let amount = document.getElementById("amount");
let category = document.getElementById("category");
let type = document.getElementById("type");
let difficulty = document.getElementById("difficulty");
let startQuizButton = document.getElementById("startQuizButton");
let quiz;
/**
 * Init Quiz Data
 */
class QuizApis {
  // https://opentdb.com/api.php?amount=10&category=19&difficulty=easy

  baseUrl = "https://opentdb.com/api.php";

  constructor({ amount, category, difficulty, type }) {
    this.amount = amount;
    this.category = category;
    this.difficulty = difficulty;
    this.type = type;
  }

  async fetchData() {
    return this.handleApi().then((data) => {
      if (data.results) {
        return data.results; // result;
      } else {
        this.handleErrors();
      }
    });
  }

  handleErrors() {
    document.querySelector(".alert").classList.remove("d-none");
    document.querySelector("#Questions_Specifications").classList.add("d-none");
    document.querySelector(".loaderContainer").classList.add("d-none");
  }

  async handleApi() {
    const params = new URLSearchParams();
    params.append("amount", this.amount ? this.amount : 3);
    params.append("category", this.category === "any" ? "" : this.category);
    params.append(
      "difficulty",
      this.difficulty === "any" ? "" : this.difficulty
    );
    params.append("type", this.type === "any" ? "" : this.type);

    return (await fetch(`${this.baseUrl}?${params}`)).json();
  }
}

class Quiz extends QuizApis {
  score = 0;

  constructor({ amount, category, difficulty, type }) {
    super({ amount, category, difficulty, type });
  }

  async handleQuestions() {
    const DATA = await this.fetchData();
    new Question(DATA, 0).displayQuestion();
  }
}

class Question {
  constructor(questions, index) {
    this.questions = questions;
    this.index = index;
    this.question = questions[index]?.question || "";
    this.correct_answer = questions[index]?.correct_answer || "";
    this.answers =
      [
        questions[index].correct_answer,
        ...questions[index].incorrect_answers,
      ].sort() || [];
  }

  displayQuestion() {
    this.handleUI();

    document.querySelector("#questionsContainer").innerHTML = `
    <div class="card p-4">
      <div class="card-title">
      <p>${this.question}</p>
      <div>
      <span class="badge bg-primary">Question Number:</span>
      <span class="badge bg-primary">${this.index + 1} of ${
      this.questions.length
    }</span>
      </div>
      </div>
      <div class="card-body">
        <ul class="list-unstyled row g-3">
          ${this.handleAnswers()}
        </ul>
      </div>
    <div class="card-footer">score: <span class="badge bg-warning">${
      quiz.score
    }</span> </div>
    </div>
    `;

    this.isCorrectAnswer();
  }

  handleAnswers() {
    return this.answers
      .map(
        (answer) =>
          `<li class="col-6"> <button class="btn answer w-100 btn-dark">${answer}</button> </li>`
      )
      .join("");
  }

  isCorrectAnswer() {
    // flag
    let isAnswered = true;
    document.querySelectorAll(".answer").forEach((button) => {
      button.addEventListener("click", (e) => {
        // check before click
        if (isAnswered) {
          e.target.classList.remove("btn-dark");
          if (e.target.innerText === this.correct_answer) {
            e.target.classList.add(
              "btn-success",
              "animate__animated",
              "animate__shakeY"
            );
            console.log(quiz.score);
            console.log(++quiz.score);
          } else {
            e.target.classList.add(
              "btn-danger",
              "animate__animated",
              "animate__shakeX"
            );
          }
        }

        // After any click toggle flag
        isAnswered = false;
        setTimeout(() => {
          try {
            new Question(this.questions, ++this.index).displayQuestion();
          } catch {
            document.querySelector("#questionsContainer").innerHTML = `
          <div class="card p-4">
          <div class="card-footer">Congratulations You Score is: <span class="badge bg-warning">${quiz.score}</span> 🎉🎉🎉</div>
          <div class="my-3">
          <button onclick="window.location.reload()" class="btn btn-primary">retry quiz</button>
          </div> 
          </div>
    `;
            if (quiz.score === this.questions.length) {
              this.fireWorks();
            }
          }
        }, 500);
      });
    });
  }

  handleUI() {
    if (document.querySelector("#Questions_Specifications")) {
      document
        .querySelector("#Questions_Specifications")
        .classList.add("d-none");
    }
    document.querySelector(".loaderContainer").classList.add("d-none");
  }

  fireWorks() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }
}

startQuizButton.addEventListener("click", () => {
  document.querySelector(".loaderContainer").classList.remove("d-none");

  quiz = new Quiz({
    amount: amount.value,
    type: type.value,
    difficulty: difficulty.value,
    category: category.value,
  });
  quiz.handleQuestions();
});



function logOut() {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      location.replace("index.html");
  
}
