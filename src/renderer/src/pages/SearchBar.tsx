import React, { useState } from 'react'
import httpService from '@renderer/services/http'

interface Contact {
  _id: string
  company: string
}

const ContactSearchDropdown: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contact, setContact] = useState<Contact>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [showDropdown, setShowDropdown] = useState<boolean>(true)

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timer: ReturnType<typeof setTimeout>
    return (...args: Parameters<T>) => {
      clearTimeout(timer)
      timer = setTimeout(() => func(...args), delay)
    }
  }

  const fetchContacts = async (searchQuery: string): Promise<void> => {
    console.log('Fetching contacts for:', searchQuery) // Debugging line
    if (searchQuery.trim() === '') {
      setContacts([])
      return
    }
    setLoading(true)
    try {
      const response = await httpService.get(`http://localhost:8080/api/contacts/filter-by-name`, {
        params: {
          search: searchQuery,
          limit: 10
        }
      })
      setContacts(response.data.data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetchContacts = debounce(fetchContacts, 300)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchQuery = event.target.value
    setQuery(searchQuery)
    debouncedFetchContacts(searchQuery)
  }

  const handleSearchButtonClick = async (): Promise<void> => {
    console.log(query)

    try {
      const response = await httpService.get(
        `http://localhost:8080/api/contacts/search-by-name?${query}`
      )
      setContact(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDropdownSelection = (selectedCompany: string): void => {
    setQuery(selectedCompany)
    fetchContacts(selectedCompany)
    setShowDropdown(false)
  }

  const handleInputBlur = (): void => {
    setTimeout(() => setShowDropdown(false), 200) // Delay to allow selection
  }

  console.log('filter: ', contacts)
  console.log('query: ', query)
  console.log('contact: ', contact)

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        value={query}
        name={query}
        onChange={handleInputChange}
        placeholder="Search contacts..."
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          boxSizing: 'border-box'
        }}
        onBlur={handleInputBlur} // Delay to allow selection
      />
      <button
        onClick={handleSearchButtonClick}
        style={{
          marginLeft: '10px',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          cursor: 'pointer'
        }}
      >
        Search
      </button>
      {loading && showDropdown && <div style={{ marginTop: '8px' }}>Loading...</div>}
      <ul
        style={{
          marginTop: '8px',
          padding: '0',
          listStyle: 'none',
          backgroundColor: '#fff',
          border: '1px solid #ccc'
        }}
      >
        {Array.isArray(contacts) &&
          contacts.length > 0 &&
          contacts.map((contact) => (
            <li
              key={contact._id}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc'
              }}
              onClick={() => handleDropdownSelection(contact.company)}
            >
              {contact.company} - {contact.company}
            </li>
          ))}
        {Array.isArray(contacts) && contacts.length === 0 && !loading && query && (
          <div style={{ padding: '8px' }}>No contacts found</div>
        )}
      </ul>
    </div>
  )
}

export default ContactSearchDropdown
