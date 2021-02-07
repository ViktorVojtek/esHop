import React, { FC, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Table } from 'reactstrap';
import {
  CATEGORIES_QUERY,
  SUBCATEGORIES_QUERY,
} from '../../../../../../../graphql/query';
import { REMOVE_SUBCATEGORY_MUTATION } from '../../../../../../../graphql/mutation';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { SubCategoryType } from '../..';
import { scrollTop } from '../../../../../../../shared/helpers';

const DeleteButton = styled(Button)`
  background-color: red !important;
  color: white !important;
`;

const useCategories = (QUERY) => {
  const [categories, setCategories] = useState(null);
  const { data } = useQuery(QUERY);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  return categories;
};

type SubCategoriesProps = {
  setAction?: React.Dispatch<React.SetStateAction<'create' | 'update'>>;
  action?: 'create' | 'update';
  handleSetSubCategoryToUpdate?: (subCategory: SubCategoryType) => void;
};

const SubCategories = (props: SubCategoriesProps) => {
  const categoriesData = useCategories(CATEGORIES_QUERY);
  const { action, setAction, handleSetSubCategoryToUpdate } = props;

  const { error, loading, data } = useQuery(SUBCATEGORIES_QUERY);
  const [removeSubcategory] = useMutation(REMOVE_SUBCATEGORY_MUTATION, {
    refetchQueries: [{ query: SUBCATEGORIES_QUERY }],
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleRemoveItem: (_id: string) => Promise<void> = async (_id) => {
    try {
      await removeSubcategory({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetUpdate = (subCategory: SubCategoryType) => {
    handleSetSubCategoryToUpdate(subCategory);
    setAction('update');
    scrollTop();
  };

  const { subCategories } = data;

  const categoriesAndSubsTable: JSX.Element[] =
    categoriesData && subCategories
      ? categoriesData.categories
          .map((categoryItem, i: number) => {
            const subs = subCategories
              .map(
                (subItem, j: number) =>
                  subItem.categoryId === categoryItem._id && (
                    <tr key={subItem._id}>
                      <td>{i < 1 ? i + j + 1 : j + 1}</td>
                      <td></td>
                      <td>{subItem.title}</td>
                      <td className="text-right d-flex justify-content-end">
                        <Button
                          variant="contained"
                          className="mr-2"
                          color="primary"
                          onClick={() => handleSetUpdate(subItem)}
                        >
                          Upraviť
                        </Button>
                        <DeleteButton
                          variant="contained"
                          onClick={() => handleRemoveItem(subItem._id)}
                        >
                          Odstrániť
                        </DeleteButton>
                      </td>
                    </tr>
                  )
              )
              .filter((genericItem) => genericItem);

            const result =
              subs.length > 0
                ? [
                    <tr key={categoryItem._id}>
                      <td>&nbsp;</td>
                      <td>{categoryItem.title}</td>
                      <td></td>
                      <td className="text-right"></td>
                    </tr>,
                  ].concat(subs)
                : null;

            return result;
          })
          .filter((item) => item)
      : [];

  return subCategories && subCategories.length > 0 ? (
    <Table>
      <thead>
        <tr>
          <th className="border-top-0">#</th>
          <th className="border-top-0">Kategória</th>
          <th colSpan={2} className="border-top-0">
            Podkategória
          </th>
        </tr>
      </thead>
      <tbody>{categoriesAndSubsTable}</tbody>
    </Table>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <p className="text-center">Neboli vytvorené žiadne podkategórie.</p>
    </div>
  );
};

export default SubCategories;
