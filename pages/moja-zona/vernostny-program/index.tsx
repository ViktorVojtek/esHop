import React from 'react';
import Head from 'next/head';

import { withAuthSyncCustomer } from '../../../app-data/lib/authCustomer';
import Layout from '../../../app-data/shared/components/Layout/MyZone.material.layout';

const Points: () => JSX.Element = () => (
  <>
    <Head>
      <title>Kúpele CKS vernostný program</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Vernostný program">
      <p>Vernostný program</p>
    </Layout>
  </>
);

export default withAuthSyncCustomer(Points);
