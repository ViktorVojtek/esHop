import React, { FC, useContext } from 'react';
import { Circle, CloseCircleIcon, Image } from '../../../../styles/cart.style';
import { Context } from '../../../../../../../../lib/state/Store';
import { formatPrice } from '../../../../../../../../shared/helpers/formatters';
import { ServiceData } from '../../../../../../../../shared/types/Store.types';
import {
  StyledPaper,
  StyledPaperMobile,
  ImageHolder,
  InfoHolder,
  MobileImage,
  Price,
  PriceHolder,
  PriceAndActions,
  TaxText,
  TaxPrice,
  Title,
  Text,
  TopHolder,
  ServicesHolder,
  Venovanie,
} from '../style';
import { getImageUrl } from '../../../../../../../../shared/helpers';

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
    <>
      <StyledPaper elevation={2}>
        <ImageHolder>
          <Image src={getImageUrl[cardColor]} alt="poukazka" />
        </ImageHolder>
        <InfoHolder>
          <div>
            <Title>Darčeková poukážka</Title>
            <Venovanie>{`Venovanie: ${text}`}</Venovanie>
          </div>
        </InfoHolder>
        <ServicesHolder>
          {priceValue > 0 && (
            <Text className="w-100 mb-0">{`Peniaze - ${formatPrice(
              priceValue
            )} €`}</Text>
          )}
          {services.map((item, i) => {
            return (
              <Text key={i} className="w-100 mb-0">{`${item.title} ${
                item.count
              }x - ${formatPrice(item.count * item.price)} €`}</Text>
            );
          })}
        </ServicesHolder>
        <PriceAndActions>
          <PriceHolder>
            <Price>
              {`${formatPrice(Math.round(totalPrice * 100) / 100)} €`}{' '}
            </Price>
            <TaxText>Cena bez DPH (20%)</TaxText>
            <TaxPrice>
              {`${formatPrice(Math.round((totalPrice / 1.2) * 100) / 100)} €`}{' '}
            </TaxPrice>
          </PriceHolder>
          <CloseCircleIcon onClick={() => handleRemoveGiftCard(id)} />
        </PriceAndActions>
      </StyledPaper>
      <StyledPaperMobile>
        <TopHolder>
          <div>
            <Title>Darčeková poukážka</Title>
            <MobileImage
              style={{ minWidth: '120px', marginBottom: '.5rem' }}
              src={getImageUrl[cardColor]}
              alt="poukazka"
            />
          </div>
          <CloseCircleIcon onClick={() => handleRemoveGiftCard(id)} />
        </TopHolder>
        <Venovanie>{`Venovanie: ${text}`}</Venovanie>
        <ServicesHolder>
          {priceValue > 0 && (
            <Text className="w-100 mb-0">{`Peniaze - ${formatPrice(
              priceValue
            )} €`}</Text>
          )}
          {services.map((item, i) => {
            return (
              <Text key={i} className="w-100 mb-0">{`${item.title} ${
                item.count
              }x - ${formatPrice(item.count * item.price)} €`}</Text>
            );
          })}
        </ServicesHolder>
        <PriceAndActions>
          <PriceHolder>
            <Price>
              {`${formatPrice(Math.round(totalPrice * 100) / 100)} €`}{' '}
            </Price>
            <TaxText>Cena bez DPH (20%)</TaxText>
            <TaxPrice>
              {`${formatPrice(Math.round((totalPrice / 1.2) * 100) / 100)} €`}{' '}
            </TaxPrice>
          </PriceHolder>
        </PriceAndActions>
      </StyledPaperMobile>
    </>
  );
};

export default GiftCardTableRow;
