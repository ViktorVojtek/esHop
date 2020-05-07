import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { PRODUCT_QUERY } from '../../../../../../graphql/query';
import H2 from '../../styles/cart.style';

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

    return (
      <tr>
        <td>{title}</td>
        <td>{prodVariantTitle}</td>
        <td>{`${price} ${currency}`}</td>
        <td>{count}</td>
        <td>{`${count * price} ${currency}`}</td>
      </tr>
    );
  }

  return null;
};

interface ICartContent {
  data: any[];
}
const CartContent: FC<ICartContent> = ({ data }) => (
  <>
    <H2>Shopping cart</H2>
    <h4>1. Products in cart</h4>
    <table>
      <thead>
        <tr>
          <th>Product title</th>
          <th>Variant</th>
          <th>Item price</th>
          <th>Quantity</th>
          <th>Total price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <CartProductTableRow
            id={item.id}
            variantTitle={item.variant.title}
            count={item.variant.count}
            key={item.id}
          />
        ))}
      </tbody>
    </table>
  </>
);

export default CartContent;
