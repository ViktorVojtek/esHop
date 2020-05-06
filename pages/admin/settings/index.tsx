import React from 'react';
import Head from 'next/head';
import { Col, Row } from 'reactstrap';

import BoxWrapper from '../../../app-data/shared/styles/admin/UI';

import Layout from '../../../app-data/shared/components/Layout/Admin.layout';
import LhsNav from '../../../app-data/shared/components/LhsNav';
import Modal from '../../../app-data/shared/components/Modal';

import CurrencySubmitForm from '../../../app-data/components/pages/admin/settings/CurrencySubmitForm';
import Currencies from '../../../app-data/components/pages/admin/settings/Currencies';
import CategorySubmitForm from '../../../app-data/components/pages/admin/settings/CategorySubmitForm';
import Categories from '../../../app-data/components/pages/admin/settings/Categories';
import SubCategorySubmitForm from '../../../app-data/components/pages/admin/settings/SubCategorySubmitForm';
import SubCategories from '../../../app-data/components/pages/admin/settings/SubCategories';

import { withAuthSync } from '../../../app-data/lib/auth';

const SettingsPage: () => JSX.Element = () => (
  <>
    <Head>
      <title>esHop App | Settings</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>{' '}
    <Modal>
      <>Modal?</>
    </Modal>
    <Layout>
      <Row>
        <Col xs="6" sm="3" md="2">
          <LhsNav />
        </Col>
        <Col xm="6" sm="9" md="10">
          <h2>e-Commerce settings</h2>{' '}
          <BoxWrapper className="border-bottom">
            <Row>
              <Col md={4}>
                <CurrencySubmitForm />
              </Col>
              <Col md={8}>
                <Currencies />
              </Col>
            </Row>
          </BoxWrapper>
          <BoxWrapper className="border-bottom">
            <Row>
              <Col md={4}>
                <CategorySubmitForm />
              </Col>
              <Col md={8}>
                <Categories />
              </Col>
            </Row>
          </BoxWrapper>
          <BoxWrapper className="border-bottom">
            <Row>
              <Col md={4}>
                <SubCategorySubmitForm />
              </Col>
              <Col md={8}>
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
