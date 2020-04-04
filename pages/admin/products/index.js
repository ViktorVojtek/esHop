import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Row, Col } from 'reactstrap';

import { withAuthSync } from '../../../client/app-data/lib/auth';

import Layout from '../../../client/shared/components/Layout';
import NavHeader from '../../../client/shared/components/NavHeader';
import LhsNav from '../../../client/shared/components/LhsNav';

const Products = () => (
  <>
    <Head>
      <title>esHop App | Products</title>
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
          <Link href="/admin/products/create">
            <Button color="primary">Create product</Button>
          </Link>

          <p>Products content.</p>
        </Col>
      </Row>
    </Layout>
  </>
);

export default withAuthSync(Products);
