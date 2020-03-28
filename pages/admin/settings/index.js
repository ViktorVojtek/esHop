import React from 'react';
import Head from 'next/head';
import { Col, Row } from 'reactstrap';

import Layout from '../../../client/shared/components/Layout';
import NavHeader from '../../../client/shared/components/NavHeader';
import LhsNav from '../../../client/shared/components/LhsNav';

import CurrencySubmitForm from '../../../client/components/CurrencySubmitForm';
import Currencies from '../../../client/components/Currencies';
import CagegorySubmitForm from '../../../client/components/CategorySubmitForm';
import Categories from '../../../client/components/Categories';

import SubCategorySubmitForm from '../../../client/components/SubCategorySubmitForm';
import SubCategories from '../../../client/components/SubCategories';

import { withAuthSync } from '../../../client/app-data/lib/auth';

const SettingsPage = () => (
  <>
    <Head>
      <title>esHop App | Settings</title>
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
        <Col xm="6" sm="9">
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
          <Row>
            <Col>
              <CagegorySubmitForm />
            </Col>
            <Col>
              <Categories />
            </Col>
          </Row>
          <Row>
            <Col>
              <SubCategorySubmitForm />
            </Col>
            <Col>
              <SubCategories />
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  </>
);

export default withAuthSync(SettingsPage);
