import React, { useState } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Actions = ({ status }) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [statusText, setStatusText] = useState('');

  const toggle = () => setOpen(!dropdownOpen);
  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle color="primary" caret>
        Zmeniť stav
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem color="primary" onClick={() => setStatusText('Nová')}>
          Nová
        </DropdownItem>
        <DropdownItem color="warning" onClick={() => setStatusText('Odoslaná')}>
          Odoslaná
        </DropdownItem>
        <DropdownItem color="success" onClick={() => setStatusText('Vybavená')}>
          Vybavená
        </DropdownItem>
        <DropdownItem color="danger" onClick={() => setStatusText('Zrušená')}>
          Zrušená
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default Actions;
