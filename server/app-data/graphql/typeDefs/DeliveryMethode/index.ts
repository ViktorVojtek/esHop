import { gql } from 'apollo-server-express';

const DeliveryMethode = gql`
  input DeliveryInput {
    title: String
    value: Float
  }

  type Delivery {
    _id: String
    title: String
    value: Float
  }
`;

export default DeliveryMethode;
