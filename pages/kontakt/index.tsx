import React, { FC, useContext, useEffect } from 'react';

import Layout from '../../app-data/shared/components/Layout/Site.layout';
import KontaktPage from '../../app-data/components/pages/kontakt';
import { withSetCart } from '../../app-data/lib/state/Reducer';

const Kontakt: () => JSX.Element = () => (
  <Layout>
    <KontaktPage />
  </Layout>
);

export default withSetCart(Kontakt);
