import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Row, Col } from 'reactstrap';

import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.layout';
import NavHeader from '../../../app-data/shared/components/Navigation/Admin';
import LhsNav from '../../../app-data/shared/components/LhsNav';

import ProductList from '../../../app-data/components/pages/admin/products/ProductList';

const Products: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Products</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <NavHeader />{' '}
    <Layout>
      <Row>
        <Col xs="6" sm="3">
          <LhsNav />
        </Col>
        <Col xs="6" sm="9">
          <Link href="/admin/products/create">
            <Button color="primary" className="mb-3">
              Create product
            </Button>
          </Link>{' '}
          <ProductList />
        </Col>
      </Row>
    </Layout>
  </>
);

export default withAuthSync(Products);
