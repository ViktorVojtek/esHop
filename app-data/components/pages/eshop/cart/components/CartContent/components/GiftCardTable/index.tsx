import React, { FC, useContext } from 'react';
import {
  TD,
  Circle,
  ButtonAddrRemove,
  TDtext,
} from '../../../../styles/cart.style';
import { Context } from '../../../../../../../../lib/state/Store';
import { formatPrice } from '../../../../../../../../shared/helpers/formatters';

interface IGiftCardTableRow {
  cardColor: string;
  price: number;
  text: string;
  id: number;
}
const GiftCardTableRow: FC<IGiftCardTableRow> = ({
  cardColor,
  price,
  text,
  id,
}) => {
  const { dispatch } = useContext(Context);

  const handleRemoveGiftCard: (id: number) => void = (id) => {
    dispatch({
      type: 'REMOVE_FROM_GIFT_CARDS',
      payload: { id },
    });
  };

  return (
    <tr>
      <TD>Darčeková poukážka</TD>
      <TD>Suma</TD>
      <TD>
        <Circle color={cardColor}></Circle>
      </TD>
      <TD>{`${formatPrice(price)} €`}</TD>
      <TDtext>{text}</TDtext>
      <TD>{`${formatPrice(price)} €`}</TD>
      <TD>
        <ButtonAddrRemove onClick={() => handleRemoveGiftCard(id)}>
          Odstrániť
        </ButtonAddrRemove>
      </TD>
    </tr>
  );
};

export default GiftCardTableRow;
