import { useEffect, useState } from 'react'
import { Routes, Route ,useNavigate} from "react-router-dom"

import SignIn from "./pages/SignIn"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
    {authService.getUser() !=null ? 
      <Routes>
        <Route path='/' element={
          <Home user={user} />
        } />
        <Route path='/profile' element={
          <Profile user={user} handleSignout={handleSignout}/>
        }/>
        <Route path='/editProfile' element={
          <ProfileForm user={user} handleSignout={handleSignout}/>
        }/>
        <Route path="*" element={
        <h3>Page Not Found</h3>
      }/>
      </Routes>
      :
      <Routes>
      <Route path='/' element={
          <SignIn setUser={setUser}/>
        }/>
        <Route path='/signUp' element={
          <SignUp setUser={setUser}/>
        }/>
      </Routes>
}
    </main>
  </>
  )
}

export default App
