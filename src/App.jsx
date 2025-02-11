import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import * as authService from '../src/services/authService'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import DefaultLayout from './layout/DefaultLayout'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()
  const handleSignout = () => {
    navigate('/')
    authService.signout()
    setUser(null)
  }

  return (
    <>
      <main>
        {authService.getUser() != null ? (
          <DefaultLayout>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route
                path="/profile"
                element={<Profile user={user} handleSignout={handleSignout} />}
              />
              <Route
                path="/editProfile"
                element={
                  <ProfileForm user={user} handleSignout={handleSignout} />
                }
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
