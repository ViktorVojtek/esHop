import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Row } from 'reactstrap';
import styled from 'styled-components';
import {
  ProductBody,
  ProductItem,
  StyledProductTitle,
  StyledShortDescription,
} from '../ProductsFill/styles/products.style';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  @media (max-width: 866px) {
    justify-content: center;
  }
`;

const ImageSkeleton = styled(Skeleton)`
  padding: 50%;
  width: 100%;

  transform: scale(1) !important;
`;

const ProductSkeleton = () => (
  <ProductItem>
    <div className="w-100">
      <div>
        <ImageSkeleton />
      </div>
      <ProductBody className="mt-2">
        <StyledProductTitle>
          <Skeleton height={20} />
        </StyledProductTitle>
        <StyledShortDescription>
          <Skeleton />
        </StyledShortDescription>
      </ProductBody>
    </div>
    <h2 className="w-100 pl-3 pr-3">
      <Skeleton />
    </h2>
  </ProductItem>
);

export const ProductsSkeleton = () => (
  <Row>
    <Wrapper>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </Wrapper>
  </Row>
);
