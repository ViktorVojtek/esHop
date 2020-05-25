import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';

import { CATEGORIES_QUERY } from '../../../../graphql/query';

import FeaturesProducts from './components/FeaturesProducts';


const ProductsMP: () => JSX.Element = () => {
  const [category, setCategory] = useState([]);
  const { error, loading, data } = useQuery(CATEGORIES_QUERY, {
    // fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      const { categories } = data;
      setCategory(categories);
    }
  }, [data]);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }


  return (
    <Container fluid>
      { category.length > 0 ?
      <FeaturesProducts category={category[0]._id} /> : null
      }
    </Container>
  );
};

export default ProductsMP;
