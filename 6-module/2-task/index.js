import createElement from '../../assets/lib/create-element.js';
import { generateProductAddEvent } from '../../assets/lib/custom-events.js';

/**
 * класс `ProductCard`, описывает компонент интерфейса "Карточка товара".
 */
export default class ProductCard {
  /**
   * Конструктор создаёт в `productCard.elem` DOM-элемент с карточкой товара и
   * и генерирует CustomEvent "product-add" при клике по кнопке добавления "+".
   * @param {Object} product объект, описывающий товар.
   */
  constructor(product) {
    this.product = product;
    this.elem = document.createElement('div');
    this.elem.classList.add('card');
    this.renderCard();
    this.addProductAddEventnt();
  }

  renderCardTop() {
    let top = document.createElement('div');
    top.classList.add('card__top');
    top.innerHTML = `
      <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
      <span class="card__price">€${this.product.price.toFixed(2)}</span>
    ` 
    return top;
  }
  
  renderCardBody() {
    let body = document.createElement('div');
    body.classList.add('card__body');
    body.innerHTML = `
      <div class="card__title">${this.product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    `
    return body;
  }
  
  addProductAddEventnt() {
    let button = this.elem.querySelector('.card__button');
    generateProductAddEvent(button, this.product.id);
  }

  renderCard() {
    this.elem.append(this.renderCardTop());
    this.elem.append(this.renderCardBody());
  }
}
