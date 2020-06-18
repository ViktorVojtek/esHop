import React, { useState, FC, useEffect, useContext } from 'react';
import {
  Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Modal, ModalHeader, ModalBody, ModalFooter, Collapse,
} from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import Product from '../../../shared/types/Product.types';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';

import SubPageBackground from '../../../shared/components/SubPageBackground';
import CategoriesAside from './components/Categories';
import Products from './components/Products';

import { Wrapper, HeadWithIcon, CartIcon, StyledModalBtn, StyledModalLink, H3 } from './styles/eshoppage';
import { PRODUCTS_QUERY } from '../../../graphql/query';
import AsideCart from './components/AsideCart';
import { Context } from '../../../lib/state/Store';

const EshopPage: FC = () => {
  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    // fetchPolicy: 'network-only',
  });

  const { state, dispatch } = useContext(Context);
  const { category, subCategory } = state;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const toggleModal = () => setModal(!modal);

  const toggleCart = () => setIsOpen(!isOpen);

  const toggle = () => setDropdownOpen(prevState => !prevState);


  useEffect(() => {
    if (data) {
       const { products } = data;

       setFilteredProducts(products);
       console.log(category);

      if (subCategory === '') {
        let newProducts = products.filter(
          (product: any) => product.category.id === category
        );
        setFilteredProducts(newProducts);
        
      } else {
        let newProducts = products.filter(
          (product: any) => product.subCategory.id === subCategory
        );
        setFilteredProducts(newProducts);
      }
    }
  }, [subCategory, category, data]);

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
          <Col lg="3" md="4" xs="12" className="pr-4 hideMobile">
            <CategoriesAside/>
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
            <div>
              <HeadWithIcon onClick={toggleCart}>
                <H3 className="mb-0">Nákupný košík</H3>
                <CartIcon isOpen={isOpen} />
              </HeadWithIcon>
              <Collapse isOpen={isOpen}>
                <AsideCart />
              </Collapse>
            </div>
          </Col>
          <Col lg="9" md="8" className="mt-3">
            {/*
              Maybe in the future Products component will use the following prop:
              setProductsCount={setProductsCount}
            */}
            <Products
              products={filteredProducts}
              toggleModal={toggleModal}
            />
          </Col>
        </Row>
      </Container>
      <div>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Produkt bol pridaný do košíka</ModalHeader>
          <ModalBody>
            Pokračujte v nákupe alebo do pokladne.
          </ModalBody>
          <ModalFooter>
            <Link href="eshop/cart">
              <StyledModalLink color="primary">Do pokladne</StyledModalLink>
            </Link>
            <StyledModalBtn color="secondary" onClick={toggleModal}>Nakupovať</StyledModalBtn>
          </ModalFooter>
        </Modal>
      </div>
    </Wrapper>
  );
};

export default EshopPage;
