import styled from 'styled-components';
import { colors } from './colors';
import { InfoCircle } from '@styled-icons/boxicons-regular';
import { CartPlus } from '@styled-icons/bootstrap/CartPlus';

type IconProps = {
  color?: string;
  size?: number;
};

export const InfoIcon = styled(InfoCircle)<IconProps>`
  color: ${({ color }) => (color ? color : colors.primary)};
  width: ${({ size }) => (size ? `${size}px` : `24px`)};
  height: ${({ size }) => (size ? `${size}px` : `24px`)};
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    color: ${colors.primary};
  }
`;

export const CartPlusIcon = styled(CartPlus)<IconProps>`
  color: ${({ color }) => (color ? color : colors.primary)};
  width: ${({ size }) => (size ? `${size}px` : `24px`)};
  height: ${({ size }) => (size ? `${size}px` : `24px`)};
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    color: ${colors.primary};
  }
`;
