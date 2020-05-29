import React from 'react';
import Head from 'next/head';
// import { Row, Col } from 'reactstrap';

import { withAuthSync } from '../../../../app-data/lib/auth';

import Layout from '../../../../app-data/shared/components/Layout/Admin.material.layout';
import Form from '../../../../app-data/components/pages/admin/products/ProductForm/mui';
// import LhsNav from '../../../../app-data/shared/components/LhsNav';

// import ProductForm from '../../../../app-data/components/pages/admin/products/ProductForm';

const ProductCreate: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Product create</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout pageTitle="Product - Create">
      <Form />
    </Layout>
  </>
);

/*
<Layout>
  <Row>
    <Col xs="6" sm="3">
      <LhsNav />
    </Col>
    <Col xs="6" sm="9">
      <p>Product create content.</p>
      <ProductForm />
    </Col>
  </Row>
</Layout>
*/

export default withAuthSync(ProductCreate);
