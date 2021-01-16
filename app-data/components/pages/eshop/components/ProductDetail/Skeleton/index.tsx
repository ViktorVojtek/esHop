import { Skeleton } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import {
  TitleMobile,
  DetailInfo,
  Title,
  Price,
  VariantTitle,
  Wrapper,
} from '../styles/productDetail.style';

const StyledSkeleton = styled(Skeleton)`
  padding-top: 100%;
`;

const ProductDetailSkeleton = () => (
  <Wrapper>
    <Container>
      <Row>
        <Col md="6">
          <TitleMobile className="mb-3">
            <Skeleton />
          </TitleMobile>
          <StyledSkeleton variant="rect" className="w-100" height={0} />
        </Col>
        <Col md="6">
          <DetailInfo>
            <Title>
              <Skeleton />
            </Title>
            <Price>
              <Skeleton />
            </Price>
            <Skeleton variant="rect" className="w-100" height={48} />
            <VariantTitle className="mt-4">
              <Skeleton />
            </VariantTitle>
            <Skeleton variant="rect" className="w-100" height={60} />
          </DetailInfo>
        </Col>
      </Row>
    </Container>
  </Wrapper>
);

export default ProductDetailSkeleton;
