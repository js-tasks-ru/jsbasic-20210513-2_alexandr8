import { generateSliderChangeEvent } from '../../assets/lib/custom-events.js';
import { calculateValuePercents } from '../../assets/lib/calculate.js';

/**
 * Класс `StepSlider` описывает компонент интерфейса "Пошаговый слайдер"
 */
export default class StepSlider {
  /**
   * @param {Object}  содержит кол-во шагов и позицию `StepSlider` по умолчанию.
   */
  constructor({ steps, value = 0 }) {
    this.segments = steps;
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.renderStepSlider();
    this.setSliderValue();
    this.setValuesToDisplaySlider();
    this.addHandlersForDragDropSelection();
    this.addHandlerForClickSelection();
  }

  /**
   * Метод генерирует вёрбстку HTML-элемента, который содержит сегменты слайдера
   * и активирует сегмент с позицией, соответствующей значению 'this.value'.
   * @returns {HTMLElement}
   */
  renderSliderSegmentsWithDefaultActivation() {
    let sliderSteps = document.createElement('div');
    sliderSteps.classList.add('slider__steps');

    for (let i = 0; i < this.segments; i += 1) {
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
    this.elem.append(this.renderSliderSegmentsWithDefaultActivation());
  }

  setValuesToDisplaySlider() {
    let valuePercents = calculateValuePercents(this.value, this.segments - 1);
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
    console.log(currentSliderPosition);
  }

  deactivatePreviosSegment = () => {
    let previosSliderPosition = this.elem.querySelector('.slider__step-active');
    previosSliderPosition.classList.remove('slider__step-active');
  }

  calculateValuesForNewSliderPosition = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;

    let approximateValue = leftRelative * (this.segments - 1);
    this.value = Math.round(approximateValue);
    
    return leftPercents;
  }

  pointermoveHandler = (event) => {
    event.preventDefault();
    
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let leftPercents = this.calculateValuesForNewSliderPosition(event);

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    document.querySelector('.slider').classList.add('slider_dragging');
    this.setSliderValue();
  }

  pointerupHendler = () => {
    this.elem.querySelector('.slider__thumb').classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.pointermoveHandler);
    document.onpointerup = null;
    this.deactivatePreviosSegment();
    this.activateCurrentSegment();
    this.setValuesToDisplaySlider();
    generateSliderChangeEvent(this.elem, this.value);
  }

  addHandlersForDragDropSelection() {
    let thumb = this.elem.querySelector('.slider__thumb');

    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      thumb.style.position = 'absolute';
      thumb.style.zIndex = 1000;
      
      document.addEventListener('pointermove', this.pointermoveHandler);
      document.addEventListener('pointerup', this.pointerupHendler);
    })
  }

  addHandlerForClickSelection() {
    this.elem.addEventListener('click', (event) => {
      this.calculateValuesForNewSliderPosition(event);
      this.setValuesToDisplaySlider();
      this.deactivatePreviosSegment();
      this.activateCurrentSegment();
      this.setSliderValue();
      this.elem.onchange = generateSliderChangeEvent(this.elem, this.value);
    })
  }

}
