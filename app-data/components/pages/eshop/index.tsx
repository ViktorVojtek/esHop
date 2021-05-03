import React, { useState, FC, useEffect, useContext, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';

import CategoriesAside from './components/Categories';
import Products from './components/Products';

import {
  ActionHolder,
  FilterCol,
  InputHolder,
  InputIcon,
  InputIconHolder,
  SearchInput,
  Wrapper,
} from './styles/eshoppage';
import { PRODUCTS_QUERY } from '../../../graphql/query';
import { Context } from '../../../lib/state/Store';
import {
  sortByPriceMin,
  sortByLetterDown,
  sortByLetterUp,
  sortByPriceMax,
  sortActionProducts,
} from '../../../shared/helpers';
import Product from '../../../shared/types/Product.types';
import { DropdownToggleItem } from '../../../shared/design/dropdown';
import { SubCategoryType } from '../admin/settings/subcategory';
import { ProductsSkeleton } from './components/Products/components/ProductsSkeleton';
import { BreadCrumb } from './components/BreadCrumb';
import { ChevronDown } from './components/Category/CategoryIcons';

const EshopPage = () => {
  const queryMultiple = () => {
    const res1 = useQuery(PRODUCTS_QUERY);
    return [res1];
  };
  const [
    { error: error, loading: loading, data: productsData },
  ] = queryMultiple();

  const { state } = useContext(Context);
  const { category, subCategory } = state;
  const [subCategoriesDTO, setSubCategoriesDTO] = useState<SubCategoryType[]>(
    []
  );
  const searchInput = useRef(null);
  const [compareString, setCompareString] = useState('');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    if (productsData) {
      const { products, subCategories } = productsData.products;
      setSubCategoriesDTO(subCategories);

      if (subCategory.id === '' && category.id !== '') {
        filterByCategory(products);
      } else if (subCategory.id !== '') {
        filterBySubCategory(products);
      } else setFilteredProducts(products);
    }
  }, [subCategory, category, productsData]);

  if (error) {
    return <>{error.message}</>;
  }

  const filterByCategory = (products: Product[]) => {
    let newProducts = products.filter(
      (product: any) => product.category.id === category.id
    );
    return setFilteredProducts(newProducts);
  };
  const filterBySubCategory = (products: Product[]) => {
    let newProducts = products.filter(
      (product: Product) => product.subCategory.id === subCategory.id
    );
    return setFilteredProducts(newProducts);
  };

  const filterByName = () => {
    setCompareString(searchInput.current.value);
  };

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col>
            <BreadCrumb />
          </Col>
        </Row>
        <ActionHolder>
          <Row>
            <Col lg={3}></Col>
            <Col md={6}>
              <InputHolder>
                <SearchInput
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Vyhľadať produkt"
                  onChange={filterByName}
                  ref={searchInput}
                />
                <InputIconHolder>
                  <InputIcon src="/icons/lupa.svg" />
                </InputIconHolder>
              </InputHolder>
            </Col>
            <Col md={6} lg={3}>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <InputHolder>
                  <DropdownToggleItem caret>Zoradit podľa</DropdownToggleItem>
                  <InputIconHolder>
                    <ChevronDown />
                  </InputIconHolder>
                </InputHolder>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() =>
                      sortActionProducts(filteredProducts, setFilteredProducts)
                    }
                  >
                    Akciové
                  </DropdownItem>
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
        </ActionHolder>
        <Row>
          <FilterCol lg={3}>
            <CategoriesAside />
          </FilterCol>
          <Products
            loading={loading}
            products={filteredProducts}
            compareString={compareString}
            subCategories={subCategoriesDTO}
          />
        </Row>
      </Container>
    </Wrapper>
  );
};

export default EshopPage;
