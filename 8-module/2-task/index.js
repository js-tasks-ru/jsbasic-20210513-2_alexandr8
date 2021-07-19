import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

/**
 * Класс `ProductGrid` описывает компонент интерфейса "Список товаров".
 */
export default class ProductGrid {
  /**
   * @param {Array} products - массив объектов товаров.
   */
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  /**
   * Метод генерирует вёрстку HTML-элемента productGrid.
   */
  render() {
    this.elem = createElement('<div class="products-grid"></div>');
    this.elem.append(this.renderProductCards(this.products));
  }

  /**
   * Метод создаёт содержимое корневого HTML-элемента с HTML-элементами
   * ProducnCard, сгенерированными из объектов, описывающих товары.
   * @param {Array} products массив объектов товаров.
   * @returns {HTMLElement}
   */
  renderProductCards(products) {
    let grid = createElement('<div class="products-grid__inner"></div>');

    products.forEach(product => {
      grid.append(new ProductCard(product).elem);
    });

    return grid;
  }

  /**
   * Метод обновляет отображение товаров на странице, соответственно
   * фильтрам, установленным пользователем.
   * @param {Object} filters 
   */
  updateFilter(filters) {
    this.addFilters(filters);
    this.clearGrid();
    this.elem.append(this.renderProductCards(this.filterProducts()));
  }

  /**
   * Метод очищает содерэимое корневого HTML-элемента.
   */
  clearGrid() {
    this.elem.innerHTML = '';
  }

  /**
   * Метод устанавливает фиоьтры для отображения товаров на странице,
   * в соответствии с выбором пользователя.
   * @param {Object} filters 
   */
  addFilters(filters) {
    let
      {
        noNuts: nuts = this.filters.nuts,
        vegeterianOnly: vegeterian = this.filters.vegeterian,
        maxSpiciness: spiciness = this.filters.spiciness >= 0 ? this.filters.spiciness : 4,
        category = this.filters.category
      } = filters;

    Object.assign(this.filters,
      {
        nuts,
        vegeterian,
        spiciness,
        category,
      })
  }

  /**
   * Метод реализует фильтрацию товаров в соответствии со всеми
   * критериями которые выбрал пользователь на странице.
   * @returns {Array} массив объектов товаров.
   */
  filterProducts() {
    let filteredProducts = [];
    let flag = true;

    for (let product of this.products) {

      for (let key in this.filters) {
        if (key === 'nuts' && this.filters[key]) {
          flag = flag && !(key in product);
          continue;
        }
        if (key === 'spiciness') {
          flag = flag && product[key] <= this.filters[key];
          continue;
        }
        else if (this.filters[key]) {
          flag = flag && this.filters[key] === product[key];
        }
      }

      if (flag) {
        filteredProducts.push(product);
      }
      flag = true;
    }

    return filteredProducts;
  }

}
