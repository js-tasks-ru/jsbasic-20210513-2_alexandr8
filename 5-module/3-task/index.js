function initCarousel() {
  // ваш код...
  let carousel = document.querySelector('.carousel__inner');
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let slide = document.querySelector('.carousel__slide');

  let slideWidth = slide.offsetWidth;
  let shift = slideWidth;
  let currentPosition = 0;

  function move(step=1) {
    carousel.style.transform = `translateX(-${shift}px)`;
    currentPosition += step;
    shift += slideWidth;
  }
  
  function hide(element) {
    element.style.display = 'none';
  }
  
  function moveRight() {
    currentPosition === 1 && hide(carouselArrowLeft);

    if (currentPosition >= 1) {
      carouselArrowRight.style.display = '';
      shift -= slideWidth * 2;
      move(-1);
    }
  }
  
  function moveLeft() {
    currentPosition === carousel.childElementCount - 2 && hide(carouselArrowRight);
    
    if (currentPosition < carousel.childElementCount) {
      carouselArrowLeft.style.display = '';
      move();
    }    
  }
  
  carousel.firstElementChild && hide(carouselArrowLeft);
  carouselArrowLeft.addEventListener('click', moveRight);
  carouselArrowRight.addEventListener('click', moveLeft);
}
