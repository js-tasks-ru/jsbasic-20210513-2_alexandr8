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
});

// sumSalaryWithFilter() & sumSalaryWithForOf() tests
describe('2-module-1-task', () => {
  it('должна складывать все зарплаты', () => {
    let salaries = {
      John: 1000,
      Ann: 1600,
      Pete: 1300
    };

    expect(sumSalaryWithFilter(salaries)).toEqual(3900);
    expect(sumSalaryWithForOf(salaries)).toEqual(3900);
  });

  it('должна игнорировать свойства других типов', () => {
    let salaries = {
      John: 1000,
      Ann: 1600,
      Pete: 1300,
      month: 'December',
      currency: 'USD',
      isPayed: false
    };

    expect(sumSalaryWithFilter(salaries)).toEqual(3900);
    expect(sumSalaryWithForOf(salaries)).toEqual(3900);
  });

  it('должна игнорировать специальные числовые значения', () => {
    let salaries = {
      John: 1000,
      Ann: 1600,
      Pete: 1300,
      Bob: NaN,
      Peter: Infinity,
      Ivan: -Infinity,
      month: 'December',
      currency: 'USD',
      isPayed: false
    };

    expect(sumSalaryWithFilter(salaries)).toEqual(3900);
    expect(sumSalaryWithForOf(salaries)).toEqual(3900);
  });

  it('должна возвращать 0 если нет свойств с зарплатами', () => {
    let salaries = {
      month: 'December',
      currency: 'USD',
      isPayed: false
    };

    expect(sumSalaryWithFilter(salaries)).toEqual(0);
    expect(sumSalaryWithForOf(salaries)).toEqual(0);
  });
});
