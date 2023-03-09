import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../middlewares/User-state'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('')
  const { data, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/user/verify`, { email: email, password: password })
      .then(res => {
        if (res.status === 200) {
          Cookies.set("authToken", res.data.token)
          navigate('/home')
        }
      })
      .catch(res => console.error(res.data))
  }



  return (
    <div className="flex flex-col p-2 space-y-3 my-[3vh]">
      <form onSubmit={formSubmit} className="form space-y-3">
        <div className="space-y-2">
          <label className='flex flex-col' htmlFor="email">
            <span className="text-2xl ">Email</span>
            <input className="form-input text-black" id="email" type="text" placeholder="Enter Your email" value={email} onChange={(e) => setemail(e.target.value)} />
          </label>

          <label className='flex flex-col' htmlFor="password">
            <span className="text-2xl">Password</span>
            <input className="form-input text-black" id='password' type="text" placeholder='Enter your password' value={password} onChange={(e) => setpassword(e.target.value)} />
          </label>
          <span className='text-blue-600 cursor-pointer underline'>Forgot your password?</span>
        </div>
        <div className='space-y-1'>
          <button type="submit" className="py-2 px-4 bg-blue-500 rounded-lg text-white">
            Login
          </button>
          <div>
            <span>New to ForumApp?</span>
            <Link to='/register'>
              <span className='text-blue-700 underline ml-2'>Register Now</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
