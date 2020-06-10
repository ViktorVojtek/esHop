import React, { FC, useContext, useEffect } from 'react';

import Layout from '../../app-data/shared/components/Layout/Site.layout';
import PoukazkyPage from '../../app-data/components/pages/poukazky/index';
import { withSetCart } from '../../app-data/lib/state/Reducer';

const Poukazky: () => JSX.Element = () => (
  <Layout>
    <PoukazkyPage />
  </Layout>
);

export default withSetCart(Poukazky);