/* import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import floor1Image from './assets/building-flour1.svg'
import floor2Image from './assets/flour2.svg'

interface Contact {
  contactName: string
  email: string
  roomNumber: string
  floorNumber: number
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
  top: 38px;
  width: 100%;
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
  background-color: ${(props): string => (props.highlighted ? '#f1f1f1' : '#f9f9f9')};

  &:hover {
    background-color: #e6e6e6;
  }
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

const BuildingMap: React.FC = () => {
  const contacts: Contact[] = [
    { contactName: 'John Doe', email: 'john@example.com', roomNumber: '1', floorNumber: 1115 },
    { contactName: 'Jane Smith', email: 'jane@example.com', roomNumber: '2', floorNumber: 904 },
    { contactName: 'James Brown', email: 'james@example.com', roomNumber: '3', floorNumber: 1024 },
    { contactName: 'Test Teste', email: 'test@example.com', roomNumber: '4', floorNumber: 901 }
  ]

  const [searchText, setSearchText] = useState<string>('')
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [currentFloor, setCurrentFloor] = useState<number | null>(null)
  const [showMap, setShowMap] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setSearchText(value)
    setShowMap(false)
    setHighlightedIndex(-1)

    if (value) {
      const matches = contacts.filter((contact) =>
        contact.contactName.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredContacts(matches)
    } else {
      setFilteredContacts([])
    }
  }
  console.log(currentFloor)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (filteredContacts.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < filteredContacts.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault()
        handleContactSelect(filteredContacts[highlightedIndex])
      }
    }
  }

  const handleContactSelect = (contact: Contact): void => {
    setSearchText(contact.contactName)
    setFilteredContacts([])
    setHighlightedIndex(-1)
  }

  const handleSearchClick = (): void => {
    const contact = contacts.find(
      (contact) => contact.contactName.toLowerCase() === searchText.toLowerCase()
    )

    if (contact) {
      setSelectedContact(contact)
      setCurrentFloor(contact.floorNumber)
      setShowMap(true)
    } else {
      setShowMap(false)
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
      '1': { x: 280, y: 180 },
      '2': { x: 1650, y: 120 },
      '3': { x: 160, y: 10 },
      '4': { x: 235, y: 50 }
    }
    return roomPositions[roomNumber] || { x: 0, y: 0 }
  }

  return (
    <Container>
      <Title>Building Map Search</Title>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search contact..."
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {searchText && filteredContacts.length > 0 && (
          <DropdownList ref={dropdownRef}>
            {filteredContacts.map((contact, index) => (
              <DropdownItem
                key={contact.email}
                highlighted={index === highlightedIndex}
                onClick={() => handleContactSelect(contact)}
              >
                {contact.contactName}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
        <SearchButton onClick={handleSearchClick}>Search</SearchButton>
      </SearchContainer>

      {showMap && selectedContact && (
        <MapContainer>
          <h2>Floor {currentFloor}</h2>
          <MapImage src={getFloorImage(currentFloor!)} alt={`Floor ${currentFloor}`} />
          <Marker {...getRoomPosition(selectedContact.roomNumber)} />
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
            <TableRow key={contact.email}>
              <TableCell>{contact.contactName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.roomNumber}</TableCell>
              <TableCell>{contact.floorNumber}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </ContactsTable>
    </Container>
  )
}

export default BuildingMap
 */

import Templates from './templates/Templates'
import Navigation from './navigation/Navigation'

function App(): JSX.Element {
  return (
    <Templates>
      <Navigation />
    </Templates>
  )
}

export default App
