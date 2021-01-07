import React, { FC, useContext } from 'react';

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
import { formatPrice } from '../../../../../../../shared/helpers/formatters';
import { ServiceData } from '../../../../../../../shared/types/Store.types';

type IAsideCartGiftCards = {
  cardColor: string;
  priceValue: number;
  text: string;
  services: ServiceData[];
  totalPrice: number;
  id: number;
};

const AsideCartGiftCards: FC<IAsideCartGiftCards> = ({
  cardColor,
  priceValue,
  text,
  services,
  totalPrice,
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
          <DetailItem>{`Cena: ${formatPrice(totalPrice)} €`}</DetailItem>
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
