import createElement from '../../assets/lib/create-element.js';

/**
 * Класс `Modal` описывает компонет "Модальное окно",
 * позволяющее открывать себя из внешнего кода,
 * задавать заголовок, содержимое и др.
 */
export default class Modal {
  constructor() {
    this.modalWindow = document.createElement('div');
    this.modalWindow.classList.add('modal');
    this.modalWindowTitle = document.createElement('h3');
    this.modalWindowTitle.classList.add('modal__title');
    this.modalWindowBody = document.createElement('div');
    this.modalWindowBody.classList.add('modal__body');
  }

  /**
   * Метод записывает заголовок модального окна
   * внутрь элемента 'modalWindowTitle'.
   * @param {string} text 
   */
  setTitle(text) {
    this.modalWindowTitle.innerHTML = text;
  }

  /**
   * Метод удаляет содержемое 'modalWindowBody' и
   * вставляет в него новое.
   * @param {HTMLElement} html корневой HTML того,
   * что мы хотим показать в модальном окне.
   */
  setBody(html) {
    this.modalWindowBody.innerHTML = '';
    this.modalWindowBody.append(html);
  }

  /**
   * Метод генерирует вёрстку содержимого элемента 'modalWindow'.
   * @returns {HTMLElement}
   */
  renderModalWndow() {
    this.modalWindow.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
      </div>
    </div>
    `
    this.modalWindow.querySelector('.modal__header').append(this.modalWindowTitle);
    this.modalWindow.querySelector('.modal__inner').append(this.modalWindowBody);

    return this.modalWindow;
  }

  /**
   * Обработчик события 'click' по кнопке 'Х'.
   */
  handlerClickOnButtonX = () => {
    let buttonX = document.querySelector('.modal__close');
    buttonX.addEventListener('click', this.close);
  }
  
  /**
   * Обработчик события 'keydown' клавиши 'Escape'.
   * @param {KeyboardEvent} event 
   */
  handlerKeypressEsc = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
    
  }
  /**
   * Метод добавляет вёрстку modalWindow в `body` документа
   * и обработчики событий: 'click' по кнопке Х
   * и 'keydown' клавиши 'Escape'.
   */
  open = () => {
    document.body.append(this.renderModalWndow());
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.handlerKeypressEsc);
    this.handlerClickOnButtonX();
  }

  /**
   * Метод удалянт вёрстку 'modalWindow' со страницы,
   * а так же обработчик 'keydown' клавиши 'Escape'
   * с объекта 'document'.
   */
  close = () => {
    this.modalWindow.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.handlerKeypressEsc)
  }
}
