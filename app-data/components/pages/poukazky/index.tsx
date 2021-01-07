import React, { useState, useContext } from 'react';
import { Container } from 'reactstrap';
import { Wrapper, StyledModalLink, H3 } from './styles';
import { Context } from '../../../lib/state/Store';
import Link from 'next/link';
import ProductModal from '../../../shared/components/ProductModal';
import GiftCardStepper from './components/Stepper';

const PoukazkyPage: () => JSX.Element = () => {
  const { dispatch } = useContext(Context);

  return (
    <Wrapper>
      <Container>
        <H3 style={{ marginBottom: '16px' }}>
          Vytvorte si darčekovú poukážku a potešte svojich blízkych
        </H3>
        <GiftCardStepper />
      </Container>
      <ProductModal
        message="Pokračujte v nákupe alebo do pokladne."
        title="Darčeková poukážka bola vytvorená a pridaná do košíka."
      >
        <Link href="/eshop/cart">
          <StyledModalLink
            color="primary"
            onClick={() =>
              dispatch({ type: 'SET_PRODUCT_MODAL', payload: false })
            }
          >
            Do pokladne
          </StyledModalLink>
        </Link>
        <Link href="/eshop">
          <StyledModalLink
            color="primary"
            onClick={() =>
              dispatch({ type: 'SET_PRODUCT_MODAL', payload: false })
            }
          >
            Nakupovať
          </StyledModalLink>
        </Link>
      </ProductModal>
    </Wrapper>
  );
};

export default PoukazkyPage;
