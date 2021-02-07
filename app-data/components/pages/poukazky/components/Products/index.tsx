import { useSnackbar } from 'notistack';
import React, { FC, useState } from 'react';
import { CartPlusIcon } from '../../../../../shared/design/icons';
import { formatPrice } from '../../../../../shared/helpers/formatters';
import Product from '../../../../../shared/types/Product.types';
import {
  ActionPrice,
  BonusBadge,
  Del,
  Holder,
  IconsHolder,
  Item,
  OverFlow,
  P,
  Price,
  StyledPaper,
} from '../../styles';
import InfoPopover from '../InfoPopover';

export type IItem = {
  title: string;
  price: number;
  count: number;
  id: string;
  variantTitle: string;
  variantNumber: number;
};

type IProducts = {
  product: Product;
  addProduct: (item: IItem) => void;
  variant: number;
};

export const Products: FC<IProducts> = ({
  product,
  addProduct,
  variant = 0,
}) => {
  const [actualVariant, setActualVariant] = useState(variant);
  const { enqueueSnackbar } = useSnackbar();
  const { variants, title } = product;

  function getPrice(variant): number {
    if (variant.discount > 0) {
      return (
        variant.price.value - (variant.price.value * variant.discount) / 100
      );
    } else return variant.price.value;
  }

  const addService = () => {
    const item: IItem = {
      title:
        title === variants[actualVariant].title
          ? title
          : `${title}, ${variants[actualVariant].title}`,
      price: getPrice(variants[actualVariant]),
      count: 1,
      id: product._id,
      variantTitle: variants[actualVariant].title,
      variantNumber: actualVariant,
    };
    addProduct(item);
    enqueueSnackbar(`Pridané: ${item.title} ${item.count}x`, {
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
          <P className="mb-0">
            {variants[actualVariant].title !== title &&
              variants[actualVariant].title}
          </P>

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
