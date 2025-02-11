import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import EventCard from '../components/EventCard'

const Home = ({ events, user }) => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-4">Events</h1>
        <div className="flex flex-wrap">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Home
