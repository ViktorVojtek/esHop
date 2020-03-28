import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';
import { CURRENCIES_QUERY } from '../../app-data/graphql/query';
import { REMOVE_CURRENCY_MUTATION } from '../../app-data/graphql/mutation';

const Currencies = () => {
  const { error, loading, data } = useQuery(CURRENCIES_QUERY);
  const [removeCurrency] = useMutation(
    REMOVE_CURRENCY_MUTATION,
    {
      refetchQueries: [{ query: CURRENCIES_QUERY }],
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
      await removeCurrency({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };

  const { currencies } = data;

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Currency title</th>
          <th>Sign</th>
          <th>Value</th>
          <th colSpan={2}>Default currency</th>
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
            ) : <tr><td colSpan={6}>No currencies has been set yet.</td></tr>
        }
      </tbody>
    </Table>
  );
};

export default Currencies;
