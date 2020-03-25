import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'reactstrap';
import { CURRENCIES_QUERY } from '../../app-data/graphql/query';

const Currencies = () => {
  const { error, loading, data } = useQuery(CURRENCIES_QUERY);

  if (error) {
    return <>{error.message}</>;
  }
  if (loading) {
    return <>loading</>;
  }

  const { currencies } = data;
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Currency title</th>
          <th>Sign</th>
          <th>Value</th>
          <th>Default currency</th>
        </tr>
      </thead>
      <tbody>
        {
          currencies && currencies.length > 0
            ? (
              currencies.map(({
                _id, defaultCurrency, sign, value, title,
              }, i) => (
                <tr key={_id}>
                  <td>{i + 1}</td>
                  <td>{title}</td>
                  <td>{sign}</td>
                  <td>{value}</td>
                  <td>{defaultCurrency === true ? 'true' : 'false'}</td>
                </tr>
              ))
            ) : <tr><td colSpan={5}>No currencies has been set yet.</td></tr>
        }
      </tbody>
    </Table>
  );
};

export default Currencies;
