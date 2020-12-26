import React, { useState } from 'react';
import { Col, Collapse } from 'reactstrap';
import styled from 'styled-components';
import { colors } from '../../../../../../../../shared/design';
import { ChevronDown } from '@styled-icons/boxicons-regular';
import LogIn from '../../../../../../../../shared/components/CartLogin/LogIn';

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${colors.primary};
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
`;

const P = styled.p`
  text-transform: uppercase;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

const Span = styled.span`
  font-size: 0.9rem;
  font-style: italic;
  text-transform: none;
`;
type ArrowProps = {
  isOpen: boolean;
};

const Arrow = styled(ChevronDown)<ArrowProps>`
  width: 32px;
  color: ${colors.inverse};
  transform: ${(props) => (props.isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: all 0.3s ease-out;
`;

const CartLogin = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Col md={6} className="mb-4">
      <Tab onClick={toggle}>
        <P>
          Registrovaný zákazník?<Span> Prihlásiť sa</Span>
        </P>
        <Arrow isOpen={isOpen} />
      </Tab>
      <Collapse isOpen={isOpen}>
        <LogIn />
      </Collapse>
    </Col>
  );
};

export default CartLogin;
