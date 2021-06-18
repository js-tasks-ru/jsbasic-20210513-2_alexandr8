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
