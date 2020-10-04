import React from 'react';

import Layout from '../../../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../../../app-data/lib/state/Reducer';
import UnsuccessOrder from '../../../../app-data/components/pages/eshop/cart/components/UnsuccessOrder';

const UnsuccessOrderPage: () => JSX.Element = () => (
  <Layout>
    <UnsuccessOrder />
  </Layout>
);

export default withSetCart(UnsuccessOrderPage);
