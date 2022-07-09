const scoreEl = document.querySelector('.score'),
      correctEl = document.querySelector('.correct'),
      inCorrectEl = document.querySelector('.in-correct'),
      playAgainBtn = document.querySelector('.play-again__btn')

export function gameOver() {
    const localStorageData = JSON.parse(localStorage.getItem('currentUser')) 
    if (scoreEl) {
        scoreEl.textContent = localStorageData.score 
        correctEl.textContent = localStorageData.correct
        inCorrectEl.textContent = localStorageData.inCorrect 
    }

        const users = JSON.parse(localStorage.getItem('gamer'))
        users?.map((el) => {
            if (
                el.name === localStorageData.name &&
                el.mode === localStorageData.mode &&
                el.score < localStorageData.score
            ) {
                console.log(el);
                el.score = localStorageData.score
                localStorage.setItem('gamer', JSON.stringify(users))
            }
        })

        function incEltNbr() {
               let endNbr = scoreEl? Number(scoreEl.innerHTML): null
                incNbrRec(0, endNbr, scoreEl);
              }
              
              function incNbrRec(i, endNbr, scoreEl) {
                if (i <= endNbr) {
                 scoreEl ? scoreEl.innerHTML = i : null
                  setTimeout(function() {
                    incNbrRec(i + 1, endNbr, scoreEl);
                  }, 15);
                }
              }
        
              incEltNbr();
        playAgainBtn?.addEventListener('click', () => {
          localStorageData.score = 0
          localStorage.setItem('currentUser', JSON.stringify(localStorageData))
        })
}