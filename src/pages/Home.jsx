import React from 'react'

import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'
import SuccessButton from '../components/SuccessButton'

const Home = ({ events, user }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Events</h1>
      <div className="flex justify-end">
        {user.role === 'EventManager' && (
          // <SuccessButton to={'/CreateEvent'} text={'Add Event'} />
          <Link to="/CreateEvent">Create Event</Link>
        )}
      </div>
      <div className="flex flex-wrap">
        {events.length ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p>You don't have any event yet!</p>
          // {user.role === 'EventManager' && (<Link to="/eventManager">Create Event</Link>)}
        )}
      </div>
    </div>
  )
}

export default Home
