import React from 'react';
import { Collapse } from 'reactstrap';
import styled from 'styled-components';
import { colors } from '../../design';

const Wrapper = styled.div`
  padding: 0.5rem 0rem;
  background-color: ${colors.success};
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  padding: 6px 16px;
  display: block;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
`;

const P = styled.p`
  margin: 0;
  margin-left: 16px;
  font-weight: bold;
`;

type SuccessMessageType = {
  message: String;
  open: boolean;
};

const SuccessMessage = (props: SuccessMessageType) => {
  const { message, open } = props;

  return (
    <Collapse isOpen={open}>
      <Wrapper>
        <P>{message}</P>
      </Wrapper>
    </Collapse>
  );
};

export default SuccessMessage;
