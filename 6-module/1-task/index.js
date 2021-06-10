import ucFirst from './functions.js'
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.elem.classList.add('table');
    this.renderTitle(rows);
    this.renderBody(rows);
    this.addRemoveButtons();
  }
  
  /**
   * Метод генерирует кнопку с обработчиком remove().
   * @param {string} text 
   * @param {HTMLElement} item удаляемый после клика элемент.
   * @returns HTMLElement 
   */
  renderRemoveButton(text, item) {
    let button = document.createElement('button');
    button.innerHTML = text;
    button.addEventListener('click', () => item.remove());
    return button;
  }
  
  /**
   * Метод генерирует строку таблицы со значениями свойств
   * переданного объекта.
   * @param {HTMLTableElement} node 
   * @param {string} tagName 'th' | 'tr'
   * @param {object} item 
   */
  renderRow(node, tagName, item) {
    let row = document.createElement('tr');
    
    if (node.tagName === 'TBODY') {
      row.classList.add('user');
    }
    
    for (let prop in item) {
      let element = document.createElement(`${tagName}`);
      element.innerHTML = node.tagName !== 'THEAD' ? item[prop] : ucFirst(prop);
      row.append(element);
    }
    
    node.append(row);
  }
  
  /**
   * Метод генерирунет заголовок таблицы.
   * @param {Array} rows 
   */
  renderTitle(rows) {
    let item = rows[0];
    let title = document.createElement('thead');
    let lastCell = document.createElement(`th`);
    
    this.renderRow(title, 'th', item);
    
    let row = title.querySelector('tr');
    row.insertAdjacentElement('beforeEnd', lastCell);
    
    this.elem.append(title);
  }
  
  /**
   * Метод генерирует таблицу с данными.
   * @param {Array} rows 
   */
  renderBody(rows) {
    let body = document.createElement('tbody');
    
    for (let user of rows) {
      this.renderRow(body, 'td', user);
    }
    
    this.elem.append(body);
  }
  
  /**
   * Метод добавляет в таблицу на каждую строку с данными
   * кнопку для удаления этой строки. 
   */
  addRemoveButtons() {
    let users = this.elem.querySelectorAll('.user');
    
    for (let user of users) {
      let lastCell = document.createElement(`td`);
      lastCell.append(this.renderRemoveButton('X', user));
      user.append(lastCell);
    }
  }

}
