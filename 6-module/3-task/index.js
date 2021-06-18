import createElement from '../../assets/lib/create-element.js';
import arrows from '../../assets/lib/arrows.js';
import { generateProductAddEvent } from '../../assets/lib/custom-events.js';

/**
 * Класс `Carousel` описывает компонент интерфейса "Карусель".
 */
export default class Carousel {
  /**
   * Конструктор создаёт в `carousel.elem` DOM-элемент карусели,
   * который состоит из перемещающихся (вправо/влевл) по клику на стрелки слайдов.
   * @param {Array} slides массив слайдов для отображения.
   */
  constructor(slides) {
    this.slides = slides;
    this.arrows = arrows;
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.elem.append(...this.renderSwitchButtons());
    this.elem.append(this.renderCarousel());
    this.addProductAddEventnts();
    this.initCarousel();
  }

  /**
   * Метод генерирует вёрстку кнопок переключения слайдов карусели.
   * @param {Array} arrows массив с объектами, описывающими кнопки.
   * @returns {Array} массив c HTML-элементами.
   */
  renderSwitchButtons() {
    let buttons = [];

    for (let arrow of this.arrows) {
      let button = document.createElement('div');
      button.innerHTML = `
      <div class="carousel__arrow ${arrow.name}">
        <img src="/assets/images/icons/${arrow.image}" alt="icon">
      </div>
     `
      buttons.push(button);
    }

    return buttons;
  }

  /**
   * Метод генерирует вёрстку элемента slide. 
   * @param {Object} slide объект, описывающий слайд.
   * @returns {HTMLElement}
   */
  renderSlide(slide) {
    let element = document.createElement('div');

    element.classList.add('carousel__slide');
    element.setAttribute('data-id', slide.id);
    element.innerHTML = `
    <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    `
    return element;
  }

  /**
   * Метод генерирует вёрстку элемента carousel.
   */
  renderCarousel() {
    let carousel = document.createElement('div');
    carousel.classList.add('carousel__inner');

    for (let slide of this.slides) {
      let htmlSlide = this.renderSlide(slide);
      carousel.append(htmlSlide);
    }

    return carousel;
  }

  /**
   * Метод генерирует CustomEvent "product-add" на событие 'click'
   * по кнопке '+' на каждом слайде элемента Carousel.
   */
  addProductAddEventnts() {
    let buttons = this.elem.querySelectorAll('.carousel__button');

    for (let i = 0; i < buttons.length; i += 1) {
      generateProductAddEvent(buttons[i], this.slides[i].id);
    }
  }

  /**
   * Метод реализует функцию переключения слайдов карусели.
   */
  initCarousel() {
    let carousel = this.elem.querySelector('.carousel__inner');
    let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let slide = this.elem.querySelector('.carousel__slide');

    let shift = 0;
    let currentPosition = 0;

    /**
     * Функция скрывает кнопку переключения слайдов со страницы.
     */
    const hideCarouselArrow = () => {
      if (currentPosition === 0) {
        carouselArrowLeft.style.display = 'none';
      }
      if (currentPosition === carousel.childElementCount - 1) {
        carouselArrowRight.style.display = 'none';
      }
    }

    /**
     * Функция реализует переключение слайдов карусели.
     * @param {number} step -1, если двигаемся по массиву слайдов справа налево.
     */
    const move = (step=1) => {
      currentPosition += step;
      shift += slide.offsetWidth * step;
      carousel.style.transform = `translateX(-${shift}px)`;
    }

    const moveRight = () => {
      if (currentPosition >= 1) {
        carouselArrowRight.style.display = '';
        move(-1);
        hideCarouselArrow();
      }
    }

    const moveLeft = () => {
      if (currentPosition < carousel.childElementCount) {
        carouselArrowLeft.style.display = '';
        move();
        hideCarouselArrow();
      }
    }

    hideCarouselArrow();
    carouselArrowLeft.addEventListener('click', moveRight);
    carouselArrowRight.addEventListener('click', moveLeft);
  }
}
