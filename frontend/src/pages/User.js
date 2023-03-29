import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PostsCard from '../components/Home/PostsCard'
import Footer from '../components/Footer'
import UserDetail from '../components/Home/UserDetail'

const User = () => {
    const params = useParams();
    const id = params.id;
    const [userProfile, setuserProfile] = useState(null);
    const [userPost, setUserPost] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            await axios.post(`${process.env.REACT_APP_API_URL}/user/${id}`)
                .then(res => {
                    setuserProfile(res.data)
                })
                .catch(err => console.error(err))
        }
        async function fetchUsersPost() {
            await axios.get(`${process.env.REACT_APP_API_URL}/post/user/${id}`)
                .then(res => {
                    setUserPost(res.data)
                })
                .catch(err => console.error(err))
        }
        fetchUser();
        fetchUsersPost();
    }, [id])


    return (
        <div className="w-full dark:text-white">
            <div className="w-full flex justify-center ">
                <div className="w-full md:w-4/5 flex flex-col-reverse md:flex-row items-center md:items-start md:space-x-7  my-[5vh] justify-center ">
                    <div className="w-5/6 md:max-w-3xl md:w-4/6 flex flex-col  items-center">
                        <div className="w-full text-center text-xl bg-primary text-white">
                            {userProfile && <h3 className="font-semibold py-2">{userProfile?.name}'s posts</h3>}
                        </div>
                        {userPost && userPost.map((post) => {
                            return <PostsCard key={post?._id} post={post} />
                        })}

                    </div>
                    <div className="w-5/6 md:max-w-sm md:w-2/6 flex flex-col space-y-4 justify-center mb-[5vh]">
                        <UserDetail user={userProfile} post={userPost} />
                        <div className='sr-only md:not-sr-only'>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
