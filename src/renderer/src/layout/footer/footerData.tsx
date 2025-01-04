import { ReactNode } from 'react'
import mamanLink from '../../../src/assets/maman-logo.png'
import swissportLink from '../../../src/assets/swissport-logo.png'

// Map of external links with optional images
export const externalLinks = new Map<string, { image?: ReactNode; href?: string }>([
  [
    'swissport',
    {
      image: <img src={swissportLink} alt="swissport-logo" />,
      href: 'https://www.swissport.co.il/heb/Main/'
    }
  ],
  [
    'maman',
    {
      image: <img src={mamanLink} alt="maman-logo" />,
      href: 'https://mamanonline.maman.co.il/'
    }
  ]
])

// Map of links data organized by sections
export const internalLinks = new Map([
  [
    'menu',
    {
      links: [
        { path: 'about us', to: '/about-us' },
        { path: 'login', to: '/login' }
      ]
    }
  ],
  [
    'airlines',
    {
      links: [
        { path: 'maman airlines', to: '/maman-airlines' },
        { path: 'swissport airlines', to: '/swissport-airlines' }
      ]
    }
  ],
  [
    'agents',
    {
      links: [
        { path: 'a.d', to: '/' },
        { path: 'air logistics', to: '/' },
        { path: 'british airways', to: '/' },
        { path: 'el al', to: '/' },
        { path: 'globspeed', to: '/' },
        { path: 'wta', to: '/' }
      ]
    }
  ],
  [
    'departments',
    {
      links: [
        { path: 'import', to: '/' },
        { path: 'export', to: '/' },
        { path: 'pharma', to: '/' },
        { path: 'aviation', to: '/' },
        { path: 'transportation', to: '/' }
      ]
    }
  ],
  [
    'users',
    {
      links: [
        { path: 'administrators', to: '/' },
        { path: 'employee', to: '/' }
      ]
    }
  ]
])

// Map of named links
export const footerLinks = new Map<string, { name: string; link: string }>([
  ['about-us', { link: '/', name: 'about-us' }],
  ['terms of use', { link: '/', name: 'terms of use' }]
])
