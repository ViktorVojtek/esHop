import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Selector from '../Selector';

import { SUBCATEGORIES_QUERY } from '../../../../../../../../graphql/query';

const SubcategorySelector: FC<{
  productData: any;
  setProductData: (data: any) => void;
}> = (props) => {
  const { productData, setProductData } = props;
  const [selected, setSelected] = useState('');
  const { error, loading, data } = useQuery(SUBCATEGORIES_QUERY, {
    variables: { categoryId: productData ? productData.categoryId : '' },
  });

  if (error) {
    return <>{error.message}</>;
  }

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  const { subCategories } = data;

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setSelected(event.target.value as string);
    setProductData({
      ...productData,
      subCategoryId: event.target.value as string,
    });
  };

  return (
    <Selector
      data={subCategories}
      change={handleChange}
      selected={selected}
      title="Subcategory"
    />
  );
};

export default SubcategorySelector;
