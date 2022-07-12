import { newScoreSetInLocalStorage } from "./game";

const gameOverBtn = document.getElementById("game-over__btn");
const progressBar = document.getElementById("progress-bar");
const demo = document.getElementById("time-demo");

const timer = () => {
    let temp = window.t;
    window.t = window.t - 1;
    let m = Math.floor((temp % 3600) / 60);
    let s = Math.floor(temp - m * 60);
    m = checkTime(m);
    s = checkTime(s);
    {
      progressBar
        ? (progressBar.style.width = (temp * 100) / window.per + "%")
        : null;
    }
  
    let t = setTimeout(timer, 1000);
    demo ? (demo.textContent = m + ":" + s) : null;
  
    if (temp == 0) {
      clearInterval(t);
      newScoreSetInLocalStorage()
      gameOverBtn ? window.location.href = "./game-over.html" : null
    }
  };
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
export function timerFunc() {
    let t = 0;
    window.t = 0 * 3600 + 1.5 * 60;
    window.per = window.t;
    timer();
  }