// utils/stringUtils.ts
import React from 'react'

/**
 * Validates if a value is a non-empty string, a valid React node, or a number.
 *
 * @param {unknown} value - The value to be validated.
 * @returns {boolean} True if the value is a non-empty string, a valid React node, or a number, false otherwise.
 */
const validateString = (value: unknown): value is string | React.ReactNode => {
  if (typeof value === 'string') {
    return !!value.trim() // Return true if the string is not empty after trimming
  } else if (React.isValidElement(value)) {
    // Check if it's a valid React element
    return true
  } else if (typeof value === 'number') {
    console.error('Invalid value:', value)
    return false
  } else {
    console.error('Invalid value:', value)
    return false
  }
}

/**
 * Display an error message in red.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The error message to be displayed.
 * @returns {JSX.Element} ValidationErrorMessage component.
 */
const ValidationErrorMessage: React.FC<{ message: string }> = ({
  message
}: {
  message: string
}): JSX.Element => <div style={{ color: 'red' }}>{message}</div>

export { validateString, ValidationErrorMessage }
