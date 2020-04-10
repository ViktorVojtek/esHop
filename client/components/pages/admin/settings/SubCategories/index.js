import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';
import { SUBCATEGORIES_QUERY } from '../../../../../app-data/graphql/query';
import { REMOVE_SUBCATEGORY_MUTATION } from '../../../../../app-data/graphql/mutation';

const SubCategories = () => {
  const { error, loading, data } = useQuery(SUBCATEGORIES_QUERY);
  const [removeSubcategory] = useMutation(REMOVE_SUBCATEGORY_MUTATION, {
    refetchQueries: [{ query: SUBCATEGORIES_QUERY }],
  });

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

  return subCategories && subCategories.length > 0 ? (
    <Table>
      <thead>
        <tr>
          <th className="border-top-0">#</th>
          <th colSpan={2} className="border-top-0">
            Subcategory title
          </th>
        </tr>
      </thead>
      <tbody>
        {subCategories.map(({ _id, title }, i) => (
          <tr key={_id}>
            <td>{i + 1}</td>
            <td>{title}</td>
            <td className="text-right">
              <Button color="danger" onClick={() => handleRemoveItem(_id)}>
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <p className="text-center">No subcategorie has been set yet.</p>
    </div>
  );
};

export default SubCategories;
