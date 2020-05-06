import gql from 'graphql-tag';

export const CATEGORIES_QUERY = gql`
  query categories {
    categories {
      _id
      signFlag
      title
    }
  }
`;

export const CURRENCIES_QUERY = gql`
  query currencies {
    currencies {
      _id
      defaultCurrency
      flag
      sign
      value
      title
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query product($id: String!) {
    product(id: $id) {
      _id
      category
      dateCreated
      dateModified
      description
      inStock
      modifiedByUserId
      shortDescription
      subCategory
      images {
        path
        size
        title
      }
      note
      title
      variant {
        default
        itemsInStock
        price {
          currency
          currencySign
          discount
          value
        }
        title
      }
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query products($categoryId: String, $subCategoryId: String) {
    products(categoryId: $categoryId, subCategoryId: $subCategoryId) {
      _id
      category
      dateCreated
      dateModified
      description
      inStock
      modifiedByUserId
      shortDescription
      subCategory
      images {
        path
        size
        title
      }
      note
      title
      variant {
        default
        itemsInStock
        price {
          currency
          currencySign
          discount
          value
        }
        title
      }
    }
  }
`;

export const SUBCATEGORIES_QUERY = gql`
  query subCategories($categoryId: String) {
    subCategories(categoryId: $categoryId) {
      _id
      categoryId
      signFlag
      title
    }
  }
`;