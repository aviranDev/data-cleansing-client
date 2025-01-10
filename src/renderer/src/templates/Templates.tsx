import React, { ReactNode } from 'react'
import { GlobalStyles, LayoutContainer } from '../styles/layoutStyles'
import Content from './mainContent'
import Sidebar from '@renderer/layout/sideBar/Sidebar'
import Footer from '@renderer/layout/footer/Footer'
import Login from '../pages/Login'
import { useLogin } from '../context/LoginProvider'
import Navbar from '@renderer/layout/Navbar/Navbar'
interface TemplatesProps {
  children: ReactNode
}

const Templates: React.FC<TemplatesProps> = ({ children }) => {
  const { isLoggedIn } = useLogin()

  return (
    <LayoutContainer>
      <GlobalStyles />
      {isLoggedIn ? (
        <>
          <Navbar />
          <Sidebar />
          <Content>{children}</Content>
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </LayoutContainer>
  )
}

export default Templates
