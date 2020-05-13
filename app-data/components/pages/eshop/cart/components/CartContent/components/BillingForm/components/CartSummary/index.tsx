import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Col, Row, FormGroup, Input, Label } from 'reactstrap';

import { Context } from '../../../../../../../../../../lib/state/Store';
import { DELIVERY_METHODS_QUERY } from '../../../../../../../../../../graphql/query';

const CartSummary: FC = () => {
  const {
    state: { cart, cartTotalSum },
    dispatch,
  } = useContext(Context);
  const { error, loading, data } = useQuery(DELIVERY_METHODS_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return null;
  }

  const handleChangeDelivery: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    const currentValue: number = parseFloat(
      event.currentTarget.getAttribute('data-value')
    );
    const deliveryEls: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      '.delivery-data-input'
    );

    deliveryEls.forEach((item: HTMLInputElement) => {
      item.checked = false;
    });

    event.currentTarget.checked = true;

    let sum: number = 0;

    cart.forEach((item: any) => {
      sum += item.variant.count * item.variant.price.value;
    });

    dispatch({
      type: 'SET_TOTAL_SUM',
      payload: currentValue === 0 ? sum : cartTotalSum + currentValue,
    });
  };

  const { deliveryMethods } = data;

  const deliveryMethodsEl: JSX.Element[] =
    deliveryMethods && deliveryMethods.length > 0 ? (
      deliveryMethods.map(
        (
          {
            _id,
            title,
            value,
          }: {
            _id: string;
            title: string;
            value: number;
          },
          i: number
        ) => {
          return (
            <Row form key={_id}>
              <Col md={6}>
                <FormGroup>
                  <FormGroup check>
                    <Label htmlFor={title.toLowerCase()}>
                      <Input
                        type="radio"
                        name={title.toLowerCase()}
                        id={title.toLowerCase()}
                        className="delivery-data-input"
                        onChange={handleChangeDelivery}
                        data-value={value}
                      />{' '}
                      {title}
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <p className="text-right">{value}</p>
              </Col>
            </Row>
          );
        }
      )
    ) : (
      <Row form>
        <Col>
          <p>No delivery methodes configured in the shop.</p>
        </Col>
      </Row>
    );

  return (
    <Col md={6}>
      <h4 className="mb-5">3. Súhrn košíka</h4>
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
      <h5 className="mb-4">Zvoľte spôsob doručenia</h5>
      {deliveryMethodsEl}
      <h5 className="mb-4">Zvoľte spôsob platby</h5>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <FormGroup check>
              <Label htmlFor="card">
                <Input type="radio" name="card" id="card" /> Platba kartou
              </Label>
            </FormGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <p className="text-right">Zadarmo</p>
        </Col>
      </Row>{' '}
      <Row form>
        <Col md={6}>
          <FormGroup>
            <FormGroup check>
              <Label htmlFor="cod">
                <Input type="radio" name="cod" id="cod" /> Dobierka
              </Label>
            </FormGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <p className="text-right">1,-€</p>
        </Col>
      </Row>{' '}
      <Row form>
        <Col md={6}>
          <FormGroup>
            <FormGroup check>
              <Label htmlFor="pcc">
                <Input type="radio" name="pcc" id="pcc" /> Osobný odber
              </Label>
            </FormGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <p className="text-right">Zadarmo</p>
        </Col>
      </Row>{' '}
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
      </Row>
    </Col>
  );
};

export default CartSummary;
