import React from 'react';

import Layout from '../../../../../shared/components/Layout/Settings.layout';
import Form from './components/DiscountSubmitForm';
import List from './components/Discounts';
import { PaddedWrapper } from '../styles/settings.style';

const DiscountContentPage: () => JSX.Element = () => (
  <Layout>
    <h3 className="pl-3 mt-2 mb-5">Discount settings</h3>
    <PaddedWrapper>
      <Form />
    </PaddedWrapper>
    <PaddedWrapper>
      <List />
    </PaddedWrapper>
  </Layout>
);

export default DiscountContentPage;
