import React from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../../../app-data/lib/auth';
import Layout from '../../../../app-data/shared/components/Layout/Admin.material.layout';
import Form from '../../../../app-data/components/pages/admin/products/ProductForm/mui';
import { PageProps } from '../../../../app-data/shared/types/Page.types';

const ProductCreate: (props: PageProps) => JSX.Element = ({ role }) => (
  <>
    <Head>
      <title>esHop App | Pridať produkt</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Product - Create" role={role}>
      <Form />
    </Layout>
  </>
);

export default withAuthSync(ProductCreate);
