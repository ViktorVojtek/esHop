import React from 'react';

import Layout from '../../../../../shared/components/Layout/Settings.layout';
import { PaddedWrapper } from '../styles/settings.style';

const PaymentContentPage: () => JSX.Element = () => (
  <Layout>
    <h3 className="pl-3 mt-2 mb-5">Payment settings</h3>
    <PaddedWrapper>
      <p>Payment methodes</p>
    </PaddedWrapper>
  </Layout>
);

export default PaymentContentPage;
