/* eslint-disable no-underscore-dangle */
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Aside, H3, Button, Buttons } from './style/subCategories.style';
import { SUBCATEGORIES_QUERY } from '../../../../../graphql/query';
import { Spinner } from 'reactstrap';

interface ISubCategoriesAside {
  getSubCategory: Dispatch<SetStateAction<string>>;
  categoryID: string;
}

const SubCategoriesAside: FC<ISubCategoriesAside> = ({
  getSubCategory,
  categoryID,
}) => {
  const { loading, error, data } = useQuery(SUBCATEGORIES_QUERY, {
    variables: { categoryId: categoryID || '' },
  });
  const [activeSubCategory, setActiveSubCategory] = useState('');

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <></>;
  }

  const subCategoriesArray: any = data.subCategories;

  const handleSetActiveCategory: (id: string) => void = (id) => {
    setActiveSubCategory(id);
    getSubCategory(id);
  };

  const categoryButtons: JSX.Element[] = subCategoriesArray.map(
    ({ _id, signFlag, title }) => (
      <Button
        key={signFlag}
        className={activeSubCategory === _id ? 'active' : 'not-active'}
        onClick={() => handleSetActiveCategory(_id)}
      >
        {title}
      </Button>
    )
  );

  return (
    <Aside>
      <H3>Kategórie</H3>
      <Buttons>{categoryButtons}</Buttons>
    </Aside>
  );
};

export default SubCategoriesAside;
