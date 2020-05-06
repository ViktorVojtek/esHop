/* eslint-disable react/forbid-prop-types */
import React, { FC, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Input, FormGroup } from 'reactstrap';

import { CATEGORIES_QUERY } from '../../../../../../../graphql/query';
import Product from '../../../../../../../shared/types/Product.types';

interface ICategorySelect {
  productData: Product;
  onSelect: (data: Product) => void;
}
const CategorySelect: FC<ICategorySelect> = ({ onSelect, productData }) => {
  const [dataSelected, setDataSelected] = useState(
    productData ? productData.category : ''
  );
  const { loading, error, data } = useQuery(CATEGORIES_QUERY);

  useEffect(() => {
    setDataSelected(productData ? productData.category : '');
  }, [productData]);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event
  ) => {
    const { id } = ((event as React.ChangeEvent<unknown>) as React.ChangeEvent<
      HTMLSelectElement
    >).currentTarget.options[
      ((event as React.ChangeEvent<unknown>) as React.ChangeEvent<
        HTMLSelectElement
      >).currentTarget.selectedIndex
    ];

    const selectorData: Product = { ...productData, category: id };

    onSelect(selectorData);
  };

  const dataArr = data.categories;

  return (
    <FormGroup>
      <Input
        type="select"
        onChange={(e) => handleOnChange(e)}
        value={dataSelected}
      >
        <option>Select category</option>
        {dataArr && dataArr.length > 0
          ? dataArr.map(({ _id, title }) => (
              <option key={_id} id={_id} value={_id}>
                {title}
              </option>
            ))
          : null}
      </Input>
    </FormGroup>
  );
};

export default CategorySelect;
