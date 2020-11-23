import React from 'react';
import { Button, Table } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { PAYMENT_METHODES_QUERY } from '../../../../../../../graphql/query';

export default (): JSX.Element => {
  const { loading, error, data } = useQuery(PAYMENT_METHODES_QUERY);

  if (loading) {
    return <>Loading</>;
  }
  if (error) {
    return <>{error.message}</>;
  }

  const { paymentMethodes } = data;

  const payments =
    paymentMethodes.length > 0
      ? paymentMethodes.map(
          (
            {
              _id,
              title,
              value,
            }: { _id: string; title: string; value: number },
            i: number
          ) => {
            return (
              <tr key={_id}>
                <th scope="row">{i + 1}</th>
                <td>{title}</td>
                <td>{value}</td>
                <td className="text-right">
                  <Button color="danger">Odstrániť</Button>
                </td>
              </tr>
            );
          }
        )
      : null;

  return payments ? (
    <Table responsive striped>
      <thead>
        <tr>
          <th className="border-top-0">#</th>
          <th className="border-top-0">Názov platobnej metódy</th>
          <th colSpan={2}>Cena za platbu</th>
        </tr>
      </thead>
      <tbody>{payments}</tbody>
    </Table>
  ) : (
    <p>Neboli vytvorené žiadne spôsoby platby.</p>
  );
};
