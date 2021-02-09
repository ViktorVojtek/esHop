import React, { useState, FC, useEffect, useContext, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Input,
} from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';

import CategoriesAside from './components/Categories';
import Products from './components/Products';

import { Wrapper } from './styles/eshoppage';
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
import CustomSpinner from '../../../shared/components/CustomSpinner/CustomerSpinner';
import { DropdownToggleItem } from '../../../shared/design/dropdown';
import { SubCategoryType } from '../admin/settings/subcategory';

const EshopPage: FC = () => {
  const queryMultiple = () => {
    const res1 = useQuery(PRODUCTS_QUERY);
    return [res1];
  };
  const [
    { error: error, loading: loading, data: productsData },
  ] = queryMultiple();
  const { state, dispatch } = useContext(Context);
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

      if (subCategory === '' && category !== '') {
        filterByCategory(products);
      } else if (subCategory !== '') {
        filterBySubCategory(products);
      } else setFilteredProducts(products);
    }
  }, [subCategory, category, productsData]);

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
                        sortActionProducts(
                          filteredProducts,
                          setFilteredProducts
                        )
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
          <Col>
            <Products
              products={filteredProducts}
              compareString={compareString}
              subCategories={subCategoriesDTO}
            />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default EshopPage;
