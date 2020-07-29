import React, { FC, useEffect, useState } from 'react';
import { Form, FormGroup, Row } from 'reactstrap';
import { useStore } from '../../../../../../../../lib/state/Store';
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
  products: any[];
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

  const { cart, giftCards } = state;

  const handleSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void = (
    event
  ) => {
    event.preventDefault();

    console.log(orderData);
  };
  const handleOrderData = (data: IData) => {
    setOrderData(data);
  };

  useEffect(() => {
    const products = cart.concat(giftCards as any);

    handleOrderData({
      ...orderData,
      products,
    });
  }, [cart, giftCards]);

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
