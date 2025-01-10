import FooterStyle from './FooterStyles'
import { validateString, ValidationErrorMessage } from '../../utils/validateString'
import { Fragment } from 'react'

/**
 * FooterWebInfo component displays a list of web links in the footer.
 *
 * @param {Object} props - The component props.
 * @param {Map<string, { name: string; link: string }>} props.links - Map of link keys to their information.
 * @returns {JSX.Element} FooterWebInfo component.
 */
function FooterWebInfo({
  links
}: {
  links: Map<string, { name: string; link: string }>
}): JSX.Element {
  // Validate the structure of the Map
  if (!(links instanceof Map)) {
    return (
      // Display an error message if the structure is invalid
      <ValidationErrorMessage
        message={`Invalid structure for 'links'. Expected a Map, received: ${JSON.stringify(links)}`}
      />
    )
  }
  return (
    // Render the list of links
    <>
      {Array.from(links).map(([key, value]) => (
        <Fragment key={key}>
          {validateString(value.name) && validateString(value.link) ? (
            // Valid name and link: render LinksWebInfo
            <FooterStyle.LinksWebInfo to={value.link}>{value.name}</FooterStyle.LinksWebInfo>
          ) : (
            // Invalid name or link: display an error message
            <ValidationErrorMessage
              message={`Invalid name or link provided for '${key}': ${JSON.stringify(value)}`}
            />
          )}
        </Fragment>
      ))}
    </>
  )
}

export default FooterWebInfo
