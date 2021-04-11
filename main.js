const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['sword'],
    attack: function(name) {
        console.log(name + ' Fight...');
    }
}

const player2 = {
    player: 2,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['fan'],
    attack: function(name) {
        console.log(name + ' Fight...');
    }
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

function changeHP(player) {
    const $playerLife = document.querySelector(`.player${player.player} .life`);

    if (player.hp <= 0) {
        player.hp = 0;
        $randomButton.disabled = true;
    } else {
        player.hp -= randomizer(20);
    }

    if (player1.hp === 0) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0) {
        $arenas.appendChild(playerWins(player1.name));
    }
    
    $playerLife.style.width = player.hp + '%';
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'winsTitle');
    $winsTitle.innerText = name + ' wins'

    return $winsTitle;
}

function randomizer(maxCount) {
    return Math.ceil(Math.random() * maxCount)
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$randomButton.addEventListener('click', function() {
    changeHP(player1);
    changeHP(player2);
})

player1.attack('Subzero');
player2.attack('Kitana');
