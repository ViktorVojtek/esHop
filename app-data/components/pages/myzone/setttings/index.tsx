import React, { FC } from 'react';
import { useQuery } from 'react-apollo';
import { CUSTOMER_QUERY } from '../../../../graphql/query';
import { Spinner } from 'reactstrap';

type ISettings = {
  id: string;
};

const Settings: FC<ISettings> = ({ id }) => {
  const { error, loading, data } = useQuery(CUSTOMER_QUERY, {
    variables: { id: id },
    fetchPolicy: 'network-only',
  });

  if (error) {
    return <>error.message</>;
  }

  if (loading) {
    return <Spinner />;
  }

  const { customer } = data;

  return (
    <>
      <h6>
        Meno: <span>{customer.firstName}</span>
      </h6>
      <h6>
        Priezvisko: <span>{customer.lastName}</span>
      </h6>
    </>
  );
};

export default Settings;
