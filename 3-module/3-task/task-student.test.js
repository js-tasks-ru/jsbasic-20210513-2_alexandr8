describe('3-module-3-task-index-student', () => {
  /**
   * @function iterateIgnoringCharacters()
   */
  let chars = ['-', ' ', '_', ',']
  it('должна вернуть 0 ', () => {
    expect(iterateIgnoringCharacters('', 0, chars)).toBe(0);
  });

  it('должна вернуть 1 ', () => {
    expect(iterateIgnoringCharacters('-', 0, chars)).toBe(1);
  });

  it('должна вернуть 2 ', () => {
    expect(iterateIgnoringCharacters('_ str', 0, chars)).toBe(2);
  });

  it('должна вернуть 4 ', () => {
    expect(iterateIgnoringCharacters('str_--_str', 3, chars)).toBe(4);
  });

  it('должна вернуть 2 ', () => {
    expect(iterateIgnoringCharacters('str_ ', 3, chars)).toBe(2);
  });

  /**
   * @function camelizeWordsAndGlue()
   */
  it('должна оставить пустую строку без изменений ', () => {
    expect(camelizeWordsAndGlue('')).toBe('');
  });
  it('должна преобразовать \'  background-color\'', () => {
    expect(camelizeWordsAndGlue('  background-color', '', ' ', '-'))
                            .toBe('BackgroundColor');
  });

  it('должна преобразовать \'_list-style, _image  \' ', () => {
    expect(camelizeWordsAndGlue('_list-style, _image  ', ', ', '-', ' ', '_', ','))
                            .toBe('List, Style, Image');
  });
});
