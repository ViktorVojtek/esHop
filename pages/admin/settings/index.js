import React from 'react';
import Head from 'next/head';
import { Col, Row } from 'reactstrap';

import Layout from '../../../client/shared/components/Layout';
import NavHeader from '../../../client/shared/components/NavHeader';
import LhsNav from '../../../client/shared/components/LhsNav';
import CurrencySubmitForm from '../../../client/components/CurrencySubmitForm';
import Currencies from '../../../client/components/Currencies';

import { withAuthSync } from '../../../client/app-data/lib/auth';
import { WrapperFlex } from '../../../client/shared/styles/global.style';

const SettingsPage = () => (
  <Layout>
    <Head>
      <title>esHop App | Settings</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavHeader />
    <WrapperFlex>
      <LhsNav />
      <div>
        <h3>e-Commerce settings</h3>
        {' '}
        <Row>
          <Col>
            <CurrencySubmitForm />
          </Col>
          <Col>
            <Currencies />
          </Col>
        </Row>
      </div>
    </WrapperFlex>
  </Layout>
);

export default withAuthSync(SettingsPage);
