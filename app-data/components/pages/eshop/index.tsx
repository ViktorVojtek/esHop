import React, { useState, FC, useEffect, useContext, useCallback } from 'react';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import SubPageBackground from '../../../shared/components/SubPageBackground';
import CategoriesAside from './components/Categories';
import Products from './components/Products';

import {
  Wrapper,
  StyledModalBtn,
  StyledModalLink,
  H3,
} from './styles/eshoppage';
import { PRODUCTS_QUERY } from '../../../graphql/query';
import { Context } from '../../../lib/state/Store';
import {
  sortByPriceMin,
  sortByLetterDown,
  sortByLetterUp,
  sortByPriceMax,
} from '../../../shared/helpers';
import Product from '../../../shared/types/Product.types';

const EshopPage: FC = () => {
  const { error, loading, data } = useQuery(PRODUCTS_QUERY, {
    // fetchPolicy: 'network-only',
  });

  const { state, dispatch } = useContext(Context);
  const { category, subCategory } = state;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (data) {
      const { products } = data;

      if (subCategory === '' && category !== '') {
        filterByCategory(products);
      } else if (subCategory !== '') {
        filterBySubCategory(products);
      } else setFilteredProducts(products);
    }
  }, [subCategory, category, data]);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <Spinner color="primary" />;
  }

  const filterByCategory = (products: Product[]) => {
    let newProducts = products.filter(
      (product: any) => product.category.id === category
    );
    return setFilteredProducts(newProducts);
  };
  const filterBySubCategory = (products: Product[]) => {
    let newProducts = products.filter(
      (product: Product) => product.subCategory.id === subCategory
    );
    return setFilteredProducts(newProducts);
  };

  return (
    <Wrapper>
      <SubPageBackground title="" imageUrl="/images/eshop/background.png" />
      <Container>
        <Row className="d-flex justify-content-between mb-4">
          <Col sm="6">
            <Row>
              <CategoriesAside />
            </Row>
          </Col>
          <Col md="3" sm="6">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>Zoradit podľa</DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={() =>
                    sortByPriceMin(filteredProducts, setFilteredProducts)
                  }
                >
                  Od najlacnejších
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    sortByPriceMax(filteredProducts, setFilteredProducts)
                  }
                >
                  Od najdrahších
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    sortByLetterUp(filteredProducts, setFilteredProducts)
                  }
                >
                  Vzostupne A-Z
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    sortByLetterDown(filteredProducts, setFilteredProducts)
                  }
                >
                  Zostupne Z-A
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            {/*
              Maybe in the future Products component will use the following prop:
              setProductsCount={setProductsCount}
            */}
            <Products products={filteredProducts} toggleModal={toggleModal} />
          </Col>
        </Row>
      </Container>
      <div>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            Produkt bol pridaný do košíka
          </ModalHeader>
          <ModalBody>Pokračujte v nákupe alebo do pokladne.</ModalBody>
          <ModalFooter>
            <Link href="eshop/cart">
              <StyledModalLink color="primary">Do pokladne</StyledModalLink>
            </Link>
            <StyledModalBtn color="secondary" onClick={toggleModal}>
              Nakupovať
            </StyledModalBtn>
          </ModalFooter>
        </Modal>
      </div>
    </Wrapper>
  );
};

export default EshopPage;
