import React from  'react';

import { Container, Row, Col } from 'reactstrap';
import CategoriesAside from './components/Categories';
import Products from './components/Products';

import { Wrapper } from './styles/eshoppage.style';


const EshopPage = () => {

  let categoryID;

  function getCategory(category){
    categoryID = category;
    console.log(categoryID);
  }


  

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col sm="3" xs="12">
            <CategoriesAside getCategory={getCategory} />
          </Col>
          <Col sm="9" xs="12">
            <Products />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default EshopPage;