import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

// Define types for the Button props
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  $variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' // Add more variants as needed
  width?: string
}

// Define styles for the Button component using styled-components
export const StyledButton = styled.button<ButtonProps>`
  /* Common styles */
  padding: 8px 16px;
  border: 2px solid #000;
  box-shadow:
    inset -2px -2px 0px #fff,
    inset 2px 2px 0px #bdbdbd; /* Beveled effect */
  background-color: ${(props): string =>
    props.$variant === 'primary' ? '#c0c0c0' : '#e0e0e0'}; /* Default 90s gray shades */
  color: #000;
  cursor: pointer;
  width: ${(props): string => (props.width ? props.width : 'auto')};
  font-family: 'Tahoma', sans-serif;
  font-size: 14px;
  text-align: center;
  text-shadow: none;
  user-select: none;

  /* Active (pressed) state */
  &:active {
    box-shadow:
      inset 2px 2px 0px #fff,
      inset -2px -2px 0px #bdbdbd; /* Sunken effect */
    background-color: #a0a0a0;
  }

  /* Variants */
  ${(props): string =>
    props.$variant === 'secondary'
      ? `
    background-color: #d0d0d0;
    border-color: #808080;
  `
      : ''}
  ${(props): string =>
    props.$variant === 'success'
      ? `
    background-color: #80c080;
    border-color: #408040;
  `
      : ''}
  ${(props): string =>
    props.$variant === 'danger'
      ? `
    background-color: #e08080;
    border-color: #a04040;
  `
      : ''}
  ${(props): string =>
    props.$variant === 'warning'
      ? `
    background-color: #f0e080;
    border-color: #b0a040;
  `
      : ''}
  ${(props): string =>
    props.$variant === 'info'
      ? `
    background-color: #80a0e0;
    border-color: #4060a0;
  `
      : ''}
`

export default StyledButton
