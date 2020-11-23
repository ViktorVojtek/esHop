import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'reactstrap';
import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';
import ServicesList from '../../../app-data/components/pages/admin/services/List';

const Services: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Služby</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Services">
      <Link href="/admin/services/create">
        <Button color="primary" className="mb-3">
          Vytvoriť službu
        </Button>
      </Link>{' '}
      <ServicesList />
    </Layout>
  </>
);

export default withAuthSync(Services);
