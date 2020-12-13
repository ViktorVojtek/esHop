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
  padding: 1rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
`;

const P = styled.p`
  text-transform: uppercase;
  color: white;
  font-size: 1.05rem;
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
