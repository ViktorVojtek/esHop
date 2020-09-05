import React, { FC } from 'react';
import { Container } from 'reactstrap';
import { Wrapper, Fade, H1 } from './styles/index';

interface IBackgroundImage {
  imageUrl: string;
  title: string;
}

const SubPageBackground: FC<IBackgroundImage> = ({ imageUrl, title }) => (
  <Wrapper imageUrl={imageUrl}>
    <Container>
      <H1>{title}</H1>
    </Container>
  </Wrapper>
);

export default SubPageBackground;
