import React, { FC, useContext } from 'react';
import { Button, Col, Row, Input } from 'reactstrap';
import { Context } from '../../../../../../../../../../lib/state/Store';
import { H4 } from '../../../../../../styles/cart.style';
import Delivery from './components/Delivery';
import Payment from './components/Payment';

const CartSummary: FC = () => {
  const {
    state: { cartTotalSum },
  } = useContext(Context);

  return (
    <Col md={6}>
      <H4 className="mb-5">3. Súhrn košíka</H4>
      <Row form>
        <Col md={6} className="border-top border-bottom pt-3 pb-1 mb-3">
          <p>Spolu:</p>
        </Col>
        <Col md={6} className="border-top border-bottom pt-3 pb-1 mb-3">
          <p className="text-right">
            {cartTotalSum.toFixed(2)}
            ,-€
          </p>
        </Col>
      </Row>
      <Delivery />
      <Payment />
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
          <p className="text-right">{cartTotalSum.toFixed(2)},-€</p>
        </Col>
        <p className="text-left mt-1">* Nie sme platcami DPH</p>
      </Row>
    </Col>
  );
};

export default CartSummary;
