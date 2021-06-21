import createElement from '../../assets/lib/create-element.js';
import { generateSelectEvent } from '../../assets/lib/custom-events.js';

/**
 *  * Класс `RibbonMenu` описывает компонент интерфейса "Меню".
 */
export default class RibbonMenu {
  /**
   * Конструктор создаёт в `ribbonMenu.elem` DOM-элемент меню с функцией
   * прокрутки по горизонтали влево/вправо при клике по кнопкам вперёд/назад.
   * @param {Array} categories массив категорий меню.
   */
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.renderMenu();
    this.initMenu();
    this.addRibbonSelectEvents();
  }
  /**
   * Метод генерирует вёрстку содержимого элемента 'ribbonMenu'.
   */
  renderMenu() {
    let menuArrowLeft = document.createElement('button');
    let menuArrowRight = document.createElement('button');
    let menu = document.createElement('nav');

    menuArrowLeft.classList.add('ribbon__arrow', 'ribbon__arrow_left');
    menuArrowRight.classList.add('ribbon__arrow', 'ribbon__arrow_right', 'ribbon__arrow_visible');
    menuArrowLeft.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    menuArrowRight.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;

    menu.classList.add('ribbon__inner');

    for (let item of this.categories) {
      let href = document.createElement('a');
      href.innerHTML = `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
      menu.append(href);
    }

    this.elem.append(menuArrowLeft);
    this.elem.append(menu);
    this.elem.append(menuArrowRight);
  }
  
  /**
   * Метод реализует scroll меню на величину scrollSize.
   * @param {HTMLElement} menu 
   * @param {number} scrollSize 
   * @returns 
   */
  scrollMenu = (menu, scrollSize) => () => menu.scrollBy(scrollSize, 0);
  
  /**
   * Обработчик события 'scroll'.
   * Метод реализует скрытие кнопок переключения вперёд/назад 
   * при достижении крайних позиций ленты меню.
   * @param {HTMLElement} menu
   * @param {HTMLElement} arrowRight
   * @param {HTMLElement} arrowleft
   * @returns 
   */
  hideMenuArrows = (menu, arrowRight, arrowleft) => () => {
    let scrollWidth = menu.scrollWidth;
    let clientWidth = menu.clientWidth;
    let scrollLeft = menu.scrollLeft;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      arrowleft.classList.remove('ribbon__arrow_visible');
    }
    else if (scrollRight < 1) {
      arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      arrowleft.classList.add('ribbon__arrow_visible');
      arrowRight.classList.add('ribbon__arrow_visible');
    }
  }

/**
 * Метод инициализирует в меню обработчики событий 'click' и 'scroll'.
 */
  initMenu = () => {
    let menu = this.elem.querySelector('.ribbon__inner')
    let menuArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let menuArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    
    menuArrowRight.addEventListener('click', this.scrollMenu(menu, 350));
    menuArrowLeft.addEventListener('click', this.scrollMenu(menu, -350));
    menu.addEventListener('scroll', this.hideMenuArrows(menu, menuArrowRight, menuArrowLeft));
  }

  /**
   * Метод реализует удаление в категории состояния 'active'. 
   */
  removePreviosActive = () => {
    let item = this.elem.querySelector('.ribbon__item_active');

    if (item) {
      item.classList.remove('ribbon__item_active');
    }
  }

  /**
   * Метод генерирует CustomEvent "ribbon-select" на событие 'click'
   * по категории меню.
   */
  addRibbonSelectEvents() {
    let items = this.elem.querySelectorAll('.ribbon__item');

    for (let item of items) {
      generateSelectEvent(
        item, item.dataset.id, true,
        this.removePreviosActive
      );
    }
  }
}
