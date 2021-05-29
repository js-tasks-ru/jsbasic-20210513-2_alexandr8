/**
 * The function calculates the number of invalid characters
 * in a row in a string, starting from the indexStart position.
 * @param {string} str 
 * @param {number} indexStart 
 * @param {Array} ignoredCharackters 
 * @returns {number} 
 */
function iterateIgnoringCharacters(str, indexStart, ignoredCharackters) {
  let currentIndex = indexStart;
  let ignoredPositions = 0;
  let flag = true;
  
  while (currentIndex < str.length && flag) {
    let index = currentIndex;

    for (let char of ignoredCharackters) {
      if (str[currentIndex] === char) {
        ignoredPositions += 1;
        currentIndex += 1;
        break;
      }     
    }

    flag = currentIndex > index;
  }
  
  return ignoredPositions;
}

/**
 * The function creates a string containing the words of the original
 * string with a capital letter separated by the specified separator,
 * ignoring the characters listed after the separator parameter
 * @param {*} str 
 * @param {string} separator
 * @param  {...any} deletedCharackters for example: ',', '-', '_'
 * @returns {string}
 */  
function camelizeWordsAndGlue(str, separator, ...deletedCharackters) {
  const chars = deletedCharackters;
  let checkStart = iterateIgnoringCharacters(str, 0, chars)
  let result = str.length > 0 ? `${str[checkStart].toUpperCase()}` : '';
  let currentIndex = result.length + checkStart;;
  
  while (currentIndex < str.length) {
    let indexUp = iterateIgnoringCharacters(str, currentIndex, chars);

    if (currentIndex + indexUp < str.length) {
      result = `${result}${indexUp ? `${separator}${str[currentIndex + indexUp].toUpperCase()}` : str[currentIndex]}`
    }

    currentIndex += indexUp && indexUp + 1 || 1;
  }
  
  return result;
}
