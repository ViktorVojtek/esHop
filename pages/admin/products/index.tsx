import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'reactstrap';
import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.material.layout';
import ProductList from '../../../app-data/components/pages/admin/products/ProductList';
import { PageProps } from '../../../app-data/shared/types/Page.types';

const Products: (props: PageProps) => JSX.Element = ({ role }) => (
  <>
    <Head>
      <title>esHop App | Produkty</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Produkty" role={role}>
      <Link href="/admin/products/create">
        <Button color="primary" className="mb-3">
          Vytvoriť produkt
        </Button>
      </Link>{' '}
      <ProductList />
    </Layout>
  </>
);

export default withAuthSync(Products);
