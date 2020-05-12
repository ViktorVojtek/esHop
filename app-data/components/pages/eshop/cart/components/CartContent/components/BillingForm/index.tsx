import React, { FC } from 'react';
import { Button, Form, FormGroup, Row } from 'reactstrap';

import BillingInfo from './components/BillingInfo';
import CartSummary from './components/CartSummary';

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
      <Button type="submit" color="primary" disabled>
        Odoslať
      </Button>
    </FormGroup>
  </Form>
);

export default BillingForm;
