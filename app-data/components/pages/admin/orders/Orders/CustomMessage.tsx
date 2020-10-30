import React, { useState } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import styled from 'styled-components';
import { Envelope } from 'styled-icons/fa-solid';

const EnvelopeIcon = styled(Envelope)`
  width: 30px;
  color: #007bff;
  cursor: pointer;
  outline: none;
`;

const EnvelopeMessage = styled.p`
  font-size: 1rem;
  color: black;
  font-weight: 500;
`;

type CustomMessageProps = {
  id: string;
  message: string;
};

const CustomMessage = (props: CustomMessageProps) => {
  const { id, message } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <a>
        <EnvelopeIcon id={id} />
      </a>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={id}
        toggle={toggle}
        trigger="legacy"
      >
        <PopoverHeader style={{ background: '#556cd6', color: 'white' }}>
          Správa zákazníka
        </PopoverHeader>
        <PopoverBody>
          <EnvelopeMessage>{message}</EnvelopeMessage>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default CustomMessage;
