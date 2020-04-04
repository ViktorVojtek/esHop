import React from 'react';
import Head from 'next/head';
import { Col, Row } from 'reactstrap';

import BoxWrapper, { H3 } from '../../../client/shared/styles/admin/UI';

import Layout from '../../../client/shared/components/Layout';
import NavHeader from '../../../client/shared/components/NavHeader';
import LhsNav from '../../../client/shared/components/LhsNav';
import Modal from '../../../client/shared/components/Modal';

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
    <Modal />
    {' '}
    <NavHeader />
    {' '}
    <Layout>
      <Row>
        <Col xs="6" sm="3" md="2">
          <LhsNav />
        </Col>
        <Col xm="6" sm="9" md="10">
          <H3>e-Commerce settings</H3>
          {' '}
          <BoxWrapper className="border-bottom">
            <Row>
              <Col>
                <CurrencySubmitForm />
              </Col>
              <Col>
                <Currencies />
              </Col>
            </Row>
          </BoxWrapper>
          <BoxWrapper className="border-bottom">
            <Row>
              <Col>
                <CagegorySubmitForm />
              </Col>
              <Col>
                <Categories />
              </Col>
            </Row>
          </BoxWrapper>
          <BoxWrapper className="border-bottom">
            <Row>
              <Col>
                <SubCategorySubmitForm />
              </Col>
              <Col>
                <SubCategories />
              </Col>
            </Row>
          </BoxWrapper>
        </Col>
      </Row>
    </Layout>
  </>
);

export default withAuthSync(SettingsPage);
