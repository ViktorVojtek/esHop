import React from 'react';
import Head from 'next/head';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import { CurrencyEuro } from '@styled-icons/heroicons-outline/CurrencyEuro';
import { Category } from '@styled-icons/material-outlined/Category';
import { LocalShipping } from '@styled-icons/material-outlined/LocalShipping';
import { Payment } from '@styled-icons/material-outlined/Payment';
import { BurstSale } from '@styled-icons/foundation/BurstSale';

import BoxWrapper from '../../../app-data/shared/styles/admin/UI';

import Layout from '../../../app-data/shared/components/Layout/Admin.layout';
import LhsNav from '../../../app-data/shared/components/LhsNav';
import Modal from '../../../app-data/shared/components/Modal';

import SubCategorySubmitForm from '../../../app-data/components/pages/admin/settings/subcategory/components/SubCategorySubmitForm';
import SubCategories from '../../../app-data/components/pages/admin/settings/subcategory/components/SubCategories';

import { withAuthSync } from '../../../app-data/lib/auth';

const CurrencyIcon = styled(CurrencyEuro)`
  color: #000;
  width: 20px;
  height: 20px;
`;
const CategoryIcon = styled(Category)`
  color: #000;
  width: 20px;
  height: 20px;
`;
const DeliveryIcon = styled(LocalShipping)`
  color: #000;
  width: 20px;
  height: 20px;
`;
const PaymentIcon = styled(Payment)`
  color: #000;
  width: 20px;
  height: 20px;
`;
const SaleIcon = styled(BurstSale)`
  color: #000;
  width: 20px;
  height: 20px;
`;

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
          <BoxWrapper className="border-bottom">
            <Row>
              <Col>
                <h4 className="mb-4">
                  Subcategory <CategoryIcon />
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <SubCategorySubmitForm />
              </Col>
              <Col md={8}>
                <SubCategories />
              </Col>
            </Row>
          </BoxWrapper>{' '}
          <BoxWrapper className="border-bottom">
            <Row>
              <Col>
                <h4 className="mb-4">
                  Delivery methods <DeliveryIcon />
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Delivery methodes</Col>
              <Col md={8}>Methodes</Col>
            </Row>
          </BoxWrapper>
          <BoxWrapper className="border-bottom">
            <Row>
              <Col>
                <h4 className="mb-4">
                  Payment methods <PaymentIcon />
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Payment methodes</Col>
              <Col md={8}>Methodes</Col>
            </Row>
          </BoxWrapper>{' '}
          <BoxWrapper className="border-bottom">
            <Row>
              <Col>
                <h4 className="mb-4">
                  Discount codes <SaleIcon />
                </h4>
              </Col>
            </Row>
            <Row>
              <Col md={4}>Discount methodes</Col>
              <Col md={8}>Methodes</Col>
            </Row>
          </BoxWrapper>
        </Col>
      </Row>
    </Layout>
  </>
);

export default withAuthSync(SettingsPage);
