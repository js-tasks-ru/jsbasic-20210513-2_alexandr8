function camelize(str) {
  // ваш код...
  let index = 0;
  let result = '';

  while (index < str.length) {
    let indexUp = str[index] === '-' && index + 1;
    result = `${result}${indexUp && str[indexUp].toUpperCase() || str[index]}`
    index += indexUp && 2 || 1;
  }

  return result;
}
