import React from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';

import StayPackageContent from '../../../app-data/components/pages/admin/accomodation';

const StayPackage: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | accomodation</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="accomodation">
      <StayPackageContent />
    </Layout>
  </>
);

export default withAuthSync(StayPackage);
