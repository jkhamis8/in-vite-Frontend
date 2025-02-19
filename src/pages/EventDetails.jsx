import { useParams, NavLink } from 'react-router-dom'
import CardDataStats from '../components/CardDataStats'
import InvitesTable from '../components/Tables/InvitesTable'
import { getEventInvites } from '../services/inviteService'
import { useEffect, useState } from 'react'
import { getRepresentatives } from '../services/authService'
import RepresentativesTable from '../components/Tables/RepresentativesTable'
import SuccessButton from '../components/SuccessButton'
import WarningButton from '../components/WarningButton'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'

const EventDetails = ({ events, setEventData }) => {
  const { id } = useParams()
  const event = events.find((event) => event._id === id)
  setEventData(event)
  const [invites, setInvites] = useState([])

  useEffect(() => {
    const getInvites = async () => {
      const response = await getEventInvites(event._id)
      setInvites(response)
    }

    getInvites()
  }, [])

  return (
    <>
      <Breadcrumb pageName={`Event: ${event.eventName}`} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="Description" value={event.description}>
          <svg
            viewBox="0 0 40 40"
            version="1.1"
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6Zm0,22H4V8H32Z"
              class="clr-i-outline clr-i-outline-path-1"
            ></path>
            <path
              d="M9,14H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
              class="clr-i-outline clr-i-outline-path-2"
            ></path>
            <path
              d="M9,18H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
              class="clr-i-outline clr-i-outline-path-3"
            ></path>
            <path
              d="M9,22H19a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
              class="clr-i-outline clr-i-outline-path-4"
            ></path>
            <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Date/Time"
          value={new Date(event.date).toLocaleString()}
        >
          <svg
            className="h-6 w-6 fill-current"
            width="22px"
            height="22px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.5 2H13V1h-1v1H4V1H3v1H1.5l-.5.5v12l.5.5h13l.5-.5v-12l-.5-.5zM14 14H2V5h12v9zm0-10H2V3h12v1zM4 8H3v1h1V8zm-1 2h1v1H3v-1zm1 2H3v1h1v-1zm2-4h1v1H6V8zm1 2H6v1h1v-1zm-1 2h1v1H6v-1zm1-6H6v1h1V6zm2 2h1v1H9V8zm1 2H9v1h1v-1zm-1 2h1v1H9v-1zm1-6H9v1h1V6zm2 2h1v1h-1V8zm1 2h-1v1h1v-1zm-1-4h1v1h-1V6z"
            />
          </svg>
        </CardDataStats>
        {event.venue ? (
          <CardDataStats title="Venue" value={event.venue.venueName}>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
              <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
            </svg>
          </CardDataStats>
        ) : (
          <CardDataStats title="Address" value={event.addressLine}>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
              <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
            </svg>
          </CardDataStats>
        )}
        {/* <CardDataStats
          title="Description"
          value={event.description}
        ></CardDataStats> */}
      </div>
      <NavLink to={`/addGuest`}>Add an entry</NavLink>

      <SuccessButton to={`/addGuest/${event._id}`} text="+ Invite" />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12">
          <InvitesTable invites={invites} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {events.representatives && (
          <div className="col-span-12">
            <RepresentativesTable representatives={event.representatives} />
          </div>
        )}
      </div>
      <div>
        <WarningButton to={`/EventForm/${event._id}`} text="Edit Event" />
      </div>
    </>
  )
}

export default EventDetails
