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

export const DELIVERY_METHODE_QUERY = gql`
  query deliveryMethode($id: String!) {
    deliveryMethode(id: $id) {
      _id
      title
      value
    }
  }
`;

export const DELIVERY_METHODS_QUERY = gql`
  query deliveryMethods {
    deliveryMethods {
      _id
      isEnvelopeSize
      title
      value
    }
  }
`;

export const DISCOUNT_QUERY = gql`
  query discount($id: String!) {
    discount(id: $id) {
      _id
      code
      value
    }
  }
`;

export const DISCOUNTS_QUERY = gql`
  query discounts {
    discounts {
      _id
      code
      value
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query product($id: String!) {
    product(id: $id) {
      _id
      category {
        id
        title
      }
      dateCreated
      dateModified
      modifiedByUserId
      isEnvelopeSize
      subCategory {
        id
        title
      }
      title
      variants {
        default
        description
        discount
        inStock
        images {
          path
          size
          title
        }
        price {
          currency
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
      category {
        id
        title
      }
      dateCreated
      dateModified
      modifiedByUserId
      isEnvelopeSize
      subCategory {
        id
        title
      }
      title
      variants {
        default
        description
        discount
        inStock
        images {
          path
          size
          title
        }
        price {
          currency
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

export const PAYMENT_METHODE_QUERY = gql`
  query paymentMethode($id: String!) {
    paymentMethode(id: $id) {
      _id
      title
      value
    }
  }
`;

export const PAYMENT_METHODES_QUERY = gql`
  query paymentMethodes {
    paymentMethodes {
      _id
      title
      value
    }
  }
`;

export const SERVICE_QUERY = gql`
  query service($id: String!) {
    service(id: $id) {
      _id
      category {
        id
        title
      }
      html
      img {
        path
        ext
        imgId
        size
        title
      }
      price {
        currency
        value
      }
      subCategory {
        id
        title
      }
      video
      title
    }
  }
`;

export const SERVICES_QUERY = gql`
  query services {
    services {
      _id
      category {
        id
        title
      }
      html
      img {
        path
        ext
        imgId
        size
        title
      }
      price {
        currency
        value
      }
      subCategory {
        id
        title
      }
      video
      title
    }
  }
`;
export const CUSTOMERS_QUERY = gql`
  query customers {
    customers {
      _id
      email
      tel
      customerPoints
      firstName
      lastName
    }
  }
`;
export const CUSTOMER_QUERY = gql`
  query customer($id: String!) {
    customer(id: $id) {
      _id
      email
      firstName
      lastName
    }
  }
`;
