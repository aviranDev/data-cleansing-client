import styled from 'styled-components'

export const SidebarContainer = styled.div`
  grid-area: sidebar;
  background: var(--accent-color);
  width: 15%;
  box-shadow: 0 2px 10px var(--shadow-color);
  z-index: 100; /* Higher z-index to be above other content */

  @media screen and (min-width: 601px) {
    position: fixed;
    height: 100%;
  }

  @media screen and (max-width: 1200px) {
    position: static;
    width: 100%;
    min-width: 0;
    padding-top: 5rem;
    border-right: none;
  }
`

export const SidebarInnerContainer = styled.div`
  width: 100%;
  padding: 2px 15px 0px 7px;
  max-height: 80vh;
  overflow-y: auto; /* Enable vertical scrolling if content overflows */

  /* Flip the direction so the scrollbar appears on the left */
  direction: ltr; /* Switch to right-to-left for scrollbar */

  /* Reset text direction back to left-to-right inside the content */
  ul,
  li,
  a {
    direction: ltr; /* Ensure text direction is normal (left to right) */
    text-align: left; /* Keep text aligned to the left */
  }

  ul {
    list-style: none; /* Remove default list styles */
    padding: 0; /* Remove default padding */
    margin: 0; /* Remove default margin */
  }

  li {
    width: 100%; /* Full width of the container */
    margin-bottom: 5px; /* Add margin between list items */
    padding: 10px; /* Add padding inside the box */
    border-bottom: 1px solid var(--background-color); /* Bottom border for full-width lines */
    transition: border-color 0.3s ease; /* Smooth transition for hover effect */
    border-radius: 5px; /* Add subtle rounding to corners */
    cursor: pointer; /* Change cursor to pointer on hover */

    &:hover {
      border-color: var(--border-color);
    }
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
    font-weight: bold;
    font-size: 15px;
    width: 100%;
    display: block; /* Make the link take up the full width of the list item */
    transition: color 0.3s ease;
    transition:
      background-color 0.3s ease,
      color 0.3s ease; /* Smooth transitions for background and text colors */
    cursor: pointer; /* Change cursor to pointer (hand) on hover */
    padding: 1px;
  }

  /* Default styling for the outer list item */
  .outer-item {
    box-shadow: 0px 4px 6px var(--shadow-color);
    border-radius: 10px;
    transition:
      transform 0.3s ease,
      background-color 0.3s ease;
    transform-origin: left;
    position: relative; /* Establish positioning context */
  }

  /* Style when the outer list item is hovered */
  .outer-item:hover {
    transform: scaleX(1.03); /* Increase the size by 10% */
  }

  /* Style the inner list items */
  .inner-item {
    background-color: var(--background-color);
    padding-left: 20px;
    margin: 5px 25px;
    position: relative;
    scrollbar-width: auto;
    width: calc(100% - 35px); /* Adjusting width for padding/margins */
  }

  .inner-item:hover {
    background-color: var(--accent-color);
    transition:
      background-color 0.3s ease,
      color 0.3s ease; /* Smooth transitions for background and text colors */
  }

  .inner-item:hover a {
    color: var(--primary-color);
  }

  .inner-item a {
    color: var(--secondary-color);
  }

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 12px; /* Set width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: var(--background-color); /* Scrollbar track color */
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--border-color); /* Scrollbar thumb color */
    border-radius: 10px; /* Round scrollbar edges */
    border: 2px solid var(--background-color); /* Add space around the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--secondary-color); /* Darker on hover using primary color */
  }
`
