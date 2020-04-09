import React from 'react';
import Head from 'next/head';
import { Row, Col } from 'reactstrap';

import { withAuthSync } from '../../../client/app-data/lib/auth';
import Layout from '../../../client/shared/components/Layout';
import NavHeader from '../../../client/shared/components/NavHeader';
import LhsNav from '../../../client/shared/components/LhsNav';

const Reviews = () => (
  <>
    <Head>
      <title>esHop App | Reviews</title>
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
          <p>Reviews content.</p>
        </Col>
      </Row>
    </Layout>
  </>
);

export default withAuthSync(Reviews);