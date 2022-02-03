/* eslint-disable no-underscore-dangle */
import React, { FC, useContext, useEffect, useState, Dispatch } from 'react';
import styled from 'styled-components';
import { Col, Dropdown, DropdownItem, DropdownMenu, Row } from 'reactstrap';
import { DropdownToggleItem } from '../../../../../../shared/design/dropdown';
import { InputIconHolder } from '../../../../eshop/styles/eshoppage';
import { ChevronDown } from '../../../../eshop/components/Category/CategoryIcons';
import Product from '../../../../../../shared/types/Product.types';

type SubcategoriesProps = {
  subCategories: any;
  filteredProducts: any[];
  setFilteredProducts: Dispatch<React.SetStateAction<any[]>>;
  products: any;
};

const SubCategoriesSelect: FC<SubcategoriesProps> = (
  props: SubcategoriesProps
) => {
  const { subCategories, setFilteredProducts, products } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const filterBySubCategory = (id: string) => {
    console.log(id);
    console.log(products);
    let newProducts = products.filter(
      (product: Product) => product.subCategory.id === id
    );
    return setFilteredProducts(newProducts);
  };

  const subCategoryButtons = subCategories.map((subCategory) => (
    <DropdownItem
      key={subCategory.id}
      onClick={() => filterBySubCategory(subCategory._id)}
    >
      {subCategory.title}
    </DropdownItem>
  ));

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <InputHolder>
        <DropdownToggleItem caret>Kategória</DropdownToggleItem>
        <InputIconHolder>
          <ChevronDown />
        </InputIconHolder>
      </InputHolder>
      <DropdownMenu>{subCategoryButtons}</DropdownMenu>
    </Dropdown>
  );
};

export default SubCategoriesSelect;

const InputHolder = styled.div`
  position: relative;
  margin-bottom: 8px;
`;
