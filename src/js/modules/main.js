const gamerName = document.querySelector('#gamer_name'),
      startBtn = document.querySelector('#start-btn')

export const gamerNameFunc = () => {
    const nameCheck = () => gamerName.value.length < 3 ? gamerName.classList.add('error') : gamerName.classList.remove('error') 
      gamerName?.addEventListener('input', () => nameCheck())

    startBtn?.addEventListener('click', () => {
        nameCheck()
    if(gamerName.value.length > 3) {
        const mode = document.querySelector('input[type="radio"]:checked')
        let info = {
            name: gamerName.value,
            mode: mode.value,
            score: 0
        }
        let gameInfo = JSON.parse(localStorage.getItem("gamer"));

        const localUser = gameInfo?.find(obj => obj.name == info.name && obj.mode == info.mode)

        if (!gameInfo) {
            gameInfo = [info]
            localStorage.setItem("gamer", JSON.stringify(gameInfo));
        } else{
            if(!localUser) {
                gameInfo.push(info)
                localStorage.setItem("gamer", JSON.stringify(gameInfo));
            };
        }
            let currentUser = {
                name: gamerName.value,
                mode: mode.value,
                score: 0,
                correct: 0,
                inCorrect: 0
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
            window.location.href = `./mode-game.html?name=${info.name}&mode=${info.mode}`
            gamerName.value = ''
    }
    })
}