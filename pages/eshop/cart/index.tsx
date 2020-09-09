import React from 'react';

import Layout from '../../../app-data/shared/components/Layout/Site.layout';
import CartBodyComponent from '../../../app-data/components/pages/eshop/cart';
import { withSetCart } from '../../../app-data/lib/state/Reducer';

const CartPage: () => JSX.Element = () => (
  <Layout>
    <CartBodyComponent />
  </Layout>
);

export default withSetCart(CartPage);
