import React, { FC, useContext, useEffect } from 'react';
import { Button, Col, Row, Input } from 'reactstrap';
import { Context } from '../../../../../../../../../../lib/state/Store';
import { H4 } from '../../../../../../styles/cart.style';
import Delivery from './components/Delivery';
import Payment from './components/Payment';
import { formatPrice } from '../../../../../../../../../../shared/helpers/formatters';

interface IData {
  firstName: string;
  lastName: string;
  companyName: string;
  companyVatNum: string;
  companyDVATNum: string;
  companyDTAXNum: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  optionalAddress: string;
  optionalPostalCode: string;
  optionalCity: string;
  optionalState: string;
  phone: string;
  email: string;
  message: string;
  deliveryMethode: string;
  deliveryPrice: number;
  paymentMethode: string;
  paymentPrice: number;
  totalPrice: number;
  products: string[];
}
interface IProps {
  data?: IData;
  handleData?: (data: IData) => void;
}

const CartSummary: (props: IProps) => JSX.Element = (props) => {
  const {
    state: { cartTotalSum },
  } = useContext(Context);
  const { data, handleData } = props;

  useEffect(() => {
    handleData({
      ...data,
      totalPrice: cartTotalSum,
    });
  }, [cartTotalSum]);

  return (
    <>
      <Delivery data={data} handleData={handleData} />
      <Payment data={data} handleData={handleData} />
    </>
  );
};

export default CartSummary;
