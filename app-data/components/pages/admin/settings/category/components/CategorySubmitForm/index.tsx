import React, { FC, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { CREATE_CATEGORY_MUTATION } from '../../../../../../../graphql/mutation';
import { CATEGORIES_QUERY } from '../../../../../../../graphql/query';
import { Context } from '../../../../../../../lib/state/Store';

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
      console.log(message);
      dispatch({ type: 'SET_MODAL', payload: true });
    }
  };

  return (
    <Form onSubmit={handleSubmitCategoryData} inline>
      <FormGroup className="mr-sm-2">
        <Label for="categoryTitle" className="mr-sm-3">
          Category Title
        </Label>
        <Input
          id="categoryTitle"
          type="text"
          placeholder="Insert category title"
        />
      </FormGroup>
      <Button type="submit" color="primary" className="ml-auto mr-3">
        Submit
      </Button>
    </Form>
  );
};

export default CategorySubmitForm;
