import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';

import SubCategoriesAside from './components/SubCategories';
import CategoriesAside from './components/Categories';
import Products from './components/Products';

import { Wrapper } from './styles/eshoppage.style';

const EshopPage: () => JSX.Element = () => {
  const [subCategoryID, setSubCategoryID] = useState('');
  const [categoryID, setCategoryID] = useState('');
  // const [productsCount, setProductsCount] = useState(0);

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col sm="3" xs="12">
            <CategoriesAside
              getCategory={setCategoryID}
              getSubCategory={setSubCategoryID}
            />
            <SubCategoriesAside
              getSubCategory={setSubCategoryID}
              categoryID={categoryID}
            />
          </Col>
          <Col sm="9" xs="12">
            {/*
              Maybe in the future Products component will use the following prop:
              setProductsCount={setProductsCount}
            */}
            <Products categoryID={categoryID} subCategoryID={subCategoryID} />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default EshopPage;
