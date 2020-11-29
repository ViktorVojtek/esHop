import React, { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { PRODUCT_QUERY } from '../../../../app-data/graphql/query';

import { withAuthSync } from '../../../../app-data/lib/auth';

import Layout from '../../../../app-data/shared/components/Layout/Admin.material.layout';
import ProductForm from '../../../../app-data/components/pages/admin/products/ProductForm/mui';
import { PageProps } from '../../Types/Page.types';

const UpdateProduct: (props: PageProps) => JSX.Element = ({ role }) => {
  const router = useRouter();
  const { query } = router;

  const { error, loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: query.id },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { product } = data;

  return (
    <>
      <Head>
        <title>esHop App | Upraviť produkt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout pageTitle="Product - Update" role={role}>
        <ProductForm updateProductData={product} update />
      </Layout>
    </>
  );
};

export default withAuthSync(UpdateProduct);
