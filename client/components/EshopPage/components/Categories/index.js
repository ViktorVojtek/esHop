/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Aside, H3, Button, Buttons } from './style/categories.style';
import { CATEGORIES_QUERY } from '../../../../app-data/graphql/query';

const CategoriesAside = ({ getCategory }) => {
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);
  const [activeCategory, setActiveCategory] = useState('');
  useEffect(() => {
    if(data !== undefined){
      const { categories } = data;
      setActiveCategory(categories[0]._id);
      getCategory(categories[0]._id);
    }
  },[data, getCategory]);
  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const { categories } = data;

  const handleSetActiveCategory = (id) => {
    setActiveCategory(id);
    getCategory(id);
  }

  const categoryButtons = categories.map((item) => {
    return (
      <Button 
        key={item.signFlag} 
        className={activeCategory === item._id ? 'active' : 'not-active'}
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

export default CategoriesAside;