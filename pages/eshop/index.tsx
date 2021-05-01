import React, { useContext } from 'react';

import Layout from '../../app-data/shared/components/Layout/Site.layout';
import EshopPage from '../../app-data/components/pages/eshop';
import { withSetCart } from '../../app-data/lib/state/Reducer';

const Eshop: () => JSX.Element = () => (
  <Layout>
    <EshopPage />
  </Layout>
);

export default withSetCart(Eshop);
