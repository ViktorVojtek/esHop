import React, { FC, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';
import {
  CATEGORIES_QUERY,
  SUBCATEGORIES_QUERY,
} from '../../../../../graphql/query';
import { REMOVE_SUBCATEGORY_MUTATION } from '../../../../../graphql/mutation';

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

const SubCategories: FC = () => {
  const categoriesData = useCategories(CATEGORIES_QUERY);

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
                      <td className="text-right">
                        <Button
                          color="danger"
                          onClick={() => handleRemoveItem(subItem._id)}
                        >
                          Remove
                        </Button>
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
          <th className="border-top-0">Category</th>
          <th colSpan={2} className="border-top-0">
            Subcategory
          </th>
        </tr>
      </thead>
      <tbody>{categoriesAndSubsTable}</tbody>
    </Table>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <p className="text-center">No subcategorie has been set yet.</p>
    </div>
  );
};

export default SubCategories;
