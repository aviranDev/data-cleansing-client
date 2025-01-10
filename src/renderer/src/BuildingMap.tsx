import React, { useState } from 'react'

// Sample contacts and their room assignments
interface Contact {
  contactName: string
  email: string
  roomNumber: string
}

const BuildingMap: React.FC = () => {
  const contacts: Contact[] = [
    { contactName: 'John Doe', email: 'john@example.com', roomNumber: 'Room 101' },
    { contactName: 'Jane Smith', email: 'jane@example.com', roomNumber: 'Room 102' },
    { contactName: 'Alice Brown', email: 'alice@example.com', roomNumber: 'Room 103' },
    { contactName: 'Bob White', email: 'bob@example.com', roomNumber: 'Room 104' }
  ]

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    const filtered = contacts.filter((contact) => contact.contactName.toLowerCase().includes(query))
    setFilteredContacts(filtered)
  }

  return (
    <div>
      <h1>Building Room Map</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by contact name"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '100%',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />

      {/* SVG Map */}
      <img
        src="/src/assets/building.drawio.svg"
        alt="Building Map"
        style={{ width: '500px', height: '500px' }}
      />
      {/* Rooms (Static map) */}
      <rect id="room-101" x="50" y="50" width="100" height="100" fill="lightblue" />
      <rect id="room-102" x="150" y="50" width="100" height="100" fill="lightgreen" />
      <rect id="room-103" x="50" y="150" width="100" height="100" fill="lightcoral" />
      <rect id="room-104" x="150" y="150" width="100" height="100" fill="lightyellow" />

      {/* Displaying the contacts on the map */}
      {filteredContacts.map((contact) => {
        const roomId = `room-${contact.roomNumber.replace(' ', '-').toLowerCase()}`
        const roomElement = document.getElementById(roomId)

        if (roomElement) {
          // Get room's bounding box for positioning
          const { x, y, width, height } = roomElement.getBoundingClientRect()

          return (
            <g key={contact.email}>
              {/* Marker for the contact */}
              <circle
                cx={x + width / 2}
                cy={y + height / 2}
                r="10"
                fill="blue"
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={x + width / 2}
                y={y + height / 2 + 15}
                fontSize="12"
                textAnchor="middle"
                fill="black"
              >
                {contact.contactName}
              </text>
            </g>
          )
        }
        return null
      })}
    </div>
  )
}

export default BuildingMap
