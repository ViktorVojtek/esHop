import React, { FC } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';
import { CURRENCIES_QUERY } from '../../../../../../../graphql/query';
import { REMOVE_CURRENCY_MUTATION } from '../../../../../../../graphql/mutation';

const Currencies: FC = () => {
  const { error, loading, data } = useQuery(CURRENCIES_QUERY);
  const [removeCurrency] = useMutation(REMOVE_CURRENCY_MUTATION, {
    refetchQueries: [{ query: CURRENCIES_QUERY }],
  });

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleRemoveItem: (_id: string) => Promise<void> = async (_id) => {
    try {
      await removeCurrency({ variables: { _id } });
    } catch (err) {
      console.log(err);
    }
  };

  const { currencies } = data;

  const currenciesList: JSX.Element[] =
    currencies &&
    currencies.map(
      ({ _id, defaultCurrency, sign, value, title }, i: number) => (
        <tr key={_id}>
          <th scope="row">{i + 1}</th>
          <td>{title}</td>
          <td>{sign}</td>
          <td>{value}</td>
          <td>{defaultCurrency === true ? 'true' : 'false'}</td>
          <td className="text-right">
            <Button color="danger" onClick={() => handleRemoveItem(_id)}>
              Odstrániť
            </Button>
          </td>
        </tr>
      )
    );

  return currencies && currencies.length > 0 ? (
    <Table>
      <thead>
        <tr>
          <th className="border-top-0">#</th>
          <th className="border-top-0">Názov</th>
          <th className="border-top-0">Znak</th>
          <th className="border-top-0">Hodnota</th>
          <th colSpan={2} className="border-top-0">
            Základná mena
          </th>
        </tr>
      </thead>
      <tbody>{currenciesList}</tbody>
    </Table>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <p className="text-center">Neboli vytvorené žiadne meny.</p>
    </div>
  );
};

export default Currencies;
