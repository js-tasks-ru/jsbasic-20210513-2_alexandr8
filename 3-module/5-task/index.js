function getMinMax(str) {
  // ваш код...
  let regExp = /\s|,/;

  let sortedNumbers = str
    .split(regExp)
    .filter(item => parseFloat(item))
    .sort((a, b) => a - b);
    
  return {
    min: Number(sortedNumbers[0]),
    max: Number(sortedNumbers[sortedNumbers.length - 1]),
  };
}
