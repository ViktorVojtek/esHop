/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Input, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';

import { SUBCATEGORIES_QUERY } from '../../../../../../../app-data/graphql/query';

const SubCategorySelect = ({ onSelect, productData }) => {
  const [dataSelected, setDataSelected] = useState(
    (productData.subCategory) || ''
  );
  const { loading, error, data } = useQuery(SUBCATEGORIES_QUERY, {
    variables: { categoryId: productData.category || '' }
  });

  useEffect(() => {
    setDataSelected(productData.subCategory);
  }, [productData]);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleOnChange = (event) => {
    const { id } = event.currentTarget.options[
      event.currentTarget.selectedIndex
    ];
    const selectorData = { ...productData, subCategory: id };

    onSelect(selectorData);
  };

  const dataArr = data.subCategories;

  return (
    productData && productData.category
      ? (
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
      ) : null
  );
};

SubCategorySelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  productData: PropTypes.shape({
    _id: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    discount: PropTypes.number,
    inStock: PropTypes.bool,
    modifiedByUserId: PropTypes.string,
    shortDescription: PropTypes.string,
    subCategory: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    note: PropTypes.string,
    title: PropTypes.string,
    variant: PropTypes.arrayOf(
      PropTypes.shape({
        default: PropTypes.bool,
        title: PropTypes.string,
        price: PropTypes.shape({
          currency: PropTypes.string,
          currencySign: PropTypes.string,
          discount: PropTypes.number,
          value: PropTypes.number,
        }),
      })
    ),
  }).isRequired,
};

export default SubCategorySelect;
