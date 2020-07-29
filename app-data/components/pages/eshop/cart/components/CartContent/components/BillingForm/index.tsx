import React, { FC, useEffect, useState } from 'react';
import { Form, FormGroup, Row } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { useStore } from '../../../../../../../../lib/state/Store';
import { CREATE_ORDER_MUTATION } from '../../../../../../../../graphql/mutation';
import BillingInfo from './components/BillingInfo';
import CartSummary from './components/CartSummary';
import { ButtonAddrRemove } from '../../../../styles/cart.style';

interface IData {
  firstName: string;
  lastName: string;
  companyName: string;
  companyVatNum: string;
  companyDVATNum: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  optionalAddress: string;
  optionalPostalCode: string;
  optionalCity: string;
  phone: string;
  email: string;
  message: string;
  deliveryMethode: string;
  paymentMethode: string;
  totalPrice: number;
  products: string[];
}
const initialOrderData: IData = {
  firstName: '',
  lastName: '',
  companyName: '',
  companyVatNum: '',
  companyDVATNum: '',
  address: '',
  postalCode: '',
  city: '',
  state: '',
  optionalAddress: '',
  optionalPostalCode: '',
  optionalCity: '',
  phone: '',
  email: '',
  message: '',
  deliveryMethode: '',
  paymentMethode: '',
  totalPrice: 0,
  products: [],
};

const BillingForm: FC = () => {
  const { state } = useStore();
  const [orderData, setOrderData] = useState(initialOrderData);
  const [mutate] = useMutation(CREATE_ORDER_MUTATION);

  const { cart, giftCards } = state;

  useEffect(() => {
    const products = cart.concat(giftCards as any);
    const productsIDS = products.map(({ id }) => id as string);

    console.log(productsIDS);

    handleOrderData({
      ...orderData,
      products: productsIDS,
    });
  }, [cart, giftCards]);

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    try {
      console.log(orderData);
      await mutate({
        variables: {
          data: orderData,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleOrderData = (data: IData) => {
    setOrderData(data);
  };

  // console.log(orderData);

  return (
    <Form onSubmit={handleSubmitForm}>
      <Row>
        <BillingInfo data={orderData} handleData={handleOrderData} />
        <CartSummary data={orderData} handleData={handleOrderData} />
      </Row>
      <FormGroup>
        <ButtonAddrRemove type="submit">Odoslať</ButtonAddrRemove>
      </FormGroup>
    </Form>
  );
};

export default BillingForm;
