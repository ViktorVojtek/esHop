import React, { useState, FC, useContext, useEffect } from 'react';
import { Collapse } from 'reactstrap';
import { Context } from '../../../../../lib/state/Store';

import { useRouter } from 'next/router';
import styled from 'styled-components';
import { colors } from '../../../../../shared/design';
import {
  ChevronDown,
  CustomChecboxIcon,
  GiftButton,
  ServiceButton,
} from './CategoryIcons';
import useViewport from '../../../../../shared/helpers/useViewport';
import { scroller } from 'react-scroll';

interface ICategory {
  title: string;
  id: string;
  subCategoriesArray: any;
}

type ButtonProps = {
  isOpen: boolean;
};

const CategoryButton = styled.div<ButtonProps>`
  background-color: ${colors.primary};
  border-radius: 8px;
  font-size: 1rem;
  padding: 14px 16px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease-out;
  svg {
    stroke: white;
    fill: white;
    transition: all 0.3s ease-out;
  }
  &:hover {
    background-color: ${colors.primaryHover};
  }
  .chevron-down {
    transition: transform 0.3s ease-out;
    transform: ${({ isOpen }) => (isOpen ? 'scaleY(-1)' : 'scaleY(1)')};
  }
`;

const SubCategory = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 16px 0;
  font-size: 1rem;
  border-bottom: 1px solid #e6e6e6;
  &:last-child {
    border: none;
  }
`;

const SubCategoryTitle = styled.p`
  color: ${colors.primary};
  width: 100%;
  text-align: center;
  margin: 0;
`;

type ActiveProps = {
  active: boolean;
};

const SubCategoryCheckbox = styled.div<ActiveProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  .inner-circle {
    transition: transform 0.3s ease-out;
    transform-origin: center;
    transform: ${({ active }) => (active ? 'scale(1)' : 'scale(0)')};
  }
`;

const StyledCollapse = styled(Collapse)`
  padding: 0 24px;
`;

const CategoryUI: FC<ICategory> = ({ title, id, subCategoriesArray }) => {
  const { state, dispatch } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { width } = useViewport();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(state.category.id === id);
    if (router.query.subcategory) {
      subCategoriesArray.map((subCategory) => {
        if (subCategory.title === router.query.subcategory) {
          dispatch({
            type: 'SET_SUBCATEGORY',
            payload: { id: subCategory._id, title: subCategory.title },
          });
        }
      });
    }
  }, []);

  const handleScroll = () => {
    scroller.scrollTo('products', {
      duration: 500,
      delay: 50,
      smooth: true,
      offset: -120,
    });
  };

  const handleSetActiveSubCategory: (
    subCategoryId: string,
    subCategoryTitle: string
  ) => void = (subCategoryId, subCategoryTitle) => {
    router.push({
      pathname: '/eshop',
      query: { category: title, subcategory: subCategoryTitle },
    });
    dispatch({ type: 'SET_CATEGORY', payload: { id, title } });
    dispatch({
      type: 'SET_SUBCATEGORY',
      payload: { id: subCategoryId, title: subCategoryTitle },
    });
    if (width < 769) {
      handleScroll();
    }
  };
  const handleSetActiveCategory: (id: string) => void = (id) => {
    router.push({ pathname: '/eshop', query: { category: title } });
    dispatch({ type: 'SET_CATEGORY', payload: { id, title } });
    dispatch({ type: 'SET_SUBCATEGORY', payload: { id: '', title: '' } });
    if (width < 769) {
      handleScroll();
    }
  };

  const subCategoryButtons: JSX.Element[] = subCategoriesArray.map(
    ({ _id, signFlag, title }) => (
      <SubCategory
        key={signFlag}
        onClick={() => handleSetActiveSubCategory(_id, title)}
      >
        <SubCategoryCheckbox active={state.subCategory.id === _id}>
          <CustomChecboxIcon />
        </SubCategoryCheckbox>
        <SubCategoryTitle>{title}</SubCategoryTitle>
      </SubCategory>
    )
  );
  return (
    <>
      <CategoryButton isOpen={isOpen} onClick={toggle}>
        {title === 'Produkty' ? <GiftButton /> : <ServiceButton />}
        {title}
        <ChevronDown />
      </CategoryButton>
      <StyledCollapse isOpen={isOpen}>
        <SubCategory onClick={() => handleSetActiveCategory(id)}>
          <SubCategoryCheckbox
            active={state.category.id === id && state.subCategory.id === ''}
          >
            <CustomChecboxIcon />
          </SubCategoryCheckbox>
          <SubCategoryTitle>Vybrať všetko</SubCategoryTitle>
        </SubCategory>
        {subCategoryButtons}
      </StyledCollapse>
    </>
  );
};

export default CategoryUI;
