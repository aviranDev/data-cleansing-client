import FooterStyle from './FooterStyles' // Styles specific to the footer layout and design
import FooterCopyright from './CopyRight' // Component displaying copyright information
import FooterExternalLinks from './ExternalLinks' // Component displaying external site links
import FooterInternalLinks from './InternalLinks' // Component displaying internal site navigation links
import FooterWebInfo from './WebInfo' // Component for web-related information or additional resources
import { footerLinks, internalLinks, externalLinks } from './footerData' // Data sets for footer links

// Main Footer Component
function Footer(): JSX.Element {
  return (
    <FooterStyle.Wrapper>
      {/* Section 1: Internal Links */}
      <FooterStyle.Section1>
        <FooterInternalLinks payload={internalLinks} />
      </FooterStyle.Section1>

      {/* Section 2: External Links */}
      <FooterStyle.Section2>
        <FooterExternalLinks payload={externalLinks} />
      </FooterStyle.Section2>

      {/* Section 3: Web Information and Copyright */}
      <FooterStyle.Section3>
        <FooterWebInfo links={footerLinks} />
        <FooterCopyright value={'Freight'} />
      </FooterStyle.Section3>
    </FooterStyle.Wrapper>
  )
}

export default Footer
