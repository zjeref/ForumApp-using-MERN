import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../middlewares/User-state'
import axios from 'axios'

import PostsCard from '../components/Home/PostsCard'
import CreatePost from '../components/Home/CreatePost'
import Footer from '../components/Footer'
import CreateCommunity from '../components/Home/CreateCommunity'

const Home = () => {
    const { data, dispatch } = useContext(UserContext);
    const [posts, setPosts] = useState([])


    useEffect(() => {
        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API_URL}/post/`)
                .then(res => setPosts(res.data))
                .catch(err => console.log(err))
        }
        fetchData();
    }, [data])

    return (
        <div className="w-full text-white">
            <div className="w-full flex justify-center ">
                <div className="w-4/5 flex space-x-7  my-[5vh]">
                    <div className="w-4/6 flex flex-col items-center">
                        <CreatePost />

                        {posts.map((post) => {
                            return <PostsCard key={post?._id} post={post} />
                        })}

                    </div>
                    <div className="w-2/6 flex flex-col space-y-4">
                        <CreateCommunity />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
