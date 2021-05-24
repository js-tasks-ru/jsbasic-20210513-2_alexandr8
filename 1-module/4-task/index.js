let spams = ['1xBet', 'XXX'];

function checkSpam(str) {
  // ваш код...
  let result = false;
  const lowercaseString = str.toLowerCase();

  for (let i = 0; i < spams.length && !result; i += 1) {
    result = lowercaseString.includes(spams[i].toLowerCase());
  }

  return result;
}
