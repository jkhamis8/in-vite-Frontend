import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { rsvpResponse } from '../services/inviteService'

import Swal from 'sweetalert2'
const initialFormData = {
  username: '',
  password: ''
}
const SignIn = (props) => {
  const { inviteId, action } = useParams();
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')


  useEffect(async () => {

    if (!inviteId) {
      navigate('/')
    } else {
      if (action == 1) {
        await rsvpResponse(inviteId, 'Yes')
        setTitle('Awesome!')
        setMessage('see You there')
      } else if (action == 0) {
        await rsvpResponse(inviteId, 'No')
        setTitle('We’ll miss you :(')
        setMessage('hope to see you next time!')
      }
    }
  }, [])

  return (
    <>
      <div className="flex items-center justify-center min-h-screen h-80">
        <div className="w-full max-w-md rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center">
            <div className="w-full border-stroke dark:border-strokedark xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl">
                  {title}
                </h2>
                <h4 className="mb-9 text-2 font-bold text-black dark:text-white sm:text-title-xl">
                  {message}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
