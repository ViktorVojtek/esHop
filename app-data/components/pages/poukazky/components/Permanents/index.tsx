import React, { useState, FC, ChangeEvent } from 'react';
import styled from 'styled-components';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import { useSnackbar } from 'notistack';
import InfoPopover from '../InfoPopover';
import Product from '../../../../../shared/types/Product.types';
import {
  ActionPrice,
  Del,
  Holder,
  IconsHolder,
  Item,
  OverFlow,
  P,
  Price,
  StyledPaper,
  BonusBadge,
} from '../../styles';
import { CartPlusIcon } from '../../../../../shared/design/icons';

type IItem = {
  title: string;
  price: number;
  count: number;
};

type IPermanents = {
  permanent: Product;
  addPermanent: (item: IItem) => void;
  variant: number;
};

const Permanents: FC<IPermanents> = ({
  permanent,
  addPermanent,
  variant = 0,
}) => {
  const [count, setCount] = useState(0);
  const [actualVariant, setActualVariant] = useState(variant);
  const { enqueueSnackbar } = useSnackbar();
  const { variants, title } = permanent;

  function getPrice(variant): number {
    if (variant.discount > 0) {
      return (
        variant.price.value - (variant.price.value * variant.discount) / 100
      );
    } else return variant.price.value;
  }

  const addService = () => {
    const item: IItem = {
      title: variants[actualVariant].title,
      price: getPrice(variants[actualVariant]),
      count: 1,
    };
    addPermanent(item);
    enqueueSnackbar(`Pridané: ${title} ${count}x`, {
      variant: 'success',
    });
  };

  return (
    <StyledPaper elevation={3} url={variants[actualVariant].images[0].path}>
      <OverFlow />
      {variants[actualVariant].bonus && (
        <BonusBadge>{variants[actualVariant].bonus}</BonusBadge>
      )}
      <Item>
        <Holder style={{ marginBottom: '16px' }}>
          <P className="mb-0">{title}</P>
          <P className="mb-0">{variants[actualVariant].title}</P>

          <P style={{ paddingTop: '8px' }}>
            Cena:{' '}
            {variants[actualVariant].discount > 0 ? (
              <Price>
                <Del>{`${formatPrice(
                  variants[actualVariant].price.value
                )} €`}</Del>
                <ActionPrice className="ml-2">
                  {formatPrice(
                    variants[actualVariant].price.value -
                      (variants[actualVariant].price.value *
                        variants[actualVariant].discount) /
                        100
                  )}{' '}
                  {`€`}
                </ActionPrice>
              </Price>
            ) : (
              <Price>
                {formatPrice(variants[actualVariant].price.value)} {`€`}
              </Price>
            )}
          </P>
        </Holder>
        <IconsHolder>
          <InfoPopover
            color="white"
            size={30}
            html={variants[actualVariant].description}
          />
          <CartPlusIcon
            style={{ marginLeft: '24px' }}
            color="white"
            size={30}
            onClick={addService}
          />
        </IconsHolder>
      </Item>
    </StyledPaper>
  );
};

export default Permanents;
