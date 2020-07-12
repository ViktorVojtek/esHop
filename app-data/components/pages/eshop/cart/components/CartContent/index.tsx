import React, { FC, useState } from 'react';
import { Container, Table } from 'reactstrap';

import { H2, TH, TR, H4 } from '../../styles/cart.style';
import CartProductTableRow from './components/CartProductTable';
import GiftCardTableRow from './components/GiftCardTable';
import BillingForm from './components/BillingForm';

interface ICartContent {
  data: any[];
  giftCards: any[];
}
const CartContent: FC<ICartContent> = ({ data, giftCards }) => (
  <Container visible-lg>
    <H2>Nákupný košík</H2>
    <H4 className="mb-4">1. Položky v košíku</H4>
    {data.length > 0 && (
      <div className="table-responsive">
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
                discount={item.variant.discount}
                variantTitle={item.variant.title}
                count={item.variant.count}
                image={
                  item.variant && item.variant.images
                    ? item.variant.images[0]
                    : ''
                }
                key={`${item.id}-${i}`}
              />
            ))}
          </tbody>
        </Table>
      </div>
    )}{' '}
    {giftCards.length > 0 && (
      <div className="table-responsive">
        <Table className="mb-5" hover>
          <thead>
            <TR>
              <TH>Názov produktu</TH>
              <TH>Typ</TH>
              <TH>Farba</TH>
              <TH>Hodnota</TH>
              <TH>Venovanie</TH>
              <TH>Cena celkom</TH>
              <TH>Odstrániť</TH>
            </TR>
          </thead>
          <tbody>
            {giftCards.map((item: any, i: number) => (
              <GiftCardTableRow
                cardColor={item.cardColor}
                price={item.price}
                text={item.text}
                id={i}
                key={i}
              />
            ))}
          </tbody>
        </Table>
      </div>
    )}{' '}
    <BillingForm />
  </Container>
);

export default CartContent;
