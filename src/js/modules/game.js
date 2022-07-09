const num1 = document.querySelector(".num-1");
const num2 = document.querySelector(".num-2");
const operator = document.querySelector(".operator");
const result = document.querySelector(".result");
const winElement = document.querySelector(".win");
const name = document.getElementById("user-name");
const gameOverBtn = document.getElementById("game-over__btn");
const progressEl = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const timeAttack = document.querySelector(".time");
const newQuizPlace = document.querySelector(".mode-game__question-place");
const demo = document.getElementById("time-demo");
const scores = document.querySelector(".mode-game__scores");
const plus = document.querySelector(".plus");
const minus = document.querySelector('.minus')

let correct = 0;
let inCorrect = 0;
const currentGamer = JSON.parse(localStorage.getItem("currentUser"));

export const game = () => {
  if (currentGamer.mode === "time-attack") {
    timerFunc();
    timeAttack ? (timeAttack.style.display = "block") : null;
  }
  {
    name ? (name.textContent = currentGamer.name) : null;
  }

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
      newQuizPlace.classList.add("animation");
      setTimeout(() => {
        newQuizPlace.classList.remove("animation");
      }, 1000);
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
      // newQuizPlace.classList.add('animation')
      // setTimeout(() => {
      //     newQuizPlace.classList.remove('animation')
      // }, 1500);
    }
  });
};

function newScoreSetInLocalStorage() {
  currentGamer.correct = correct;
  currentGamer.inCorrect = inCorrect;
  localStorage.setItem("currentUser", JSON.stringify(currentGamer));
}

gameOverBtn?.addEventListener("click", () => {
  newScoreSetInLocalStorage();
  window.location.href = "./game-over.html";
});
const timer = () => {
  var temp = window.t;
  window.t = window.t - 1;
  var m = Math.floor((temp % 3600) / 60);
  var s = Math.floor(temp - m * 60);
  m = checkTime(m);
  s = checkTime(s);
  {
    progressBar
      ? (progressBar.style.width = (temp * 100) / window.per + "%")
      : null;
  }

  var t = setTimeout(timer, 1000);
  demo ? (demo.textContent = m + ":" + s) : null;

  if (temp < 9) {
    {
      progressBar ? (progressBar.style.backgroundColor = "red") : null;
    }
    {
      progressEl ? (progressEl.style.borderColor = "red") : null;
    }
  }
  if (temp == 0) {
    clearInterval(t);
    newScoreSetInLocalStorage();
    window.location.href = "./game-over.html";
  }
};
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function timerFunc() {
  let t = 0;
  window.t = 0 * 3600 + 1.5 * 60;
  window.per = window.t;
  timer();
}

result?.addEventListener("mousewheel", function (e) {
  document?.querySelector(e.target).blur();
});
