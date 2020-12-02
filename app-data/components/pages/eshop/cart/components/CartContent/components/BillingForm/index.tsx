import React, { FC, useEffect, useState } from 'react';
import { Form, FormGroup, Row } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { useStore } from '../../../../../../../../lib/state/Store';
import { CREATE_ORDER_MUTATION } from '../../../../../../../../graphql/mutation';
import BillingInfo from './components/BillingInfo';
import CartSummary from './components/CartSummary';
import { ButtonAddrRemove } from '../../../../styles/cart.style';
import Loading from '../../../../../../../../shared/components/Loading';
import Router from 'next/router';
import PayCardForm from './components/PayCardForm';
interface IData {
  userId?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companyVatNum: string;
  companyDVATNum: string;
  companyDTAXNum: string;
  address: string;
  postalCode: string;
  city: string;
  optionalState: string;
  state: string;
  optionalAddress: string;
  optionalPostalCode: string;
  optionalCity: string;
  phone: string;
  email: string;
  message: string;
  deliveryMethode: string;
  deliveryPrice: number;
  paymentMethode: string;
  paymentPrice: number;
  totalPrice: number;
  products: string[];
  loyalityProduct: object;
}
const initialOrderData: IData = {
  userId: '',
  firstName: '',
  lastName: '',
  companyName: '',
  companyVatNum: '',
  companyDVATNum: '',
  companyDTAXNum: '',
  address: '',
  postalCode: '',
  city: '',
  state: '',
  optionalAddress: '',
  optionalPostalCode: '',
  optionalCity: '',
  optionalState: '',
  phone: '',
  email: '',
  message: '',
  deliveryMethode: '',
  deliveryPrice: 0,
  paymentMethode: '',
  paymentPrice: 0,
  totalPrice: 0,
  products: [],
  loyalityProduct: null,
};

const BillingForm: FC = () => {
  const { state } = useStore();
  const [orderData, setOrderData] = useState(initialOrderData);
  const [loader, setLoader] = useState(false);
  const [cardPay, setCardPay] = useState(null);
  const [mutate] = useMutation(CREATE_ORDER_MUTATION);

  const { cart, customer, giftCards, loyalityProduct } = state;

  useEffect(() => {
    const products = cart.concat(giftCards as any);

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
            productCode: item.variant.productCode,
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
      loyalityProduct,
    });
  }, [cart, giftCards, loyalityProduct]);

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    setLoader(true);

    try {
      // console.log(orderData);
      const paymentMTD = orderData.paymentMethode;

      if (
        paymentMTD.toLowerCase().indexOf('card') > -1 ||
        paymentMTD.toLowerCase().indexOf('kart') > -1
      ) {
        const order = await mutate({
          variables: {
            data: orderData,
          },
        });
        const orderId = order.data.createOrder;
        window.localStorage.setItem('orderId', orderId);
        const orderDataToSend = {
          ...orderData,
          orderId,
        };
        const url = '/payment';
        const paymentResponse = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(orderDataToSend), // body data type must match "Content-Type" header
        });
        const respJson = await paymentResponse.json();
        setCardPay(respJson);
      } else {
        console.log(loyalityProduct);
        await mutate({
          variables: {
            data: orderData,
          },
        });
        Router.push('/eshop/cart/uspesna-objednavka');
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
      Router.push('/eshop/cart/neuspesna-objednavka');
    }
  };

  const handleOrderData = (data: IData) => {
    setOrderData(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmitForm}>
        <Row>
          <BillingInfo data={orderData} handleData={handleOrderData} />
          <CartSummary data={orderData} handleData={handleOrderData} />
        </Row>
        <FormGroup>
          <ButtonAddrRemove type="submit">Odoslať</ButtonAddrRemove>
        </FormGroup>
      </Form>

      {cardPay && <PayCardForm orderData={cardPay} />}
      {loader && <Loading />}
    </>
  );
};

export default BillingForm;
