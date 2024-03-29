import styled from 'styled-components';
import { fonts } from '../../../../../../../../shared/design';

export const AsideCartWrapper = styled.div`
  @media (max-width: 992px) {
    max-width: 600px;
  }
`;

export const HeadWrapper = styled.div`
  display: flex;
  align-items: start;
`;

export const P = styled.p`
  margin: 0;
  width: 67%;
  font-weight: bold;
`;

export const Image = styled.img`
  width: 33%;
`;
export const Detail = styled.div`
  width: 67%;
  margin-left: 1rem;
`;

export const DetailItem = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
`;
export const Title = styled.h6`
  font-weight: bold;
  color: #5e8796;
  font-size: 1rem;
`;

export const Total = styled.div`
  border-bottom: solid 1px #00aeef;
  padding: 0.5rem 0rem;
  display: flex;
  justify-content: space-between;
`;

export const TotalItem = styled.div`
  display: flex;
`;

export const TotalText = styled.p<SpanType>`
  color: ${({ light }) => (light ? 'rgba(0, 0, 0, 0.87)' : '#00aeef')};
  font-weight: ${({ light }) => (light ? 'normal' : 'bold')};
  margin: 0;
  padding: 0;
`;

export const ButtonLink = styled.a`
  background-color: #00aeefb8;
  font-family: ${fonts.primary}
  text-transform: uppercase;
  color: #fff !important;
  padding: 0.75rem 1rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  margin-top: 1rem;
  -webkit-letter-spacing: 0px;
  -moz-letter-spacing: 0px;
  -ms-letter-spacing: 0px;
  letter-spacing: 0px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  display: block;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #00aeef;
  }
`;
type SpanType = {
  light?: boolean;
};
