import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';
import { CATEGORIES_QUERY } from '../../../../../app-data/graphql/query';
import { REMOVE_CATEGORY_MUTATION } from '../../../../../app-data/graphql/mutation';

const Categories = () => {
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);
  const [removeCategory] = useMutation(
    REMOVE_CATEGORY_MUTATION,
    {
      refetchQueries: [{ query: CATEGORIES_QUERY }],
    },
  );

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const handleRemoveItem = async (_id) => {
    try {
      await removeCategory({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };

  const { categories } = data;

  return (
    categories && categories.length > 0
      ? (
        <Table>
          <thead>
            <tr>
              <th className="border-top-0">#</th>
              <th colSpan={2} className="border-top-0">Category title</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(({ _id, title }, i) => (
                <tr key={_id}>
                  <td>{i + 1}</td>
                  <td>{title}</td>
                  <td className="text-right">
                    <Button
                      color="danger"
                      onClick={() => handleRemoveItem(_id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p className="text-center">No categories has been set yet.</p>
        </div>
      )
  );
};

export default Categories;