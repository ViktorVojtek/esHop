import React, { FC, useState } from 'react';
import { Container, Table } from 'reactstrap';

import { H2, TH, TR, H4 } from '../../styles/cart.style';
import CartProductTableRow from './components/CartProductTable';
import BillingForm from './components/BillingForm';

interface ICartContent {
  data: any[];
}
const CartContent: FC<ICartContent> = ({ data }) => (
  <Container>
    <H2>Nákupný košík</H2>
    <H4 className="mb-4">1. Položky v košíku</H4>
    <Table className="mb-5" hover>
      <thead>
        <TR>
          <TH>Názov produktu</TH>
          <TH>Variant</TH>
          <TH>Cena</TH>
          <TH>Počet</TH>
          <TH>Cena celkom</TH>
          <TH>Pridať / odstrániť</TH>
        </TR>
      </thead>
      <tbody>
        {data.map((item: any, i: number) => (
          <CartProductTableRow
            id={item.id}
            variantTitle={item.variant.title}
            count={item.variant.count}
            key={`${item.id}-${i}`}
          />
        ))}
      </tbody>
    </Table>{' '}
    <BillingForm />
  </Container>
);

export default CartContent;
