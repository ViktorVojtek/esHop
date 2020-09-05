import React from 'react';
import Head from 'next/head';

import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';

const Orders: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Orders</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Orders">
      <p>Orders content.</p>
    </Layout>
  </>
);

export default withAuthSync(Orders);
