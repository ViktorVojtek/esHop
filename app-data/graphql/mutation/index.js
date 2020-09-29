import gql from 'graphql-tag';

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($data: OrderInput!) {
    createOrder(data: $data)
  }
`;

export const UPDATE_ORDER_MUTATION = gql`
  mutation updateOrder($_id: String!, $status: Int) {
    updateOrder(_id: $_id, status: $status) {
      userId
      address
      city
      deliveryMethode
      email
      firstName
      lastName
      message
      paymentMethode
      phone
      postalCode
      state
      totalPrice
      products
      status
    }
  }
`;

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($title: String!) {
    createCategory(title: $title) {
      _id
      signFlag
      title
    }
  }
`;

export const CREATE_DELIVERY_METHODE = gql`
  mutation createDeliveryMethode(
    $isEnvelopeSize: Boolean
    $title: String!
    $value: String!
  ) {
    createDeliveryMethode(
      isEnvelopeSize: $isEnvelopeSize
      title: $title
      value: $value
    ) {
      _id
      isEnvelopeSize
      title
      value
    }
  }
`;

export const CREATE_DISCOUNT_MUTATION = gql`
  mutation createDiscount($code: String!, $value: Int!) {
    createDiscount(code: $code, value: $value) {
      _id
      code
      value
    }
  }
`;

export const CREATE_SUBCATEGORY_MUTATION = gql`
  mutation createSubCategory($categoryId: String!, $title: String!) {
    createSubCategory(categoryId: $categoryId, title: $title) {
      _id
      categoryId
      signFlag
      title
    }
  }
`;

export const CREATE_PAYMENT_MUTATION = gql`
  mutation createPaymentMethode($title: String!, $value: Int!) {
    createPaymentMethode(title: $title, value: $value) {
      _id
      title
      value
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($productInput: ProductInput!) {
    createProduct(productInput: $productInput) {
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

export const CREATE_SERVICE_MUTATION = gql`
  mutation createService($serviceInput: ServiceInput!) {
    createService(serviceInput: $serviceInput) {
      title
      img {
        path
        ext
        imgId
        size
        title
      }
      category {
        id
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
      html
    }
  }
`;

export const REMOVE_SERVICE_MUTATION = gql`
  mutation removeService($_id: String!) {
    removeService(_id: $_id)
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($_id: String!, $productInput: ProductInput!) {
    updateProduct(_id: $_id, productInput: $productInput) {
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

export const REMOVE_PRODUCT_MUTATION = gql`
  mutation removeProduct($_id: String!) {
    removeProduct(_id: $_id)
  }
`;

export const REMOVE_DELIVERY_METHODE_MUTATION = gql`
  mutation removeDeliveryMethode($id: String!) {
    removeDeliveryMethode(id: $id)
  }
`;

export const REMOVE_DISCOUNT_MUTATION = gql`
  mutation removeDiscount($id: String!) {
    removeDiscount(id: $id)
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($userLoginInput: UserLoginInput!) {
    loginUser(userLoginInput: $userLoginInput) {
      _id
      email
      firstName
      lastName
      token
      tokenExpiresIn
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation registerUser($userRegInput: UserRegInput!) {
    registerUser(userRegInput: $userRegInput) {
      _id
      admin
      email
      firstName
      lastName
      role
    }
  }
`;

export const REGISTER_CUSTOMER_MUTATION = gql`
  mutation createCustomer($customerData: CustomerRegInput!) {
    createCustomer(customerData: $customerData) {
      _id
      customerPoints
      email
      tel
      firstName
      lastName
      role
    }
  }
`;

export const LOGIN_CUSTOMER_MUTATION = gql`
  mutation logInCustomer($customerData: CustomerLoginInput!) {
    logInCustomer(customerData: $customerData) {
      _id
      customerPoints
      email
      firstName
      lastName
      token
      tokenExpiresIn
    }
  }
`;

export const UPDATE_CUSTOMER_MUTATION = gql`
  mutation updateCustomer($id: String!, $customerData: CustomerRegInput!) {
    updateCustomer(id: $id, customerData: $customerData) {
      _id
      customerPoints
      email
      tel
      firstName
      lastName
      role
    }
  }
`;

export const REMOVE_CUSTOMER_MUTATION = gql`
  mutation removeCustomer($id: String!) {
    removeCustomer(id: $id)
  }
`;

export const SET_CURRENCY_MUTATION = gql`
  mutation setCurrency($currencyInput: CurrencyInput!) {
    setCurrency(currencyInput: $currencyInput) {
      _id
      defaultCurrency
      flag
      sign
      valueSetDate
      value
      title
    }
  }
`;

export const REMOVE_CATEGORY_MUTATION = gql`
  mutation removeCategory($_id: String!) {
    removeCategory(_id: $_id)
  }
`;

export const REMOVE_CURRENCY_MUTATION = gql`
  mutation removeCurrency($_id: String!) {
    removeCurrency(_id: $_id)
  }
`;

export const REMOVE_SUBCATEGORY_MUTATION = gql`
  mutation removeSubCategory($_id: String!) {
    removeSubCategory(_id: $_id)
  }
`;
