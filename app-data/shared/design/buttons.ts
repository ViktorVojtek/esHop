import styled from 'styled-components';
import { colors } from './colors';

type ButtonProps = {
  color?: string;
};

export const Button = styled.button<ButtonProps>`
  display: block;
  background-color: ${({ color }) => (color ? color : colors.primary)};
  text-transform: uppercase;
  color: #fff;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  font-size: 0.875rem;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: bold;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  border: 2px solid ${colors.primary};
  cursor: pointer;
  text-decoration: none;
  padding: 12px 24px;
  &:hover {
    border: 2px solid ${colors.primaryHover};
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const SecondaryButton = styled.button<ButtonProps>`
  display: block;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  font-size: 0.875rem;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: bold;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  padding: 12px 24px;
  box-shadow: none;
  background: none;
  border: 2px solid ${colors.primary};
  color: ${colors.primary};
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    color: #fff;
    border-color: ${colors.primaryHover};
  }
  &:disabled {
    background-color: white;
    pointer-events: none;
    opacity: 0.7;
  }
`;

export const ProductButton = styled.button`
  background-color: ${colors.primary};
  text-transform: uppercase;
  color: #fff;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  padding: 12px 36px;
  margin-top: 16px;
  font-size: 0.875rem;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: bold;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:disabled {
    background-color: ${colors.disabled};
  }
`;

export const GiftCardButton = styled.button`
  display: inline-flex;
  background-color: ${colors.primary};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  text-transform: uppercase;
  color: #fff !important;
  padding: 0rem 1.5rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  letter-spacing: 0px;
  user-select: none;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:disabled {
    background-color: ${colors.disabled};
  }
`;

export const TextFieldButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: ${colors.primary};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  text-transform: uppercase;
  color: #fff !important;
  padding: 0rem 1.5rem;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  letter-spacing: 0px;
  user-select: none;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:disabled {
    background-color: ${colors.disabled};
  }
`;

export const ButtonWithIcon = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: ${colors.primary};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  text-transform: uppercase;
  color: #fff !important;
  padding: 12px 16px;
  width: 100%;
  border-radius: 0.35rem;
  outline: none !important;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  letter-spacing: 0px;
  user-select: none;
  line-height: 24px;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${colors.primaryHover};
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  &:disabled {
    background-color: ${colors.disabled};
  }
  @media (max-width: 576px) {
    font-size: 0.8rem;
    flex-direction: column;
    padding: 6px 6px;
  }
`;
