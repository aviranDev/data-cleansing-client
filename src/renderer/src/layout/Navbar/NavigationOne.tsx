import React, { Fragment } from 'react'
import NavbarStyle from './navStyle'
import renderNavLink from '../../utils/renderNavLink'

export type GeneralNavType = Map<
  string,
  {
    name: React.FC | string
    link: string
    title: string
  }
>

interface NavigationOneProps {
  navigation: GeneralNavType
}

const NavigationOne: React.FC<NavigationOneProps> = ({ navigation }) => {
  return (
    <Fragment>
      {Array.from(navigation).map(([key, { name: Icon, link, title }]) => (
        <Fragment key={key}>{renderNavLink(key, Icon, link, title)}</Fragment>
      ))}
    </Fragment>
  )
}

export default NavigationOne
