import { gql } from 'apollo-server-express';

const PaymentMethode = gql`
  input PaymentInput {
    title: String
    value: Int
  }

  type Payment {
    _id: String
    title: String
    value: Int
  }
`;

export default PaymentMethode;
