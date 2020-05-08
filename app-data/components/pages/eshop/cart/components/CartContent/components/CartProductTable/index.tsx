import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button } from 'reactstrap';

import { Context } from '../../../../../../../../lib/state/Store';
import { PRODUCT_QUERY } from '../../../../../../../../graphql/query';

interface ICartProductTableRow {
  id: string;
  count: number;
  variantTitle: string;
}
const CartProductTableRow: FC<ICartProductTableRow> = ({
  id,
  count,
  variantTitle,
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
      product: { title, variant: variants },
    } = data;

    // product variant destructed as prodVariantTitle as it is variant title populated from product variants array
    const { title: prodVariantTitle } = variants
      .filter((variant: any) => variant.title === variantTitle)
      .pop();
    // variant price object destructed as price and currency
    const {
      value: price,
      currencySign: currency,
    } = variants
      .map((variant: any) =>
        variant.title === variantTitle ? variant.price : null
      )
      .pop();

    const handleAddProduct: (id: string) => void = (id) => {
      const cartItemData = cart
        .filter(
          (item: any) =>
            item.id === id && item.variant.title === prodVariantTitle
        )
        .pop();

      const prodItemVariant = {
        ...cartItemData.variant,
        count: cartItemData.variant.count + 1,
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

    return (
      <tr>
        <td>{title}</td>
        <td>{prodVariantTitle}</td>
        <td>{`${price},-${currency}`}</td>
        <td>{count}</td>
        <td>
          {`${count * price},-${currency}`}{' '}
          <Button onClick={() => handleRemoveProduct(id)}>-</Button>{' '}
          <Button onClick={() => handleAddProduct(id)}>+</Button>
        </td>
      </tr>
    );
  }

  return null;
};

export default CartProductTableRow;
