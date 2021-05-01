import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { scroller } from 'react-scroll';
import styled from 'styled-components';
import { Context } from '../../../../../lib/state/Store';
import useViewport from '../../../../../shared/helpers/useViewport';

const Header = styled.div`
  border-bottom: 2px solid #e9e9e9;
  margin-bottom: 48px;
`;

const ActiveCategory = styled.h2`
  font-weight: 700;
  font-size: 2.5rem;
  margin-bottom: 36px;
`;

const RouteHolder = styled.div`
  display: flex;
`;

const SingleRoute = styled.p`
  color: black;
  font-size: 16px;
  cursor: pointer;
  margin-right: 8px;
  white-space: nowrap;
  span {
    margin-right: 8px;
    font-size: 12px;
  }
`;

export const BreadCrumb = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Context);
  const { category, subCategory } = state;
  const { width } = useViewport();

  const handleScroll = () => {
    scroller.scrollTo('products', {
      duration: 500,
      delay: 50,
      smooth: true,
      offset: -120,
    });
  };

  const handleNoCategory: () => void = () => {
    router.push({ pathname: '/eshop' });
    dispatch({ type: 'SET_CATEGORY', payload: { id: '', title: '' } });
    dispatch({ type: 'SET_SUBCATEGORY', payload: { id: '', title: '' } });
    if (width < 769) {
      handleScroll();
    }
  };

  const handleCategory: () => void = () => {
    router.push({ pathname: '/eshop', query: { category: category.title } });
    dispatch({ type: 'SET_SUBCATEGORY', payload: { id: '', title: '' } });
    if (width < 769) {
      handleScroll();
    }
  };

  const activeCategory = subCategory.title
    ? subCategory.title
    : category.title
    ? category.title
    : 'Obchod';

  return (
    <Header>
      <RouteHolder>
        <SingleRoute onClick={handleNoCategory}>Obchod</SingleRoute>
        {state.category.id && (
          <SingleRoute onClick={handleCategory}>
            <span>&gt;</span>
            {state.category.title}
          </SingleRoute>
        )}
        {state.subCategory.id && (
          <SingleRoute>
            <span>&gt;</span>
            {state.subCategory.title}
          </SingleRoute>
        )}
      </RouteHolder>
      <ActiveCategory>{activeCategory}</ActiveCategory>
    </Header>
  );
};
