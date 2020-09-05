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
    variables: { categoryId: productData ? productData.category.id : '' },
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
    const nativeEvent: Event = event.nativeEvent;
    const title: string = (nativeEvent.target as HTMLButtonElement).dataset
      .name as string;

    setSelected(event.target.value as string);
    setProductData({
      ...productData,
      subCategory: {
        id: event.target.value as string,
        title,
      },
    });
  };
  const handleSetDefValue: (id: string) => void = (id) => {
    setSelected(id);
  };

  return (
    <Selector
      dataId={productData.subCategory.id}
      data={subCategories}
      change={handleChange}
      setDefault={handleSetDefValue}
      selected={selected}
      title="Subcategory"
    />
  );
};

export default SubcategorySelector;
