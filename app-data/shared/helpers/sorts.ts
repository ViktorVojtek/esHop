import Product from '../types/Product.types';

export function sortByPriceMin(
  products: Product[],
  setFilteredProducts: React.Dispatch<any>
) {
  products.sort(function (a, b) {
    return a.variants[0].price.value - b.variants[0].price.value;
  });
  setFilteredProducts(products);
}
export function sortByPriceMax(
  products: Product[],
  setFilteredProducts: React.Dispatch<any>
) {
  products.sort(function (a, b) {
    return a.variants[0].price.value - b.variants[0].price.value;
  });
  setFilteredProducts(products.reverse());
}
export function sortByLetterUp(
  products: Product[],
  setFilteredProducts: React.Dispatch<any>
) {
  products.sort(function (a, b) {
    let nameA = a.variants[0].title.toUpperCase();
    let nameB = b.variants[0].title.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  setFilteredProducts(products);
}
export function sortByLetterDown(
  products: Product[],
  setFilteredProducts: React.Dispatch<any>
) {
  products.sort(function (a, b) {
    let nameA = a.variants[0].title.toUpperCase();
    let nameB = b.variants[0].title.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  setFilteredProducts(products.reverse());
}
