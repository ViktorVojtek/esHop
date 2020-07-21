import React, { FC, useContext } from 'react';
import {
  TD,
  Circle,
  ButtonAddrRemove,
  TDtext,
} from '../../../../styles/cart.style';
import { Context } from '../../../../../../../../lib/state/Store';
import { formatPrice } from '../../../../../../../../shared/helpers/formatters';

type IService = {
  title: string;
  count: number;
  price: number;
};

interface IGiftCardTableRow {
  cardColor: string;
  price: number;
  text: string;
  id: number;
  services: IService[];
}
const GiftCardTableRow: FC<IGiftCardTableRow> = ({
  cardColor,
  price,
  text,
  id,
  services,
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
      <TD>
        <Circle color={cardColor}></Circle>
      </TD>
      {services.length > 0 ? (
        <TD>
          {services.map((item) => {
            return (
              <p className="w-100 mb-0">{`${item.title} ${item.count}x`}</p>
            );
          })}
        </TD>
      ) : (
        <TD>{`Suma: ${formatPrice(price)} €`}</TD>
      )}

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
