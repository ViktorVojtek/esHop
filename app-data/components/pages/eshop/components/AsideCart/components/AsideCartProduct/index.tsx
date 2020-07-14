import React, { FC, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Context } from '../../../../../../../lib/state/Store';
import { PRODUCT_QUERY } from '../../../../../../../graphql/query';
import { ProductImage } from '../../../../../../../shared/types/Product.types';
import {
  HeadWrapper,
  P,
  Image,
  DetailItem,
  Button,
  AsideCartWrapper,
  Title,
  Detail,
} from './styles/asideCartProductStyle';

interface ICartProductTableRow {
  id: string;
  count: number;
  discount: number;
  variantTitle: string;
  image: ProductImage;
}

let textCount = '';
const AsideCartProduct: FC<ICartProductTableRow> = ({
  id,
  count,
  variantTitle,
  discount,
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

    // product variant destructed as prodVariantTitle as it is variant title populated from product variants array
    const { title: prodVariantTitle } = variants
      .filter((variant: any) => variant.title === variantTitle)
      .pop();

    // variant price object destructed as price and currency
    const {
      price: { value: itemPrice, currency: currency },
    } = variants.filter((variant: any) => variant.title === variantTitle).pop();

    const handleAddProduct: (id: string) => void = (id) => {
      const cartItemData = cart
        .filter(
          (item: any) =>
            item.id === id && item.variant.title === prodVariantTitle
        )
        .pop();

      const prodItemVariant = {
        ...cartItemData.variant,
        count: 1,
      };

      dispatch({
        type: 'ADD_TO_CART',
        payload: { id, variant: prodItemVariant },
      });
    };

    const handleRemoveProduct: (id: string) => void = (id) => {
      const cartItemData = cart
        .filter(
          (item: any) =>
            item.id === id && item.variant.title === prodVariantTitle
        )
        .pop();

      const prodItemVariant = {
        ...cartItemData.variant,
        count: cartItemData.variant.count - 1,
      };

      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { id, variant: prodItemVariant },
      });
    };

    handleTextCount(count);

    function handleTextCount(count: number) {
      if (count === 1) {
        return (textCount = 'kus');
      } else if (count > 1 && count < 5) {
        return (textCount = 'kusy');
      } else return (textCount = 'kusov');
    }

    const calculatedItemPrice =
      discount && discount > 0
        ? itemPrice - itemPrice * (discount / 100)
        : itemPrice;

    return (
      <AsideCartWrapper className="mt-4">
        <HeadWrapper className="d-flex">
          <Image src={image.path} />
          <Detail>
            <Title>{title}</Title>
            <DetailItem>{`${calculatedItemPrice.toFixed(
              2
            )},-${currency}`}</DetailItem>
            <DetailItem>{`Počet: ${count} ${textCount}`}</DetailItem>
            <DetailItem>{`Spolu: ${Math.round(
              (count * calculatedItemPrice * 100) / 100
            ).toFixed(2)},-${currency}`}</DetailItem>
          </Detail>
        </HeadWrapper>

        <div className="d-flex justify-content-between">
          <Button onClick={() => handleRemoveProduct(id)}>Odobrať</Button>
          <Button onClick={() => handleAddProduct(id)}>Pridať</Button>
        </div>
      </AsideCartWrapper>
    );
  }

  return null;
};

export default AsideCartProduct;
