import React, { memo, useMemo } from 'react' // Importing necessary modules from React
import FooterStyle from './FooterStyles' // Importing footer styles
import { validateString, ValidationErrorMessage } from '../../utils/validateString' // Importing validation utilities

// Defining the type for the component's props
interface FooterCopyrightProps {
  value: string // This prop represents the copyright text (e.g., company name)
}

// The FooterCopyright component is memoized to prevent unnecessary re-renders when props don't change
const FooterCopyright: React.FC<FooterCopyrightProps> = memo(({ value }) => {
  // Validation check for 'value' prop to ensure it is a valid string
  if (!validateString(value)) {
    // If 'value' is invalid, display an error message for debugging
    return <ValidationErrorMessage message={`Invalid copyright value: ${value}`} />
  }

  // Calculate the current year using useMemo to avoid recalculating each render
  // This value is memoized so it will only be recalculated if the component re-mounts
  const currentYear: number = useMemo(() => new Date().getFullYear(), [])

  return (
    // Main container for the copyright message, styled with FooterStyle
    <FooterStyle.CopyrightContainer>
      {/* Display the validated copyright value and current year */}
      {value} &copy; <span className="current-year">{currentYear}</span>
      {/* Additional copyright information */}
      <span>
        All rights reserved. Use of this site signifies your agreement to the terms of use.
      </span>
    </FooterStyle.CopyrightContainer>
  )
})

// Set the display name for easier debugging, especially helpful in React DevTools
FooterCopyright.displayName = 'FooterCopyright'

export default FooterCopyright
