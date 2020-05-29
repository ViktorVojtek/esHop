import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Selector from '../Selector';

import { CATEGORIES_QUERY } from '../../../../../../../../graphql/query';

const CategorySelector: FC<{
  productData: any;
  setProductData: (data: any) => void;
}> = (props) => {
  const { productData, setProductData } = props;
  const [selected, setSelected] = useState('');
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  const { categories } = data;

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setSelected(event.target.value as string);
    setProductData({
      ...productData,
      categoryId: event.target.value as string,
    });
  };

  return (
    <Selector
      data={categories}
      change={handleChange}
      selected={selected}
      title="Category"
    />
  );
};

export default CategorySelector;
