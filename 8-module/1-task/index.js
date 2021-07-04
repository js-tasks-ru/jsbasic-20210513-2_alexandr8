import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  isHidden = (elem) => !elem.offsetWidth && !elem.offsetHeight;

  updatePosition() {
    // ваш код ...
    if (!this.isHidden(this.elem)) {
      let cartIcon = document.querySelector('.cart-icon');
      let isCartAtTheTopBorder = cartIcon.getBoundingClientRect().top < 0;
      let leftIndent = `${Math.min(
        document.querySelector('.container').getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      )}px`;
  
      if (document.body.getBoundingClientRect().top === 0) {
        cartIcon.style = '';
      }
  
      if (isCartAtTheTopBorder) {
        cartIcon.style.position = 'fixed';
        cartIcon.style.top = '50px';
        cartIcon.style.left = leftIndent;
        cartIcon.style.zIndex = '1000';
      }
    }
  }

}
