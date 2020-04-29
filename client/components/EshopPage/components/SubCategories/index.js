/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Aside, H3, Button, Buttons } from './style/subCategories.style';
import { SUBCATEGORIES_QUERY } from '../../../../app-data/graphql/query';

const SubCategoriesAside = ({ getSubCategory }) => {
  const { error, loading, data } = useQuery(SUBCATEGORIES_QUERY);
  const [activeSubCategory, setActiveSubCategory] = useState('');
  useEffect(() => {
    if(data !== undefined){
      const { subCategories } = data;
      setActiveSubCategory(subCategories[0]._id);
      getSubCategory(subCategories[0]._id);
    }
  },[data, getSubCategory]);
  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const { subCategories } = data;

  const handleSetActiveCategory = (id) => {
    setActiveSubCategory(id);
    getSubCategory(id);
  }

  const categoryButtons = subCategories.map((item) => {
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