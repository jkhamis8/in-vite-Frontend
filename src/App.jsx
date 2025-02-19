import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import * as authService from '../src/services/authService'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import EventForm from './pages/EventForm'
import VenueForm from './pages/VenueForm'
import RepresentativeForm from './pages/RepresentativeForm'
import InvitationForm from './pages/InvitationForm'
import { getManagerEvents } from './services/eventService'
import EventDetails from './pages/EventDetails'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [eventData, setEventData] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      const response = await getManagerEvents(user._id)
      setEvents(response)
    }
    getEvents()
  }, [])
  return (
    <>
      <main>
        {authService.getUser() != null ? (
          <DefaultLayout>
            <Routes>
              <Route path="/" element={<Home events={events} user={user} />} />
              <Route
                path="/profile"
                element={
                  <Profile user={user} handleLogout={authService.signout} />
                }
              />
              <Route
                path="/editProfile"
                // element={
                //   <ProfileForm user={user} handleLogout={logOut} />
                // }
              />
              <Route path="/EventForm" element={<EventForm user={user} />} />
              <Route
                path="/EventForm/:eventId"
                element={<EventForm user={user} />}
              />
              <Route path="/VenueForm" element={<VenueForm user={user} />} />
              <Route
                path="/VenueForm/:venueId"
                element={<VenueForm user={user} />}
              />
              <Route
                path="/RepresentativeForm"
                element={<RepresentativeForm user={user} />}
              />
              <Route
                path="/RepresentativeForm/:representativeId"
                element={<RepresentativeForm user={user} />}
              />
              <Route
                path="/EventDetails/:id"
                element={
                  <EventDetails
                    user={user}
                    events={events}
                    setEventData={setEventData}
                  />
                }
              />
              <Route
                path="/addGuest"
                element={<InvitationForm eventData={eventData} user={user} />}
              />
              <Route path="*" element={<h3>Page Not Found</h3>} />
            </Routes>
          </DefaultLayout>
        ) : (
          <Routes>
            <Route path="/" element={<SignIn setUser={setUser} />} />
            <Route path="/signUp" element={<SignUp setUser={setUser} />} />
            <Route
              path="/eventManager"
              element={<SignUp setUser={setUser} />}
            />
          </Routes>
        )}
      </main>
    </>
  )
}

export default App
