import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import * as authService from '../src/services/authService'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      //get events from DB
    }
  }, [])
  const navigate = useNavigate()

  return (
    <>
      <main>
        {authService.getUser() != null ? (
          <DefaultLayout>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
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
