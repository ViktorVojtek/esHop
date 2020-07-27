import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { withAuthSyncCustomer } from '../../app-data/lib/authCustomer';
import Layout from '../../app-data/shared/components/Layout/MyZone.material.layout';
import cookie from 'js-cookie';

const Home: () => JSX.Element = () => {
  const name = `${cookie.get('firstName')} ${cookie.get('lastName')}`;
  return (
    <>
      <Head>
        <title>Kúpele CKS moja zóna</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout pageTitle={`Moja zóna (${name})`}>
        <p>Vitajte vo Vašom konte !</p>
      </Layout>
    </>
  );
};

export default withAuthSyncCustomer(Home);
