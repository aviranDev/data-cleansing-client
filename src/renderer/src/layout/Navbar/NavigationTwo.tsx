import { Fragment } from 'react';
import NavbarStyle from './navStyle';
import { validateString, ValidationErrorMessage } from '../../utils/validateString';

interface RightNavigationProps {
  user?: { role: string; username: string } | null; // Updated type to allow null
  isLoggedIn: boolean;
  navigation: Map<
    string,
    {
      name: React.FC | string;
      link: string;
      title: string;
      roles: string[];
    }
  >;
}

const NavigationTwo: React.FC<RightNavigationProps> = ({ user, isLoggedIn, navigation }) => {
  const renderNavLink = (key: string, Icon: React.FC | string, link: string, title: string): JSX.Element => {
    if (!validateString(link) || !validateString(title)) {
      return (
        <NavbarStyle.ErrorSection key={key}>
          <ValidationErrorMessage message={`Invalid link or title: ${link}`} />
        </NavbarStyle.ErrorSection>
      );
    }

    if (typeof Icon === 'string' && !Icon.trim()) {
      return (
        <NavbarStyle.ErrorSection key={key}>
          <ValidationErrorMessage message={`Invalid Icon: ${Icon}`} />
        </NavbarStyle.ErrorSection>
      );
    }

    return (
      <>
        <NavbarStyle.NavLinkInternal key={key} to={link} $hoverTitle={title}>
          {typeof Icon === 'string' ? Icon : <Icon />}
        </NavbarStyle.NavLinkInternal>
      </>
    );
  };

  return (
    <>
      {isLoggedIn && user && (
        <Fragment>
          {Array.from(navigation).map(([key, { name: Icon, link, title, roles }]) => (
            <Fragment key={key}>
              {roles.includes(user.role) && <Fragment key={key}>{renderNavLink(key, Icon, link, title)}</Fragment>}
            </Fragment>
          ))}
        </Fragment>
      )}
    </>
  );
};

export default NavigationTwo;
