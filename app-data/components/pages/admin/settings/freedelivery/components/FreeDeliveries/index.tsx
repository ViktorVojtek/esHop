import React, { FC } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Table } from 'reactstrap';
import styled from 'styled-components';

import { FREEDELIVERY_QUERY } from '../../../../../../../graphql/query';
import { REMOVE_FREEDELIVERY_MUTATION } from '../../../../../../../graphql/mutation';

type FreeDeliveryListProps = {
  freeDeliveries: any;
};

const Holder = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
`;

const FreeDeliveryList = (props: FreeDeliveryListProps): JSX.Element => {
  const { freeDeliveries } = props;
  const [removeFreeDelivery] = useMutation(REMOVE_FREEDELIVERY_MUTATION, {
    refetchQueries: [{ query: FREEDELIVERY_QUERY }],
  });

  const handleRemoveItem: (_id: string) => Promise<void> = async (_id) => {
    try {
      await removeFreeDelivery({ variables: { id: _id } });
    } catch (err) {
      console.log(err);
    }
  };

  return freeDeliveries && freeDeliveries.length > 0 ? (
    <>
      {freeDeliveries.map(
        ({ _id, value }: { _id: string; value: number }, i: number) => (
          <Holder key={_id}>
            <h6>Doprava zdarma nad {value} €</h6>
            <Button color="danger" onClick={() => handleRemoveItem(_id)}>
              Odstrániť
            </Button>
          </Holder>
        )
      )}
    </>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <p className="text-center">Nie je vytvorená žiadna zľava na dopravu.</p>
    </div>
  );
};

export default FreeDeliveryList;
