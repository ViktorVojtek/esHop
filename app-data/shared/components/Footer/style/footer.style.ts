import styled, { StyledComponent } from 'styled-components';
import { Home } from '@styled-icons/evaicons-solid';
import { colors } from '../../../design';

export const Wrapper: StyledComponent<'div', any, {}, never> = styled.div`
  width: 100%;
  margin-top: 64px;
  z-index: 998;
  position: absolute;
  background-image: url('/images/skica.jpg');
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    text-align: center;
    padding-top: 0;
  }
  @media (max-width: 576px) {
    margin-top: 32px;
  }
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
  margin-bottom: 24px;
  @media (max-width: 768px) {
    margin: 0 auto;
    display: block;
    margin-bottom: 24px;
  }
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

export const Title = styled.h6`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 24px;
  color: rgb(0, 0, 0);
  line-height: 1.2;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Text = styled.p`
  margin-bottom: 4px;
  width: 100%;
  font-size: 0.9rem;
  color: #6e6e6e;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const StyledLink = styled.a`
  font-size: 1rem;
  display: block;
  font-size: 0.9rem;
  margin-bottom: 12px;
  color: #6e6e6e !important;
  cursor: pointer;
  @media (max-width: 768px) {
    text-align: center;
  }
  :before {
    position: relative;
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    background-color: ${colors.primary};
    top: -3px;
    margin-right: 8px;
  }
  &:hover {
    color: ${colors.primary} !important;
  }
`;

export const StyledLinkContact = styled.a`
  font-size: 1rem;
  display: block;
  font-size: 0.9rem;
  margin-bottom: 12px;
  color: #6e6e6e !important;
  cursor: pointer;
  @media (max-width: 768px) {
    text-align: center;
  }
  &:hover {
    color: ${colors.primary} !important;
  }
`;

export const TextBlock = styled.div`
  margin-bottom: 16px;
`;

export const IconsHolder = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: center;
    margin: 12px 0;
  }
`;

export const Image = styled.img`
  max-width: 50px;
  margin-left: 32px;
  @media (max-width: 768px) {
    margin-left: 0px;
    margin-right: 16px;
  }
`;

export const SocialHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: center;
    margin: 24px 0;
  }
`;

export const Facebook = styled.div`
  display: flex;
  margin-right: 12px;
  align-items: center;
  cursor: pointer;
  circle {
    transition: fill 0.3s ease-out;
  }
  &:hover {
    circle {
      fill: #3b5998;
    }
  }
  @media (max-width: 768px) {
    circle {
      fill: #3b5998;
    }
  }
`;

export const Instagram = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  cursor: pointer;
  circle {
    transition: all 0.3s ease-out;
  }
  &:hover {
    circle {
      fill: url(#linear-gradient);
    }
  }
  @media (max-width: 768px) {
    circle {
      fill: url(#linear-gradient);
    }
  }
`;

export const Youtube = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  circle {
    transition: fill 0.3s ease-out;
  }
  &:hover {
    circle {
      fill: #dc472e;
    }
  }
  @media (max-width: 768px) {
    circle {
      fill: #dc472e;
    }
  }
`;

export const FooterBottom = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Text} {
    font-size: 0.8rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
