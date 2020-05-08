import { gql } from 'apollo-server-express';

const Delivery = gql`
  input DeliveryInput {
    title: String
    value: Int
  }

  type Delivery {
    _id: String
    title: String
    value: Int
  }
`;

export default Delivery;
