import React, { FC } from 'react';
import { Container, Table } from 'reactstrap';

import H2 from '../../styles/cart.style';
import CartProductTableRow from './components/CartProductTable';
import BillingForm from './components/BillingForm';

interface ICartContent {
  data: any[];
}
const CartContent: FC<ICartContent> = ({ data }) => (
  <Container>
    <H2>Shopping cart</H2>
    <h4 className="mb-5">1. Products in cart</h4>
    <Table className="mb-5" hover>
      <thead>
        <tr>
          <th>Product title</th>
          <th>Variant</th>
          <th>Item price</th>
          <th>Quantity</th>
          <th>Total price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <CartProductTableRow
            id={item.id}
            variantTitle={item.variant.title}
            count={item.variant.count}
            key={item.id}
          />
        ))}
      </tbody>
    </Table>{' '}
    <BillingForm />
  </Container>
);

export default CartContent;
