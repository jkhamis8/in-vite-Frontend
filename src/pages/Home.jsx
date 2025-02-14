import React from 'react'

import EventCard from '../components/EventCard'

const Home = ({ events, user }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Events</h1>
      <div className="flex flex-wrap">
        {/* {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))} */}
      </div>
    </div>
  )
}

export default Home
