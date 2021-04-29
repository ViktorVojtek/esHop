import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';

import { CATEGORIES_QUERY } from '../../../../graphql/query';

import FeaturesProducts from './components/FeaturesProducts';
import styled from 'styled-components';

const H2 = styled.h2`
  color: black;
  text-align: center;
  font-weight: 700;
  font-size: 2rem;
  margin-top: 32px;
`;

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

  return (
    <Container fluid>
      {category.length > 0 ? (
        <>
          <H2>Vybrané produkty</H2>
          <FeaturesProducts category={category[0]._id} />
        </>
      ) : null}
    </Container>
  );
};

export default ProductsMP;
