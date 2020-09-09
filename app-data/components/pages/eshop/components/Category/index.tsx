import React, {
  Dispatch,
  SetStateAction,
  useState,
  FC,
  useContext,
} from 'react';
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from 'reactstrap';
import { SUBCATEGORIES_QUERY } from '../../../../../graphql/query';
import { useQuery } from '@apollo/react-hooks';
import { Context } from '../../../../../lib/state/Store';

import { ButtonSubCategory, ButtonCategory, Buttons } from './style';

interface ICategory {
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

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <Spinner color="primary" />;
  }

  const subCategoriesArray: any = data.subCategories;

  const handleSetActiveSubCategory: (id: string) => void = (id) => {
    dispatch({ type: 'SET_SUBCATEGORY', payload: id });
  };
  const handleSetActiveCategory: (id: string) => void = (id) => {
    dispatch({ type: 'SET_CATEGORY', payload: id });
  };

  const subCategoryButtons: JSX.Element[] = subCategoriesArray.map(
    ({ _id, signFlag, title }) => (
      <DropdownItem
        key={signFlag}
        onClick={() => handleSetActiveSubCategory(_id)}
      >
        {title}
      </DropdownItem>
    )
  );

  return (
    <>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle caret>{title}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleSetActiveCategory(id)}>
            Všetko
          </DropdownItem>
          {subCategoryButtons}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default Category;
