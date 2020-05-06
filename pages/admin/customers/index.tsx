import React from 'react';
import Head from 'next/head';
import { Row, Col } from 'reactstrap';

import { withAuthSync } from '../../../app-data/lib/auth';
import Layout from '../../../app-data/shared/components/Layout/Admin.layout';
import NavHeader from '../../../app-data/shared/components/Navigation/Admin';
import LhsNav from '../../../app-data/shared/components/LhsNav';

const Customers: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Customers</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <NavHeader />{' '}
    <Layout>
      <Row>
        <Col xs="6" sm="3">
          <LhsNav />
        </Col>
        <Col xs="6" sm="9">
          <p>Customers content.</p>
        </Col>
      </Row>
    </Layout>
  </>
);

export default withAuthSync(Customers);
