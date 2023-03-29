import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../middlewares/User-state'
import axios from 'axios'

import PostsCard from '../components/Home/PostsCard'
import CreatePost from '../components/Home/CreatePost'
import Footer from '../components/Footer'
import CreateCommunity from '../components/Home/CreateCommunity'
import Loading from '../components/loading'

const Home = () => {
    const { data } = useContext(UserContext);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(null);


    useEffect(() => {
        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_API_URL}/post/`)
                .then(res => setPosts(res.data))
                .catch(err => console.log(err))
            setLoading(false);
        }
        setLoading(true);
        fetchData();

    }, [data])

    return (
        <div className="w-full dark:text-white">
            <div className="w-full flex justify-center ">
                <div className="w-full md:w-4/5 flex flex-col md:flex-row items-center md:items-start md:space-x-7 space-y-4 md:space-y-0  my-[5vh] justify-center ">
                    <div className="w-5/6 md:max-w-3xl md:w-4/6 flex flex-col  items-center">
                        <CreatePost />
                        {!loading ?
                            posts ?
                                posts.map((post) => {
                                    return <PostsCard key={post?._id} post={post} />
                                }) : ""
                            : <Loading />
                        }

                    </div>
                    <div className="w-5/6 md:max-w-sm min-w-[] md:w-2/6 flex flex-col space-y-4 justify-center mb-[5vh]">
                        <CreateCommunity />
                        <div className='sr-only md:not-sr-only'>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
