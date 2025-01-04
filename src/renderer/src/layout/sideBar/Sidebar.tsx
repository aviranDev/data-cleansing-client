import { SidebarContainer, SidebarInnerContainer } from './sidebarStyles'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { userNav } from './sideBarData'
import { Fragment, useState } from 'react'
import { useLogin } from '@renderer/context/LoginProvider'
import { RiArrowDropDownLine } from 'react-icons/ri'
import './styles.css'

interface UserDetailsProps {
  user: {
    username: string
    role: string
  }
  logout: () => void
}

const UserDetails = ({ user, logout }: UserDetailsProps): JSX.Element => (
  <ul>
    <li className="user-details">
      <div className="user-icon">
        <FaUser size={35} />
      </div>
      <div className="user-info">
        <p>
          <strong>User:</strong> {user.username}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
      <button onClick={logout} className="logout-button" aria-label="Log out">
        Logout
      </button>
    </li>
  </ul>
)

// Define the props type for SidebarItem
interface SidebarItemProps {
  title: string
  section: string
  isOpen: boolean
  toggleSection: () => void
  children: React.ReactNode
}

const SidebarItem = ({ title, isOpen, toggleSection, children }: SidebarItemProps): JSX.Element => (
  <li className={`outer-item ${isOpen ? 'open' : ''}`}>
    <a onClick={toggleSection}>
      {title}
      <RiArrowDropDownLine
        className="arrow-icon"
        size={20}
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
          marginLeft: '10px',
          position: 'relative',
          top: '4px'
        }}
      />
    </a>
    {isOpen && <ul>{children}</ul>}
  </li>
)

const Sidebar = (): JSX.Element => {
  const { user, logout } = useLogin()
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    topic1: false,
    topic2: false, // Add more sections as needed
    topic3: false, // Add more sections as needed
    topic4: false, // Add more sections as needed
    topic5: false, // Add more sections as needed
    topic6: false, // Add more sections as needed
    topic7: false, // Add more sections as needed
    topic8: false, // Add more sections as needed
    topic9: false, // Add more sections as needed
    topic10: false // Add more sections as needed
  })

  const toggleSection = (section: string): void => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] })) // Toggle the specific section
  }

  return (
    <SidebarContainer>
      {user ? (
        <Fragment>
          {Array.from(userNav()).map(([key, value]) => (
            <Fragment key={key}>
              {value.role === user?.role && <UserDetails user={user} logout={logout} />}
            </Fragment>
          ))}
        </Fragment>
      ) : (
        <Fragment>
          <Fragment>
            <Link to="/logout">Logout</Link>
          </Fragment>
        </Fragment>
      )}
      <SidebarInnerContainer>
        <ul>
          <SidebarItem
            title="Topic 1"
            section="topic1"
            isOpen={openSections.topic1}
            toggleSection={() => toggleSection('topic1')}
          >
            <li className="inner-item">
              <Link to="/about/history">History</Link>
            </li>
            <li className="inner-item">
              <Link to="/about/team">Team</Link>
            </li>
            <li className="inner-item">
              <Link to="/about/mission">Mission</Link>
            </li>
          </SidebarItem>

          <SidebarItem
            title="Topic 2"
            section="topic2"
            isOpen={openSections.topic2}
            toggleSection={() => toggleSection('topic2')}
          >
            <li className="inner-item">
              <Link to="/topic2/item1">Item 1</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic2/item2">Item 2</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic2/item3">Item 3</Link>
            </li>
          </SidebarItem>

          <SidebarItem
            title="Topic 3"
            section="topic3"
            isOpen={openSections.topic3}
            toggleSection={() => toggleSection('topic3')}
          >
            <li className="inner-item">
              <Link to="/topic3/item1">Item 1</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item2">Item 2</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item3">Item 3</Link>
            </li>
          </SidebarItem>

          <SidebarItem
            title="Topic 4"
            section="topic4"
            isOpen={openSections.topic4}
            toggleSection={() => toggleSection('topic4')}
          >
            <li className="inner-item">
              <Link to="/topic3/item1">Item 1</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item2">Item 2</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item3">Item 3</Link>
            </li>
          </SidebarItem>

          <SidebarItem
            title="Topic 5"
            section="topic5"
            isOpen={openSections.topic5}
            toggleSection={() => toggleSection('topic5')}
          >
            <li className="inner-item">
              <Link to="/topic3/item1">Item 1</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item2">Item 2</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item3">Item 3</Link>
            </li>
          </SidebarItem>

          <SidebarItem
            title="Topic 6"
            section="topic6"
            isOpen={openSections.topic6}
            toggleSection={() => toggleSection('topic6')}
          >
            <li className="inner-item">
              <Link to="/topic3/item1">Item 1</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item2">Item 2</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item3">Item 3</Link>
            </li>
          </SidebarItem>
          <SidebarItem
            title="Topic 7"
            section="topic7"
            isOpen={openSections.topic7}
            toggleSection={() => toggleSection('topic7')}
          >
            <li className="inner-item">
              <Link to="/topic3/item1">Item 1</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item2">Item 2</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item3">Item 3</Link>
            </li>
          </SidebarItem>

          <SidebarItem
            title="Topic 8"
            section="topic8"
            isOpen={openSections.topic8}
            toggleSection={() => toggleSection('topic8')}
          >
            <li className="inner-item">
              <Link to="/topic3/item1">Item 1</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item2">Item 2</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item3">Item 3</Link>
            </li>
          </SidebarItem>

          <SidebarItem
            title="Topic 9"
            section="topic9"
            isOpen={openSections.topic9}
            toggleSection={() => toggleSection('topic9')}
          >
            <li className="inner-item">
              <Link to="/topic3/item1">Item 1</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item2">Item 2</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item3">Item 3</Link>
            </li>
          </SidebarItem>

          <SidebarItem
            title="Topic 10"
            section="topic10"
            isOpen={openSections.topic10}
            toggleSection={() => toggleSection('topic10')}
          >
            <li className="inner-item">
              <Link to="/topic3/item1">Item 1</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item2">Item 2</Link>
            </li>
            <li className="inner-item">
              <Link to="/topic3/item3">Item 3</Link>
            </li>
          </SidebarItem>
        </ul>
      </SidebarInnerContainer>
    </SidebarContainer>
  )
}

export default Sidebar
