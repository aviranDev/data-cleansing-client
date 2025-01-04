import React, { ReactNode } from 'react'
import styled from 'styled-components'

const MainContainer = styled.main`
  grid-area: main; /* Assigning the grid area */
  width: 100%;
  min-height: calc(100vh - 30px);
  margin: 0 auto; /* Center the content horizontally */
  padding: 50px 20px;
  background: var(--background-color);
  margin-top: 30px;

  p {
    font-size: 1rem; /* Adjust the font size for readability */
    line-height: 1.6; /* Improve line spacing for better readability */
    margin-bottom: 1.5rem; /* Add space between paragraphs */
  }

  // Media query for responsiveness
  @media (max-width: 768px) {
    padding: 10px; /* Adjust padding for smaller screens */
    p {
      font-size: 0.9rem; /* Smaller font size for mobile */
    }
  }
`

interface MainProps {
  children: ReactNode
}

const Content: React.FC<MainProps> = ({ children }) => {
  return <MainContainer>{children}</MainContainer>
}

export default Content
