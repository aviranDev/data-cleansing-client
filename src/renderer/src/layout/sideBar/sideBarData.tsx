interface UserNavEntry {
  role: string
  path: string
}

export type UserNavType = Map<string, UserNavEntry>
type GuestNavType = Map<string, string>

export const userNav = (): UserNavType => {
  const mapEntries: Array<[string, UserNavEntry]> = [
    ['employee', { role: 'employee', path: '/dashboard' }],
    ['admin', { role: 'admin', path: '/admin-dashboard' }],
    ['superAdmin', { role: 'superAdmin', path: '/admin-dashboard' }]
  ]

  return new Map<string, UserNavEntry>(mapEntries)
}

export const guestNav: GuestNavType = new Map([
  ['Signup', '/signup'],
  ['Login', '/login']
])
