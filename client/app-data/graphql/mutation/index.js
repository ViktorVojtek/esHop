import gql from 'graphql-tag';

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($title: String!) {
    createCategory(title: $title) {
      _id
      signFlag
      title
    }
  }
`;

export const CREATE_SUBCATEGORY_MUTATION = gql`
  mutation createSubCategory($title: String!) {
    createSubCategory(title: $title) {
      _id
      signFlag
      title
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($productInput: ProductInput!) {
    createProduct(productInput: $productInput) {
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

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($_id: String!, $productInput: ProductInput!) {
    updateProduct(_id: $_id, productInput: $productInput) {
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
