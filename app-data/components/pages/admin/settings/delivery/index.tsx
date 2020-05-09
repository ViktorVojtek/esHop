import React from 'react';

import Layout from '../../../../../shared/components/Layout/Settings.layout';
import Form from './components/DeliverySubmitForm';
import List from './components/DeliveryMethods';
import { PaddedWrapper } from '../styles/settings.style';

const DeliveryPageContent: () => JSX.Element = () => (
  <Layout>
    <h3 className="pl-3 mt-2 mb-5">Delivery methods settings</h3>
    <PaddedWrapper>
      <Form />
    </PaddedWrapper>
    <PaddedWrapper>
      <List />
    </PaddedWrapper>
  </Layout>
);

export default DeliveryPageContent;
