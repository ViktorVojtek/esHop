import React, { FC } from 'react';
import CartProductTableRow from '../CartProductTable';
import GiftCardTableRow from '../GiftCardTable';
import LoyalityProduct, { ILoyalityProduct } from '../LoyalityProduct';
import { TH, TR, H4 } from '../../../../styles/cart.style';
import { Row, Table } from 'reactstrap';
import {
  CartProduct,
  GiftCard,
} from '../../../../../../../../shared/types/Store.types';
import Coupon from '../Coupon';

type ICartContent = {
  data: any;
  giftCards: any;
  loyalityProduct: any;
};

const CartProducts: FC<ICartContent> = ({
  data,
  giftCards,
  loyalityProduct,
}) => {
  return (
    <>
      <Row>
        <Coupon />
      </Row>
      {data.length > 0 && (
        <div className="table-responsive">
          <Table className="mb-5" hover>
            <thead>
              <TR>
                <TH>Názov produktu</TH>
                <TH>Variant</TH>
                <TH>Cena ks</TH>
                <TH>Počet</TH>
                <TH>Cena celkom</TH>
                <TH>Zmazať</TH>
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
                <TH>Farba</TH>
                <TH>Obsah poukážky</TH>
                <TH>Venovanie</TH>
                <TH>Cena celkom</TH>
                <TH>Odstrániť</TH>
              </TR>
            </thead>
            <tbody>
              {giftCards.map((item: GiftCard, i: number) => (
                <GiftCardTableRow
                  cardColor={item.cardColor}
                  totalPrice={item.totalPrice}
                  text={item.text}
                  services={item.services}
                  priceValue={item.priceValue}
                  id={i}
                  key={i}
                />
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default CartProducts;
