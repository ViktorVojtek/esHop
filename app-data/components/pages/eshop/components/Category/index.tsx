import React, { Dispatch, SetStateAction, useState, FC } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { SUBCATEGORIES_QUERY } from '../../../../../graphql/query';
import { useQuery } from '@apollo/react-hooks';

import { ButtonSubCategory, ButtonCategory, Buttons } from './style';

interface ICategory{
  title: string;
  id: string;
  getSubCategory: any;
}

const Category: FC<ICategory> = ({ title, id, getSubCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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

  console.log(subCategoriesArray);

  const handleSetActiveCategory: (id: string) => void = (id) => {
    console.log(id);
    setActiveSubCategory(id);
    getSubCategory(id);
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