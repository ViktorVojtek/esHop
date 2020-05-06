import React, { FC, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { CREATE_CATEGORY_MUTATION } from '../../../../../graphql/mutation';
import { CATEGORIES_QUERY } from '../../../../../graphql/query';

import { Context } from '../../../../../lib/state/Store';

const CategorySubmitForm: FC = () => {
  const { state, dispatch } = useContext(Context);
  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  });

  const handleSubmitCategoryData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const title = (document.getElementById('title') as HTMLInputElement).value;

    try {
      await createCategory({ variables: { title } });
    } catch ({ message }) {
      dispatch({ type: 'SET_ERROR', payload: message });
      dispatch({ type: 'SET_MODAL', payload: true });
    }
  };

  return (
    <Form onSubmit={handleSubmitCategoryData}>
      <h5>Category</h5>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input id="title" type="text" placeholder="Insert category title" />
      </FormGroup>
      <FormGroup>
        <Button>Submit</Button>
      </FormGroup>
    </Form>
  );
};

export default CategorySubmitForm;
