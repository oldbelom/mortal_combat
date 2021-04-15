const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
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

const player2 = {
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

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(playerObj) {
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

function playerWins(name) {
    const $winsTitle = createElement('div', 'winsTitle');

    if (name) {
        $winsTitle.innerText = name + ' wins';
    } else {
        $winsTitle.innerText = 'draw';
    }

    return $winsTitle;
}

function getRandom(maxCount) {
    return Math.ceil(Math.random() * maxCount)
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('div', 'button');

    $button.innerText = 'Restart'
    
    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);

    $button.addEventListener('click', function() {
        window.location.reload();
    })
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

function checkDamage() {
    const enemy = enemyAttack();
    const attack = playerAttack();

    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value);
        player2.renderHP();
    }

    if (attack.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$formFight.addEventListener('submit', function(event) {
    event.preventDefault();

    checkDamage();

    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.classList.add('hide');
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }
})
