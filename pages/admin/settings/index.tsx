import React from 'react';
import Head from 'next/head';
import { Col, Row } from 'reactstrap';

import BoxWrapper, { H3 } from '../../../app-data/shared/styles/admin/UI';

import Layout from '../../../app-data/shared/components/Layout/Admin.layout';
import NavHeader from '../../../app-data/shared/components/Navigation/Admin';
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
    <NavHeader />{' '}
    <Layout>
      <Row>
        <Col xs="6" sm="3" md="2">
          <LhsNav />
        </Col>
        <Col xm="6" sm="9" md="10">
          <H3>e-Commerce settings</H3>{' '}
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
                <CategorySubmitForm />
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
