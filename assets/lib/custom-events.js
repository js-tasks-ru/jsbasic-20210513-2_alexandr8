/**
 * Функция генерирует CustomEvent "product-add" на событие 'click' по HTMl-элементу.
 * @param {HTMLElement} button 
 * @param {string} id 
 */
export function generateProductAddEvent(button, id) {
    button.addEventListener('click', () => {
        button.dispatchEvent(new CustomEvent("product-add", {
            detail: id,
            bubbles: true
        }))
    });
}

/**
 * Функция генерирует CustomEvent "ribbon-select" на событие 'click' по HTMl-элементу.
 * @param {HTMLElement} item
 * @param {string} id 
 * @param {boolean} bubbl всплытие.
 * @param {Function} func дополнительное действие на событии
 */
export function generateSelectEvent(item, id, bubbl, func) {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        if (func) { func() };
        item.classList.add('ribbon__item_active');
        item.dispatchEvent(new CustomEvent('ribbon-select', {
            detail: id,
            bubbles: bubbl,
        }))

    })
}
