/**
 * Функция делает первый символ в строке заглавным.
 * @param {string} str 
 * @returns new snring
 */
export default function ucFirst(str) {
    // ваш код...
    return !!str && `${str[0].toUpperCase()}${str.slice(1)}` || str;
}