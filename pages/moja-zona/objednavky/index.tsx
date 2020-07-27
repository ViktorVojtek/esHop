import React from 'react';
import Head from 'next/head';

import { withAuthSyncCustomer } from '../../../app-data/lib/authCustomer';
import Layout from '../../../app-data/shared/components/Layout/MyZone.material.layout';

const Orders: () => JSX.Element = () => (
  <>
    <Head>
      <title>Kúpele CKS moje objedávky</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Moje objednávky">
      <p>Moje objedávnky</p>
    </Layout>
  </>
);

export default withAuthSyncCustomer(Orders);
