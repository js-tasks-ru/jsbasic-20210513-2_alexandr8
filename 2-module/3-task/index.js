/**
 * The function determines if the value is a number.
 * @param {*} value 
 * @returns {boolean}
 */
 function isNumber(value) {
  return typeof(value) === 'number' && value - value === 0;
}

function isEmptyArray(arr) {
  return arr.length === 0;
}

let calculator = {
  // ваш код
  firstNumber: 0,
  secondNumber: 0,
  
  read: function (a, b) {
      this.firstNumber = isNumber(a) && a;
      this.secondNumber = isNumber(b) && b;
  },
  sum: () => calculator.firstNumber + calculator.secondNumber,
  mul: () => calculator.firstNumber * calculator.secondNumber,
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
