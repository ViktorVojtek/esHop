import Product from '../types/Product.types';

export function sortByPriceMin(
  products: any,
  setFilteredProducts: React.Dispatch<any>
) {
  let sortProducts = [...products];
  sortProducts.sort(function (a, b) {
    return getPrice(a) - getPrice(b);
  });
  setFilteredProducts(sortProducts);
}
export function sortByPriceMax(
  products: any,
  setFilteredProducts: React.Dispatch<any>
) {
  let sortProducts = [...products];
  sortProducts.sort(function (a, b) {
    return getPrice(a) - getPrice(b);
  });
  setFilteredProducts(sortProducts.reverse());
}
export function sortByLetterUp(
  products: Product[],
  setFilteredProducts: React.Dispatch<any>
) {
  let sortProducts = [...products];
  sortProducts.sort(function (a, b) {
    let nameA = getName(a);
    let nameB = getName(b);
    return nameA.localeCompare(nameB);
  });
  setFilteredProducts(sortProducts);
}
export function sortByLetterDown(
  products: Product[],
  setFilteredProducts: React.Dispatch<any>
) {
  let sortProducts = [...products];
  sortProducts.sort(function (a, b) {
    let nameA = getName(a);
    let nameB = getName(b);
    return nameA.localeCompare(nameB);
  });
  setFilteredProducts(sortProducts.reverse());
}

export function sortActionProducts(
  products: any[],
  setFilteredProducts: React.Dispatch<any>
) {
  let actionProducts = [];
  let otherProducts = [];
  actionProducts = products.filter((product) => {
    if (product.variants) {
      if (product.variants[0].discount > 0) {
        return product;
      }
    } else if (product.discount > 0) {
      return product;
    }
  });
  otherProducts = products.filter((product) => {
    if (product.variants) {
      if (product.variants[0].discount === 0) {
        return product;
      }
    } else if (product.discount === 0) {
      return product;
    }
  });
  const allProducts = [...actionProducts, ...otherProducts];
  setFilteredProducts(allProducts);
}

function getPrice(product: any) {
  let price = 0;
  if (product.variants !== undefined) {
    if (product.variants[0].discount > 0) {
      price =
        product.variants[0].price.value -
        (product.variants[0].price.value * product.variants[0].discount) / 100;
    } else price = product.variants[0].price.value;
  } else {
    if (product.discount > 0) {
      price =
        product.price.value - (product.price.value * product.discount) / 100;
    } else price = product.price.value;
  }
  return price;
}

function getName(product: any) {
  let name = '';
  if (product.variants !== undefined) {
    name = product.title.toUpperCase();
  } else name = product.title;
  return name;
}
