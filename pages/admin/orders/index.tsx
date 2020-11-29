import React from 'react';
import Head from 'next/head';

import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';
import OrdersList from '../../../app-data/components/pages/admin/orders';
import { PageProps } from '../Types/Page.types';

const Orders: (props: PageProps) => JSX.Element = ({ role }) => (
  <>
    <Head>
      <title>esHop App | Objednávky</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Objednávky" role={role}>
      <OrdersList />
    </Layout>
  </>
);

export default withAuthSync(Orders);
