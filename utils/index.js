export const getRandom = (maxCount) => Math.ceil(Math.random() * maxCount);

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}