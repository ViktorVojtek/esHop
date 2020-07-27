import React, { useContext } from 'react';
import Head from 'next/head';

import { withAuthSyncCustomer } from '../../../app-data/lib/authCustomer';
import Layout from '../../../app-data/shared/components/Layout/MyZone.material.layout';
import cookie from 'js-cookie';
import Settings from '../../../app-data/components/pages/myzone/setttings';

const Orders: () => JSX.Element = () => {
  const id = cookie.get('userId');
  return (
    <>
      <Head>
        <title>Kúpele CKS nastavenia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout pageTitle="Nastavenia">
        {id && <Settings id={cookie.get('userId')} />}
      </Layout>
    </>
  );
};

export default withAuthSyncCustomer(Orders);
