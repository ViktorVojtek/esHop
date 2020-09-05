import React from 'react';
import Head from 'next/head';

import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';

const Customers: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Customers</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Customers">
      <p>Customers content.</p>
    </Layout>
  </>
);

export default withAuthSync(Customers);
