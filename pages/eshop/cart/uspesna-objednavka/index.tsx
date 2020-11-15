import React, { useEffect } from 'react';

import Layout from '../../../../app-data/shared/components/Layout/Site.layout';
import { withSetCart } from '../../../../app-data/lib/state/Reducer';
import SuccessOrder from '../../../../app-data/components/pages/eshop/cart/components/SuccessOrder';
import { useStorage } from '../../../../app-data/lib/util/app.util';
import { useMutation } from 'react-apollo';
import { UPDATE_PAYMENT_STATUS_MUTATION } from '../../../../app-data/graphql/mutation';

const SuccessOrderPage: () => JSX.Element = () => {
  const storage: Storage = useStorage();
  const [mutate] = useMutation(UPDATE_PAYMENT_STATUS_MUTATION);

  useEffect(() => {
    if (storage) {
      if (storage.getItem('orderId') !== null) {
        handleUpdateOrder(storage.getItem('orderId'));
      }
      storage.removeItem('orderId');
      storage.removeItem('cart');
      storage.removeItem('giftCards');
      storage.removeItem('cartTotalSum');
    }
  });

  const handleUpdateOrder: (value: any) => Promise<void> = async (value) => {
    const result = await mutate({
      variables: { _id: value, paymentStatus: 1 },
    });

    const order = result.data.updatePaymentStatus;
  };

  return (
    <Layout>
      <SuccessOrder />
    </Layout>
  );
};

export default withSetCart(SuccessOrderPage);
