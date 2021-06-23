import { generateSliderChangeEvent } from '../../assets/lib/custom-events.js';
import { calculateValuePercents } from '../../assets/lib/calculate.js';

/**
 * Класс `StepSlider` описывает компонент интерфейса "Пошаговый слайдер"
 */
export default class StepSlider {
  /**
   * @param {Object}  содержит кол-во шагов и начальное значение `StepSlider`.
   */
  constructor({ steps, value = 0 }) {
    this.segments = steps - 1;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.renderStepSlider();
    this.setSliderValue();
    this.setValuesTrumbAndProgress();
    this.addHandlerForUserSelection();
  }

  /**
   * Метод генерирует вёрбстку HTML-элемента, который содержит сегменты слайдера
   * и активирует сегмент с позицией, соответствующей значению 'this.value'.
   * @returns {HTMLElement}
   */
  renderSliderSegmentsAndActivateCurrent() {
    let sliderSteps = document.createElement('div');
    sliderSteps.classList.add('slider__steps');

    for (let i = 0; i <= this.segments; i += 1) {
      let step = document.createElement('span');
      step.setAttribute('id', i)
      if (i === this.value) {
        step.classList.add('slider__step-active');
      }
      sliderSteps.append(step);
    }
    return sliderSteps;
  }

  /**
   * Метод генерирует верстку корневого HTML-элемента слайдера.
   */
  renderStepSlider() {
    this.elem.innerHTML = `
    <div class="slider__thumb">
      <span class="slider__value"></span>
    </div>
    <div class="slider__progress"></div>
    `
    this.elem.append(this.renderSliderSegmentsAndActivateCurrent());
  }

  setValuesTrumbAndProgress() {
    let valuePercents = calculateValuePercents(this.value, this.segments);
    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;
  }

  setSliderValue = () => {
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.innerHTML = this.value;
  }

  activateCurrentSegment = () => {
    let currentSliderPosition = document.getElementById(`${this.value}`);
    currentSliderPosition.classList.add('slider__step-active');
  }

  deactivatePreviosSegment = () => {
    let previosSliderPosition = this.elem.querySelector('.slider__step-active');
    previosSliderPosition.classList.remove('slider__step-active');
  }

  changeSliderValuesAndGenerateCustomEvent = () => {
    this.setValuesTrumbAndProgress();
    this.deactivatePreviosSegment();
    this.activateCurrentSegment();
    this.setSliderValue();    
    this.elem.onchange = generateSliderChangeEvent(this.elem, this.value);    
  }

  calculateNewValueForSliderPosition = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * this.segments;
    this.value = Math.round(approximateValue);
  }

  addHandlerForUserSelection() {
    this.elem.addEventListener('click', (event) => {
      this.calculateNewValueForSliderPosition(event);
      this.changeSliderValuesAndGenerateCustomEvent();
    })
  }
}
