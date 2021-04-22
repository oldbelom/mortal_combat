export const $arenas = document.querySelector('.arenas');

export const getRandom = (maxCount) => Math.ceil(Math.random() * maxCount);

export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

export function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('div', 'button');

    $button.innerText = 'Restart'
    
    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);

    $button.addEventListener('click', function() {
        window.location.reload();
    })
}