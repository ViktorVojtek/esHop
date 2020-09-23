import styled from 'styled-components';
import {
  FacebookWithCircle,
  InstagramWithCircle,
  YoutubeWithCircle,
} from '@styled-icons/entypo-social';

export const Wrapper = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const SocialHolder = styled.div`
  margin-top: 1rem;
`;

export const Facebook = styled(FacebookWithCircle)`
  color: #00aeefb8;
  width: 52px;
  height: 52px;
  margin-right: 12px;
  cursor: pointer;
  transition: all 0.4s ease-out;
  &:hover {
    color: #00aeef;
  }
`;
export const Instagram = styled(InstagramWithCircle)`
  color: #00aeefb8;
  width: 52px;
  height: 52px;
  margin-right: 12px;
  cursor: pointer;
  transition: all 0.4s ease-out;
  &:hover {
    color: #00aeef;
  }
`;
export const Youtube = styled(YoutubeWithCircle)`
  color: #00aeefb8;
  width: 52px;
  height: 52px;
  margin-right: 12px;
  cursor: pointer;
  transition: all 0.4s ease-out;
  &:hover {
    color: #00aeef;
  }
`;

export const H3 = styled.h3`
  font-size: 3.75rem;
  color: rgb(21, 24, 31);
  text-align: left;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const P = styled.p`
  color: rgb(132, 136, 148);
  font-size: 0.875rem;
  text-align: left;
  margin: 0;
  margin-top: 1.5rem;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const CustomLink = styled.a`
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
  color: #262b39 !important;
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
    background-color: #262b39;
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
