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
