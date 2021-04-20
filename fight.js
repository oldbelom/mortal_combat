import { getRandom, createElement, createReloadButton, $arenas } from './utils.js';
import { player1, player2 } from './players.js';
import generateLogs from './logs.js';

export const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20
}

const ATTACK = ['head', 'body', 'foot'];

function playerWins(name) {
    const $winsTitle = createElement('div', 'winsTitle');

    if (name) {
        $winsTitle.innerText = name + ' wins';
    } else {
        $winsTitle.innerText = 'draw';
    }

    return $winsTitle;
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    }
}

function playerAttack() {
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

export function playRound() {
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, 'deepskyblue', player.value);
    }

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, 'crimson', enemy.value);
    }

    if (player.defence === enemy.hit) {
        generateLogs('defence', player2, player1, 'limegreen');
    }

    if (player.hit === enemy.defence) {
        generateLogs('defence', player1, player2, 'limegreen');
    }
}

export function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.classList.add('hide');
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1, 'gold');
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2, 'gold');
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw', player2, player1, 'violet');
    }
}