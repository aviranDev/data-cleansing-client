import FooterStyle from './FooterStyles'
import { validateString, ValidationErrorMessage } from '../../utils/validateString'
import { Fragment } from 'react'

/**
 * FooterInternalLinks component displays a list of internal links in the footer.
 *
 * @param {Object} props - The component props.
 * @param {Map<string, { links: { path: string; to: string }[] }>} props.payload - Map of internal link sections to their information.
 * @returns {JSX.Element} FooterInternalLinks component.
 */
function FooterInternalLinks({
  payload
}: {
  payload: Map<string, { links: { path: string; to: string }[] }>
}): JSX.Element {
  // Validate the structure of the payload to ensure it is a Map
  if (!(payload instanceof Map)) {
    return (
      // Display an error message if the structure is invalid
      <ValidationErrorMessage
        message={`Invalid structure for 'links'. Expected a Map, received: ${JSON.stringify(payload)}`}
      />
    )
  }

  return (
    <>
      {Array.from(payload).map(([key, value]) => (
        <Fragment key={key}>
          <FooterStyle.InternalLinkContainer>
            {/* Validate the section title (key) */}
            {validateString(key) ? (
              <FooterStyle.InternalLinkTitle>{key}</FooterStyle.InternalLinkTitle>
            ) : (
              // Display an error message if the title is invalid
              <ValidationErrorMessage
                message={`Invalid title provided for internal links section: ${key}`}
              />
            )}

            {value.links.map((val) => (
              <Fragment key={val.path}>
                {/* Validate the link path and 'to' property */}
                {validateString(val.path) && validateString(val.to) ? (
                  <FooterStyle.InternalLinkItem to={val.to}>
                    {val.path}
                  </FooterStyle.InternalLinkItem>
                ) : (
                  // Display an error message if the path or 'to' property is invalid
                  <ValidationErrorMessage
                    message={`Invalid path provided for internal link in section '${key}': ${val.path}`}
                  />
                )}
              </Fragment>
            ))}
          </FooterStyle.InternalLinkContainer>
        </Fragment>
      ))}
    </>
  )
}

export default FooterInternalLinks
