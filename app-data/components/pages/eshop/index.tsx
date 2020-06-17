import React, { useState, FC, useEffect } from 'react';
import {
  Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import Product from '../../../shared/types/Product.types';
import Link from 'next/link';

import { H3 } from './components/SubCategories/style/subCategories.style';

import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';

import SubPageBackground from '../../../shared/components/SubPageBackground';
import CategoriesAside from './components/Categories';
import Products from './components/Products';

import { Wrapper, HeadWithIcon, CartIcon } from './styles/eshoppage.style';
import { PRODUCTS_QUERY } from '../../../graphql/query';
import AsideCart from './components/AsideCart';

const EshopPage: FC = () => {
  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    // fetchPolicy: 'network-only',
  });

  const [subCategoryID, setSubCategoryID] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);


  useEffect(() => {
    if (data) {
       const { products } = data;

       setFilteredProducts(products);
       console.log(products);

      if (subCategoryID === '') {
        let newProducts = products.filter(
          (product: any) => product.category.id === categoryID
        );
        setFilteredProducts(newProducts);
        
      } else {
        let newProducts = products.filter(
          (product: any) => product.subCategory.id === subCategoryID
        );
        setFilteredProducts(newProducts);
      }
    }
  }, [subCategoryID, categoryID, data]);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  function sortByPriceMin(products: Product[]){
    products.sort(function(a,b){
      return a.variants[0].price.value - b.variants[0].price.value;
    });
    setFilteredProducts(products);
  }
  function sortByPriceMax(products: Product[]){
    products.sort(function(a,b){
      return a.variants[0].price.value - b.variants[0].price.value;
    });
    setFilteredProducts(products.reverse());
  }
  function sortByLetterUp(products: Product[]){
    products.sort(function(a,b){
      let nameA = a.variants[0].title.toUpperCase();
      let nameB = b.variants[0].title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setFilteredProducts(products);
  }
  function sortByLetterDown(products: Product[]){
    products.sort(function(a,b){
      let nameA = a.variants[0].title.toUpperCase();
      let nameB = b.variants[0].title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setFilteredProducts(products.reverse());
  }

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
            <H3>Filter</H3>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
                Zoradit podľa
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => sortByPriceMin(filteredProducts)}>Od najlacnejších</DropdownItem>
                <DropdownItem onClick={() => sortByPriceMax(filteredProducts)}>Od najdrahších</DropdownItem>
                <DropdownItem onClick={() => sortByLetterUp(filteredProducts)}>Vzostupne A-Z</DropdownItem>
                <DropdownItem onClick={() => sortByLetterDown(filteredProducts)}>Zostupne Z-A</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <HeadWithIcon>
              <H3 className="mb-0">Nákupný košík</H3>
              <Link href="/eshop/cart">
                <CartIcon />
              </Link>
            </HeadWithIcon>
            <AsideCart />
          </Col>
          <Col sm="9" xs="12">
            {/*
              Maybe in the future Products component will use the following prop:
              setProductsCount={setProductsCount}
            */}
            <Products products={filteredProducts} getProducts={setFilteredProducts} categoryID={categoryID} subCategoryID={subCategoryID} />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default EshopPage;
