import React, { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { Row, Col } from 'reactstrap';

import { PRODUCT_QUERY } from '../../../../app-data/graphql/query';

import { withAuthSync } from '../../../../app-data/lib/auth';

import Layout from '../../../../app-data/shared/components/Layout/Admin.layout';
import LhsNav from '../../../../app-data/shared/components/LhsNav';

import ProductForm from '../../../../app-data/components/pages/admin/products/ProductForm/mui';
import Product from '../../../../app-data/shared/types/Product.types';

const UpdateProduct: FC = () => {
  const router = useRouter();
  const { query } = router;

  const { error, loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: query.id },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { product } = data;

  return (
    <>
      <Head>
        <title>esHop App | Product create</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{' '}
      <Layout>
        <Row>
          <Col xs="6" sm="3">
            <LhsNav />
          </Col>
          <Col xs="6" sm="9">
            <h3>Update Product</h3>
            <ProductForm />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default withAuthSync(UpdateProduct);
