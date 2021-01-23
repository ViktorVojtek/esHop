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
import { DropdownToggleItem } from '../../../../../shared/design/dropdown';
import { useRouter } from 'next/router';

interface ICategory {
  title: string;
  id: string;
}

const Category: FC<ICategory> = ({ title, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();
  const { state, dispatch } = useContext(Context);

  const { loading, error, data } = useQuery(SUBCATEGORIES_QUERY, {
    variables: { categoryId: id || '' },
  });

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <></>;
  }

  const subCategoriesArray: any = data.subCategories;

  const handleSetActiveSubCategory: (id: string, title: string) => void = (
    id,
    title
  ) => {
    router.push({ pathname: '/eshop', query: { subcategory: title } });
    dispatch({ type: 'SET_SUBCATEGORY', payload: id });
  };
  const handleSetActiveCategory: (id: string) => void = (id) => {
    dispatch({ type: 'SET_CATEGORY', payload: id });
  };

  const subCategoryButtons: JSX.Element[] = subCategoriesArray.map(
    ({ _id, signFlag, title }) => (
      <DropdownItem
        key={signFlag}
        onClick={() => handleSetActiveSubCategory(_id, title)}
      >
        {title}
      </DropdownItem>
    )
  );

  return (
    <>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggleItem caret>{title}</DropdownToggleItem>
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
