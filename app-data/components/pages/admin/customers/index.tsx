import React, { FC, useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CUSTOMERS_QUERY } from '../../../../graphql/query';
import { Table } from 'reactstrap';

const CustomersList: FC = () => {
  const { loading, error, data } = useQuery(CUSTOMERS_QUERY);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { customers } = data;

  const verifiedCustomers = customers.filter((customer) => {
    return customer.isVerified;
  });

  const listItems =
    verifiedCustomers && verifiedCustomers.length > 0
      ? verifiedCustomers.map(
          ({ firstName, lastName, customerPoints, tel, email, _id }, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{firstName}</th>
                <th>{lastName}</th>
                <th>{email}</th>
                <th>{tel}</th>
                <th>{customerPoints}</th>
              </tr>
            );
          }
        )
      : null;
  return verifiedCustomers && verifiedCustomers.length > 0 ? (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Meno</th>
          <th>Priezvisko</th>
          <th>Email</th>
          <th>Telefón</th>
          <th>Vernostné body</th>
        </tr>
      </thead>
      <tbody>{listItems}</tbody>
    </Table>
  ) : (
    <p>Neexistujú žiadny používatelia.</p>
  );
};

export default CustomersList;
