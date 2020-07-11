import React, { useEffect, FC, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Container, Row } from 'reactstrap';

import { H3 } from '../features.style';

import { PRODUCTS_QUERY } from '../../../../../../graphql/query';
import FeaturecProductsFill from '../../../../../../shared/components/FeatureProduct';

interface IFeaturesProducts {
  category: string;
}

const FeaturesProducts: FC<IFeaturesProducts> = ({ category }) => {
  const [products, setProducts] = useState([]);
  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    variables: { categoryId: category },
  });
  useEffect(() => {
    if (data) {
      let { products } = data;
      setProducts(products);
    }
  }, [data]);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  return (
    <Container>
      <H3>Vybrané produkty</H3>
      <Row>
        <FeaturecProductsFill products={products} addProduct={null} />
      </Row>
    </Container>
  );
};

export default FeaturesProducts;
