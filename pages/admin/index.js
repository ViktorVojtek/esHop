import React from 'react';
import Head from 'next/head';

import { withAuthSync } from '../../client/app-data/lib/auth';
import Layout from '../../client/shared/components/Layout';
import NavHeader from '../../client/shared/components/NavHeader';
import LhsNav from '../../client/shared/components/LhsNav';
import { WrapperFlex } from '../../client/shared/styles/global.style';

const Home = () => (
  <Layout>
    <Head>
      <title>esHop App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavHeader />
    <WrapperFlex>
      <LhsNav />
      <div>
        <p>Admin content.</p>
      </div>
    </WrapperFlex>
  </Layout>
);

export default withAuthSync(Home);
