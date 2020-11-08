import React, { FC, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Context } from '../../../../../../../../lib/state/Store';
import { PRODUCT_QUERY } from '../../../../../../../../graphql/query';
import {
  TD,
  Image,
  CloseCircleIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '../../../../styles/cart.style';
import { ProductImage } from '../../../../../../../../shared/types/Product.types';
import { formatPrice } from '../../../../../../../../shared/helpers/formatters';

interface ICartProductTableRow {
  id: string;
  discount: number;
  count: number;
  variantTitle: string;
  image: ProductImage;
}
const CartProductTableRow: FC<ICartProductTableRow> = ({
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
      <tr>
        <TD>
          <Image src={image.path} alt={prodVariantTitle} />
          {title}
        </TD>
        <TD>{prodVariantTitle}</TD>
        <TD>{`${formatPrice(calculatedItemPrice)} ${currency}`}</TD>
        <TD>{count}</TD>
        <TD>
          {`${formatPrice(
            Math.round(count * calculatedItemPrice * 100) / 100
          )} ${currency}`}{' '}
        </TD>
        <TD>
          <MinusCircleIcon onClick={() => handleRemoveProduct(id)}>
            -
          </MinusCircleIcon>{' '}
          <PlusCircleIcon onClick={() => handleAddProduct(id)}>
            +
          </PlusCircleIcon>
        </TD>
        <TD>
          <CloseCircleIcon onClick={() => handleRemoveAllProducts(id)} />
        </TD>
      </tr>
    );
  }

  return null;
};

export default CartProductTableRow;
