import React, { FC, useContext, useEffect } from 'react';

import Layout from '../../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../../app-data/lib/state/Reducer';
import { InfoPoukazkyPage } from '../../../app-data/components/pages/poukazky/InfoPage';

const Poukazky: () => JSX.Element = () => (
  <Layout>
    <InfoPoukazkyPage />
  </Layout>
);

export default withSetCart(Poukazky);
