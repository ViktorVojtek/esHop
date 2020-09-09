import React, { FC, useContext, useEffect } from 'react';

import Layout from '../app-data/shared/components/Layout/Site.layout';
import MainPage from '../app-data/components/pages/index';
import { withSetCart } from '../app-data/lib/state/Reducer';

const Home: () => JSX.Element = () => (
  <Layout>
    <MainPage />
  </Layout>
);

export default withSetCart(Home);
