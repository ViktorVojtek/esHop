import styled, { StyledComponent } from 'styled-components';
import { Home } from '@styled-icons/evaicons-solid';
import { colors } from '../../../design';
import { Envelope } from '@styled-icons/evil/Envelope';
import { Location } from '@styled-icons/evil/Location';
import { Telephone } from '@styled-icons/bootstrap/Telephone';

export const Wrapper: StyledComponent<'div', any, {}, never> = styled.div`
  width: 100%;
  margin-top: 64px;
  padding-top: 64px;
  padding-bottom: 64px;
  z-index: 998;
  position: absolute;
  background-image: url('/images/skica.jpg');
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
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
  margin: 24px 0px;
  color: rgb(0, 0, 0);
  line-height: 1.2;
`;

export const Text = styled.p`
  margin-bottom: 4px;
  width: 100%;
  font-size: 0.9rem;
`;

export const StyledLink = styled.a`
  font-size: 1rem;
  display: block;
  font-size: 0.9rem;
  margin-bottom: 4px;
  color: black !important;
  cursor: pointer;
  &:hover {
    color: ${colors.primary} !important;
  }
`;

export const TextBlock = styled.div`
  margin-bottom: 16px;
`;

export const TextWithIcon = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const StyledLocation = styled(Location)`
  color: ${colors.primary};
  width: 22px;
  min-width: 22px;
`;
export const StyledTelephone = styled(Telephone)`
  color: ${colors.primary};
  width: 14px;
  min-width: 14px;
  margin-left: 4px;
`;
export const StyledEnvelope = styled(Envelope)`
  color: ${colors.primary};
  width: 20px;
  min-width: 20px;
`;
export const IconHolder = styled.div`
  width: 20px;
  margin-right: 4px;
`;
