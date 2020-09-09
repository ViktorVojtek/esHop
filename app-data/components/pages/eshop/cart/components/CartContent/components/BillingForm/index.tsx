import React, { FC, useEffect, useState } from 'react';
import { Form, FormGroup, Row } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { useStore } from '../../../../../../../../lib/state/Store';
import { CREATE_ORDER_MUTATION } from '../../../../../../../../graphql/mutation';
import BillingInfo from './components/BillingInfo';
import CartSummary from './components/CartSummary';
import { ButtonAddrRemove } from '../../../../styles/cart.style';

interface IData {
  userId?: string;
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
  userId: '',
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

  // console.log(state);

  const { cart, customer, giftCards } = state;

  useEffect(() => {
    const products = cart.concat(giftCards as any);
    // const productsIDS = products.map(({ id }) => id as string);

    const productsToBuy = products.map((item: any) => {
      let result: any;

      if (item.variant) {
        result = {
          ...item,
          variant: {
            count: item.variant.count,
            description: item.variant.description,
            discount: item.variant.discount,
            price: item.variant.price,
            title: item.variant.title,
          },
        };
      } else {
        result = item;
      }

      return result;
    });

    handleOrderData({
      ...orderData,
      userId: customer && customer.userId ? customer.userId : '',
      products: productsToBuy,
    });
  }, [cart, giftCards]);

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    try {
      // console.log(orderData);
      const paymentMTD = orderData.paymentMethode;

      if (paymentMTD.toLowerCase().indexOf('card') > -1 || paymentMTD.toLowerCase().indexOf('kart') > -1) {
        console.log('Pay by CARD');
        const url = '/payment';

        const paymentResponse = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(orderData) // body data type must match "Content-Type" header
        });

        console.log(paymentResponse);
      } else {
        console.log('Create order');

        await mutate({
          variables: {
            data: orderData,
          },
        }); 
      }

      console.log('Order sucessfully placed');
      // vytvorit PDF
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
