import { getRandom, createElement } from '../utils/index.js';
import { LOGS, ATTACK, HIT, $chat, $formFight, $arenas } from '../constants/index.js';
import Player from '../Player/index.js';

const player1 = new Player({
    player: 1,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    rootSelector: 'arenas',
})

const player2 = new Player({
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    rootSelector: 'arenas',
})

class Game {
    start = () => {
        player1.createPlayer();
        player2.createPlayer();
        
        this.generateLogs('start', player1, player2, 'white');

        $formFight.addEventListener('submit', (event) => {
            event.preventDefault();
            this.playRound();
            this.showResult();
        });
    }

    generateLogs = (type, player1, player2, color, damage = 0) => {
        let text;
    
        const time = new Date();
        const timeString = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    
        const fightText = LOGS[type][getRandom(LOGS[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
        
        switch (type) {
            case 'start':
                text = LOGS.start.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', timeString);
                break;
            case 'hit':
                text = `${timeString} ${fightText} -${damage} [${player2.hp}/100]`;
                break;
            case 'defence':
                text = `${timeString} ${fightText}`;
                break;
            case 'draw':
                text = LOGS.draw;
                break;
            case 'end':
                text = LOGS[type][getRandom(LOGS[type].length - 1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
                break;
        }
    
        const el = `<p style="color: ${color}">${text}</p>`;
        $chat.insertAdjacentHTML('afterbegin', el);
    }

    playerWins = (name) => {
        const $winsTitle = createElement('div', 'winsTitle');
    
        if (name) {
            $winsTitle.innerText = name + ' wins';
        } else {
            $winsTitle.innerText = 'draw';
        }
    
        return $winsTitle;
    }
    
    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $button = createElement('div', 'button');
    
        $button.innerText = 'Restart'
        
        $reloadWrap.appendChild($button);
        $arenas.appendChild($reloadWrap);
    
        $button.addEventListener('click', function() {
            window.location.reload();
        })
    }

    enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
        
        return {
            value: getRandom(HIT[hit]),
            hit,
            defence
        }
    }
    
    playerAttack = () => {
        const attack = {};
    
        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }
    
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
    
            item.checked = false;
        }
    
        return attack;
    }

    playRound = () => {
        const enemy = this.enemyAttack();
        const player = this.playerAttack();
    
        if (player.hit !== enemy.defence) {
            player2.changeHP(player.value);
            player2.renderHP();
            this.generateLogs('hit', player1, player2, 'deepskyblue', player.value);
        }
    
        if (player.defence !== enemy.hit) {
            player1.changeHP(enemy.value);
            player1.renderHP();
            this.generateLogs('hit', player2, player1, 'crimson', enemy.value);
        }
    
        if (player.defence === enemy.hit) {
            this.generateLogs('defence', player2, player1, 'limegreen');
        }
    
        if (player.hit === enemy.defence) {
            this.generateLogs('defence', player1, player2, 'limegreen');
        }
    }
    
    showResult = () => {
        if (player1.hp === 0 || player2.hp === 0) {
            $formFight.classList.add('hide');
            this.createReloadButton();
        }
    
        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arenas.appendChild(this.playerWins(player2.name));
            this.generateLogs('end', player2, player1, 'gold');
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            $arenas.appendChild(this.playerWins(player1.name));
            this.generateLogs('end', player1, player2, 'gold');
        } else if (player1.hp === 0 && player2.hp === 0) {
            $arenas.appendChild(this.playerWins());
            this.generateLogs('draw', player2, player1, 'violet');
        }
    }
}

export default Game;