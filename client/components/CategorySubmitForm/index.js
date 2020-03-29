import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import { CREATE_CATEGORY_MUTATION } from '../../app-data/graphql/mutation';
import { CATEGORIES_QUERY } from '../../app-data/graphql/query';

import { Context } from '../../app-data/StateManagement/Store';

const CategorySubmitForm = () => {
  const [state, dispatch] = useContext(Context);
  const [createCategory] = useMutation(
    CREATE_CATEGORY_MUTATION,
    {
      refetchQueries: [{ query: CATEGORIES_QUERY }],
    },
  );

  const handleSubmitCategoryData = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const title = form.title.value;

    try {
      await createCategory({ variables: { title } });

      dispatch({ type: 'SET_MODAL', payload: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmitCategoryData}>
      <h5>Category</h5>
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

export default CategorySubmitForm;
