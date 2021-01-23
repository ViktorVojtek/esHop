import React, { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { SERVICE_QUERY } from '../../../../app-data/graphql/query';

import { withAuthSync } from '../../../../app-data/lib/auth';

import Layout from '../../../../app-data/shared/components/Layout/Admin.material.layout';
import { PageProps } from '../../../../app-data/shared/types/Page.types';
import ServiceForm from '../../../../app-data/components/pages/admin/services/Form';

const UpdateService: (props: PageProps) => JSX.Element = ({ role }) => {
  const router = useRouter();
  const { query } = router;

  const { error, loading, data } = useQuery(SERVICE_QUERY, {
    variables: { id: query.id },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { service } = data;

  return (
    <>
      <Head>
        <title>esHop App | Upraviť službu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout pageTitle="Služba - Úprava služby" role={role}>
        <ServiceForm updateServiceData={service} update />
      </Layout>
    </>
  );
};

export default withAuthSync(UpdateService);
