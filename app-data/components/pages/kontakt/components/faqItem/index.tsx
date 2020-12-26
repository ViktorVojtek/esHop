import React, { useState, FC } from 'react';
import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { ChevronDown } from '@styled-icons/boxicons-regular';

type IFaqItem = {
  question: string;
  answer: string;
};

const QuestionHolder = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
`;

const Chevron = styled(ChevronDown)<{ open: boolean }>`
  color: #01aeef;
  min-width: 32px;
  width: 32px;
  transition: all 0.3s ease-out;
  transform: ${(props) => (props.open ? 'rotateX(180deg)' : 'rotateX(0)')};
`;

const P = styled.p`
  font-size: 1rem;
  font-weight: normal;
  color: black;
  padding: 16px;
  padding-top: 0;
  @media (max-width: 768px) {
    text-align: left;
  }
  strong {
    color: #01aeef;
  }
`;
const H5 = styled.h5`
  cursor: pointer;
  font-weight: normal;
  user-select: none;
  color: #01aeef;
  font-size: 1.15rem;
  margin: 0;
  @media (max-width: 768px) {
    text-align: left;
  }
`;
const Holder = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #cecece;
  border-radius: 4px;
  transition: box-shadow 0.3s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;

const FaqItem: FC<IFaqItem> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const createMarkup = () => {
    return { __html: answer };
  };

  return (
    <Holder onClick={toggle}>
      <QuestionHolder>
        <H5>{question}</H5>
        <Chevron open={isOpen} />
      </QuestionHolder>
      <Collapse isOpen={isOpen}>
        <P dangerouslySetInnerHTML={createMarkup()} />
      </Collapse>
    </Holder>
  );
};

export default FaqItem;
