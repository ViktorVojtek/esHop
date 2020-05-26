/* eslint-disable no-underscore-dangle */
import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Aside, H3, Button, Buttons } from './style/categories.style';
import { CATEGORIES_QUERY } from '../../../../../graphql/query';

interface ICategoriesAside {
  getCategory: Dispatch<SetStateAction<string>>;
  getSubCategory: Dispatch<SetStateAction<string>>;
}
const CategoriesAside: FC<ICategoriesAside> = ({
  getCategory,
  getSubCategory,
}) => {
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    if (data !== undefined) {
      const { categories } = data;
      setActiveCategory(categories[0]._id);
      getCategory(categories[0]._id);
    }
  }, [data, getCategory]);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <>loading</>;
  }

  const { categories } = data;

  const handleSetActiveCategory: (id: string) => void = (id) => {
    setActiveCategory(id);
    getCategory(id);
    getSubCategory('');
  };

  const categoryButtons = categories.map(({ signFlag, _id, title }) => (
    <Button
      key={signFlag}
      className={activeCategory === _id ? 'active' : 'not-active'}
      onClick={() => handleSetActiveCategory(_id)}
    >
      {title}
    </Button>
  ));

  return (
    <Aside>
      <Buttons>{categoryButtons}</Buttons>
    </Aside>
  );
};

export default CategoriesAside;
