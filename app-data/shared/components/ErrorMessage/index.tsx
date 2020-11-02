import React from 'react';
import { Collapse } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0.5rem 0rem;
  background-color: #f8d7da;
  border: 1px solid #721c24;
  border-radius: 4px;
  color: #721c24;
`;

const P = styled.p`
  margin: 0;
  margin-left: 16px;
  font-weight: bold;
`;

type ErrorMessageType = {
  message: String;
  open: boolean;
};

const ErrorMessage = (props: ErrorMessageType) => {
  const { message, open } = props;

  return (
    <Collapse isOpen={open}>
      <Wrapper>
        <P>{message}</P>
      </Wrapper>
    </Collapse>
  );
};

export default ErrorMessage;
