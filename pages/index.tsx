import React from 'react';

import Layout from '../app-data/shared/components/Layout/Site.layout';
import MainPage from '../app-data/components/pages/index';

const Home: () => JSX.Element = () => (
  <Layout>
    <MainPage />
  </Layout>
);

export default Home;
