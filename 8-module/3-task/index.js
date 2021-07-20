export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    if (product) {

      if (this.cartItems.length) {
        for (let item of this.cartItems) {
          if (item.product.name === product.name) {
            item.count += 1;
            return;
          }
        }
      }

      this.cartItems.push(
        {
          product: Object.assign({}, product),
          count: 1,
        });
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    // ваш код
    for (let item of this.cartItems) {
      if (item.product.id === productId) {
        item.count += amount;

        if (item.count === 0) {
          this.cartItems.splice(item, 1);
        }

        return;
      }
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    // ваш код
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // ваш код
    return this.cartItems
      .reduce((acc, currentItem) => acc + currentItem.count, 0);
  }
  
  getTotalPrice() {
    // ваш код
    return this.cartItems
      .reduce((acc, currentItem) =>
        acc + currentItem.product.price * currentItem.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

