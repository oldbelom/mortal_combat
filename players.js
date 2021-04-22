import { createElement } from './utils.js';

export const player1 = {
    player: 1,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['sword'],
    attack,
    changeHP,
    elHP,
    renderHP
}

export const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['fan'],
    attack,
    changeHP,
    elHP,
    renderHP
}

function attack() {
    console.log(this.name + ' Fight...');
}

function changeHP(num) {
    this.hp -= num;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    const $playerLife = document.querySelector(`.player${this.player} .life`);
    return $playerLife;
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

export function createPlayer(playerObj) {
    const $player = createElement('div', `player${playerObj.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
    
    return $player;
}