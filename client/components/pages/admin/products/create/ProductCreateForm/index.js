/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { CREATE_PRODUCT_MUTATION, UPDATE_PRODUCT_MUTATION} from '../../../../../../app-data/graphql/mutation';
import {
  PRODUCTS_QUERY,
  CATEGORIES_QUERY,
  SUBCATEGORIES_QUERY,
} from '../../../../../../app-data/graphql/query';

import DynamicSelect from './components/DataSelect';
import ProductImages from './components/ProductImages';
import ProductVariant from './components/ProductVariant';

const ProductCreateForm = ({ productDataProp }) => {
  // console.log(productDataProp);
  const [productData, setProductData] = useState(productDataProp || {});
  
  useEffect(() => {
    setProductData(productDataProp);
  }, [productDataProp]);

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });

  const handleSetProductData = (data) => {
    setProductData(data);
  };

  const handleSubmitProductData = async (event) => {
    event.preventDefault();

    try {
      if (Object.keys(productDataProp).length === 0) {
        await createProduct({ variables: { productInput: productData } });
      } else {
        const { _id } = productDataProp;

        const {
          _id: strippedID,
          dateCreated,
          dateModified,
          ...productInput
        } = productData;

        console.log(productInput);

        // await updateProduct({ variables: { _id, productInput  } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmitProductData}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Insert product title"
          onChange={(event) => {
            handleSetProductData({
              ...productData,
              title: event.currentTarget.value,
            });
          }}
          value={productData.title || ''}
        />
      </FormGroup>
      <DynamicSelect
        category
        query={CATEGORIES_QUERY}
        onSelect={handleSetProductData}
        productData={productData}
      />
      <DynamicSelect
        query={SUBCATEGORIES_QUERY}
        onSelect={handleSetProductData}
        productData={productData}
      />
      <FormGroup>
        <Input
          type="textarea"
          id="shortDescription"
          name="shortDescription"
          placeholder="Short description"
          onChange={(event) => {
            handleSetProductData({
              ...productData,
              shortDescription: event.currentTarget.value,
            });
          }}
          value={productData.shortDescription || ''}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="textarea"
          id="description"
          name="description"
          placeholder="Description"
          onChange={(event) => {
            handleSetProductData({
              ...productData,
              description: event.currentTarget.value,
            });
          }}
          value={productData.description || ''}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="textarea"
          id="note"
          name="note"
          placeholder="Note"
          onChange={(event) => {
            handleSetProductData({
              ...productData,
              note: event.currentTarget.value,
            });
          }}
          value={productData.note || ''}
        />
      </FormGroup>
      <ProductVariant
        productData={productData}
        handleProductData={setProductData}
      />
      <ProductImages
        productData={productData}
        handleProductData={setProductData}
      />
      <FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              id="inStock"
              name="inStock"
              onChange={(event) => {
                handleSetProductData({
                  ...productData,
                  inStock: event.currentTarget.checked,
                });
              }}
              checked={productData.inStock || false}
            />
            Is product in stock?
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Button>Submit</Button>
      </FormGroup>
    </Form>
  );
};

ProductCreateForm.defaultProps = {
  productDataProp: {},
};
ProductCreateForm.propTypes = {
  productDataProp: PropTypes.shape({
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
  }),
}; 

export default ProductCreateForm;
