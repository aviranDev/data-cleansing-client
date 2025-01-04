import { validateString, ValidationErrorMessage } from './validateString'
import NavbarStyle from '../layout/Navbar/navStyle'

export const renderNavLink = (
  key: string,
  Icon: React.FC | string,
  link: string,
  title: string
): JSX.Element => {
  if (!validateString(link) || !validateString(title)) {
    return (
      <NavbarStyle.ErrorSection key={key}>
        <ValidationErrorMessage message={`Invalid link or title: ${link}`} />
      </NavbarStyle.ErrorSection>
    )
  }

  if (typeof Icon === 'string' && !Icon.trim()) {
    return (
      <NavbarStyle.ErrorSection key={key}>
        <ValidationErrorMessage message={`Invalid Icon: ${Icon}`} />
      </NavbarStyle.ErrorSection>
    )
  }

  if (typeof Icon === 'number') {
    return (
      <NavbarStyle.ErrorSection key={key}>
        <ValidationErrorMessage message={`Invalid Icon: ${Icon}`} />
      </NavbarStyle.ErrorSection>
    )
  }

  return (
    <>
      <NavbarStyle.NavLinkInternal key={key} $hoverTitle={title} to={link}>
        {typeof Icon === 'string' ? Icon : <Icon />}
      </NavbarStyle.NavLinkInternal>
    </>
  )
}

export type GeneralNavType = Map<
  string,
  {
    name: React.FC | string
    link: string
    title: string
  }
>

export default renderNavLink
