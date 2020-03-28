import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';
import { SUBCATEGORIES_QUERY } from '../../app-data/graphql/query';
import { REMOVE_SUBCATEGORY_MUTATION } from '../../app-data/graphql/mutation';

const SubCategories = () => {
  const { error, loading, data } = useQuery(SUBCATEGORIES_QUERY);
  const [removeSubcategory] = useMutation(
    REMOVE_SUBCATEGORY_MUTATION,
    {
      refetchQueries: [{ query: SUBCATEGORIES_QUERY }],
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
      await removeSubcategory({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };

  const { subCategories } = data;

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th colSpan={2}>Subcategory title</th>
        </tr>
      </thead>
      <tbody>
        {
          subCategories && subCategories.length > 0
            ? (
              subCategories.map(({ _id, title }, i) => (
                <tr key={_id}>
                  <td>{i + 1}</td>
                  <td>{title}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => handleRemoveItem(_id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))
            ) : <tr><td colSpan={3}>No subcategories has been set yet.</td></tr>
        }
      </tbody>
    </Table>
  );
};

export default SubCategories;
