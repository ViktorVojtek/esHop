/* eslint-disable no-param-reassign */
import React, { FC, useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, FormGroup, Label, Input } from 'reactstrap';
// import PropTypes from 'prop-types';

import {
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
} from '../../../../../graphql/mutation';
import { PRODUCTS_QUERY } from '../../../../../graphql/query';

import Modal from '../../../../../shared/components/Modal';

import CategorySelect from './components/CategorySelect';
import SubCategorySelect from './components/SubCategorySelect';
import ProductImages from './components/ProductImages';
import ProductVariant from './components/ProductVariant';

import { Context } from '../../../../../lib/state/Store';

import { Form, TitleInput } from './style/ProductForm.styles';

import Product from '../../../../../shared/types/Product.types';

interface IProductCreateForm {
  productDataProp?: Product;
}

const initialProductDataState: Product = {
  _id: '',
  category: '',
  dateCreated: '',
  dateDeleted: '',
  dateModified: '',
  description: '',
  inStock: false,
  modifiedByUserId: '',
  shortDescription: '',
  subCategory: '',
  images: [],
  note: '',
  title: '',
  variant: [],
};
const ProductCreateForm: FC<IProductCreateForm> = ({ productDataProp }) => {
  const [productData, setProductData] = useState(
    productDataProp ? productDataProp : initialProductDataState
  );
  const [noVariant, setNoVariant] = useState(false);
  const { dispatch } = useContext(Context);

  useEffect(() => {
    setProductData(productDataProp ? productDataProp : initialProductDataState);
  }, [productDataProp]);

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });

  const handleSetProductData: (data: Product) => void = (data) => {
    setProductData(data);
  };

  const handleSubmitProductData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const { variant } = productData as Product;

    if (!variant || variant.length < 1) {
      setNoVariant(true);
    } else {
      if (noVariant) {
        setNoVariant(false);
      }

      const {
        _id: strippedID,
        dateCreated,
        dateDeleted,
        dateModified,
        modifiedByUserId,
        ...productInput
      } = productData as Product;

      try {
        if (productDataProp) {
          const { _id } = productDataProp;

          await updateProduct({ variables: { _id, productInput } });
        } else {
          await createProduct({ variables: { productInput } });
        }

        dispatch({ type: 'SET_MODAL', payload: true });
        setProductData({
          ...initialProductDataState,
          images: [],
          variant: [],
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Modal>
        {productDataProp && Object.keys(productDataProp).length > 0 ? (
          <p>Product has been successfully updated</p>
        ) : (
          <p>Product has been successfuly created.</p>
        )}
      </Modal>{' '}
      <Form
        onSubmit={(e) => {
          handleSubmitProductData(e);
        }}
      >
        <TitleInput
          id="title"
          type="text"
          placeholder="Insert product title"
          onChange={(event) => {
            handleSetProductData({
              ...(productData as Product),
              title: event.currentTarget.value,
            });
          }}
          value={productData.title}
        />
        <CategorySelect
          onSelect={handleSetProductData}
          productData={productData as Product}
        />
        <SubCategorySelect
          onSelect={handleSetProductData}
          productData={productData as Product}
        />
        <FormGroup>
          <Input
            type="textarea"
            id="shortDescription"
            name="shortDescription"
            placeholder="Short description"
            onChange={(event) => {
              handleSetProductData({
                ...(productData as Product),
                shortDescription: event.currentTarget.value,
              });
            }}
            value={productData.shortDescription}
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
                ...(productData as Product),
                description: event.currentTarget.value,
              });
            }}
            value={productData.description}
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
                ...(productData as Product),
                note: event.currentTarget.value,
              });
            }}
            value={productData.note}
          />
        </FormGroup>
        <ProductVariant
          noVariant={noVariant}
          productData={productData as Product}
          handleProductData={handleSetProductData}
        />
        <ProductImages
          productData={productData as Product}
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
                    ...(productData as Product),
                    inStock: event.currentTarget.checked,
                  });
                }}
                checked={productData.inStock}
              />
              Is product in stock?
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">
            {productDataProp && Object.keys(productDataProp).length > 0
              ? 'Update product'
              : 'Create product'}
          </Button>
        </FormGroup>
      </Form>
    </>
  );
};

export default ProductCreateForm;
