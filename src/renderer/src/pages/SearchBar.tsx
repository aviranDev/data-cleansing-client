import React, { useState, useEffect, useRef } from 'react'
import httpService from '@renderer/services/http'
import styled from 'styled-components'
import floor1Image from '../assets/building-flour1.svg'
import floor2Image from '../assets/flour2.svg'

interface Contact {
  _id: string
  company: string
  email: string
  room: string
  floor: number
  service: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`

const Title = styled.h1`
  margin-bottom: 20px;
`

const SearchContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const SearchButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`

const DropdownList = styled.ul`
  position: absolute;
  top: 270px;
  width: 35%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
`

const DropdownItem = styled.li<{ highlighted: boolean }>`
  padding: 8px;
  cursor: pointer;
  background-color: ${(props): string => (props.highlighted ? '#f0f0f0' : '#f9f9f9')};
`

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 17600px;
  margin-top: 10rem;
`

const MapImage = styled.img`
  width: 100%;
  z-index: 1;
`

const Marker = styled.div<{ x: number; y: number }>`
  position: absolute;
  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: ${(props): number => props.y}px;
  left: ${(props): number => props.x}px;
  transform: translate(-50%, -50%);
  z-index: 2;
`

const ContactsTable = styled.table`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  opacity: 0.3;
  pointer-events: none;
  z-index: -1;
  border-collapse: collapse;
  border: 1px solid #ccc;
  font-size: 10px;
`

const TableHead = styled.thead`
  background-color: #f9f9f9;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f1f1f1;
  }
`

const TableHeader = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
`

const TableCell = styled.td`
  padding: 5px;
  border: 1px solid #ccc;
`

const ContactSearchDropdown: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [selected, setSelected] = useState<boolean>(false)
  const [selected2, setSelected2] = useState<boolean>(false)
  const [showDropdown, setShowDropdown] = useState<boolean>(true)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [currentFloor, setCurrentFloor] = useState<number | null>(null)
  const [showMap, setShowMap] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)

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
    // console.log('Fetching contacts for:', searchQuery) // Debugging line
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
    setSelected(false)
  }

  const handleSearchButtonClick = async (): Promise<void> => {
    try {
      const response = await httpService.get(
        `http://localhost:8080/api/contacts/search-by-name?search=${query}`
      )
      const fetchedContact = response.data.contact // Use the fetched data immediately
      setContact(fetchedContact)

      if (fetchedContact) {
        setSelectedContact(fetchedContact)
        setCurrentFloor(fetchedContact.flour) // Assuming the correct key is `floor` not `flour`
        setShowMap(true)
      } else {
        setShowMap(false)
      }
    } catch (error) {
      setShowMap(false)
      console.log(error)
    }
  }

  const handleDropdownSelection = (selectedCompany: Contact): void => {
    setQuery(selectedCompany.company)
    setContacts([])
  }

  const handleInputBlur = (): void => {
    setTimeout(() => setShowDropdown(false), 200) // Delay to allow selection
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    setSelected2(true)
    if (contacts.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < contacts.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault()

        setSelected2(false)
        console.log('highlightedIndex: ', highlightedIndex)

        handleDropdownSelection(contacts[highlightedIndex]) // Pass Contact object
      }
    }
  }

  useEffect(() => {
    if (dropdownRef.current && highlightedIndex !== -1) {
      const highlightedItem = dropdownRef.current.children[highlightedIndex] as HTMLElement
      highlightedItem.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  const getFloorImage = (floor: number): string => {
    return floor === 1 ? floor1Image : floor2Image
  }

  const getRoomPosition = (roomNumber: string): { x: number; y: number } => {
    const roomPositions: Record<string, { x: number; y: number }> = {
      '500': { x: 280, y: 180 },
      '10': { x: 1650, y: 120 },
      '3': { x: 160, y: 10 },
      '4': { x: 235, y: 50 }
    }
    return roomPositions[roomNumber] || { x: 0, y: 0 }
  }

  console.log(contact)
  return (
    <Container>
      <Title>Building Map Search</Title>

      <SearchContainer>
        <SearchInput
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
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur} // Delay to allow selection
        />
        <SearchButton onClick={handleSearchButtonClick}>Search</SearchButton>
      </SearchContainer>
      {loading && showDropdown && <div style={{ marginTop: '8px' }}>Loading...</div>}
      <DropdownList ref={dropdownRef}>
        {Array.isArray(contacts) &&
          contacts.length > 0 &&
          contacts.map((contact, index) => (
            <DropdownItem
              key={index}
              highlighted={index === highlightedIndex}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: highlightedIndex === index ? '#f0f0f0' : '#fff',
                borderBottom: '1px solid #ccc'
              }}
              onClick={() => {
                setSelected(true)
                handleDropdownSelection(contact)
              }}
            >
              {contact.company} - {contact.company}
            </DropdownItem>
          ))}
        {contacts && contacts.length === 0 && !loading && query && !selected && selected2 && (
          <div style={{ padding: '8px' }}>No contacts found</div>
        )}
      </DropdownList>

      {showMap && selectedContact && (
        <MapContainer>
          <h2>Floor {currentFloor}</h2>
          <MapImage src={getFloorImage(currentFloor!)} alt={`Floor ${currentFloor}`} />
          <Marker {...getRoomPosition(selectedContact.room)} />
        </MapContainer>
      )}

      <ContactsTable>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Room</TableHeader>
            <TableHeader>Floor</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.room}</TableCell>
              <TableCell>{contact.floor}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </ContactsTable>
    </Container>
  )
}

export default ContactSearchDropdown
