import React from 'react';

import Layout from '../../../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../../../app-data/lib/state/Reducer';
import SuccessOrder from '../../../../app-data/components/pages/eshop/cart/components/SuccessOrder';

const SuccessOrderPage: () => JSX.Element = () => (
  <Layout>
    <SuccessOrder />
  </Layout>
);

export default withSetCart(SuccessOrderPage);
