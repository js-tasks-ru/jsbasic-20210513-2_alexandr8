/**
 * The function determines if the value is a number.
 * @param {*} value 
 * @returns {boolean}
 */
 function isNumber(value) {
  return typeof(value) === 'number' && value - value === 0;
}

function sumSalary(salaries) {
  // ваш код...
  return Object.values(salaries)
    .reduce((acc, current) => acc += isNumber(current) && current, 0);  
}

// other solutions
function sumSalaryWithFilter(salaries) {
  return Object
    .values(salaries)
    .filter(prop => isNumber(prop))
    .reduce((acc, current) => acc + current, 0);
}

function sumSalaryWithForOf(salaries) {
  let amountOfSalaries = 0;

  for (let value of Object.values(salaries)) {
    amountOfSalaries += isNumber(value) && value;
  }

  return amountOfSalaries;
}
