import React, { FC, useContext, useEffect } from 'react';

import { Context } from '../../../../../../../lib/state/Store';
import {
  HeadWrapper,
  Circle,
  DetailItem,
  Button,
  AsideCartWrapper,
  Title,
  Detail,
} from './styles/asideCartProductStyle';

type IAsideCartGiftCards = {
  cardColor: string;
  price: number;
  text: string;
  id: number;
};

const AsideCartGiftCards: FC<IAsideCartGiftCards> = ({
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
    <AsideCartWrapper className="mt-4">
      <HeadWrapper className="d-flex">
        <Detail>
          <Title>Darčeková poukážka</Title>
          <DetailItem>{`Hodnota: ${price.toFixed(2)},-€`}</DetailItem>
          <DetailItem>{`Venovanie: ${text}`}</DetailItem>
          <div className="d-flex align-items-center">
            <DetailItem>Farba poukážky:</DetailItem>
            <Circle className="ml-2" color={cardColor} />
          </div>
        </Detail>
      </HeadWrapper>
      <div className="d-flex justify-content-between">
        <Button onClick={() => handleRemoveGiftCard(id)}>Odobrať</Button>
      </div>
    </AsideCartWrapper>
  );
};

export default AsideCartGiftCards;
