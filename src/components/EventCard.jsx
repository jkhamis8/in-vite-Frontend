import React from 'react'

const EventCard = ({ event }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{event.eventName}</div>
        <p className="text-gray-700 text-base">{event.description}</p>
        <p className="text-gray-700 text-base">{event.addressLine}</p>
        <a
          href={event.locationURL}
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Location
        </a>
        <p className="text-gray-700 text-base">
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-base">
          Time: {event.timeHour}:
          {event.timeMinutes < 10 ? `0${event.timeMinutes}` : event.timeMinutes}
        </p>
        <p className="text-gray-700 text-base">Venue: {event.venue}</p>
      </div>
    </div>
  )
}

export default EventCard
