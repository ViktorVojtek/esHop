import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Col, Row, FormGroup, Input, Label } from 'reactstrap';

import { DELIVERY_METHODS_QUERY } from '../../../../../../../../../../graphql/query';

const CartSummary: FC = () => {
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
    const deliveryEls: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      '.delivery-data-input'
    );

    deliveryEls.forEach((item: HTMLInputElement) => {
      item.checked = false;
    });

    event.currentTarget.checked = true;
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
                        defaultChecked={i === 0}
                        onChange={handleChangeDelivery}
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
      <h4 className="mb-5">3. Cart Summary</h4>
      <Row form>
        <Col md={6} className="border-top border-bottom pt-3 pb-1 mb-3">
          <p>Total:</p>
        </Col>
        <Col md={6} className="border-top border-bottom pt-3 pb-1 mb-3">
          <p className="text-right">0.00,-€</p>
        </Col>
      </Row>
      <h5 className="mb-4">Choose delivery method</h5>
      {deliveryMethodsEl}
      <h5 className="mb-4">Choose payment method</h5>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <FormGroup check>
              <Label htmlFor="card">
                <Input type="radio" name="card" id="card" /> Card payment
              </Label>
            </FormGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <p className="text-right">FREE</p>
        </Col>
      </Row>{' '}
      <Row form>
        <Col md={6}>
          <FormGroup>
            <FormGroup check>
              <Label htmlFor="cod">
                <Input type="radio" name="cod" id="cod" /> Cash on delivery
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
                <Input type="radio" name="pcc" id="pcc" /> Personal collection
                in cash
              </Label>
            </FormGroup>
          </FormGroup>
        </Col>
        <Col md={6}>
          <p className="text-right">FREE</p>
        </Col>
      </Row>{' '}
      <Row form>
        <Col md={6} className="mt-3 mb-3">
          Use discount code:
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
                Use
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row form>
        <Col md={6} className="border-top border-bottom pt-3">
          <p>Total price with VAT:</p>
        </Col>
        <Col md={6} className="border-top border-bottom pt-3">
          <p className="text-right">12.5,-€</p>
        </Col>
      </Row>
    </Col>
  );
};

export default CartSummary;
