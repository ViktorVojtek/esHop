/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  // Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import styled from 'styled-components';

import PropTypes from 'prop-types';

import { CREATE_PRODUCT_MUTATION, UPDATE_PRODUCT_MUTATION} from '../../../../../app-data/graphql/mutation';
import {
  PRODUCTS_QUERY,
  CATEGORIES_QUERY,
  SUBCATEGORIES_QUERY,
} from '../../../../../app-data/graphql/query';

import Modal from '../../../../../shared/components/Modal';

import DynamicSelect from './components/DataSelect';
import SubCategorySelect from './components/SubCategorySelect';
import ProductImages from './components/ProductImages';
import ProductVariant from './components/ProductVariant';

import { Context } from '../../../../../app-data/StateManagement/Store';

const Form = styled.form`
  background-color: #FCFDFF;
`;

const TitleInput = styled.input`
  background: transparent;
  outline: none;
  border: 0;
  font-size: 1.5em;
  margin: 1em .5em;
  color: #3F4B79;
  font-weight: 600;
`;

const ProductCreateForm = ({ productDataProp }) => {
  const [productData, setProductData] = useState(productDataProp || {});
  const [noVariant, setNoVariant] = useState(false);
  const [state, dispatch] = useContext(Context);
  
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
    console.log('Submit form');

    const { variant } = productData;

    if (!variant || variant.length < 1) {
      setNoVariant(true);
    } else {
      if (noVariant) {
        setNoVariant(false);
      }

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

          await updateProduct({ variables: { _id, productInput  } });
        }

        dispatch({ type: 'SET_MODAL', payload: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Modal>
        {
          Object.keys(productDataProp).length > 0
            ? <p>Product has been successfully updated</p>
            : <p>Product has been successfuly created.</p>
        }
      </Modal>
      {' '}
      <Form onSubmit={(e) => { handleSubmitProductData(e); }}>
        <TitleInput
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
        <DynamicSelect
          category
          query={CATEGORIES_QUERY}
          onSelect={handleSetProductData}
          productData={productData}
        />
        <SubCategorySelect
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
          noVariant={noVariant}
          productData={productData}
          handleProductData={handleSetProductData}
        />
        <ProductImages
          productData={productData}
          handleProductData={handleSetProductData}
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
          <Button
            color="primary"
            type="submit"
          >
            {Object.keys(productDataProp).length > 0 ? 'Update product' : 'Create product'}
          </Button>
        </FormGroup>
      </Form>
    </>
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
