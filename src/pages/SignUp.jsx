import { useState } from "react"
import { useNavigate } from "react-router-dom"

import * as authService from "./../services/authService"

const initialFormData = {
  email: '',
  username: '',
  password:'',
  confirmPassword:''
}

const SignUp = (props) =>{
  const [formData, setFormData] = useState(initialFormData)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(formData.confirmPassword!=formData.password){
      setMessage("Password confirm is different");
      return 0;
    }
    try {
      const newUserResponse = await authService.signup(formData)
      props.setUser(newUserResponse.user);
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }
    
  return(
    <>
      <div className='container'>
        <div className='contentWrap'>
          <form onSubmit={handleSubmit} className='flex'>
            <div className="input">
              <label htmlFor="email">Email:</label>
              <input required type="email" id="email" placeholder="your email" value={formData.email} name="email" onChange={handleChange}/>
            </div>
            <div className='input'>
              <label htmlFor="username">Username:</label>
              <input required type="text" id='username' placeholder='your username' value={formData.username} name='username' onChange={handleChange}/>
            </div>
            <div className='input'>
              <label required htmlFor="password">Password:</label>
              <input type="password" id='password' placeholder='your password' value={formData.password} name='password' onChange={handleChange}/>
            </div>
            <div className="input">
              <label required htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" placeholder="confirm your password" value={formData.confirmPassword} name="confirmPassword" onChange={handleChange}/>
            </div>
            <button type='submit' id='signIn' className='marginTop'>Sign up</button>
            <p className='marginTop message'>{message}</p>
          </form>
        </div>
        <div className='bottom'>
          <p className='marginRight'>already have an account?</p><a href="/" className='bold main'>sign in</a>
        </div>
      </div>
    </>
    )
}

export default SignUp