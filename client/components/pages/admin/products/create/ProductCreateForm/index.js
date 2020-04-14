import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  // InputGroup,
  // InputGroupAddon,
} from 'reactstrap';

import { CREATE_PRODUCT_MUTATION } from '../../../../../../app-data/graphql/mutation';
import {
  PRODUCT_QUERY,
  CATEGORIES_QUERY,
  SUBCATEGORIES_QUERY,
} from '../../../../../../app-data/graphql/query';

import DynamicSelect from './components/DataSelect';
import ProductImages from './components/ProductImages';
// import CurrencyBadge from './components/CurrencyBadge';
import ProductVariant from './components/ProductVariant';

const ProductCreateForm = () => {
  const [productData, setProductData] = useState({});
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCT_QUERY }],
  });

  const handleSetProductData = (data) => {
    setProductData(data);
  };

  const handleSubmitProductData = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const newProduct = {
      ...productData,
      title: form.title.value,
      shortDescription: form.shortDescription.value,
      description: form.description.value,
      note: form.note.value,
      inStock: form.inStock.checked,
    };

    console.log(newProduct);

    try {
      await createProduct({ variables: { productInput: newProduct } });
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(productData);

  return (
    <Form onSubmit={handleSubmitProductData}>
      <h5>Products</h5>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input id="title" type="text" placeholder="Insert product title" />
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
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="textarea"
          id="description"
          name="description"
          placeholder="Description"
        />
      </FormGroup>
      <FormGroup>
        <Input type="textarea" id="note" name="note" placeholder="Note" />
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

export default ProductCreateForm;
