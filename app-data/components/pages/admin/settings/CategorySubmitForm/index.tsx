import React, { FC, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { CREATE_CATEGORY_MUTATION } from '../../../../../graphql/mutation';
import { CATEGORIES_QUERY } from '../../../../../graphql/query';

import { Context } from '../../../../../lib/state/Store';

const CategorySubmitForm: FC = () => {
  const { dispatch } = useContext(Context);
  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  });

  const handleSubmitCategoryData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const title = (document.getElementById('categoryTitle') as HTMLInputElement)
      .value;

    try {
      await createCategory({ variables: { title } });
    } catch ({ message }) {
      dispatch({ type: 'SET_ERROR', payload: message });
      dispatch({ type: 'SET_MODAL', payload: true });
    }
  };

  return (
    <Form onSubmit={handleSubmitCategoryData}>
      <FormGroup>
        <Label for="categoryTitle">Title</Label>
        <Input
          id="categoryTitle"
          type="text"
          placeholder="Insert category title"
        />
      </FormGroup>
      <FormGroup>
        <Button type="submit">Submit</Button>
      </FormGroup>
    </Form>
  );
};

export default CategorySubmitForm;
