import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Container, Table } from 'reactstrap';

import { PRODUCT_QUERY } from '../../../../../../graphql/query';
import H2 from '../../styles/cart.style';
import BillingForm from './components/BillingForm';

import { Context } from '../../../../../../lib/state/Store';

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
      console.log(`Add product with id: ${id}`);
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
      console.log(`Remove product with id: ${id}`);
      console.log(cart);
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

interface ICartContent {
  data: any[];
}
const CartContent: FC<ICartContent> = ({ data }) => (
  <Container>
    <H2>Shopping cart</H2>
    <h4 className="mb-5">1. Products in cart</h4>
    <Table className="mb-5" hover>
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
    </Table>{' '}
    <BillingForm />
  </Container>
);

export default CartContent;
