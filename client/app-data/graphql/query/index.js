import gql from 'graphql-tag';

const CURRENCIES_QUERY = gql`
  query {
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

export default CURRENCIES_QUERY;
