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
  query products {
    products {
      category
      dateCreated
      dateModified
      description
      discount
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
      price {
        currency
        currencySign
        value
      }
      title
    }
  }
`;

export const SUBCATEGORIES_QUERY = gql`
  query subCategories {
    subCategories {
      _id
      signFlag
      title
    }
  }
`;
