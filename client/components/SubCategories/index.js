import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'reactstrap';
import { SUBCATEGORIES_QUERY } from '../../app-data/graphql/query';

const SubCategories = () => {
  const { error, loading, data } = useQuery(SUBCATEGORIES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const { subCategories } = data;

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Subcategory title</th>
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
                </tr>
              ))
            ) : <tr><td colSpan={2}>No subcategories has been set yet.</td></tr>
        }
      </tbody>
    </Table>
  );
};

export default SubCategories;
