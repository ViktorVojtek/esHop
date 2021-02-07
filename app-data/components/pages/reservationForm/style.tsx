import styled from 'styled-components';
import { colors } from '../../../shared/design';
import { PhoneAlt, Envelope } from '@styled-icons/fa-solid';
import { Whatsapp, Viber } from '@styled-icons/fa-brands';
import { Paper } from '@material-ui/core';

export const Wrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  margin-top: 140px;
  min-height: calc(100vh - 693px);
`;

export const H1 = styled.h1`
  color: ${colors.primary};
  width: 100%;
  text-align: center;
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 2rem;
  -webkit-letter-spacing: 1px;
  -moz-letter-spacing: 1px;
  -ms-letter-spacing: 1px;
  letter-spacing: 1px;
  font-family: Franchise-CE;
}
`;

export const CustomLinkHolder = styled.div`
  margin-left: 1rem;
`;

export const CustomLink = styled.a`
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
  color: ${colors.primary} !important;
  cursor: pointer;
  text-decoration: none !important;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -6px;
    left: 0px;
    background-color: ${colors.primary};
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.5s cubic-bezier(1, 0.25, 0, 0.75) 0s;
    transition: all 0.5s cubic-bezier(1, 0.25, 0, 0.75) 0s;
  }
  &:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;

export const P = styled.p`
  font-size: 1rem;
  color: black;
  font-weight: bold;
`;

export const ItemP = styled.p`
  color: ${colors.primary};
  font-size: 1rem;
  text-align: left;
  margin-bottom: 0;
`;

export const Item = styled(Paper)`
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 12px;
`;

export const PhoneIcon = styled(PhoneAlt)`
  width: 28px;
  color: ${colors.primary};
`;

export const EnvelopeIcon = styled(Envelope)`
  width: 28px;
  color: ${colors.primary};
`;

export const WhatsappIcon = styled(Whatsapp)`
  width: 28px;
  color: ${colors.primary};
`;

export const ViberIcon = styled(Viber)`
  width: 28px;
  color: ${colors.primary};
`;
