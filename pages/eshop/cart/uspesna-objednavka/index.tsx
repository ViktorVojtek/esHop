import React, { useEffect } from 'react';

import Layout from '../../../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../../../app-data/lib/state/Reducer';
import SuccessOrder from '../../../../app-data/components/pages/eshop/cart/components/SuccessOrder';
import { useStorage } from '../../../../app-data/lib/util/app.util';

const SuccessOrderPage: () => JSX.Element = () => {
  const storage: Storage = useStorage();

  useEffect(() => {
    if (storage) {
      storage.removeItem('cart');
      storage.removeItem('giftCards');
      storage.removeItem('cartTotalSum');
    }
  });

  return (
    <Layout>
      <SuccessOrder />
    </Layout>
  );
};

export default withSetCart(SuccessOrderPage);
