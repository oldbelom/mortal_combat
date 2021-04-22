import { player1, player2, createPlayer } from './players.js';
import { playRound, showResult, $formFight } from './fight.js';
import { $arenas } from './utils.js';
import generateLogs from './logs.js';

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2, 'white');

$formFight.addEventListener('submit', function(event) {
    event.preventDefault();
    playRound();
    showResult();
});
 