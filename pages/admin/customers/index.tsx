import React from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';
import CustomersList from '../../../app-data/components/pages/admin/customers';
import { PageProps } from '../Types/Page.types';

const Customers: (props: PageProps) => JSX.Element = ({ role }) => (
  <>
    <Head>
      <title>esHop App | Používatelia</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Používatelia" role={role}>
      <CustomersList />
    </Layout>
  </>
);

export default withAuthSync(Customers);
