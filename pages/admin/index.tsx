import React from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../app-data/lib/auth';
import Layout from '../../app-data/shared/components/Layout/Admin.material.layout';

const Home: () => JSX.Element = () => (
  <>
    <Head>
      <title>Červený Kláštor - Administrácia</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Admin">
      <h4>Vitajte späť!</h4>
    </Layout>
  </>
);

export default withAuthSync(Home);
