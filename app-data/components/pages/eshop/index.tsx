import React, {
  useState,
  FC,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
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
  FormGroup,
  Input,
} from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import CategoriesAside from './components/Categories';
import Products from './components/Products';

import { Wrapper, StyledModalBtn, StyledModalLink } from './styles/eshoppage';
import { PRODUCTS_QUERY, SERVICES_QUERY } from '../../../graphql/query';
import { Context } from '../../../lib/state/Store';
import {
  sortByPriceMin,
  sortByLetterDown,
  sortByLetterUp,
  sortByPriceMax,
} from '../../../shared/helpers';
import Product from '../../../shared/types/Product.types';
import CustomSpinner from '../../../shared/components/CustomSpinner/CustomerSpinner';
import { DropdownToggleItem } from '../../../shared/design/dropdown';

const EshopPage: FC = () => {
  const queryMultiple = () => {
    const res1 = useQuery(PRODUCTS_QUERY);
    const res2 = useQuery(SERVICES_QUERY);
    return [res1, res2];
  };
  const [
    { error: error, loading: loading, data: productsData },
    { error: error2, loading: loading2, data: servicesData },
  ] = queryMultiple();
  const { state, dispatch } = useContext(Context);
  const { category, subCategory } = state;
  const searchInput = useRef(null);
  const [compareString, setCompareString] = useState('');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (productsData && servicesData) {
      const { products } = productsData;
      const { services } = servicesData;
      let allProducts = products.concat(services);

      if (subCategory === '' && category !== '') {
        filterByCategory(allProducts);
      } else if (subCategory !== '') {
        filterBySubCategory(allProducts);
      } else setFilteredProducts(allProducts);
    }
  }, [subCategory, category, productsData, servicesData]);

  if (error) {
    return <>{error.message}</>;
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

  const filterByName = () => {
    setCompareString(searchInput.current.value);
  };

  return (
    <Wrapper>
      {/*<SubPageBackground title="" imageUrl="/images/eshop/background.png" />*/}
      <Container>
        <Row className="d-flex justify-content-between mb-4">
          <Col sm="6">
            <Row>
              <CategoriesAside />
            </Row>
          </Col>
          <Col sm="6">
            <Row>
              <Col md="6" className="mb-2">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggleItem caret>Zoradit podľa</DropdownToggleItem>
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
              <Col md="6" className="mb-2">
                <FormGroup>
                  <Input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Vyhľadávať"
                    onChange={filterByName}
                    innerRef={searchInput}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            {/*
              Maybe in the future Products component will use the following prop:
              setProductsCount={setProductsCount}
            */}
            {loading && <CustomSpinner />}
            <Products
              products={filteredProducts}
              toggleModal={toggleModal}
              compareString={compareString}
            />
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
