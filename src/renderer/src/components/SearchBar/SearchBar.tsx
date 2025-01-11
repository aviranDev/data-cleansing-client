import React, { useState, useEffect, useRef } from 'react'
import floor1Image from '../../assets/building-flour1.svg'
import floor2Image from '../../assets/flour2.svg'
import Button from '../Button/Button'
import searchStyle from './styleSearchBar'
import { searchContactAPI, filteredContactAPI } from '../../services/contact'
import { AxiosResponse } from 'axios'
import contactInterface from '../../types/contactInterface'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [filteredContacts, setfilteredContact] = useState<contactInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [selectedFromList, setSelectedFromList] = useState<boolean>(false)
  const [showDropdown, setShowDropdown] = useState<boolean>(true)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [selectedContact, setSelectedContact] = useState<contactInterface | null>(null)
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

  const fetchFilteredContacts = async (searchQuery: string): Promise<void> => {
    if (searchQuery.trim() === '') {
      setfilteredContact([])
      return
    }
    setLoading(true)
    try {
      const response = await filteredContactAPI(searchQuery)
      setfilteredContact(response.data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetchContacts = debounce(fetchFilteredContacts, 300)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchQuery = event.target.value
    setQuery(searchQuery)
    debouncedFetchContacts(searchQuery)
  }

  const searchContact = async (query: string): Promise<void> => {
    try {
      const response: AxiosResponse<contactInterface> = await searchContactAPI(query)

      if (response.data) {
        console.log(response.data)

        const fetchedContact = response.data // Extract the actual contact data
        setSelectedContact(fetchedContact)
        setCurrentFloor(fetchedContact.floor) // `floor` should correctly refer to `contactInterface`
        setShowMap(true)
      } else {
        setShowMap(false)
      }
    } catch (error) {
      setShowMap(false)
      console.error('Error fetching contact:', error)
    }
  }

  const handleDropdownSelection = (selectedCompany: contactInterface): void => {
    setQuery(selectedCompany.company)
    setfilteredContact([])
  }

  const handleInputBlur = (): void => {
    setTimeout(() => setShowDropdown(false), 200) // Delay to allow selection
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    setSelectedFromList(true)
    if (filteredContacts.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < filteredContacts.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault()

        setSelectedFromList(false)
        console.log('highlightedIndex: ', highlightedIndex)

        handleDropdownSelection(filteredContacts[highlightedIndex]) // Pass Contact object
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

  // Reset function to clear the search input and other states
  const resetSearch = (): void => {
    setQuery('')
    setfilteredContact([])
    setSelectedFromList(false)
    setShowDropdown(true)
    setHighlightedIndex(-1)
    setSelectedContact(null)
    setCurrentFloor(null)
    setShowMap(false)
  }

  console.log(loading)
  return (
    <searchStyle.Container>
      <searchStyle.Title>Building Map Search</searchStyle.Title>

      <searchStyle.SearchContainer>
        <searchStyle.SearchInput
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
        <div>
          <Button $variant="primary" width="150px" onClick={() => searchContact(query)}>
            Search
          </Button>

          <Button $variant="secondary" width="150px" onClick={resetSearch}>
            reset
          </Button>
        </div>
      </searchStyle.SearchContainer>
      {loading && showDropdown && <div style={{ marginTop: '8px' }}>Loading...</div>}
      <searchStyle.DropdownList ref={dropdownRef}>
        {Array.isArray(filteredContacts) &&
          filteredContacts.length > 0 &&
          filteredContacts.map((contact, index) => (
            <searchStyle.DropdownItem
              key={index}
              highlighted={index === highlightedIndex}
              onClick={() => {
                handleDropdownSelection(contact)
              }}
            >
              {contact.company} - {contact.company}
            </searchStyle.DropdownItem>
          ))}
        {filteredContacts &&
          filteredContacts.length === 0 &&
          !loading &&
          query &&
          selectedFromList && <div>No contacts found</div>}
      </searchStyle.DropdownList>

      {showMap && selectedContact && (
        <searchStyle.MapContainer>
          <h2>Floor {currentFloor}</h2>
          <searchStyle.MapImage src={getFloorImage(currentFloor!)} alt={`Floor ${currentFloor}`} />
          <searchStyle.Marker {...getRoomPosition(selectedContact.room)} />
        </searchStyle.MapContainer>
      )}
    </searchStyle.Container>
  )
}

export default SearchBar
