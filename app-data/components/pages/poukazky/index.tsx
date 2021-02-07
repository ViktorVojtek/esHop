import React, { useContext } from 'react';
import { Container } from 'reactstrap';
import { Wrapper, H3 } from './styles';
import { Context } from '../../../lib/state/Store';
import GiftCardStepper from './components/Stepper';

const PoukazkyPage: () => JSX.Element = () => {
  return (
    <Wrapper>
      <Container>
        <H3 style={{ marginBottom: '16px' }}>
          Vytvorte si darčekovú poukážku a potešte svojich blízkych
        </H3>
        <GiftCardStepper />
      </Container>
    </Wrapper>
  );
};

export default PoukazkyPage;
