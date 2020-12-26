import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import { CREATE_ORDER_MUTATION } from '../../../../../../graphql/mutation';
import { useStore } from '../../../../../../lib/state/Store';
import Loading from '../../../../../../shared/components/Loading';
import { Button } from '../../../../../../shared/design';
import { scrollTop } from '../../../../../../shared/helpers';
import { IData } from '../../../../../../shared/types/Cart.types';

import { H2 } from '../../styles/cart.style';
import BillingInfo from './components/BillingForm/components/BillingInfo';
import PayCardForm from './components/BillingForm/components/PayCardForm';
import CartLogin from './components/CartLogin';
import CartProducts from './components/CartProducts';
import FreeDeliveryItem from './components/FreeDeliveryItem';
import SummaryPrice from './components/SummaryPrice';

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
  coupon: null,
};

const steps = {
  0: 'Súhrn košíka',
  1: 'Pokračovať v objednávke',
  2: 'Objednať',
};

const CartContent: FC = () => {
  const { state } = useStore();
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState({
    registerRequest: false,
    password: '',
    repeatPassword: '',
    subscribe: false,
    marketing: false,
  });
  const [loader, setLoader] = useState(false);
  const [cardPay, setCardPay] = useState(null);
  const [mutate] = useMutation(CREATE_ORDER_MUTATION);
  const [cartStep, setCartStep] = useState(0);
  const [orderData, setOrderData] = useState(initialOrderData);

  const {
    cart,
    customer,
    giftCards,
    loyalityProduct,
    coupon,
    freeDelivery,
  } = state;

  useEffect(() => {
    if (router.query.checkout !== undefined) {
      setCartStep(1);
    }
  }, []);

  const handleNextStep = () => {
    if (cartStep === 0) {
      router.push('/eshop/cart?checkout');
    }
    scrollTop();
    setCartStep((prevState) => prevState + 1);
  };
  const handlePrevStep = () => {
    scrollTop();
    setCartStep((prevState) => prevState - 1);
  };

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
      firstName:
        customer && customer.firstName
          ? customer.firstName
          : orderData.firstName,
      lastName:
        customer && customer.lastName ? customer.lastName : orderData.lastName,
      email: customer && customer.email ? customer.email : orderData.email,
      phone: customer && customer.tel ? customer.tel : orderData.phone,
      companyName:
        customer && customer.companyName
          ? customer.companyName
          : orderData.companyName,
      companyVatNum:
        customer && customer.companyVatNum
          ? customer.companyVatNum
          : orderData.companyVatNum,
      companyDTAXNum:
        customer && customer.companyDTAXNum
          ? customer.companyDTAXNum
          : orderData.companyDTAXNum,
      companyDVATNum:
        customer && customer.companyDVATNum
          ? customer.companyDVATNum
          : orderData.companyDVATNum,
      address:
        customer && customer.address ? customer.address : orderData.address,
      city: customer && customer.city ? customer.city : orderData.city,
      postalCode:
        customer && customer.postalCode
          ? customer.postalCode
          : orderData.postalCode,
      state: customer && customer.state ? customer.state : orderData.state,
      optionalAddress:
        customer && customer.optionalAddress
          ? customer.optionalAddress
          : orderData.optionalAddress,
      optionalCity:
        customer && customer.optionalCity
          ? customer.optionalCity
          : orderData.optionalCity,
      optionalPostalCode:
        customer && customer.optionalPostalCode
          ? customer.optionalPostalCode
          : orderData.optionalPostalCode,
      optionalState:
        customer && customer.optionalState
          ? customer.optionalState
          : orderData.optionalState,
      userId: customer && customer.userId ? customer.userId : '',
      products: productsToBuy,
      loyalityProduct,
      coupon: coupon ? coupon.value : null,
    });
  }, [cart, giftCards, loyalityProduct, customer, coupon]);

  const handleOrderData = (data: IData) => {
    setOrderData(data);
  };

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
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
        await mutate({
          variables: {
            data: orderData,
          },
        });
        router.push('/eshop/cart/uspesna-objednavka');
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
      router.push('/eshop/cart/neuspesna-objednavka');
    }
  };

  return (
    <Container>
      {cartStep === 0 && (
        <>
          <H2>Nákupný košík</H2>
          <CartProducts
            data={cart}
            giftCards={giftCards}
            loyalityProduct={loyalityProduct}
          />
          <SummaryPrice />
          <Button type="button" onClick={handleNextStep} className="ml-auto">
            {steps[cartStep + 1]}
          </Button>
        </>
      )}
      {cartStep === 1 && (
        <>
          <H2>Pokladňa</H2>
          <Row className="mb-2">
            {!customer.token && <CartLogin />}
            {freeDelivery && <FreeDeliveryItem value={freeDelivery} />}
          </Row>
          <BillingInfo
            handleSubmitForm={handleSubmitForm}
            handlePrevStep={handlePrevStep}
            data={orderData}
            handleData={handleOrderData}
            registerInfo={registerInfo}
            setRegisterInfo={setRegisterInfo}
            customer={customer}
          />
        </>
      )}
      {cardPay && <PayCardForm orderData={cardPay} />}
      {loader && <Loading />}
    </Container>
  );
};

export default CartContent;
