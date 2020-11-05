import styled from 'styled-components';

export const ProductItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

export const ProductImg = styled.img`
  width: 100%;
  user-select: none;
  @media (max-width: 568px) {
    width: 80%;
    margin: 0 auto;
    display: block;
  }
`;

export const ProductBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductTitle = styled.h4`
  text-align: center;
  padding: 1rem 0.25rem;
  color: #5e8796;
  font-weight: bold;
  user-select: none;
  margin: 0;
  font-size: 1.2rem;
`;

export const SubCategoryTitle = styled.p`
  color: #abb0b2;
  text-align: center;
  padding: 0rem 0.5rem 1rem 0.5rem;
  margin: 0;
`;

export const PriceHolder = styled.div`
  display: flex;
`;

export const Price = styled.p`
  margin: 0rem 0.2rem;
  font-weight: 600;
  font-size: 1.25rem;
  user-select: none;
`;
export const ActionPrice = styled.span`
  color: red;
`;

export const Del = styled.del`
  font-size: 1rem;
`;
export const ActionHolder = styled.div`
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  display: flex;
  font-size: 0.8rem;
  justify-content: space-evenly;
`;
