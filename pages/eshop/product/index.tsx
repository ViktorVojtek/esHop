import React, { useEffect, useState } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'reactstrap';

import Layout from '../../../app-data/shared/components/Layout/Site.layout';
import ProductDetailBody from '../../../app-data/components/pages/eshop/components/ProductDetail';
import { PRODUCT_QUERY } from '../../../app-data/graphql/query';
import Product from '../../../app-data/shared/types/Product.types';
import { withSetCart } from '../../../app-data/lib/state/Reducer';
import ProductDetailSkeleton from '../../../app-data/components/pages/eshop/components/ProductDetail/Skeleton';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const [product, setProduct] = useState(null);

  const { error, loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: query.id },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <Error statusCode={404} />;
  }
  useEffect(() => {
    if (data) {
      setProduct(data.product);
    }
  }, [data]);

  return (
    <Layout>
      {product ? (
        <ProductDetailBody product={product as Product} />
      ) : (
        <ProductDetailSkeleton />
      )}
    </Layout>
  );
};

export default withSetCart(ProductDetail);
