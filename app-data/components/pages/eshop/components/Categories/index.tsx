/* eslint-disable no-underscore-dangle */
import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from 'react';
import { Collapse } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { Aside, H3, Button, Buttons } from './style/categories.style';
import { CATEGORIES_QUERY } from '../../../../../graphql/query';
import Category from '../Category';
import { Context } from '../../../../../lib/state/Store';

const CategoriesAside: FC = () => {
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);
  const [activeCategory, setActiveCategory] = useState('');
  const { state, dispatch } = useContext(Context);
  const { category } = state;

  useEffect(() => {
    if (data !== undefined) {
      const { categories } = data;
      dispatch({ type: 'SET_CATEGORY', payload: categories[0]._id });
    }
  }, [data, category]);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <>loading</>;
  }

  const { categories } = data;

  const handleSetActiveCategory: (id: string) => void = (id) => {
    dispatch({ type: 'SET_CATEGORY', payload: id });
  };

  const categoryButtons = categories.map(({ signFlag, _id, title }) => (
    <Category
     key={_id}
     title={title}
     id={_id}
    />
  ));

  return (
    <Aside>
      <Buttons>{categoryButtons}</Buttons>
    </Aside>
  );
};

export default CategoriesAside;
