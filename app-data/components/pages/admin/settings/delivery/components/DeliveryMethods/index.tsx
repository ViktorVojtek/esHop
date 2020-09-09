import React, { FC } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';
import { DELIVERY_METHODS_QUERY } from '../../../../../../../graphql/query';
import { REMOVE_DELIVERY_METHODE_MUTATION } from '../../../../../../../graphql/mutation';

const DeliveryMethods: FC = () => {
  const { error, loading, data } = useQuery(DELIVERY_METHODS_QUERY);
  const [removeDeliveryMethode] = useMutation(
    REMOVE_DELIVERY_METHODE_MUTATION,
    {
      refetchQueries: [{ query: DELIVERY_METHODS_QUERY }],
    }
  );

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const handleRemoveItem: (_id: string) => Promise<void> = async (_id) => {
    try {
      await removeDeliveryMethode({ variables: { id: _id } });
    } catch (err) {
      console.log(err);
    }
  };

  const { deliveryMethods } = data;

  return deliveryMethods && deliveryMethods.length > 0 ? (
    <Table responsive striped>
      <thead>
        <tr>
          <th className="border-top-0">#</th>
          <th className="border-top-0">Title</th>
          <th className="border-top-0"></th>
          <th className="border-top-0"></th>
          <th colSpan={2} className="border-top-0" />
        </tr>
      </thead>
      <tbody>
        {deliveryMethods.map(
          (
            {
              _id,
              isEnvelopeSize,
              title,
              value,
            }: {
              _id: string;
              isEnvelopeSize: boolean;
              title: string;
              value: number;
            },
            i: number
          ) => (
            <tr key={_id}>
              <th scope="row">{i + 1}</th>
              <td>{title}</td>
              <td>{value}</td>
              <td>{isEnvelopeSize ? 'x' : ''}</td>
              <td className="text-right">
                <Button color="danger" onClick={() => handleRemoveItem(_id)}>
                  Remove
                </Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <p className="text-center">No delivery methodes has been created yet.</p>
    </div>
  );
};

export default DeliveryMethods;
