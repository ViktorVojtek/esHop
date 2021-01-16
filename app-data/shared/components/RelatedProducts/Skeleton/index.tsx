import { Skeleton } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';
import { Col } from 'reactstrap';
import {
  ProductItem,
  ProductBody,
  PriceHolder,
  Price,
  ProductTitle,
  StyledShortDescription,
} from '../styles/index';

const StyledSkeleton = styled(Skeleton)`
  padding-top: 100%;
`;

const RelatedProductSkeleton = () => (
  <Col lg="3" md="6" sm="12" className="mb-4">
    <ProductItem>
      <StyledSkeleton variant="rect" className="w-100" height={0} />
      <ProductBody>
        <ProductTitle>
          <Skeleton />
        </ProductTitle>
        <StyledShortDescription>
          <Skeleton />
        </StyledShortDescription>
        <PriceHolder>
          <Price>
            <Skeleton />
          </Price>
        </PriceHolder>
        <Skeleton variant="rect" className="w-100" height={52} />
      </ProductBody>
    </ProductItem>
  </Col>
);

export default RelatedProductSkeleton;
