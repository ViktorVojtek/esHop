import React from 'react';
import Head from 'next/head';

import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';

const Reviews: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Reviews</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Reviews">
      <p>V stave riešenia</p>
    </Layout>
  </>
);

export default withAuthSync(Reviews);
