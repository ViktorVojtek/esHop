import React from 'react';
import Head from 'next/head';
import { Row, Col } from 'reactstrap';

import { withAuthSync } from '../../../../client/app-data/lib/auth';

import Layout from '../../../../client/shared/components/Layout';
import NavHeader from '../../../../client/shared/components/NavHeader';
import LhsNav from '../../../../client/shared/components/LhsNav';

import ProductCreateForm from '../../../../client/components/pages/admin/products/create/ProductCreateForm';

const ProductCreate = () => (
  <>
    <Head>
      <title>esHop App | Product create</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {' '}
    <NavHeader />
    {' '}
    <Layout>
      <Row>
        <Col xs="6" sm="3">
          <LhsNav />
        </Col>
        <Col xs="6" sm="9">
          <p>Product create content.</p>
          <ProductCreateForm />
        </Col>
      </Row>
    </Layout>
  </>
);

export default withAuthSync(ProductCreate);
