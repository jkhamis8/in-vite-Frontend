import React from 'react'
import { useEffect, useState } from 'react'
import * as authService from '../services/authService'
import { getManagerEvents } from '../services/eventService'

import EventCard from '../components/EventCard'
import { Link } from 'react-router-dom'
import SuccessButton from '../components/SuccessButton'

const Home = ({ events, user,setEvents  }) => {
  const getEvents = async () => {
    const response = await getManagerEvents(user._id)
    setEvents(response)
  }
  useEffect(() => {
    if(authService.getUser() != null){
    getEvents()}
  }, [])
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Events</h1>
      <div className="mb-10">
        {user.role === 'EventManager' && (
          <>
            <SuccessButton to="/EventForm" text="+ Create Event" />
          </>
        )}
      </div>
      <div className="flex flex-wrap">
        {events.length ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p>You don't have any event yet!</p>
        )}
      </div>
    </div>
  )
}

export default Home
