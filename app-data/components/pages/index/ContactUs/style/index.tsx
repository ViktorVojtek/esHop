import styled from 'styled-components';
import {
  InstagramSquare,
  FacebookSquare,
  YoutubeSquare,
} from '@styled-icons/fa-brands';
import { PhoneAlt, Envelope } from '@styled-icons/fa-solid';
import { Whatsapp, Viber } from '@styled-icons/fa-brands';
import { HelpCircle } from '@styled-icons/boxicons-regular';
import { colors } from '../../../../../shared/design';

export const Wrapper = styled.div`
  margin-top: 32px;
`;

export const SocialHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 992px) {
    margin-top: 1rem;
  }
`;

export const Facebook = styled(FacebookSquare)`
  color: ${colors.primary};
  min-width: 36px;
  width: 36px;
  margin-right: 12px;
  cursor: pointer;
  transition: all 0.4s ease-out;
  &:hover {
    color: ${colors.primaryHover};
  }
`;
export const Instagram = styled(InstagramSquare)`
  color: ${colors.primary};
  min-width: 36px;
  width: 36px;
  margin-right: 12px;
  cursor: pointer;
  transition: all 0.4s ease-out;
  &:hover {
    color: ${colors.primaryHover};
  }
`;
export const Youtube = styled(YoutubeSquare)`
  color: ${colors.primary};
  min-width: 36px;
  width: 36px;
  margin-right: 12px;
  cursor: pointer;
  transition: all 0.4s ease-out;
  &:hover {
    color: ${colors.primaryHover};
  }
`;

export const H3 = styled.h3`
  font-size: 2rem;
  color: rgb(21, 24, 31);
  text-align: center;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const P = styled.p`
  color: ${colors.primary};
  font-size: 1rem;
  text-align: left;
  margin-bottom: 0;
  s @media (max-width: 768px) {
    text-align: center;
  }
`;

export const CustomLinkHolder = styled.div`
  margin-bottom: 1rem;
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

export const Item = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  margin: 0 auto;
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

export const HelpCircleIcon = styled(HelpCircle)`
  width: 28px;
  color: #00aeef;
`;
