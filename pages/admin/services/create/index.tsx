import React from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../../../app-data/lib/auth';
import Layout from '../../../../app-data/shared/components/Layout/Admin.material.layout';
import ServiceForm from '../../../../app-data/components/pages/admin/services/Form';

const ServiceCreate: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Service create</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Service - Create">
      <ServiceForm />
    </Layout>
  </>
);

export default withAuthSync(ServiceCreate);
