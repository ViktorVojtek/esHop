import React from 'react';

import Layout from '../../../app-data/shared/components/Layout/Site.layout';
import CartBodyComponent from '../../../app-data/components/pages/eshop/cart';

const CartPage: () => JSX.Element = () => (
  <Layout>
    <CartBodyComponent>
      <h2>This is cart page</h2>
      <p>Here you will see items added to cart.</p>
    </CartBodyComponent>
  </Layout>
);

export default CartPage;
