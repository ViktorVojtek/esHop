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
    <Col md={6}>
      <H4 className="mb-5">3. Súhrn košíka</H4>
      <Row form>
        <Col md={6} className="border-top border-bottom pt-3 pb-1 mb-3">
          <p>Spolu:</p>
        </Col>
        <Col md={6} className="border-top border-bottom pt-3 pb-1 mb-3">
          <p className="text-right">{formatPrice(cartTotalSum)} €</p>
        </Col>
      </Row>
      <Delivery data={data} handleData={handleData} />
      <Payment data={data} handleData={handleData} />
      <Row form>
        <Col md={6} className="mt-3 mb-3">
          Použiť zľavový kód:
        </Col>
        <Col md={6} className="mt-3 mb-3">
          <Row>
            <Col>
              <Input type="text" name="discountCode" id="discountCode" />
            </Col>
            <Col>
              <Button
                type="button"
                onClick={() => console.log('Discount')}
                className="w-100"
              >
                Použiť
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row form>
        <Col md={6} className="border-top border-bottom pt-3">
          <p>Spolu s DPH:</p>
        </Col>
        <Col md={6} className="border-top border-bottom pt-3">
          <p className="text-right">{formatPrice(cartTotalSum)} €</p>
        </Col>
        <p className="text-left mt-2 mb-0 w-100">* Povinné pole</p>
      </Row>
    </Col>
  );
};

export default CartSummary;
