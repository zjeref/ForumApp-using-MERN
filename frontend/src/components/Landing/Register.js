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
    const [avatar, setavatar] = useState(null);

    const [previewImage, setPreviewImage] = useState(null);

    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('username',username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar)

        await axios.post(`${process.env.REACT_APP_API_URL}/user/create`, formData)
            .then(res => {
                Cookies.set('authToken', res.data.token)
                navigate('/');
            })
            .catch(err => console.log(err))
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        setavatar(file)
        setPreviewImage(URL.createObjectURL(file));
    }



    return (
        <div className="flex flex-col p-2 space-y-3 my-[3vh]">
            <form onSubmit={submitForm} className="form space-y-3">
                <div className="space-y-2">
                    <label className='flex flex-col' htmlFor="name">
                        <span className="text-2xl ">Name</span>
                        <input className="form-input text-black" id="name" type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setname(e.target.value)} />
                    </label>
                    <label className='flex flex-col' htmlFor="username">
                        <span className="text-2xl ">Username</span>
                        <input className="form-input text-black" id="username" type="text" placeholder="Enter Your username" value={username} onChange={(e) => setusername(e.target.value)} />
                    </label>

                    <label className='flex flex-col' htmlFor="email">
                        <span className="text-2xl ">Email</span>
                        <input className="form-input text-black" id="email" type="text" placeholder="Enter Your email" value={email} onChange={(e) => setemail(e.target.value)} />
                    </label>

                    <label className='flex flex-col' htmlFor="password">
                        <span className="text-2xl">Password</span>
                        <input className='form-input  text-black' id='password' type="text" placeholder='Enter your password' value={password} onChange={(e) => setpassword(e.target.value)} />
                    </label>
                    <label className='flex flex-col' htmlFor="img">
                        <span className="text-2xl">Profile image</span>
                        <input id='img' type="file" accept='image/*' onChange={(e) => handleFileSelect(e)} />
                    </label>
                    <div className='flex justify-center'>
                        {previewImage && <img className="w-min h-40 my-4 " src={previewImage} alt='privew' />}
                    </div>
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
