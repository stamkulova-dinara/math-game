const gamerName = document.querySelector('#gamer_name'),
      mode = document.querySelectorAll('#btn-mode'),
    //   timeAttack = document.querySelector('#btn-time'),
      startBtn = document.querySelector('#start-btn')

export const gamerNameFunc = () => {

    startBtn?.addEventListener('click', () => {
        console.log({
            name: gamerName.value,
            mode: "pr"
        });
    })
}