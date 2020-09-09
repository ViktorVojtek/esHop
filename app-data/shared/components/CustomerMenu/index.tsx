import React, { useContext, useState } from 'react';
import {
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Context } from '../../../lib/state/Store';
import { Login } from '../Navigation/Site/styles';
import Link from 'next/link';
import { logout } from '../../../lib/authCustomer';

import LoginRegisterModal from '../LoginRegisterModal';

const CustomerMenu = () => {
  const { state } = useContext(Context);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [loginModal, setLoginModal] = useState(false);

  const toggleCustomer = () => setDropdownOpen((prevState) => !prevState);

  const { customer } = state;
  return (
    <>
      <div>
        {customer.token ? (
          <>
            <Dropdown isOpen={dropdownOpen} toggle={toggleCustomer}>
              <DropdownToggle
                tag="span"
                data-toggle="dropdown"
                aria-expanded={dropdownOpen}
                className="d-block"
              >
                <Login />
                <span className="cursor-pointer hideMobile">
                  {customer.firstName} {customer.lastName}
                </span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link href="/moja-zona">Moja zóna</Link>
                </DropdownItem>
                <DropdownItem onClick={logout}>Odhlásenie</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <Login onClick={() => setLoginModal(true)} />
        )}
      </div>

      <LoginRegisterModal
        loginModal={loginModal}
        setLoginModal={setLoginModal}
      />
    </>
  );
};

export default CustomerMenu;
