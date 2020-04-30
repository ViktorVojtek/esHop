/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import { CREATE_SUBCATEGORY_MUTATION } from '../../../../../app-data/graphql/mutation';
import { SUBCATEGORIES_QUERY, CATEGORIES_QUERY } from '../../../../../app-data/graphql/query';

const SubCategorySubmitForm = () => {
  const [createSubCategory] = useMutation(
    CREATE_SUBCATEGORY_MUTATION,
    {
      refetchQueries: [{ query: SUBCATEGORIES_QUERY }],
    },
  );
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const handleSubmitSubCategoryData = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const title = form.title.value;
    const categoryId = form.categoryForSubCategorySelect[form.categoryForSubCategorySelect.selectedIndex].value;

    try {
      await createSubCategory({ variables: { categoryId, title } });
    } catch (err) {
      console.log(err);
    }
  };

  const { categories } = data;

  return (
    <Form onSubmit={(e) => handleSubmitSubCategoryData(e)}>
      <h5>Create Subcategory</h5>
      <FormGroup>
        <Input
          type="select"
          name="categoryForSubCategorySelect"
          id="categoryForSubCategorySelect"
          required
        >
          <option value="">Select category</option>
          {
          categories && categories.length > 0
            ? categories.map((item) => {
              return <option key={item._id} value={item._id}>{item.title}</option>;
            })
            : null
          }
        </Input>
      </FormGroup>
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
