import gql from 'graphql-tag';

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