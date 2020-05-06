/* eslint-disable react/forbid-prop-types */
import React, { FC, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Input, FormGroup } from 'reactstrap';

import { SUBCATEGORIES_QUERY } from '../../../../../../../graphql/query';

import Product from '../../../../../../../shared/types/Product.types';

interface ISubCategorySelect {
  productData: Product;
  onSelect: (data: Product) => void;
}
const SubCategorySelect: FC<ISubCategorySelect> = ({
  onSelect,
  productData,
}) => {
  const [dataSelected, setDataSelected] = useState(
    productData ? productData.subCategory : ''
  );
  const { loading, error, data } = useQuery(SUBCATEGORIES_QUERY, {
    variables: { categoryId: productData ? productData.category : '' },
  });

  useEffect(() => {
    setDataSelected(productData ? productData.subCategory : '');
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
    const selectorData = { ...productData, subCategory: id };

    onSelect(selectorData);
  };

  const dataArr = data.subCategories;

  return productData && productData.category ? (
    <FormGroup>
      <Input
        type="select"
        onChange={(e) => handleOnChange(e)}
        value={dataSelected}
        required
      >
        <option value="">Select subcategory</option>
        {dataArr && dataArr.length > 0
          ? dataArr.map(({ _id, title }) => (
              <option key={_id} id={_id} value={_id}>
                {title}
              </option>
            ))
          : null}
      </Input>
    </FormGroup>
  ) : null;
};

export default SubCategorySelect;
