import styled from 'styled-components';
import {
  FacebookWithCircle,
  InstagramWithCircle,
  YoutubeWithCircle,
} from '@styled-icons/entypo-social';

export const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 1rem 3rem;
  display: flex;
  align-item: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SocialHolder = styled.div``;

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

export const NavItem = styled.a`
  font-size: 0.8rem;
  color: rgb(170, 174, 184) !important;
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 2rem;
  cursor: pointer;
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
  &:hover {
    color: rgb(38, 38, 38) !important;
  }
`;
export const NavHolder = styled.div`
  display: inline-block;
  padding-top: 1rem;
`;
