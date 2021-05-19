/**
 * The function determines if the value is a number.
 * @param {*} value 
 * @returns {boolean}
 */
function isNumber(value) {
  return typeof(value) === 'number' && value - value === 0;
}

/**
 * The function determines if a number is integer and not negative.
 * @param {number} num
 * @returns {boolean}
 */
function isIntegerAndNotNegative(num){
  return isNumber(num) && num >= 0 && Math.floor(num) - num === 0;
}

/**
 * The function calculates the factorial of a number
 * @param {*} n 
 * @returns !n || 0
 */
function factorial(n) {
  // ваш код...
  let result = isIntegerAndNotNegative(n) && 1 || 0;

  for (let i = 1; i < n; i += 1) {
    result *= i + 1;
  }

  return result;

}
