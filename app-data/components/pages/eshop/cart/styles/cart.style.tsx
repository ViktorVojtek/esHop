import styled from 'styled-components';
import { CartArrowDown } from '@styled-icons/fa-solid';
import {
  CloseCircle,
  PlusCircle,
  MinusCircle,
} from '@styled-icons/evaicons-solid';
import { colors } from '../../../../../shared/design';
import CloseIcon from '@material-ui/icons/Close';

export const Wrapper = styled.div`
  margin-top: 150px;
  margin-bottom: 60px;
  min-height: calc(100vh - 425px);
  @media (max-width: 768px) {
    margin-top: 120px;
    margin-bottom: 0px;
  }
  @media (max-width: 576px) {
    margin-top: 100px;
  }
`;

export const ButtonsHolder = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CloseCircleIcon = styled(CloseIcon)`
  min-width: 42px;
  max-width: 42px;
  color: ${colors.primary};
  cursor: pointer;
  transition: all 0.3s ease-out !important;
  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 768px) {
    margin-left: auto;
  }
`;
export const PlusCircleIcon = styled(PlusCircle)`
  width: 36px;
  color: ${colors.primary};
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.2);
  }
`;
export const MinusCircleIcon = styled(MinusCircle)`
  width: 36px;
  color: ${colors.primary};
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease-out;
  &:hover {
    transform: scale(1.2);
  }
`;

export const EmptyCart = styled(CartArrowDown)`
  color: #00aeef;
  width: 160px;
  margin: 0 auto;
  display: block;
`;

export const H2 = styled.h2`
  padding-bottom: 0.5rem;
  margin: 0 0 3rem 0;
  text-align: center;
  font-weight: 600;
`;
export const H4 = styled.h4`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.15rem;
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;
export const ErrorText = styled.p`
  color: red;
  margin-bottom: 4px;
`;
export const H5 = styled.h5`
  font-weight: 500;
`;
export const TH = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: ${colors.primary};
  font-size: 1rem;
  font-weight: 500;
  color: white;
  font-size: 1rem;
  border-bottom: none !important;
`;

export const Circle = styled.div<ICircle>`
  border-radius: 128px;
  background-color: ${({ color }) => (color ? `${color}` : 'black')};
  width: 24px;
  height: 24px;
`;

export const TR = styled.tr`
  background-color: #ededed;
  white-space: nowrap;
`;

export const TD = styled.td`
  vertical-align: middle !important;
  font-weight: 600;
  white-space: nowrap;
`;
export const TDtext = styled.td`
  vertical-align: middle !important;
  font-weight: 600;
  white-space: pre-line;
  min-width: 180px;
`;
export const Image = styled.img`
  width: 100%;
  margin-right: 0.5rem;
`;
export const ButtonAddrRemove = styled.button`
  display: inline-block;
  font-weight: 400;
  color: white;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #00aeeff8;
  border: 1px solid transparent;
  padding: 0.375rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none !important;
  &:hover {
    background-color: #00aeef;
  }
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
  display: inline-block;
  text-align: center;

  cursor: pointer;
  &:hover {
    background-color: #00aeef;
  }
`;

interface ICircle {
  color: string;
}
