const gamerName = document.querySelector('#gamer_name')
const startBtn = document.querySelector('#start-btn')
const nameErr = document.querySelector('.name-error')

export const gamerNameFunc = () => {
    const nameCheck = () => {
        if(!gamerName.value.length) {
            nameErr.textContent = 'required this field*'
            gamerName.classList.add('error')
        } else if (gamerName.value.length < 3) {
            nameErr.textContent = 'length shoulbe be at least 3 characters*'
            gamerName.classList.add('error')
        } else {
            nameErr.textContent = ''
            gamerName.classList.remove('error')
        }
    }
      gamerName?.addEventListener('input', () => nameCheck())
      const user = JSON.parse(localStorage.getItem('currentUser'))
      gamerName && user ? gamerName.value = user.name : null

    startBtn?.addEventListener('click', () => {
        nameCheck()
    if(gamerName.value.length > 3) {
        const mode = document.querySelector('input[type="radio"]:checked')
        let info = {
            name: gamerName.value,
            mode: mode.value,
            score: 0,
            level: 1
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
                inCorrect: 0,
                level: 1
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser))
            window.location.href = `./mode-game.html?name=${info.name}&mode=${info.mode}`
    }
    })
}