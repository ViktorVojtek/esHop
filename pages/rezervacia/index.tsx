import React from 'react';

import Layout from '../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../app-data/lib/state/Reducer';
import ReservationForm from '../../app-data/components/pages/reservationForm';

const Kontakt: () => JSX.Element = () => (
  <Layout>
    <ReservationForm />
  </Layout>
);

export default withSetCart(Kontakt);
