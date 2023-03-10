import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../middlewares/User-state'
import Cookies from 'js-cookie'
import axios from 'axios'

import PostsCard from '../components/Home/PostsCard'
import CreatePost from '../components/Home/CreatePost'
import Footer from '../components/Footer'
import CreateCommunity from '../components/Home/CreateCommunity'

const Home = () => {
    const { data, dispatch } = useContext(UserContext);
    const [posts, setPosts] = useState([])

    const logout = () => {
        dispatch({ type: 'login_status', payload: false })
        dispatch({ type: 'set_user', payload: {} })
        Cookies.remove('authToken')
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API_URL}/post/`)
                .then(res => setPosts(res.data))
                .catch(err => console.log(err))
        }
        fetchData();
        console.log(posts)
    }, [data])

    return (
        <div className="w-full text-white">
            <div className="w-full flex justify-center ">
                <div className="w-4/5 flex space-x-7  my-[5vh]">
                    <div className="w-4/6 flex flex-col items-center">
                        <CreatePost />

                        {posts.map((post) => {
                            return <PostsCard key={post._id} post={post} />
                        })}

                    </div>
                    <div className="w-2/6 flex flex-col space-y-4">
                        <CreateCommunity />
                        <Footer />
                        <button className='bg-slate-700 py-2 px-3 rounded-full cursor-pointer' onClick={logout}>Loggout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
