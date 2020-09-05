import React, { FC } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';

import { DISCOUNTS_QUERY } from '../../../../../../../graphql/query';
import { REMOVE_DISCOUNT_MUTATION } from '../../../../../../../graphql/mutation';

const DiscountList: FC = () => {
  const { error, loading, data } = useQuery(DISCOUNTS_QUERY);
  const [removeDiscount] = useMutation(REMOVE_DISCOUNT_MUTATION, {
    refetchQueries: [{ query: DISCOUNTS_QUERY }],
  });

  if (loading) {
    return <>loading</>;
  }
  if (error) {
    return <>{error.message}</>;
  }

  const handleRemoveItem: (_id: string) => Promise<void> = async (_id) => {
    try {
      await removeDiscount({ variables: { id: _id } });
    } catch (err) {
      console.log(err);
    }
  };

  const { discounts } = data;

  return discounts && discounts.length > 0 ? (
    <Table responsive striped>
      <thead>
        <tr>
          <th className="border-top-0">#</th>
          <th className="border-top-0">Discount code</th>
          <th className="border-top-0">Discount in %</th>
        </tr>
      </thead>
      <tbody>
        {discounts.map(
          (
            { _id, code, value }: { _id: string; code: string; value: number },
            i: number
          ) => (
            <tr key={_id}>
              <th scope="row">{i + 1}</th>
              <td>{code}</td>
              <td>{value} %</td>
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
      <p className="text-center">No discounts has been created yet.</p>
    </div>
  );
};

export default DiscountList;
