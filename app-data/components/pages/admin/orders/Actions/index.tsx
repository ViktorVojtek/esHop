import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ORDER_MUTATION } from '../../../../../graphql/mutation';
import { ORDER_QUERY } from '../../../../../graphql/query';

const Actions = ({ id }: { id: string }) => {
  const [mutate] = useMutation(UPDATE_ORDER_MUTATION, {
    refetchQueries: [{ query: ORDER_QUERY }],
    awaitRefetchQueries: true,
  });
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  const handleOnClick: (event: any) => Promise<void> = async (event) => {
    const { value } = event.currentTarget;

    await mutate({ variables: { _id: id, status: +value } });
  };

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color="primary" caret>
        Zmeniť stav
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem value={0} color="primary" onClick={handleOnClick}>
          Nová
        </DropdownItem>
        <DropdownItem value={1} color="warning" onClick={handleOnClick}>
          Odoslaná
        </DropdownItem>
        <DropdownItem value={2} color="success" onClick={handleOnClick}>
          Vybavená
        </DropdownItem>
        <DropdownItem value={3} color="danger" onClick={handleOnClick}>
          Zrušená
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default Actions;
