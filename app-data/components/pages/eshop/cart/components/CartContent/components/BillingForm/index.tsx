import React, { FC } from 'react';
import { Button, Form, FormGroup, Row } from 'reactstrap';

import BillingInfo from './components/BillingInfo';
import CartSummary from './components/CartSummary';
import { ButtonAddrRemove } from '../../../../styles/cart.style';

const BillingForm: FC = () => (
  <Form
    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }}
  >
    <Row>
      <BillingInfo />
      <CartSummary />
    </Row>
    <FormGroup>
      <ButtonAddrRemove type="submit" disabled>
        Odoslať
      </ButtonAddrRemove>
    </FormGroup>
  </Form>
);

export default BillingForm;
