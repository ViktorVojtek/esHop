import React from 'react';
import Head from 'next/head';

import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';
import { PageProps } from '../../../app-data/shared/types/Page.types';

const Reviews: (props: PageProps) => JSX.Element = ({ role }) => (
  <>
    <Head>
      <title>esHop App | Reviews</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Reviews" role={role}>
      <p>V stave riešenia</p>
    </Layout>
  </>
);

export default withAuthSync(Reviews);
