/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Input, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';

const DynamicSelect = ({ query, category, onSelect, productData }) => {
  const [dataSelected, setDataSelected] = useState(
    (category ? productData.category : productData.subCategory) || ''
  );
  const { loading, error, data } = useQuery(query);

  useEffect(() => {
    setDataSelected(
      category
        ? productData.category
        : productData.subCategory
    );
  }, [category, productData]);

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
    let selectorData;

    if (category) {
      selectorData = { ...productData, category: id };
    } else {
      selectorData = { ...productData, subCategory: id };
    }

    onSelect(selectorData);
  };

  const dataArr = category ? data.categories : data.subCategories;

  return (
    <FormGroup>
      <Input type="select" onChange={handleOnChange} value={dataSelected}>
        <option>{category ? 'Select category' : 'Select sub category'}</option>
        {dataArr && dataArr.length > 0
          ? dataArr.map(({ _id, title }) => (
            <option
              key={_id}
              id={_id}
              value={_id}
            >
              {title}
            </option>
            ))
          : null}
      </Input>
    </FormGroup>
  );
};

DynamicSelect.defaultProps = {
  category: false,
};
DynamicSelect.propTypes = {
  query: PropTypes.object.isRequired,
  category: PropTypes.bool,
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

export default DynamicSelect;
