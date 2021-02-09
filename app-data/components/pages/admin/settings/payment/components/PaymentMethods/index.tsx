import React from 'react';
import { Button, Table } from 'reactstrap';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PAYMENT_METHODES_QUERY } from '../../../../../../../graphql/query';
import { REMOVE_PAYMENT_METHODE_MUTATION } from '../../../../../../../graphql/mutation';

const PaymentMethods: () => JSX.Element = () => {
  const { loading, error, data } = useQuery(PAYMENT_METHODES_QUERY);
  const [removePaymentMethode] = useMutation(REMOVE_PAYMENT_METHODE_MUTATION, {
    refetchQueries: [{ query: PAYMENT_METHODES_QUERY }],
  });

  if (loading) {
    return <>Loading</>;
  }
  if (error) {
    return <>{error.message}</>;
  }

  const handleRemoveItem: (_id: string) => Promise<void> = async (_id) => {
    try {
      await removePaymentMethode({ variables: { id: _id } });
    } catch (err) {
      console.log(err);
    }
  };

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
                  <Button color="danger" onClick={() => handleRemoveItem(_id)}>
                    Odstrániť
                  </Button>
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

export default PaymentMethods;
