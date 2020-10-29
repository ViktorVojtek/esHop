import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0.5rem 0rem;
  background-color: #d4edda;
  border: 1px solid #155724;
  border-radius: 4px;
  color: #155724;
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
