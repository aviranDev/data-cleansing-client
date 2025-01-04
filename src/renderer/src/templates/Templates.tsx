import React, { ReactNode } from 'react'
import { GlobalStyles, LayoutContainer } from '../styles/layoutStyles'
import Content from './mainContent'
import Sidebar from '@renderer/layout/sideBar/Sidebar'
import Footer from '@renderer/layout/footer/Footer'
import Login from '../pages/Login'
import { useLogin } from '../context/LoginProvider'

interface TemplatesProps {
  children: ReactNode
}

const Templates: React.FC<TemplatesProps> = ({ children }) => {
  const { isLoggedIn } = useLogin()

  return (
    <LayoutContainer>
      <GlobalStyles />
      {isLoggedIn ? (
        <div>
          <Sidebar />
          <Content>{children}</Content>
          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </LayoutContainer>
  )
}

export default Templates
