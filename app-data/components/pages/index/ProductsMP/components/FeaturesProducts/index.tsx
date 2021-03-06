import React, { useEffect, FC, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Container, Row } from 'reactstrap';

import { PRODUCTS_QUERY } from '../../../../../../graphql/query';
import FeaturecProductsFill from '../../../../../../shared/components/FeatureProduct';

interface IFeaturesProducts {
  category: string;
}

const FeaturesProducts: FC<IFeaturesProducts> = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    variables: { categoryId: category },
  });
  useEffect(() => {
    if (data) {
      let { products, subCategories } = data.products;
      setProducts(products);
      setSubCategories(subCategories);
    }
  }, [data]);

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <Container>
      <Row style={{ marginTop: '4rem' }}>
        <FeaturecProductsFill
          subCategories={subCategories}
          products={products}
          addProduct={null}
        />
      </Row>
    </Container>
  );
};

export default FeaturesProducts;
