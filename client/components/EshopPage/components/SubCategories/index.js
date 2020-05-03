/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Aside, H3, Button, Buttons } from './style/subCategories.style';
import { SUBCATEGORIES_QUERY } from '../../../../app-data/graphql/query';

const SubCategoriesAside = ({ getSubCategory, categoryID }) => {
  const { loading, error, data } = useQuery(SUBCATEGORIES_QUERY, {
    variables: { categoryId: categoryID || '' }
  });
  const [activeSubCategory, setActiveSubCategory] = useState('');
  
  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const subCategoriesArray = data.subCategories;

  const handleSetActiveCategory = (id) => {
    setActiveSubCategory(id);
    getSubCategory(id);
  }

  const categoryButtons = subCategoriesArray.map((item) => {
    return (
      <Button 
        key={item.signFlag} 
        className={activeSubCategory === item._id ? 'active' : 'not-active'}
        onClick={() => handleSetActiveCategory(item._id)}
      >
        {item.title}
      </Button>
    );
  });

  return (
    <Aside>
      <H3>Kategórie</H3>
      <Buttons>
        {categoryButtons}
      </Buttons>
    </Aside>
  );
};

export default SubCategoriesAside;