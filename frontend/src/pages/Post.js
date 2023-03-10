import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../middlewares/User-state';
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'


import Footer from '../components/Footer'
import CreateCommunity from '../components/Home/CreateCommunity'
import PostCard from '../components/Post/PostCard';

const Post = () => {
    const params = useParams();
    const { dispatch } = useContext(UserContext);


    const logout = () => {
        dispatch({ type: 'login_status', payload: false })
        dispatch({ type: 'set_user', payload: {} })
        Cookies.remove('authToken')
    }

    return (
        <div className="w-full text-white">
            <div className="w-full flex justify-center ">
                <div className="w-4/5 flex space-x-7  my-[5vh]">
                    <div className="w-4/6 flex flex-col items-center">
                        <PostCard id={params.id}/>
                    </div>
                    <div className="w-2/6 flex flex-col space-y-4">
                        <CreateCommunity />
                        <Footer />
                        <button className='bg-slate-700 py-2 px-3 rounded-full cursor-pointer' onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
