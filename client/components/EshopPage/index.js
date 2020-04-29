import React, { useState } from  'react';

import { Container, Row, Col } from 'reactstrap';
import CategoriesAside from './components/Categories';
import Products from './components/Products';

import { Wrapper } from './styles/eshoppage.style';


const EshopPage = () => {

  const [categoryID, setCategoryID] = useState('');

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col sm="3" xs="12">
            <CategoriesAside getCategory={setCategoryID} />
          </Col>
          <Col sm="9" xs="12">
            <Products categoryID={categoryID} />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default EshopPage;