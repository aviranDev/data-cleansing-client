import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Navbar styles
const NavbarStyle = {
  Wrapper: styled.div<{ $isVisible: boolean }>`
    grid-area: nav; /* No quotes needed */
    background: var(--navbar-footer-background); /* CSS variables should not be in quotes */
    padding: 0;
    transition:
      transform 0.5s ease,
      opacity 0.5s ease;
    transform: translateY('-100%');
    position: fixed;
    opacity: ${({ $isVisible }): number => ($isVisible ? 1 : 0)};
    top: 0;
    width: calc(100% - 15%);
    margin-left: 15%;
    background-color: none;
    z-index: 1000; /* Ensure it is above other content */

    /* Ensure margin consistency across different screen sizes */
    @media (max-width: 1200px) {
      width: 100%;
      margin-left: 0;
    }

    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0;
    }

    @media (max-width: 500px) {
      width: 100%;
      margin-left: 0;
    }
  `,

  InnerContainer: styled.div`
    width: 100%;
    height: 67px;
    display: flex;
    justify-content: space-between;
    align-items: center; /* Center the content vertically */

    @media (max-width: 800px) {
      flex-direction: column;
      height: auto; /* Auto-adjust height for smaller screens */
      padding: 15px 20px; /* Increased padding for better spacing */
    }

    @media (max-width: 500px) {
      justify-content: center;
      padding: 10px; /* Slight padding adjustment for very small screens */
    }
  `,

  NavContainer: styled.div<{ order: number }>`
    display: flex;
    order: ${({ order }): number => order ?? 0};

    @media (max-width: 800px) {
      display: none; // Hide on smaller screens
    }
  `,

  // Internal links styled component
  NavLinkInternal: styled(Link)<{ $hoverTitle: string }>`
    color: #fff;
    font-size: 22px;
    text-decoration: none;
    padding: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: none;
      color: #ccc;
      transition: 0.5s ease-out;
    }

    &::before {
      content: attr($hoverTitle);
      display: block;
      visibility: hidden;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px;
      background-color: #333;
      color: #fff;
      border-radius: 5px;
      font-size: 14px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::before {
      visibility: visible;
      opacity: 1;
    }
  `,

  // Error message styling
  ErrorSection: styled.div`
    font-size: 25px;
    padding: 20px;
  `,

  // Alternative internal link styled component
  NavLinkInternal2: styled.div`
    color: #fff;
    font-size: 25px;
    text-decoration: none;
    padding: 20px;
    position: relative;
  `,
};

export default NavbarStyle;
