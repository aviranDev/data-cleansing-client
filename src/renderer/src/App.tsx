import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import floor1Image from './assets/building-flour1.svg'
import floor2Image from './assets/building-flour2.svg'

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
  max-width: 1400px;
  margin-top: 10rem;
`

const MapImage = styled.img`
  width: 100%;
  z-index: 1; /* Ensure the map is on top */
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
  z-index: 2; /* Ensure the marker is on top of the map */
`

const ContactsTable = styled.table`
  position: absolute; /* Makes the table static relative to the container */
  top: 0; /* Adjust position relative to the map */
  left: 50%;
  transform: translate(-50%, -50%); /* Center the table behind the map */
  width: 100%;
  opacity: 0.3;
  pointer-events: none; /* Disable interactions with the table */
  z-index: -1; /* Send the table behind the map */
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
    { contactName: 'John Doe', email: 'john@example.com', roomNumber: '1', floorNumber: 1 },
    { contactName: 'Jane Smith', email: 'jane@example.com', roomNumber: '2', floorNumber: 1 },
    { contactName: 'James Brown', email: 'james@example.com', roomNumber: '3', floorNumber: 2 },
    { contactName: 'Test Teste', email: 'test@example.com', roomNumber: '4', floorNumber: 2 },
    { contactName: 'Cfhdf Dfhfd', email: 'cfhdf@example.com', roomNumber: '5', floorNumber: 1 },
    { contactName: 'Asdas Asdas', email: 'asdas@example.com', roomNumber: '6', floorNumber: 1 },
    { contactName: 'Sdgsd Sdgsdg', email: 'sdgsd@example.com', roomNumber: '7', floorNumber: 1 },
    { contactName: 'Jill Gdsxg', email: 'jill@example.com', roomNumber: '8', floorNumber: 1 },
    { contactName: 'Erty Dfgdf', email: 'erty@example.com', roomNumber: '9', floorNumber: 1 },
    {
      contactName: 'Asdas Hdfh',
      email: 'asdas_hdfh@example.com',
      roomNumber: '10',
      floorNumber: 2
    },
    { contactName: 'Alex Johnson', email: 'alex@example.com', roomNumber: '11', floorNumber: 2 },
    { contactName: 'Chris Green', email: 'chris@example.com', roomNumber: '12', floorNumber: 3 },
    { contactName: 'Pat White', email: 'pat@example.com', roomNumber: '13', floorNumber: 3 },
    { contactName: 'Morgan Black', email: 'morgan@example.com', roomNumber: '14', floorNumber: 3 },
    { contactName: 'Taylor Gray', email: 'taylor@example.com', roomNumber: '15', floorNumber: 4 },
    { contactName: 'Jordan Blue', email: 'jordan@example.com', roomNumber: '16', floorNumber: 4 },
    { contactName: 'Riley Brown', email: 'riley@example.com', roomNumber: '17', floorNumber: 4 },
    { contactName: 'Jamie Green', email: 'jamie@example.com', roomNumber: '18', floorNumber: 4 },
    { contactName: 'Casey Red', email: 'casey@example.com', roomNumber: '19', floorNumber: 5 },
    { contactName: 'Robin Yellow', email: 'robin@example.com', roomNumber: '20', floorNumber: 5 },
    { contactName: 'Hunter Orange', email: 'hunter@example.com', roomNumber: '21', floorNumber: 1 },
    { contactName: 'Peyton Purple', email: 'peyton@example.com', roomNumber: '22', floorNumber: 2 },
    { contactName: 'Corey Pink', email: 'corey@example.com', roomNumber: '23', floorNumber: 2 },
    { contactName: 'Leslie Cyan', email: 'leslie@example.com', roomNumber: '24', floorNumber: 3 },
    { contactName: 'Cameron Lime', email: 'cameron@example.com', roomNumber: '25', floorNumber: 3 },
    { contactName: 'Taylor Violet', email: 'violet@example.com', roomNumber: '26', floorNumber: 4 },
    { contactName: 'Sydney Aqua', email: 'aqua@example.com', roomNumber: '27', floorNumber: 5 },
    { contactName: 'Dakota Indigo', email: 'indigo@example.com', roomNumber: '28', floorNumber: 1 },
    { contactName: 'Quinn Magenta', email: 'quinn@example.com', roomNumber: '29', floorNumber: 1 },
    { contactName: 'Alex Gold', email: 'gold@example.com', roomNumber: '30', floorNumber: 2 },
    { contactName: 'Sam Silver', email: 'silver@example.com', roomNumber: '31', floorNumber: 2 },
    {
      contactName: 'Jordan Platinum',
      email: 'platinum@example.com',
      roomNumber: '32',
      floorNumber: 3
    },
    { contactName: 'Taylor Ruby', email: 'ruby@example.com', roomNumber: '33', floorNumber: 3 },
    {
      contactName: 'Morgan Sapphire',
      email: 'sapphire@example.com',
      roomNumber: '34',
      floorNumber: 4
    },
    { contactName: 'Pat Emerald', email: 'emerald@example.com', roomNumber: '35', floorNumber: 5 },
    { contactName: 'Riley Amber', email: 'amber@example.com', roomNumber: '36', floorNumber: 5 },
    { contactName: 'Jordan Topaz', email: 'topaz@example.com', roomNumber: '37', floorNumber: 1 },
    { contactName: 'Cameron Jade', email: 'jade@example.com', roomNumber: '38', floorNumber: 2 },
    {
      contactName: 'Taylor Diamond',
      email: 'diamond@example.com',
      roomNumber: '39',
      floorNumber: 2
    },
    { contactName: 'Chris Quartz', email: 'quartz@example.com', roomNumber: '40', floorNumber: 3 },
    {
      contactName: 'Alex Amethyst',
      email: 'amethyst@example.com',
      roomNumber: '41',
      floorNumber: 4
    },
    { contactName: 'Casey Garnet', email: 'garnet@example.com', roomNumber: '42', floorNumber: 5 },
    { contactName: 'Robin Coral', email: 'coral@example.com', roomNumber: '43', floorNumber: 1 },
    { contactName: 'Hunter Pearl', email: 'pearl@example.com', roomNumber: '44', floorNumber: 2 },
    { contactName: 'Sydney Onyx', email: 'onyx@example.com', roomNumber: '45', floorNumber: 3 },
    { contactName: 'Dakota Lapis', email: 'lapis@example.com', roomNumber: '46', floorNumber: 4 },
    {
      contactName: 'Quinn Citrine',
      email: 'citrine@example.com',
      roomNumber: '47',
      floorNumber: 5
    },
    {
      contactName: 'Leslie Turquoise',
      email: 'turquoise@example.com',
      roomNumber: '48',
      floorNumber: 1
    },
    { contactName: 'Peyton Opal', email: 'opal@example.com', roomNumber: '49', floorNumber: 2 },
    {
      contactName: 'Corey Moonstone',
      email: 'moonstone@example.com',
      roomNumber: '50',
      floorNumber: 3
    }
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
      '1': { x: 240, y: -30 },
      '2': { x: 95, y: 10 },
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
