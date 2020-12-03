import styled from 'styled-components';
import {
  FacebookWithCircle,
  InstagramWithCircle,
  YoutubeWithCircle,
} from '@styled-icons/entypo-social';

export const Wrapper = styled.div`
  margin-top: 120px;
`;

export const SocialHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 992px) {
    margin-top: 1rem;
  }
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
  font-size: 2rem;
  color: rgb(21, 24, 31);
  text-align: center;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const P = styled.p`
  color: rgb(132, 136, 148);
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 0;
  s @media (max-width: 768px) {
    text-align: center;
  }
`;

export const CustomLinkHolder = styled.div`
  margin-bottom: 0.5rem;
`;

export const CustomLink = styled.a`
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
  color: #01aeef !important;
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
    background-color: #01aeef;
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

export const Circle = styled.div`
  position: absolute;
  top: -50px;
  width: 100px;
  height: 100px;
  border-radius: 60px;
  border: 3px solid white;
  background-color: #01aeef;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: calc(50% - 50px);
  transition: transform 0.3s ease-out;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
  transition: box-shadow 0.3s;
  border: 1px solid #cecece;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 60px 0px;
  top: -60px;
  position: relative;
  background-color: white;
  height: 100%;
  margin: 0 auto;
`;
