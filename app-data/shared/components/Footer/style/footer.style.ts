import styled, { StyledComponent } from 'styled-components';
import { Home } from '@styled-icons/evaicons-solid';
import { colors } from '../../../design';

export const Wrapper: StyledComponent<'div', any, {}, never> = styled.div`
  width: 100%;
  margin-top: 64px;
  z-index: 998;
  position: absolute;
`;

export const BottomDiv: StyledComponent<'div', any, {}, never> = styled.div`
  border-top: 1px solid #00aeef;
  padding: 1rem 1rem;
  @media (max-width: 992px) {
    text-align: center;
    padding: 2rem 0rem;
  }
`;

export const Logo: StyledComponent<'img', any, {}, never> = styled.img`
  width: 240px;
`;
export const CreatedBy: StyledComponent<'a', any, {}, never> = styled.a`
  font-size: 0.8rem;
  color: rgb(159, 164, 175) !important;
  text-align: center;

  @media (max-width: 992px) {
    margin-top: 1rem;
  }
`;

export const LinksHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  @media (max-width: 992px) {
    justify-content: center;
    flex-direction: column;
    margin-top: 1rem;
  }
`;

export const Links = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 65px;
  align-items: center;
  @media (max-width: 992px) {
    margin-right: 0px;
  }
`;
export const A = styled.a`
  color: ${colors.primary} !important;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    text-decoration: underline !important;
  }
`;

export const ScrollTop = styled(Home)`
  color: #00aeef;
  width: 40px;
  height: 40px;
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;
