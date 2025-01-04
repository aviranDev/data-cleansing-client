import { useState, useEffect } from 'react'
import NavbarStyle from './navStyle'
import { roleNavigation } from './navData'
// import NavigationOne from './NavigationOne'
import NavigationTwo from './NavigationTwo'
import { useLogin } from '@renderer/context/LoginProvider'

export const Navbar = (): JSX.Element => {
  const { user, isLoggedIn } = useLogin()
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollPos = window.scrollY

      if (currentScrollPos < prevScrollPos) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)

    return (): void => {
      console.log('Navbar useEffect cleanup') // Log when useEffect cleanup is performed

      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])

  return (
    <NavbarStyle.Wrapper $isVisible={isVisible}>
      <NavbarStyle.InnerContainer>
        <NavbarStyle.NavContainer order={0}></NavbarStyle.NavContainer>
        <NavbarStyle.NavContainer order={1}>
          <NavigationTwo user={user} isLoggedIn={isLoggedIn} navigation={roleNavigation} />
        </NavbarStyle.NavContainer>
      </NavbarStyle.InnerContainer>
    </NavbarStyle.Wrapper>
  )
}

export default Navbar
