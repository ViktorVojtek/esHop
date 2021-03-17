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

export const FREEDELIVERY_QUERY = gql`
  query freeDeliveries {
    freeDeliveries {
      _id
      value
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

export const PRODUCT_BY_SLUG_QUERY = gql`
  query productBySlug($slug: String!) {
    productBySlug(slug: $slug) {
      product {
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
        slug
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
          productCode
          bonus
        }
      }
      subCategory {
        _id
        categoryId
        signFlag
        title
        image {
          path
          size
          title
        }
        forSale
        forReservation
        forGiftCard
        forGiftBasket
        covidWarranty
      }
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
      slug
      variants {
        default
        description
        discount
        inStock
        images {
          path
          size
          title
          ext
        }
        price {
          currency
          value
        }
        title
        productCode
        bonus
      }
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query products($categoryId: String, $subCategoryId: String) {
    products(categoryId: $categoryId, subCategoryId: $subCategoryId) {
      products {
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
        slug
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
          productCode
          bonus
        }
      }
      subCategories {
        _id
        categoryId
        signFlag
        title
        image {
          path
          size
          title
        }
        forSale
        forReservation
        forGiftCard
        forGiftBasket
        covidWarranty
      }
    }
  }
`;

export const PRODUCTS_BY_IDS_QUERY = gql`
  query productsByIds($ids: [String]) {
    productsByIds(ids: $ids) {
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
      slug
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
        productCode
      }
    }
  }
`;

export const LOYALITY_PRODUCTS_QUERY = gql`
  query loyalityProducts {
    loyalityProducts {
      _id
      dateCreated
      title
      image
      isDiscount
      discount
      costPoints
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
      image {
        path
        size
        title
      }
      forSale
      forReservation
      forGiftCard
      forGiftBasket
      covidWarranty
    }
  }
`;

export const GIFTCARDS_QUERY = gql`
  query giftCards {
    giftCards {
      _id
      title
      image {
        path
        size
        title
      }
      textColor
      borderColor
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

export const CUSTOMERS_QUERY = gql`
  query customers {
    customers {
      _id
      email
      tel
      isVerified
      customerPoints
      firstName
      lastName
      marketing
    }
  }
`;

export const CUSTOMER_QUERY = gql`
  query customer($id: String!) {
    customer(id: $id) {
      _id
      email
      tel
      isVerified
      firstName
      lastName
      customerPoints
      marketing
      companyDTAXNum
      companyDVATNum
      companyName
      companyVatNum
      address
      city
      postalCode
      state
      optionalAddress
      optionalCity
      optionalPostalCode
      optionalState
    }
  }
`;

export const ORDER_QUERY = gql`
  query orders($email: String) {
    orders(email: $email) {
      _id
      status
      products
      userId
      address
      city
      companyDVATNum
      companyDTAXNum
      companyName
      companyVatNum
      deliveryMethode
      deliveryPrice
      email
      firstName
      lastName
      message
      optionalAddress
      optionalCity
      optionalState
      optionalPostalCode
      paymentMethode
      paymentStatus
      phone
      postalCode
      state
      totalPrice
      orderId
      created_at
      invoiceId
    }
  }
`;
