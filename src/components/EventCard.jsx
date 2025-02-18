import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => {
  return (
    <Link to={`/EventDetails/${event._id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{event.eventName}</div>
          <p className="text-gray-700 text-base">{event.description}</p>
          {event.addressLine && (
            <p className="text-gray-700 text-base">{event.addressLine}</p>
          )}

          <p className="text-gray-700 text-base">
            Date: {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-700 text-base">
            Time: {event.timeHour}:
            {event.timeMinutes < 10
              ? `0${event.timeMinutes}`
              : event.timeMinutes}
          </p>
          {event.venue && (
            <p className="text-gray-700 text-base">Venue: {event.venue}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default EventCard
