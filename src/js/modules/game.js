import { timerFunc } from "./timer";

const num1 = document.querySelector(".num-1");
const num2 = document.querySelector(".num-2");
const operator = document.querySelector(".operator");
const result = document.querySelector(".result");
const winElement = document.querySelector(".win");
const name = document.getElementById("user-name");
const gameOverBtn = document.getElementById("game-over__btn");
const timeAttack = document.querySelector(".time");
const newQuizPlace = document.querySelector(".mode-game__question-place");
const scores = document.querySelector(".mode-game__scores");
const plus = document.querySelector(".plus");
const minus = document.querySelector('.minus')

let correct = 0;
let inCorrect = 0;
const currentGamer = JSON.parse(localStorage.getItem("currentUser"));

export const game = () => {
  if (currentGamer && currentGamer.mode === "time-attack") {
    timerFunc()
    timeAttack ? (timeAttack.style.display = "block") : null;
  }
    name ? (name.textContent = currentGamer.name) : null;

  const getRandom = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const operators = ["+", "-", "*", "/"];

  const sum = (a, b, operator) => {
    if (operator === "+") return a + b;
    if (operator === "-") return a - b;
    if (operator === "/") return a / b;
    return a * b;
  };

  const generateExample = () => {
    if (newQuizPlace) {
      newQuizPlace.classList.add("animation-left");
    }
    let num1 = getRandom(1, 10);
    let num2 = getRandom(1, 10);
    const operator = operators[getRandom(0, 3)];
    if (operator == "/") {
      for (let i = 0; ; i++) {
        if (num1 % num2 == 0) {
          break;
        }
        num1 = getRandom(1, 10);
        num2 = getRandom(1, 10);
      }
    }
    const result = sum(num1, num2, operator);

    return { num1, num2, operator, result };
  };

  const renderExample = (data) => {
    if (num1) {
      num1.textContent = data.num1;
      num2.textContent = data.num2;
      operator.textContent = data.operator;
    }
    return null;
  };

  let win = 0;
  let example = generateExample();
  renderExample(example);

  const corFunc = () => {
    plus.classList.add('visible');
    win += 1;
    correct += 1;
    setTimeout(() => {
        plus.classList.remove('visible');
    }, 1000);
  };
  const inCorFunc = () => {
    scores.classList.add("twitch");
    minus.classList.add('visible')
    win -= 1;
    inCorrect += 1;
    setTimeout(() => {
      scores.classList.remove("twitch");
    }, 400);
    setTimeout(() => {
        minus.classList.remove('visible')
      }, 1000);
  };

  const go = () => {
    if (!result.value && result.value !== 0) return;
    {
      Number(result.value) === Number(example.result) ? corFunc() : inCorFunc();
    }
    winElement.textContent = win;
    currentGamer.score = win;
    result.value = "";
    example = generateExample();
    renderExample(example);
  };

  result?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      go();
      newQuizPlace.classList.add('animation-right')
      setTimeout(() => {
        newQuizPlace.classList.remove('animation-right')
      }, 800);
    }
  });
};

export function newScoreSetInLocalStorage() {
  currentGamer.correct = correct;
  currentGamer.inCorrect = inCorrect;
  localStorage.setItem("currentUser", JSON.stringify(currentGamer));
}

gameOverBtn?.addEventListener("click", () => {
  newScoreSetInLocalStorage();
  window.location.href = "./game-over.html";
});