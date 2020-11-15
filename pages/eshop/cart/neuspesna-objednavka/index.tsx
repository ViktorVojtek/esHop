import React, { useEffect } from 'react';

import Layout from '../../../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../../../app-data/lib/state/Reducer';
import UnsuccessOrder from '../../../../app-data/components/pages/eshop/cart/components/UnsuccessOrder';
import { useStorage } from '../../../../app-data/lib/util/app.util';

const UnsuccessOrderPage: () => JSX.Element = () => {
  const storage: Storage = useStorage();

  useEffect(() => {
    if (storage) {
      storage.removeItem('orderId');
    }
  });

  return (
    <Layout>
      <UnsuccessOrder />
    </Layout>
  );
};

export default withSetCart(UnsuccessOrderPage);
