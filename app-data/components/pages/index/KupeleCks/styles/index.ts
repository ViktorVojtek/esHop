import styled from 'styled-components';

export const DesktopImage = styled.img`
  width: 100%;
  transition: all 0.3s ease-out;
  cursor: pointer;
  filter: grayscale(1);
  &:hover {
    filter: grayscale(0);
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

export const MobileImageHead = styled.img`
  width: 100%;
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
`;
export const MobileImageText = styled.img`
  width: 100%;
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 32px;
  margin-bottom: 64px;
`;
