import FooterStyle from './FooterStyles';
import { ReactNode, Fragment } from 'react';
import { validateString, ValidationErrorMessage } from '../../utils/validateString';

// Type for external link information.
type LinkInfo = {
  image?: ReactNode;
  href?: string;
};

/**
 * FooterExternalLinks component displays external links in the footer.
 * It takes a payload containing a Map of link keys to their respective information.
 *
 * @param {Object} props - The component props.
 * @param {Map<string, LinkInfo>} props.payload - Map of link keys to their information.
 * @returns {JSX.Element} FooterExternalLinks component.
 */
function FooterExternalLinks({ payload }: { payload: Map<string, LinkInfo> }): JSX.Element {
  // Validate that payload is an instance of Map
  if (!(payload instanceof Map)) {
    return (
      // Error message if the structure of payload is invalid
      <ValidationErrorMessage
        message={`Invalid structure for 'payload'. Expected a Map, received: ${JSON.stringify(payload)}`}
      />
    );
  }

  return (
    <>
      {Array.from(payload).map(([key, { image, href }]) => (
        <Fragment key={key}>
          {validateString(href) ? (
            // Render link if href is valid, with image if provided
            <FooterStyle.ExternalLinkImg target="_blank" href={href}>
              {image}
            </FooterStyle.ExternalLinkImg>
          ) : (
            // Error message for invalid href value
            <ValidationErrorMessage message={`Invalid href value for link '${key}': ${href}`} />
          )}
        </Fragment>
      ))}
    </>
  );
}

export default FooterExternalLinks;
