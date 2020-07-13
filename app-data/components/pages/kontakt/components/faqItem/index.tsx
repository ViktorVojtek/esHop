import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

type IFaqItem = {
  question: string;
  answer: string;
};

const P = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #01aeef;
  @media (max-width: 768px) {
    text-align: center;
    padding: 0rem 1rem;
  }
`;
const H5 = styled.h4`
  cursor: pointer;
  user-select: none;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FaqItem: FC<IFaqItem> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <H5 onClick={toggle}>{question}</H5>
      <Collapse isOpen={isOpen}>
        <P>{answer}</P>
      </Collapse>
    </div>
  );
};

export default FaqItem;
