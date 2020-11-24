import React, { FC } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';
import { CATEGORIES_QUERY } from '../../../../../../../graphql/query';
import { REMOVE_CATEGORY_MUTATION } from '../../../../../../../graphql/mutation';

const Categories: FC = () => {
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);
  const [removeCategory] = useMutation(REMOVE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleRemoveItem: (_id: string) => Promise<void> = async (_id) => {
    try {
      await removeCategory({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };

  const { categories } = data;

  return categories && categories.length > 0 ? (
    <Table responsive striped>
      <thead>
        <tr>
          <th className="border-top-0">#</th>
          <th colSpan={2} className="border-top-0">
            Názov kategórie
          </th>
        </tr>
      </thead>
      <tbody>
        {categories.map(
          ({ _id, title }: { _id: string; title: string }, i: number) => (
            <tr key={_id}>
              <th scope="row">{i + 1}</th>
              <td>{title}</td>
              <td className="text-right">
                <Button color="danger" onClick={() => handleRemoveItem(_id)}>
                  Odstrániť
                </Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <p className="text-center">Neboli vytvorené žiadne kategórie.</p>
    </div>
  );
};

export default Categories;
