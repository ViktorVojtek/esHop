import { gql } from 'apollo-server-express';

const DeliveryMethode = gql`
  input DeliveryInput {
    isEnvelopeSize: Boolean
    title: String
    value: Float
  }

  type Delivery {
    _id: String
    isEnvelopeSize: Boolean
    title: String
    value: Float
  }
`;

export default DeliveryMethode;
