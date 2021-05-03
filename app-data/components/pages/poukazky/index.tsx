import React from 'react';
import { Container } from 'reactstrap';
import { Wrapper, H3 } from './styles';
import GiftCardStepper from './components/Stepper';
import { Button } from '../../../shared/design';
import Link from 'next/link';

const PoukazkyPage: () => JSX.Element = () => {
  return (
    <Wrapper>
      <Container>
        <H3 style={{ marginBottom: '16px' }}>
          Vytvorte si darčekovú poukážku a potešte svojich blízkych
        </H3>
        <Link href="/darcekove-poukazky/informacie">
          <Button style={{ margin: '0 auto' }}>Viac informácií</Button>
        </Link>
        <GiftCardStepper />
      </Container>
    </Wrapper>
  );
};

export default PoukazkyPage;
