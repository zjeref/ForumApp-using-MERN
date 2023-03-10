import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../middlewares/User-state'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const Register = () => {
    const [name, setname] = useState('');
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const {data, dispatch} = useContext(UserContext);
  
    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_API_URL}/user/create`, {name:name, username:username ,email: email, password: password})
        .then(res => {
            Cookies.set('authToken', res.data.token)
            navigate('/');
        })
        .catch(err => console.log(err))
    }



    return (
        <div className="flex flex-col p-2 space-y-3 my-[3vh]">
            <form onSubmit={submitForm} className="form space-y-3">
                <div className="space-y-2">
                    <label className='flex flex-col' htmlFor="name">
                        <span className="text-2xl ">Name</span>
                        <input className="form-input text-black" id="name" type="text" placeholder="Enter Your Name" value={name} onChange={(e)=> setname(e.target.value)}/>
                    </label>
                    <label className='flex flex-col' htmlFor="username">
                        <span className="text-2xl ">Username</span>
                        <input className="form-input text-black" id="username" type="text" placeholder="Enter Your username" value={username} onChange={(e)=> setusername(e.target.value)}/>
                    </label>

                    <label className='flex flex-col' htmlFor="email">
                        <span className="text-2xl ">Email</span>
                        <input className="form-input text-black" id="email" type="text" placeholder="Enter Your email" value={email} onChange={(e)=> setemail(e.target.value)} />
                    </label>

                    <label className='flex flex-col' htmlFor="password">
                        <span className="text-2xl">Password</span>
                        <input className='form-input  text-black' id='password' type="text" placeholder='Enter your password' value={password} onChange={(e)=> setpassword(e.target.value)} />
                    </label>
                    <span className='text-blue-600 cursor-pointer underline'>Forgot your password?</span>
                </div>
                <div className='space-y-1'>
                    <button type="submit" className="py-2 px-4 bg-blue-500 rounded-lg text-white">
                        Submit
                    </button>
                    <div>
                        <span>Already Have an Account?</span>
                        <Link to='/login'>
                            <span className='text-blue-700 underline ml-2'>Login</span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register
