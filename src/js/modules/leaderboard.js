let select = document.querySelector('#modes')
const leaderBoardTable = document.querySelector('.leaderboard-table')
const options = document.querySelectorAll('.options')
const backBtn = document.querySelector('.history-page')

export function leaderBoard () {
    const leaderBoards = JSON.parse(localStorage.getItem("gamer"));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    options?.forEach(el => { 
        if (currentUser.mode === el.value) el.setAttribute('selected', 'true')
    })
    backBtn?.addEventListener('click', () => window.history.back())
    const leader = () => {
        const value = select?.options[select.selectedIndex].value;
        let data = leaderBoards?.filter(info => info.mode === value)
        data?.sort((a,b) => b.score - a.score)
        let list = '';
        for(let info of data) {
            list += `<div class="leaderboard-table__item"> <p>${info.name}</p> <p>${info.score}</p></div>`
        }
        {leaderBoardTable ?  leaderBoardTable.innerHTML = list : null}
    }
    leader()
    select?.addEventListener('change', () => leader())
}