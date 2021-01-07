import React, { FC, useContext } from 'react';
import {
  TD,
  Circle,
  CloseCircleIcon,
  TDtext,
} from '../../../../styles/cart.style';
import { Context } from '../../../../../../../../lib/state/Store';
import { formatPrice } from '../../../../../../../../shared/helpers/formatters';
import { ServiceData } from '../../../../../../../../shared/types/Store.types';

type IGiftCardTableRow = {
  cardColor: string;
  priceValue: number;
  text: string;
  services: ServiceData[];
  totalPrice: number;
  id: number;
};
const GiftCardTableRow: FC<IGiftCardTableRow> = ({
  cardColor,
  priceValue,
  totalPrice,
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
      <TD>
        {services.map((item, i) => {
          return (
            <p
              key={i}
              className="w-100 mb-0"
            >{`${item.title} ${item.count}x`}</p>
          );
        })}
        {priceValue > 0 && `Suma: ${formatPrice(priceValue)} €`}
      </TD>
      <TDtext>{text}</TDtext>
      <TD>{`${formatPrice(totalPrice)} €`}</TD>
      <TD>
        <CloseCircleIcon
          onClick={() => handleRemoveGiftCard(id)}
        ></CloseCircleIcon>
      </TD>
    </tr>
  );
};

export default GiftCardTableRow;
