import React, { ChangeEvent, FC, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Context } from '../../../../../../../../lib/state/Store';
import { PRODUCT_QUERY } from '../../../../../../../../graphql/query';
import { Image, CloseCircleIcon } from '../../../../styles/cart.style';
import { ProductImage } from '../../../../../../../../shared/types/Product.types';
import { formatPrice } from '../../../../../../../../shared/helpers/formatters';
import { TextField } from '@material-ui/core';
import {
  StyledPaper,
  StyledPaperMobile,
  ImageHolder,
  InfoHolder,
  Count,
  MobileImage,
  Price,
  PriceHolder,
  PriceAndActions,
  TaxText,
  TaxPrice,
  Title,
  Text,
  BottomHolder,
  TopHolder,
} from '../style';

interface ICartProduct {
  id: string;
  discount: number;
  count: number;
  variantTitle: string;
  image: ProductImage;
}
const CartProduct: FC<ICartProduct> = ({
  id,
  discount,
  count,
  variantTitle,
  image,
}) => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Context);
  const { data } = useQuery(PRODUCT_QUERY, {
    variables: { id },
  });

  if (data) {
    const {
      // Destructed product's data fetched from server
      product: { title, variants: variants },
    } = data;

    const comparedVariants = variants.filter(
      (variant: any) => variant.title === variantTitle
    );

    // product variant destructed as prodVariantTitle as it is variant title populated from product variants array
    const { title: prodVariantTitle } = variants
      .filter((variant: any) => variant.title === variantTitle)
      .pop();

    // variant price object destructed as price and currency
    const {
      price: { value: itemPrice, currency: currency },
    } = variants.filter((variant: any) => variant.title === variantTitle).pop();

    const handleCount = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      id: string
    ): void => {
      const cartItemData = cart
        .filter(
          (item: any) =>
            item.id === id && item.variant.title === prodVariantTitle
        )
        .pop();
      let productCount;
      if (event.target.value && parseInt(event.target.value) > 0) {
        if (parseInt(event.target.value) > 100) {
          productCount = 100;
        } else productCount = parseInt(event.target.value);
      } else productCount = 1;
      cartItemData.variant.count = productCount;

      dispatch({
        type: 'ADD_TO_CART',
        payload: { id, variant: cartItemData.variant },
      });
    };

    const handleRemoveAllProducts: (id: string) => void = (id) => {
      const cartItemData = cart
        .filter(
          (item: any) =>
            item.id === id && item.variant.title === prodVariantTitle
        )
        .pop();

      const prodItemVariant = {
        ...cartItemData.variant,
        count: 0,
      };

      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { id, variant: prodItemVariant },
      });
    };

    const calculatedItemPrice =
      discount && discount > 0
        ? itemPrice - itemPrice * (discount / 100)
        : itemPrice;

    return (
      <>
        <StyledPaper elevation={2}>
          <ImageHolder>
            <Image src={image.path} alt={prodVariantTitle} />
          </ImageHolder>
          <InfoHolder>
            <div>
              <Title>{title}</Title>
              {title !== prodVariantTitle && (
                <Text style={{ fontWeight: 'bold' }}>{prodVariantTitle}</Text>
              )}
              <Text>{`Cena za kus: ${formatPrice(
                calculatedItemPrice
              )} ${currency}`}</Text>
            </div>
          </InfoHolder>
          <Count>
            <TextField
              variant="outlined"
              label="Počet"
              type="number"
              value={count}
              onChange={(event) => handleCount(event, id)}
              inputProps={{
                min: '1',
                max: '100',
                step: '1',
                style: {
                  padding: '12px',
                },
              }}
            />
          </Count>
          <PriceAndActions>
            <PriceHolder>
              <Price>
                {`${formatPrice(
                  Math.round(count * calculatedItemPrice * 100) / 100
                )} ${currency}`}{' '}
              </Price>
              <TaxText>Cena bez DPH (20%)</TaxText>
              <TaxPrice>
                {`${formatPrice(
                  Math.round(count * (calculatedItemPrice / 1.2) * 100) / 100
                )} ${currency}`}{' '}
              </TaxPrice>
            </PriceHolder>
            <CloseCircleIcon onClick={() => handleRemoveAllProducts(id)} />
          </PriceAndActions>
        </StyledPaper>
        <StyledPaperMobile elevation={2}>
          <TopHolder>
            <MobileImage src={image.path} alt={prodVariantTitle} />
            <div className="ml-4">
              <Title>{title}</Title>
              {title !== prodVariantTitle && (
                <Text style={{ fontWeight: 'bold' }}>{prodVariantTitle}</Text>
              )}
              <Text>{`Cena za kus: ${formatPrice(
                calculatedItemPrice
              )} ${currency}`}</Text>
            </div>
            <CloseCircleIcon onClick={() => handleRemoveAllProducts(id)} />
          </TopHolder>
          <BottomHolder>
            <Count>
              <TextField
                variant="outlined"
                label="Počet"
                type="number"
                value={count}
                onChange={(event) => handleCount(event, id)}
                inputProps={{
                  min: '1',
                  max: '100',
                  step: '1',
                  style: {
                    padding: '12px',
                  },
                }}
              />
            </Count>
            <PriceHolder>
              <Price>
                {`${formatPrice(
                  Math.round(count * calculatedItemPrice * 100) / 100
                )} ${currency}`}{' '}
              </Price>
              <TaxText>Cena bez DPH (20%)</TaxText>
              <TaxPrice>
                {`${formatPrice(
                  Math.round(count * (calculatedItemPrice / 1.2) * 100) / 100
                )} ${currency}`}{' '}
              </TaxPrice>
            </PriceHolder>
          </BottomHolder>
        </StyledPaperMobile>
      </>
    );
  }

  return null;
};

export default CartProduct;
