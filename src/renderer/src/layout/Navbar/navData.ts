import { FaHome, FaQuestion } from 'react-icons/fa'
import { BiSolidUserDetail } from 'react-icons/bi'

export const roleNavigation = new Map([
  ['Admin dashborad', { name: 'Dashborad', link: '/', title: 'dashborad', roles: ['superAdmin'] }],
  [
    'profile',
    {
      name: BiSolidUserDetail,
      link: '/',
      title: 'profile',
      roles: ['employee', 'admin', 'superAdmin']
    }
  ]
])

export const generalNavigation = new Map([
  ['home', { name: FaHome, link: '/', title: 'Home' }],
  ['about', { name: FaQuestion, link: '/', title: 'About us' }],
  [
    'Link1',
    {
      name: 'Login',
      link: '/login',
      title: 'Link1'
    }
  ],
  [
    'Link2',
    {
      name: 'Link2',
      link: '/',
      title: 'Link2'
    }
  ],
  [
    'Link3',
    {
      name: 'Link3',
      link: '/',
      title: 'Link3'
    }
  ]
])
