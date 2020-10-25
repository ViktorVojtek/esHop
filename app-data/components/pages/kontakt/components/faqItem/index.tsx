import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

type IFaqItem = {
  question: string;
  answer: string;
};

const P = styled.p`
  font-size: 1rem;
  font-weight: normal;
  color: black;
  @media (max-width: 768px) {
    text-align: center;
    padding: 0rem 1rem;
  }
  strong {
    color: #01aeef;
  }
`;
const H5 = styled.h5`
  cursor: pointer;
  font-weight: bold;
  user-select: none;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const Holder = styled.div`
  padding-bottom: 1rem;
`;

const FaqItem: FC<IFaqItem> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const createMarkup = () => {
    return { __html: answer };
  };

  return (
    <Holder>
      <H5 onClick={toggle}>{question}</H5>
      <Collapse isOpen={isOpen}>
        <P dangerouslySetInnerHTML={createMarkup()} />
      </Collapse>
    </Holder>
  );
};

export default FaqItem;
