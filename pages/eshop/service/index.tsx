import React from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'reactstrap';

import Layout from '../../../app-data/shared/components/Layout/Site.layout';
import ServiceDetailBody from '../../../app-data/components/pages/eshop/components/ServiceDetail';
import { SERVICE_QUERY } from '../../../app-data/graphql/query';
import { withSetCart } from '../../../app-data/lib/state/Reducer';
import Service from '../../../app-data/shared/types/Service.types';

const ServiceDetail: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const { error, loading, data } = useQuery(SERVICE_QUERY, {
    variables: { id: query.id },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <Spinner color="primary" />;
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  const { service } = data;

  return (
    <Layout>
      <ServiceDetailBody service={service as Service} />
    </Layout>
  );
};

export default withSetCart(ServiceDetail);
