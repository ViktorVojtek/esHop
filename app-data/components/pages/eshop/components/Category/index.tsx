import React, { Dispatch, SetStateAction, useState, FC, useContext } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { SUBCATEGORIES_QUERY } from '../../../../../graphql/query';
import { useQuery } from '@apollo/react-hooks';
import { Context } from '../../../../../lib/state/Store';

import { ButtonSubCategory, ButtonCategory, Buttons } from './style';

interface ICategory{
  title: string;
  id: string;
}

const Category: FC<ICategory> = ({ title, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { state, dispatch } = useContext(Context);
  const { subCategory } = state;

  const { loading, error, data } = useQuery(SUBCATEGORIES_QUERY, {
    variables: { categoryId: id || '' },
  });
  const [activeSubCategory, setActiveSubCategory] = useState('');

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <>loading</>;
  }

  const subCategoriesArray: any = data.subCategories;


  const handleSetActiveCategory: (id: string) => void = (id) => {
    console.log(id);
    setActiveSubCategory(id);
    dispatch({ type: 'SET_SUBCATEGORY', payload: id });
  };

  const subCategoryButtons: JSX.Element[] = subCategoriesArray.map(
    ({ _id, signFlag, title }) => (
      <ButtonSubCategory
        key={signFlag}
        className={activeSubCategory === _id ? 'active' : 'not-active'}
        onClick={() => handleSetActiveCategory(_id)}
      >
        {title}
      </ButtonSubCategory>
    )
  );

  return(
    <>
      <ButtonCategory onClick={toggle}>{title}</ButtonCategory>
      <Collapse isOpen={isOpen}>
        <Buttons>
          {subCategoryButtons}
        </Buttons>
      </Collapse>
    </>
  );
};

export default Category;