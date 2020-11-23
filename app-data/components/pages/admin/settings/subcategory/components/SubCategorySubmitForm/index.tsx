/* eslint-disable no-underscore-dangle */
import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { CREATE_SUBCATEGORY_MUTATION } from '../../../../../../../graphql/mutation';
import {
  SUBCATEGORIES_QUERY,
  CATEGORIES_QUERY,
} from '../../../../../../../graphql/query';

const SubCategorySubmitForm: FC = () => {
  const [createSubCategory] = useMutation(CREATE_SUBCATEGORY_MUTATION, {
    refetchQueries: [{ query: SUBCATEGORIES_QUERY }],
  });
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleSubmitSubCategoryData: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const title = (document.getElementById(
      'subCategoryTitle'
    ) as HTMLInputElement).value;
    const categoryEl = document.getElementById(
      'categoryForSubCategorySelect'
    ) as HTMLSelectElement;
    const categoryId = (categoryEl[
      categoryEl.selectedIndex
    ] as HTMLOptionElement).value;

    try {
      await createSubCategory({ variables: { categoryId, title } });
    } catch (err) {
      console.log(err);
    }
  };

  const { categories } = data;

  return (
    <Form onSubmit={(e) => handleSubmitSubCategoryData(e)}>
      <FormGroup>
        <Input
          type="select"
          name="categoryForSubCategorySelect"
          id="categoryForSubCategorySelect"
          required
        >
          <option value="">Zvoľte kategóriu</option>
          {categories && categories.length > 0
            ? categories.map(({ _id, title }) => {
                return (
                  <option key={_id} value={_id}>
                    {title}
                  </option>
                );
              })
            : null}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="subCategoryTitle">Názov</Label>
        <Input
          id="subCategoryTitle"
          type="text"
          placeholder="Zadajte názov podkategórie"
        />
      </FormGroup>
      <FormGroup>
        <Button type="submit">Pridať</Button>
      </FormGroup>
    </Form>
  );
};

export default SubCategorySubmitForm;
