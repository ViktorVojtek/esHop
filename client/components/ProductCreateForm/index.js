import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import { CREATE_PRODUCT_MUTATION } from '../../app-data/graphql/mutation';
import { PRODUCT_QUERY } from '../../app-data/graphql/query';

const ProductCreateForm = () => {
  const [createProduct] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      refetchQueries: [{ query: PRODUCT_QUERY }],
    },
  );

  const handleSubmitProductData = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const title = form.title.value;

    try {
      // await createProduct({ variables: { title } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmitProductData}>
      <h5>Products</h5>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Insert product title"
        />
      </FormGroup>
      <FormGroup>
        <Button>Submit</Button>
      </FormGroup>
    </Form>
  );
};

export default ProductCreateForm;
