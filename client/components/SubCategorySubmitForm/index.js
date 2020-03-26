import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import { CREATE_SUBCATEGORY_MUTATION } from '../../app-data/graphql/mutation';
import { SUBCATEGORIES_QUERY } from '../../app-data/graphql/query';

const SubCategorySubmitForm = () => {
  const [createSubCategory] = useMutation(
    CREATE_SUBCATEGORY_MUTATION,
    {
      refetchQueries: [{ query: SUBCATEGORIES_QUERY }],
    },
  );

  const handleSubmitSubCategoryData = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const title = form.title.value;

    try {
      await createSubCategory({ variables: { title } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmitSubCategoryData}>
      <h5>SubCategory</h5>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="Insert category title"
        />
      </FormGroup>
      <FormGroup>
        <Button>Submit</Button>
      </FormGroup>
    </Form>
  );
};

export default SubCategorySubmitForm;
