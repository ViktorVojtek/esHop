import React from 'react';
import Head from 'next/head';

import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';
import OrdersList from '../../../app-data/components/pages/admin/orders';

const Orders: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Orders</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Orders">
      <OrdersList />
    </Layout>
  </>
);

export default withAuthSync(Orders);
