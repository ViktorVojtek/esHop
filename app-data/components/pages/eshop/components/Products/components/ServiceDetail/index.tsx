import React from 'react';
import { withSetCart } from '../../../../../../../lib/state/Reducer';
import Layout from '../../../../../../../shared/components/Layout/Site.layout';
import Service from '../../../../../../../shared/types/Service.types';
import ServiceDetailBody from '../../../ServiceDetail';

type ProductDetailType = {
  service: Service;
};

const ProductDetail = (props: ProductDetailType) => {
  const { service } = props;

  return (
    <Layout>
      <ServiceDetailBody service={service as Service} />
    </Layout>
  );
};

export default withSetCart(ProductDetail);
