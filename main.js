const player1 = {
    name: 'Subzero',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['sword'],
    attack: function() {
        console.log('Subzero' + ' ' + 'Fight...');
    }
}

const player2 = {
    name: 'Kitana',
    hp: 65,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['fan'],
    attack: function() {
        console.log('Kitana' + ' ' + 'Fight...');
    }
}

function createPlayer(playerNumber, player) {
    const $arenas = document.querySelector('.arenas');

    const $player1 = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $img = document.createElement('img');

    $player1.classList.add(playerNumber);
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $life.classList.add('life');
    $life.style.width = player.hp + '%';
    $name.classList.add('name');
    $name.innerText = player.name;
    $img.src = player.img;

    $player1.appendChild($progressbar);
    $player1.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    $arenas.appendChild($player1);
}

createPlayer('player1', player1);
createPlayer('player2', player2);

player1.attack();
player2.attack();