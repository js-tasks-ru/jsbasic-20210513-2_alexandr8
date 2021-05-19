describe('1-module-1-task', () => {
  // isNumber tests 
  it('isNumber()  вернёт  false', () => {
    const values = ['1', NaN, Infinity, -Infinity, true, [], {}];
    for (val of values) {
      expect(isNumber(val)).toEqual(false);
    }
  });

  it('isNumber()  вернёт  true', () => {
    const values = [-1, 0, 1.25];
    for (val of values) {
      expect(isNumber(val)).toEqual(true);
    }
  });

  // sIntegerAndNotNegative tests
  it('isIntegerAndNotNegative()  вернёт  false', () => {
    const values = [-1, 1.25, 1.000000000001];
    for (val of values) {
      expect(isIntegerAndNotNegative(val)).toEqual(false);
    }
  });

  it('isIntegerAndNotNegative()  вернёт  true', () => {
    const values = [0, 1];
    for (val of values) {
      expect(isIntegerAndNotNegative(val)).toEqual(true);
    }
  });  

 // factorial tests
  it('факториал -1 вернёт 0', () => {
    expect(factorial(-1)).toEqual(0);
  });

  it('факториал 1.25 вернёт 0', () => {
    expect(factorial(1.25)).toEqual(0);
  });
});
