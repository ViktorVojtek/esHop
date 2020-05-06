import React, { FC, ReactNode } from 'react';
import { Container } from 'reactstrap';

import Wrapper from '../../../../shared/styles/components/Wrapper/Wrapper.style';

interface ICartBodyProps {
  children: ReactNode;
}
const CartBodyComponent: FC<ICartBodyProps> = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
);

export default CartBodyComponent;
