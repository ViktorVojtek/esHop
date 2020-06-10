import React, { useState, FC } from 'react';
import {
  Container, Row, Col
} from 'reactstrap';

import { H3 } from './components/SubCategories/style/subCategories.style';

import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Slider } from '@material-ui/core';

import SubPageBackground from '../../../shared/components/SubPageBackground';
import CategoriesAside from './components/Categories';
import Products from './components/Products';

import { Wrapper } from './styles/eshoppage.style';

const muiTheme = createMuiTheme({
  overrides:{
    MuiSlider: {
      thumb:{
      color: "#00aeef",
      },
      track: {
        color: '#00aeef',
      },
      rail: {
        color: '#00aeefb8',
      }
    }
}
});

const EshopPage: FC = () => {
  const [subCategoryID, setSubCategoryID] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [priceRange, setPriceRange] = useState([0,100]);
 
  const handleChange = (event: React.UIEvent, newValue: Array<number>) => {
    setPriceRange(newValue);
  };

  return (
    <Wrapper>
      <SubPageBackground title="Obchod" imageUrl="/images/eshop/background.jpg"/>
      <Container>
        <Row>
          <Col sm="3" xs="12" className="pr-4">
            <CategoriesAside
              getCategory={setCategoryID}
              getSubCategory={setSubCategoryID}
            />
            <H3>Cena</H3>
            <ThemeProvider theme={muiTheme}>
              <Slider
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                step={1}
                className=""
              />
            </ThemeProvider>
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
