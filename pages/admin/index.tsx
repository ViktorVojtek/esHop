import React from 'react';
import Head from 'next/head';
import { Row, Col } from 'reactstrap';

import { withAuthSync } from '../../app-data/lib/auth';
import Layout from '../../app-data/shared/components/Layout/Admin.layout';
import LhsNav from '../../app-data/shared/components/LhsNav';

const Home: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Layout>
      <Row>
        <Col xs="6" sm="3">
          <LhsNav />
        </Col>
        <Col xs="6" sm="9">
          <p>Admin content.</p>
        </Col>
      </Row>
    </Layout>
  </>
);

export default withAuthSync(Home);
