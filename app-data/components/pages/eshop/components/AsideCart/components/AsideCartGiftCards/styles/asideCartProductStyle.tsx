import styled from 'styled-components';

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
  width: 100%;
  font-weight: bold;
`;
export const Circle = styled.div<ImageColor>`
  width: 22px;
  height: 22px;
  border-radius: 128px;
  background-color: ${({ color }) => (color ? `${color}` : 'black')};
`;
export const Detail = styled.div`
  width: 100%;
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

export const Button = styled.button`
  background-color: #00aeefb8;
  font-family: MuseoSans-300;
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
  width: 45%;
  &:hover {
    background-color: #00aeef;
  }
  @media (max-width: 1200px) {
    padding: 1rem 0.5rem;
  }
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
  font-family: MuseoSans-300;
  text-transform: uppercase;
  color: #fff !important;
  padding: 1rem 1.5rem;
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
  &:hover {
    background-color: #00aeef;
  }
`;
type SpanType = {
  light?: boolean;
};
type ImageColor = {
  color: string;
};
