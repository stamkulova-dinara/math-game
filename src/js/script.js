import '../css/styles.css'
import { gamerNameFunc } from "./modules/main.js"
import { leaderBoard } from "./modules/leaderboard.js"
import {game} from "./modules/game"
import { gameOver } from './modules/game-over'
import { openModalPage } from './modules/open-modal'

gamerNameFunc()
leaderBoard()
game()
gameOver()
openModalPage()