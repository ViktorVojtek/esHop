import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'reactstrap';
import { CATEGORIES_QUERY } from '../../app-data/graphql/query';

const Categories = () => {
  const { error, loading, data } = useQuery(CATEGORIES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const { categories } = data;

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Category title</th>
        </tr>
      </thead>
      <tbody>
        {
          categories && categories.length > 0
            ? (
              categories.map(({ _id, title }, i) => (
                <tr key={_id}>
                  <td>{i + 1}</td>
                  <td>{title}</td>
                </tr>
              ))
            ) : <tr><td colSpan={2}>No categories has been set yet.</td></tr>
        }
      </tbody>
    </Table>
  );
};

export default Categories;
